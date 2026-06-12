export type AtlasLayer = "L0" | "L1" | "L2" | "L3" | "L4" | "L5";

export type AtlasCoordinateString = `CA:${string}:${string}:${string}`;

export interface AtlasCoordinate {
  coordinate: AtlasCoordinateString;
  aliases?: readonly string[];
  label?: string;
  projectLabel?: string;
  classification?: AtlasClassification;
  evidence?: AtlasEvidence;
  relationships?: readonly AtlasEdge[];
}

export interface AtlasClassification {
  property?: string;
  surface?: string;
  actor?: string;
  intent?: string;
  state?: string;
  layer?: AtlasLayer;
  dependencyType?: string;
  confidence?: number;
}

export interface AtlasEvidence {
  routes?: readonly string[];
  files?: readonly string[];
  headings?: readonly string[];
  imports?: readonly string[];
  statuses?: readonly string[];
  notifications?: readonly string[];
  tables?: readonly string[];
  services?: readonly string[];
  tests?: readonly string[];
  notes?: readonly string[];
}

export interface AtlasEdge {
  type: string;
  target: AtlasCoordinateString;
  label?: string;
  confidence?: number;
}

export interface AtlasLayerDefinition {
  id: AtlasLayer;
  name: string;
  visibility: "public" | "app" | "internal";
  description: string;
}

export type AtlasConfig<F extends string = "CA:{ORG}:{PROPERTY}:{NODE}" | (string & {})> = {
  name: string;
  version: string;
  defaultPublicLayer: AtlasLayer;
  layers: readonly AtlasLayerDefinition[];
  coordinateFormula?: F;
} & (F extends "CA:{ORG}:{PROPERTY}:{NODE}"
  ? { organizationCode: string; propertyCode: string }
  : { organizationCode?: string; propertyCode?: string });

export function defineConfig<F extends string = "CA:{ORG}:{PROPERTY}:{NODE}" | (string & {})>(
  config: AtlasConfig<F>
): AtlasConfig<F> {
  return config;
}

export interface AtlasRouteEntry {
  routePattern: string;
  coordinates: readonly AtlasCoordinateString[];
  likelyComponents?: readonly string[];
  layers?: readonly AtlasLayer[];
  evidence?: AtlasEvidence;
}

export interface AtlasRouteMap {
  routes: readonly AtlasRouteEntry[];
}
