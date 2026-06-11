export function runContextCommand(coordinate?: string): void {
  if (!coordinate) {
    console.log("ContextAtlas context: provide a coordinate, for example VM.J.CAN.040.");
    return;
  }

  console.log(`ContextAtlas context: context lookup for ${coordinate} not implemented yet.`);
}
