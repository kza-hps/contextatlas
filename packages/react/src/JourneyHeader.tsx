import type { ComponentPropsWithoutRef } from "react";
import { CopyAtlasPinButton } from "./CopyAtlasPinButton.js";
import type { AtlasPinData } from "./pinPacket.js";

export interface JourneyStep {
  id: string;
  label: string;
}

export interface JourneyHeaderProps
  extends Omit<ComponentPropsWithoutRef<"header">, "children" | "title"> {
  /** Role worn for this record, e.g. "Candidate". Resolved per record, not per account. */
  role: string;
  /** Stable neutral coordinate, e.g. "CA:KZA:VOUCHME:N00050". */
  coordinate: string;
  /** Readable project alias shown beside the coordinate, e.g. "VM.J.CAN.050". */
  alias?: string;
  /** 4–6 visible journey steps. The active one is highlighted as a status chip. */
  steps: readonly JourneyStep[];
  /** Which step the current record is on ("you are here"). */
  currentStepId: string;
  /** Current visible status, e.g. "Ready to share". */
  status?: string;
  /** Suggested next action, e.g. "Share with an employer". */
  nextAction?: string;
  /** Pin packet copied by the "Copy Atlas Pin" button. */
  pin: AtlasPinData;
  /** Notified with the exact text that was copied. */
  onCopyPin?: (text: string) => void;
}

function RoleGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" focusable="false">
      <circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 19.5a7 7 0 0 1 14 0" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function StepCheckGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true" focusable="false" className="ca-journey__step-check">
      <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Record-aware `L0` Journey Header — the first ContextAtlas product surface.
 *
 * A compact, calm orientation strip that answers: "In this specific record, on
 * this specific page, wearing this specific role, where am I?" It shows the role
 * badge, alias + coordinate, a 4–6 step journey path with the active step as a
 * status chip, the current status and next action, and a Copy Atlas Pin action.
 */
export function JourneyHeader({
  role,
  coordinate,
  alias,
  steps,
  currentStepId,
  status,
  nextAction,
  pin,
  onCopyPin,
  className,
  ...headerProps
}: JourneyHeaderProps) {
  const activeIndex = steps.findIndex((step) => step.id === currentStepId);
  const combinedClassName = ["ca-journey", className].filter(Boolean).join(" ");

  return (
    <header
      {...headerProps}
      className={combinedClassName}
      data-context-coordinate={coordinate}
      aria-label={`Journey position for ${alias ?? coordinate}`}
    >
      <div className="ca-journey__identity">
        <span className="ca-journey__role">
          <RoleGlyph />
          {role}
        </span>
        <span className="ca-journey__coords">
          {alias ? <span className="ca-journey__alias">{alias}</span> : null}
          <span className="ca-journey__coordinate">{coordinate}</span>
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

        {(status || nextAction) && (
          <p className="ca-journey__statusline">
            {status ? (
              <span className="ca-journey__status">
                <span className="ca-journey__status-dot" aria-hidden="true" />
                {status}
              </span>
            ) : null}
            {nextAction ? (
              <span className="ca-journey__next">
                <span className="ca-journey__next-label">Next:</span> {nextAction}
              </span>
            ) : null}
          </p>
        )}
      </div>

      <div className="ca-journey__actions">
        <CopyAtlasPinButton pin={pin} onCopied={onCopyPin} />
      </div>
    </header>
  );
}
