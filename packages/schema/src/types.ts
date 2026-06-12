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

export interface AtlasConfig {
  name: string;
  version: string;
  coordinateFormula: "CA:{ORG}:{PROPERTY}:{NODE}" | (string & {});
  organizationCode?: string;
  propertyCode?: string;
  defaultPublicLayer: AtlasLayer;
  layers: AtlasLayerDefinition[];
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
