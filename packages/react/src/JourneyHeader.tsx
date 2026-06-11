export interface JourneyHeaderProps {
  coordinate: string;
  label: string;
}

export function JourneyHeader({ coordinate, label }: JourneyHeaderProps) {
  return (
    <header aria-labelledby={`${coordinate}-label`} data-context-coordinate={coordinate}>
      <p>Journey coordinate</p>
      <h1 id={`${coordinate}-label`}>{label}</h1>
      <p>{coordinate}</p>
    </header>
  );
}
