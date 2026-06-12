export type AtlasLayer = "L0" | "L1" | "L2" | "L3" | "L4" | "L5";

export interface AtlasCoordinate {
  coordinate: string;
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
  target: string;
  label?: string;
  confidence?: number;
}

export interface AtlasLayerDefinition {
  id: AtlasLayer;
  name: string;
  visibility: "public" | "app" | "internal";
  description: string;
}

export type AtlasConfig<T extends string = string> = {
  name: string;
  version: string;
  defaultPublicLayer: AtlasLayer;
  layers: AtlasLayerDefinition[];
  coordinateFormula?: T;
} & (T extends "CA:{ORG}:{PROPERTY}:{NODE}"
  ? {
      organizationCode: string;
      propertyCode: string;
    }
  : {
      organizationCode?: string;
      propertyCode?: string;
    });

export function defineConfig<const T extends string>(config: AtlasConfig<T>): AtlasConfig<T> {
  return config;
}

export interface AtlasRouteEntry {
  routePattern: string;
  coordinates: string[];
  likelyComponents?: string[];
  layers?: AtlasLayer[];
  evidence?: AtlasEvidence;
}

export interface AtlasRouteMap {
  routes: AtlasRouteEntry[];
}
