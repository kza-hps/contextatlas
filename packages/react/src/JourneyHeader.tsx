import { useId, useState, type ComponentPropsWithoutRef, type CSSProperties } from "react";
import { CopyAtlasPinButton } from "./CopyAtlasPinButton.js";
import type { AtlasPinData } from "./pinPacket.js";

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

/**
 * Record-aware `L0` Journey Header, the first ContextAtlas product surface.
 *
 * A compact orientation strip that answers: "Where is this record in its
 * journey?" It shows the ContextAtlas mark, coordinate, a 4-6 step journey path
 * with the active step as a status chip, an overlay opacity control, and a Copy
 * Atlas Pin action.
 */
export function JourneyHeader({
  role: _role,
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
  const opacityId = useId();
  const activeIndex = steps.findIndex((step) => step.id === currentStepId);
  const combinedClassName = ["ca-journey", className].filter(Boolean).join(" ");
  const headerStyle = {
    "--atlas-opacity": opacity,
    ...style,
  } as CSSProperties;
  void _role;
  void _status;
  void _nextAction;

  return (
    <header
      {...headerProps}
      className={combinedClassName}
      style={headerStyle}
      data-context-coordinate={coordinate}
      aria-label={`Journey position for ${alias ?? coordinate}`}
    >
      <div className="ca-journey__identity">
        {logoSrc ? (
          <span className="ca-journey__logo" aria-hidden="true">
            <img src={logoSrc} alt="" />
          </span>
        ) : null}
        <span className="ca-journey__coords">
          <span className="ca-journey__coordinate">{coordinate}</span>
          {alias ? <span className="ca-journey__alias">{alias}</span> : null}
        </span>
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
                <span className="ca-journey__step-label">{step.label}</span>
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
            min="0.45"
            max="1"
            step="0.05"
            value={opacity}
            aria-label="Atlas overlay opacity"
            onChange={(event) => setOpacity(Number(event.currentTarget.value))}
          />
        </label>
        <CopyAtlasPinButton pin={pin} onCopied={onCopyPin} />
      </div>
    </header>
  );
}
