import type { ComponentPropsWithoutRef } from "react";
import { useId } from "react";

export type JourneyHeaderHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface JourneyHeaderProps extends ComponentPropsWithoutRef<"header"> {
  coordinate: string;
  label: string;
  headingLevel?: JourneyHeaderHeadingLevel;
}

export function JourneyHeader({
  coordinate,
  label,
  headingLevel = "h1",
  ...headerProps
}: JourneyHeaderProps) {
  const labelId = useId();
  const Heading = headingLevel;

  return (
    <header {...headerProps} aria-labelledby={labelId} data-context-coordinate={coordinate}>
      <p>Journey coordinate</p>
      <Heading id={labelId}>{label}</Heading>
      <p>{coordinate}</p>
    </header>
  );
}
