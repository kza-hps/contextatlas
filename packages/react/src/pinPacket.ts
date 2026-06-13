import type { AtlasCoordinateString } from "@contextatlas/schema";

/**
 * The copyable context packet behind an Atlas Pin / Waypoint.
 *
 * A user should be able to copy this from any mapped surface and paste it into
 * Claude, Codex, ChatGPT, a PR, an issue, or a support ticket. It carries enough
 * location and meaning to continue work narrowly, without searching the whole repo.
 */
export interface AtlasPinData {
  coordinate: AtlasCoordinateString | string;
  alias?: string;
  role?: string;
  /** Human-readable journey stage, e.g. "Completed vouch / ready to share". */
  journeyStage?: string;
  /** Route or route pattern, e.g. "/candidate/vouch-id". */
  route?: string;
  /** Visible status, e.g. "completed" or "Ready to share". */
  status?: string;
  /** Optional short label for the moment. */
  label?: string;
  /** Suggested narrow scope for AI/developer work (components, tests, files). */
  suggestedScope?: readonly string[];
}

/**
 * Render an {@link AtlasPinData} packet as the plain-text "ContextAtlas Pin"
 * block defined in the design brief. Stable, paste-ready, and tool-agnostic.
 */
export function buildAtlasPin(data: AtlasPinData): string {
  const lines: string[] = ["ContextAtlas Pin", `Coordinate: ${data.coordinate}`];

  if (data.alias) lines.push(`Alias: ${data.alias}`);
  if (data.role) lines.push(`Role: ${data.role}`);
  if (data.journeyStage) lines.push(`Journey stage: ${data.journeyStage}`);
  if (data.route) lines.push(`Route: ${data.route}`);
  if (data.status) lines.push(`Status: ${data.status}`);
  if (data.label) lines.push(`Label: ${data.label}`);
  if (data.suggestedScope && data.suggestedScope.length > 0) {
    lines.push(`Suggested scope: ${data.suggestedScope.join(", ")}`);
  }

  return lines.join("\n");
}
