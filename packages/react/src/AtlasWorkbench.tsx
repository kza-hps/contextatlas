import type { ComponentPropsWithoutRef } from "react";
import { useId, useState } from "react";
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
  /** L1–L5 evidence, in order. */
  layers: readonly WorkbenchLayer[];
  /** Whether the workbench starts expanded. Defaults to false (collapsed peek). */
  defaultOpen?: boolean;
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
 * `L1`–`L5` Atlas Workbench — the deeper context behind the same coordinate.
 *
 * Presented as a bottom blind that the user pulls up. Collapsed it shows a calm
 * peek summary; expanded it reveals the page, workflow, data, platform, and
 * AI/ops evidence that supports the classification. This is the context
 * inversion payload: start narrow from the coordinate, widen only if needed.
 */
export function AtlasWorkbench({
  coordinate,
  alias,
  layers,
  defaultOpen = false,
  className,
  ...sectionProps
}: AtlasWorkbenchProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const combinedClassName = ["ca-workbench", open ? "is-open" : "is-collapsed", className]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      {...sectionProps}
      className={combinedClassName}
      data-context-coordinate={coordinate}
      aria-label="L1–L5 Atlas Workbench"
    >
      <button
        type="button"
        className="ca-workbench__handle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="ca-workbench__handle-grip" aria-hidden="true" />
        <span className="ca-workbench__handle-main">
          <LayersGlyph />
          <span className="ca-workbench__handle-title">L1–L5 Workbench</span>
          <span className="ca-workbench__handle-sub">
            Deeper context for <code>{alias ?? coordinate}</code>
          </span>
        </span>
        <span className="ca-workbench__handle-cta">
          {open ? "Collapse" : "Open evidence"}
          <ChevronGlyph open={open} />
        </span>
      </button>

      <div id={panelId} className="ca-workbench__panel" hidden={!open}>
        <p className="ca-workbench__inversion">
          Context inversion — start from this coordinate, load only the mapped evidence below,
          and widen the search only if it is not enough.
        </p>
        <div className="ca-workbench__grid">
          {layers.map((layer) => (
            <article key={String(layer.id)} className="ca-workbench__layer" data-layer={String(layer.id)}>
              <header className="ca-workbench__layer-head">
                <span className="ca-workbench__layer-id">{layer.id}</span>
                <span className="ca-workbench__layer-name">{layer.name}</span>
                {layer.audience ? (
                  <span className="ca-workbench__layer-audience">{layer.audience}</span>
                ) : null}
              </header>
              <dl className="ca-workbench__groups">
                {layer.groups.map((group) => (
                  <div key={group.label} className="ca-workbench__group">
                    <dt className="ca-workbench__group-label">{group.label}</dt>
                    <dd className="ca-workbench__group-values">
                      {group.values.map((value) => (
                        <code key={value} className="ca-workbench__chip">
                          {value}
                        </code>
                      ))}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
