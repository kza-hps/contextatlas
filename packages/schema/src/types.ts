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

export interface AtlasJourneyStep {
  id: string;
  coordinate?: AtlasCoordinateString;
  label: string;
  role?: string;
  stage?: string;
  status?: string;
}

export interface AtlasJourneyContext {
  coordinate: AtlasCoordinateString;
  recordId?: string;
  sourceRoute?: string;
  viewerRole?: string;
  journeyStage?: string;
  status?: string;
  label?: string;
  nextAction?: string;
  currentStepId?: string;
  visibleSteps?: readonly AtlasJourneyStep[];
  suggestedScope?: AtlasEvidence;
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

export interface AtlasConfig {
  name: string;
  version: string;
  defaultPublicLayer: AtlasLayer;
  layers: readonly AtlasLayerDefinition[];
  coordinateFormula: "CA:{ORG}:{PROPERTY}:{NODE}";
  organizationCode: string;
  propertyCode: string;
}

export function defineConfig<const T extends AtlasConfig>(config: T): T {
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
