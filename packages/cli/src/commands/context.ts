import process from "node:process";

export function runContextCommand(coordinate?: string): void {
  const trimmed = coordinate?.trim();

  if (!trimmed) {
    console.error("Error: Please provide a coordinate, for example CA:KZA:VOUCHME:N00042.");
    process.exitCode = 1;
    return;
  }

  const coordinatePattern = /^CA:[^:]+:[^:]+:[^:]+$/i;

  if (!coordinatePattern.test(trimmed)) {
    console.warn("Warning: Coordinate does not match the standard 'CA:{ORG}:{PROPERTY}:{NODE}' format.");
  }

  console.log(`ContextAtlas context: context lookup for ${trimmed} not implemented yet.`);
}
