import type { ComponentPropsWithoutRef } from "react";
import { useId } from "react";
import type { AtlasLayer, AtlasCoordinateString } from "@contextatlas/schema";

export type AtlasPinHeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface AtlasPinProps extends Omit<ComponentPropsWithoutRef<"header">, "children"> {
  coordinate: AtlasCoordinateString;
  label: string;
  route?: string;
  layer?: AtlasLayer;
  markerLabel?: string;
  headingLevel?: AtlasPinHeadingLevel;
}

export function AtlasPin({
  coordinate,
  label,
  route,
  layer,
  markerLabel = "Atlas Pin",
  headingLevel = "h3",
  className,
  ...headerProps
}: AtlasPinProps) {
  const labelId = useId();
  const Heading = headingLevel;
  const combinedClassName = className ? `context-atlas-pin ${className}` : "context-atlas-pin";

  return (
    <header
      {...headerProps}
      className={combinedClassName}
      aria-labelledby={labelId}
      data-context-coordinate={coordinate}
    >
      <p>{markerLabel}</p>
      <Heading id={labelId}>{label}</Heading>
      <dl>
        <div>
          <dt>Coordinate</dt>
          <dd>{coordinate}</dd>
        </div>
        {route ? (
          <div>
            <dt>Route</dt>
            <dd>{route}</dd>
          </div>
        ) : null}
        {layer ? (
          <div>
            <dt>Layer</dt>
            <dd>{layer}</dd>
          </div>
        ) : null}
      </dl>
    </header>
  );
}
