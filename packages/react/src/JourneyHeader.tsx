import { useId } from "react";

export interface JourneyHeaderProps {
  coordinate: string;
  label: string;
}

export function JourneyHeader({ coordinate, label }: JourneyHeaderProps) {
  const labelId = useId();

  return (
    <header aria-labelledby={labelId} data-context-coordinate={coordinate}>
      <p>Journey coordinate</p>
      <h1 id={labelId}>{label}</h1>
      <p>{coordinate}</p>
    </header>
  );
}
