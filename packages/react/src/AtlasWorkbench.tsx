import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type CSSProperties,
} from "react";
import type { AtlasLayer } from "@contextatlas/schema";

export interface WorkbenchGroup {
  /** Short label for this evidence group, e.g. "Routes" or "Components". */
  label: string;
  values: readonly string[];
}

export interface WorkbenchLayer {
  /** Layer id, e.g. "L1". Drives the accent colour. */
  id: AtlasLayer | string;
  /** Layer name, e.g. "Page / Interface". */
  name: string;
  /** Who this layer is for, e.g. "Product & app teams". */
  audience?: string;
  groups: readonly WorkbenchGroup[];
}

export interface WorkbenchNodeRef {
  layer: string;
  group: string;
  value: string;
}

export interface WorkbenchEdge {
  from: WorkbenchNodeRef;
  to: WorkbenchNodeRef;
}

export interface AtlasWorkbenchProps
  extends Omit<ComponentPropsWithoutRef<"section">, "children"> {
  /** Coordinate this evidence belongs to. */
  coordinate: string;
  /** Optional alias shown in the handle summary. */
  alias?: string;
  /** L1-L5 evidence, in order. */
  layers: readonly WorkbenchLayer[];
  /** Explicit relationships between rendered evidence nodes. */
  edges?: readonly WorkbenchEdge[];
  /** Whether the workbench starts fully expanded. Defaults to false. */
  defaultOpen?: boolean;
  /** Initial number of visible layers. Overrides defaultOpen when provided. */
  defaultDepth?: number;
}

function LayersGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M12 3l9 5-9 5-9-5 9-5z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3 13l9 5 9-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" opacity="0.6" />
    </svg>
  );
}

function ChevronGlyph({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      aria-hidden="true"
      focusable="false"
      className="ca-workbench__chevron"
      data-open={open ? "true" : "false"}
    >
      <path d="M6 15l6-6 6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function getWorkbenchNodeId(layerId: string, groupLabel: string, value: string) {
  return `${layerId}::${groupLabel}::${value}`;
}

/**
 * L1-L5 Atlas Workbench, the deeper context behind the same coordinate.
 *
 * Presented as a bottom blind that reveals one swimlane at a time. The user can
 * stop at L1, pull deeper through L5, or collapse back to the compact handle.
 */
export function AtlasWorkbench({
  coordinate,
  alias,
  layers,
  edges = [],
  defaultOpen = false,
  defaultDepth,
  className,
  ...sectionProps
}: AtlasWorkbenchProps) {
  const initialDepth = defaultDepth ?? (defaultOpen ? layers.length : 0);
  const [revealedDepth, setRevealedDepth] = useState(() =>
    Math.max(0, Math.min(initialDepth, layers.length)),
  );
  const panelId = useId();
  const diagramRef = useRef<HTMLDivElement>(null);
  const connectorsRef = useRef<SVGSVGElement>(null);
  const arrowId = useId().replaceAll(":", "");
  const open = revealedDepth > 0;
  const nextDepth = revealedDepth >= layers.length ? 0 : revealedDepth + 1;
  const nextLayer = layers[revealedDepth];
  const cta = !open ? "Pull L1" : revealedDepth >= layers.length ? "Collapse" : `Pull ${nextLayer?.id ?? ""}`;
  const combinedClassName = ["ca-workbench", open ? "is-open" : "is-collapsed", className]
    .filter(Boolean)
    .join(" ");

  useEffect(() => {
    const diagram = diagramRef.current;
    const svg = connectorsRef.current;
    if (!diagram || !svg) return;

    const draw = () => {
      const diagramRect = diagram.getBoundingClientRect();
      svg.setAttribute("viewBox", `0 0 ${diagramRect.width} ${diagramRect.height}`);
      svg.setAttribute("width", String(diagramRect.width));
      svg.setAttribute("height", String(diagramRect.height));
      svg.querySelectorAll(".ca-workbench__connector").forEach((node) => node.remove());

      const nodeById = new Map(
        [...diagram.querySelectorAll<HTMLElement>("[data-node-id]")].map((node) => [
          node.dataset.nodeId,
          node,
        ]),
      );
      const revealedLayerIds = new Set(
        [...diagram.querySelectorAll<HTMLElement>(".ca-workbench__swimlane.is-revealed")].map(
          (lane) => lane.dataset.layer,
        ),
      );

      edges.forEach((edge, index) => {
        if (!revealedLayerIds.has(edge.from.layer) || !revealedLayerIds.has(edge.to.layer)) return;

        const source = nodeById.get(getWorkbenchNodeId(edge.from.layer, edge.from.group, edge.from.value));
        const target = nodeById.get(getWorkbenchNodeId(edge.to.layer, edge.to.group, edge.to.value));
        if (!source || !target) return;

        const sourceRect = source.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const start = {
          x: sourceRect.left + sourceRect.width / 2 - diagramRect.left,
          y: sourceRect.bottom - diagramRect.top,
        };
        const end = {
          x: targetRect.left + targetRect.width / 2 - diagramRect.left,
          y: targetRect.top - diagramRect.top,
        };
        const deltaY = Math.max(34, Math.abs(end.y - start.y));
        const midY = start.y + deltaY * 0.48;
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("class", "ca-workbench__connector");
        path.setAttribute(
          "d",
          `M ${start.x} ${start.y} C ${start.x} ${midY}, ${end.x} ${midY}, ${end.x} ${end.y}`,
        );
        path.setAttribute("marker-end", `url(#${arrowId})`);
        path.style.setProperty("--edge-index", String(index));
        svg.appendChild(path);
      });
    };

    requestAnimationFrame(() => {
      draw();
      requestAnimationFrame(draw);
    });

    window.addEventListener("resize", draw);
    return () => window.removeEventListener("resize", draw);
  }, [arrowId, edges, layers, revealedDepth]);

  return (
    <section
      {...sectionProps}
      className={combinedClassName}
      data-context-coordinate={coordinate}
      data-depth={revealedDepth}
      aria-label="L1-L5 Atlas Workbench"
    >
      <button
        type="button"
        className="ca-workbench__handle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setRevealedDepth(nextDepth)}
      >
        <span className="ca-workbench__handle-grip" aria-hidden="true" />
        <span className="ca-workbench__handle-main">
          <LayersGlyph />
          <span className="ca-workbench__handle-title">L1-L5 Workbench</span>
          <span className="ca-workbench__handle-sub">
            Deeper context for <code>{alias ?? coordinate}</code>
          </span>
        </span>
        <span className="ca-workbench__handle-cta">
          {cta}
          <ChevronGlyph open={open} />
        </span>
      </button>

      <div id={panelId} className="ca-workbench__panel" hidden={!open}>
        <p className="ca-workbench__inversion">
          Context inversion - pull one layer at a time, inspect only the evidence needed,
          and widen the map only when the visible lane is not enough.
        </p>
        <div
          className="ca-workbench__diagram"
          aria-label="Layered context swimlane diagram"
          ref={diagramRef}
        >
          <svg className="ca-workbench__connectors" aria-hidden="true" ref={connectorsRef}>
            <defs>
              <marker
                id={arrowId}
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" />
              </marker>
            </defs>
          </svg>
          {layers.map((layer, index) => {
            const layerDepth = index + 1;
            const revealed = layerDepth <= revealedDepth;

            return (
              <section
                key={String(layer.id)}
                className={`ca-workbench__swimlane ${revealed ? "is-revealed" : "is-compressed"}`}
                data-layer={String(layer.id)}
                style={{ "--layer-index": index } as CSSProperties}
              >
                <button
                  type="button"
                  className="ca-workbench__lane-label"
                  aria-expanded={revealed}
                  onClick={() => setRevealedDepth(layerDepth)}
                >
                  <span className="ca-workbench__layer-id">{layer.id}</span>
                  <span className="ca-workbench__layer-name">{layer.name}</span>
                  {layer.audience ? (
                    <span className="ca-workbench__layer-audience">{layer.audience}</span>
                  ) : null}
                </button>
                <div className="ca-workbench__lane-canvas" aria-hidden={!revealed}>
                  {revealed
                    ? layer.groups.map((group) => (
                        <div key={group.label} className="ca-workbench__node-group">
                          <span className="ca-workbench__group-label">{group.label}</span>
                          <span className="ca-workbench__nodes">
                            {group.values.map((value) => (
                              <span
                                key={value}
                                className="ca-workbench__node"
                                data-node-id={getWorkbenchNodeId(String(layer.id), group.label, value)}
                              >
                                {value}
                              </span>
                            ))}
                          </span>
                        </div>
                      ))
                    : null}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </section>
  );
}
