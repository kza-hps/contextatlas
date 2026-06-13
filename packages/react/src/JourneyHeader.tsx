import { useId, useState, type ComponentPropsWithoutRef, type CSSProperties, type MouseEvent } from "react";
import { buildAtlasPin, type AtlasPinData } from "./pinPacket.js";

export interface JourneyStep {
  id: string;
  label: string;
}

export interface JourneyHeaderProps
  extends Omit<ComponentPropsWithoutRef<"header">, "children" | "title"> {
  /** Role worn for this record, e.g. "Candidate". Kept for context/pin compatibility. */
  role: string;
  /** Stable neutral coordinate, e.g. "CA:KZA:VOUCHME:N00050". */
  coordinate: string;
  /** Readable project alias shown beside the coordinate, e.g. "VM.J.CAN.050". */
  alias?: string;
  /** Optional ContextAtlas mark shown before the coordinate block. */
  logoSrc?: string;
  /** 4–6 visible journey steps. The active one is highlighted as a status chip. */
  steps: readonly JourneyStep[];
  /** Which step the current record is on ("you are here"). */
  currentStepId: string;
  /** Current status retained for context/pin compatibility, e.g. "Ready to share". */
  status?: string;
  /** Suggested next action retained for context/pin compatibility. */
  nextAction?: string;
  /** Pin packet copied by the "Copy Atlas Pin" button. */
  pin: AtlasPinData;
  /** Initial overlay opacity for the L0 strip. */
  defaultOpacity?: number;
  /** Notified with the exact text that was copied. */
  onCopyPin?: (text: string) => void;
}

function StepCheckGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false" className="ca-journey__step-check">
      <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RoleGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false" className="ca-journey__role-icon">
      <circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 19.5a7 7 0 0 1 14 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CopyGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false" className={className}>
      <rect x="8" y="8" width="10" height="10" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 16H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function LocationGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" focusable="false" className={className}>
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Record-aware `L0` Journey Header, the first ContextAtlas product surface.
 *
 * A compact orientation strip that answers: "Where is this record in its
 * journey?" It shows the ContextAtlas mark, coordinate, a 4-6 step journey path
 * with the active step as a status chip, an overlay opacity control, and a Copy
 * Atlas Pin action.
 */
export function JourneyHeader({
  role,
  coordinate,
  alias,
  logoSrc,
  steps,
  currentStepId,
  status: _status,
  nextAction: _nextAction,
  pin,
  defaultOpacity = 0.9,
  onCopyPin,
  className,
  style,
  ...headerProps
}: JourneyHeaderProps) {
  const [opacity, setOpacity] = useState(defaultOpacity);
  const [copiedCoordinate, setCopiedCoordinate] = useState(false);
  const opacityId = useId();
  const pinPanelId = useId();
  const activeIndex = steps.findIndex((step) => step.id === currentStepId);
  const combinedClassName = ["ca-journey", className].filter(Boolean).join(" ");
  const pinPacket = buildAtlasPin(pin);
  const pinLines = pinPacket.split("\n");
  const headerStyle = {
    "--atlas-opacity": opacity,
    ...style,
  } as CSSProperties;
  void _status;
  void _nextAction;

  async function copyCoordinate() {
    try {
      await navigator.clipboard?.writeText(String(coordinate));
    } catch {
      // The coordinate is revealed on hover/focus even if clipboard access fails.
    }
    setCopiedCoordinate(true);
  }

  async function copyPin(event: MouseEvent<HTMLButtonElement>) {
    try {
      await navigator.clipboard?.writeText(pinPacket);
    } catch {
      // The visible packet remains available if clipboard access is denied.
    }
    onCopyPin?.(pinPacket);
    event.currentTarget.blur();
  }

  return (
    <header
      {...headerProps}
      className={combinedClassName}
      style={headerStyle}
      data-context-coordinate={coordinate}
      aria-label={`Journey position for ${alias ?? coordinate}`}
    >
      <div className={`ca-journey__identity ${copiedCoordinate ? "is-coordinate-copied" : ""}`}>
        {logoSrc ? (
          <button type="button" className="ca-journey__logo" aria-label="Reveal and copy coordinate" onClick={copyCoordinate}>
            <img src={logoSrc} alt="" />
          </button>
        ) : null}
        <button type="button" className="ca-journey__coords" aria-label="Copy coordinate" onClick={copyCoordinate}>
          <span className="ca-journey__coordinate">{coordinate}</span>
          <span className="ca-journey__copy-coordinate">
            <CopyGlyph />
          </span>
        </button>
      </div>

      <div className="ca-journey__center">
        <ol className="ca-journey__steps" aria-label="Journey path">
          {steps.map((step, index) => {
            const state =
              index < activeIndex ? "done" : index === activeIndex ? "active" : "upcoming";
            return (
              <li
                key={step.id}
                className={`ca-journey__step is-${state}`}
                aria-current={state === "active" ? "step" : undefined}
              >
                {state === "active" ? <StepCheckGlyph /> : null}
                {step.label.toLowerCase() === role.toLowerCase() ? <RoleGlyph /> : null}
                <span className="ca-journey__step-label">{step.label}</span>
                {state === "active" ? (
                  <>
                    <button
                      type="button"
                      className="ca-locator"
                      aria-label="Copy Atlas Pin"
                      aria-describedby={pinPanelId}
                      onClick={copyPin}
                    >
                      <LocationGlyph className="ca-locator__pin" />
                      <CopyGlyph className="ca-locator__copy" />
                    </button>
                    <aside className="ca-pin-popover" id={pinPanelId} role="status" aria-live="polite">
                      <p>Atlas Pin copied - paste into Claude, Codex, ChatGPT, a PR, or support.</p>
                      <pre>
                        {pinLines.map((line, lineIndex) => (
                          <span key={`${lineIndex}-${line}`} style={{ "--line-index": lineIndex } as CSSProperties}>
                            {line}
                          </span>
                        ))}
                      </pre>
                    </aside>
                  </>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="ca-journey__actions">
        <label className="ca-opacity" htmlFor={opacityId}>
          <span className="ca-opacity__label">Opacity</span>
          <input
            id={opacityId}
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={opacity}
            aria-label="Atlas overlay opacity"
            aria-orientation="vertical"
            onChange={(event) => setOpacity(Number(event.currentTarget.value))}
          />
        </label>
      </div>
    </header>
  );
}
