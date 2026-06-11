export type AtlasLayer = "L0" | "L1" | "L2" | "L3" | "L4" | "L5";

export interface AtlasCoordinate {
  id: string;
  title: string;
  role?: string;
  journey?: string;
  layerVisibility?: AtlasLayer[];
}

export interface JourneyStep {
  id: string;
  title: string;
  role: string;
  stage: string;
  publicLabel: string;
  routePatterns?: string[];
  statuses?: string[];
  notifications?: string[];
  tables?: string[];
  services?: string[];
  tests?: string[];
  aiContext?: {
    safeStartingScope?: string[];
    expandOnlyIf?: string[];
  };
}
