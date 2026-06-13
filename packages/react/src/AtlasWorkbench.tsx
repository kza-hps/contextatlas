import { useId, useState, type ComponentPropsWithoutRef, type CSSProperties } from "react";
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

export interface AtlasWorkbenchProps
  extends Omit<ComponentPropsWithoutRef<"section">, "children"> {
  /** Coordinate this evidence belongs to. */
  coordinate: string;
  /** Optional alias shown in the handle summary. */
  alias?: string;
  /** L1-L5 evidence, in order. */
  layers: readonly WorkbenchLayer[];
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
  const open = revealedDepth > 0;
  const nextDepth = revealedDepth >= layers.length ? 0 : revealedDepth + 1;
  const nextLayer = layers[revealedDepth];
  const cta = !open ? "Pull L1" : revealedDepth >= layers.length ? "Collapse" : `Pull ${nextLayer?.id ?? ""}`;
  const combinedClassName = ["ca-workbench", open ? "is-open" : "is-collapsed", className]
    .filter(Boolean)
    .join(" ");

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
        <div className="ca-workbench__diagram" aria-label="Layered context swimlane diagram">
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
                              <span key={value} className="ca-workbench__node">
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
