import process from "node:process";

export function runContextCommand(coordinate?: string): void {
  if (!coordinate) {
    console.error("Error: Please provide a coordinate, for example VM.J.CAN.040.");
    process.exitCode = 1;
    return;
  }

  console.log(`ContextAtlas context: context lookup for ${coordinate} not implemented yet.`);
}
