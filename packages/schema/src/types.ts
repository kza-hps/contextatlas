export type AtlasLayer = "L0" | "L1" | "L2" | "L3" | "L4" | "L5";

export type AtlasCoordinateString = string;

export interface AtlasCoordinate {
  coordinate: AtlasCoordinateString;
  aliases?: string[];
  label?: string;
  projectLabel?: string;
  classification?: AtlasClassification;
  evidence?: AtlasEvidence;
  relationships?: AtlasEdge[];
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
  routes?: string[];
  files?: string[];
  headings?: string[];
  imports?: string[];
  statuses?: string[];
  notifications?: string[];
  tables?: string[];
  services?: string[];
  tests?: string[];
  notes?: string[];
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

export type AtlasConfig = {
  name: string;
  version: string;
  defaultPublicLayer: AtlasLayer;
  layers: AtlasLayerDefinition[];
} & (
  | {
      coordinateFormula: "CA:{ORG}:{PROPERTY}:{NODE}";
      organizationCode: string;
      propertyCode: string;
    }
  | {
      coordinateFormula?: string;
      organizationCode?: string;
      propertyCode?: string;
    }
);

export function defineConfig<T extends AtlasConfig>(
  config: T & (T["coordinateFormula"] extends "CA:{ORG}:{PROPERTY}:{NODE}"
    ? { organizationCode: string; propertyCode: string }
    : unknown)
): T {
  return config;
}

export interface AtlasRouteEntry {
  routePattern: string;
  coordinates: AtlasCoordinateString[];
  likelyComponents?: string[];
  layers?: AtlasLayer[];
  evidence?: AtlasEvidence;
}

export interface AtlasRouteMap {
  routes: AtlasRouteEntry[];
}
