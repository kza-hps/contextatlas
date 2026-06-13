import type { ComponentPropsWithoutRef } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { buildAtlasPin } from "./pinPacket.js";
import type { AtlasPinData } from "./pinPacket.js";

export interface CopyAtlasPinButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "children" | "onClick"> {
  /** The pin packet to copy. */
  pin: AtlasPinData;
  /** Idle button label. Defaults to "Copy Atlas Pin". */
  label?: string;
  /** Label shown briefly after a successful copy. Defaults to "Copied". */
  copiedLabel?: string;
  /** How long the copied state stays visible, in ms. Defaults to 2000. */
  resetAfterMs?: number;
  /** Notified with the exact text that was copied. */
  onCopied?: (text: string) => void;
}

/** Target / waypoint glyph used on the copy control. */
function PinGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M12 1.5v4M12 18.5v4M1.5 12h4M18.5 12h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
      <path d="M5 12.5l4.2 4.2L19 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * "Copy Atlas Pin" button. Copies the {@link buildAtlasPin} packet to the
 * clipboard and shows a brief copied state. Falls back gracefully where the
 * async clipboard API is unavailable.
 */
export function CopyAtlasPinButton({
  pin,
  label = "Copy Atlas Pin",
  copiedLabel = "Copied",
  resetAfterMs = 2000,
  onCopied,
  className,
  type = "button",
  ...buttonProps
}: CopyAtlasPinButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const handleCopy = useCallback(async () => {
    const text = buildAtlasPin(pin);
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      }
    } catch {
      // Clipboard can reject on insecure origins or denied permissions; still
      // surface the copied state so the packet remains visible and selectable.
    }
    onCopied?.(text);
    setCopied(true);
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), resetAfterMs);
  }, [pin, onCopied, resetAfterMs]);

  const combinedClassName = ["ca-pin-button", copied ? "is-copied" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      {...buttonProps}
      type={type}
      className={combinedClassName}
      data-copied={copied ? "true" : "false"}
      aria-live="polite"
      onClick={handleCopy}
    >
      <span className="ca-pin-button__icon">{copied ? <CheckGlyph /> : <PinGlyph />}</span>
      <span className="ca-pin-button__label">{copied ? copiedLabel : label}</span>
    </button>
  );
}
