// Static VouchMe sample data for the ContextAtlas prototype.
//
// Derived from examples/vouchme/context-atlas/atlas-nodes.yaml and
// atlas-routes.yaml for coordinate CA:KZA:VOUCHME:N00050. Nothing here is fetched
// — the prototype is fully local and inspectable. VouchMe terms are project
// aliases/labels/evidence, not the ContextAtlas ontology.

export const coordinate = "CA:KZA:VOUCHME:N00050";
export const alias = "VM.J.CAN.050";

/** The visible 4–6 step journey path shown in the L0 header. */
export const steps = [
  { id: "candidate", label: "Candidate" },
  { id: "request-sent", label: "Request sent" },
  { id: "reference-responds", label: "Reference responds" },
  { id: "vouch-completed", label: "Vouch completed" },
  { id: "share", label: "Share" },
];

export const currentStepId = "vouch-completed";

/** L0 record-aware journey context. */
export const journey = {
  role: "Candidate",
  coordinate,
  alias,
  steps,
  currentStepId,
  status: "Ready to share",
  nextAction: "Share with an employer",
};

/** Copyable Atlas Pin / Waypoint packet for this coordinate. */
export const pin = {
  coordinate,
  alias,
  role: "Candidate",
  journeyStage: "Completed vouch / ready to share",
  route: "/candidate/vouch-id",
  status: "Ready to share",
  label: "Candidate receives reusable Vouch ID",
  suggestedScope: ["VouchIdCard", "SharingControls", "candidate-vouch-id.spec.ts"],
};

/** L1–L5 implementation evidence behind the same coordinate. */
export const workbenchLayers = [
  {
    id: "L1",
    name: "Page / Interface",
    audience: "Product & app teams",
    groups: [
      { label: "Routes", values: ["/candidate/vouch-id", "/candidate/profile"] },
      { label: "Components", values: ["VouchIdCard", "SharingControls"] },
    ],
  },
  {
    id: "L2",
    name: "Workflow",
    audience: "Product ops & support",
    groups: [
      { label: "Statuses", values: ["vouch_id_issued", "reusable_signal_ready"] },
      { label: "Notifications", values: ["candidate_vouch_id_ready"] },
    ],
  },
  {
    id: "L3",
    name: "Data",
    audience: "Engineering & data teams",
    groups: [
      { label: "Tables", values: ["candidates", "vouch_ids", "vouch_responses"] },
    ],
  },
  {
    id: "L4",
    name: "Platform / Integrations",
    audience: "Engineering & ops",
    groups: [
      { label: "Services", values: ["supabase-database", "resend-email"] },
    ],
  },
  {
    id: "L5",
    name: "AI / Delivery / DevOps",
    audience: "AI agents, QA, delivery",
    groups: [
      { label: "Tests", values: ["candidate-vouch-id.spec.ts"] },
    ],
  },
];

/** Explicit connector edges between mapped evidence nodes. */
export const workbenchEdges = [
  {
    from: { layer: "L1", group: "Routes", value: "/candidate/vouch-id" },
    to: { layer: "L2", group: "Statuses", value: "vouch_id_issued" },
  },
  {
    from: { layer: "L1", group: "Routes", value: "/candidate/vouch-id" },
    to: { layer: "L2", group: "Notifications", value: "candidate_vouch_id_ready" },
  },
  {
    from: { layer: "L1", group: "Routes", value: "/candidate/profile" },
    to: { layer: "L2", group: "Statuses", value: "reusable_signal_ready" },
  },
  {
    from: { layer: "L1", group: "Components", value: "VouchIdCard" },
    to: { layer: "L2", group: "Statuses", value: "vouch_id_issued" },
  },
  {
    from: { layer: "L1", group: "Components", value: "SharingControls" },
    to: { layer: "L2", group: "Notifications", value: "candidate_vouch_id_ready" },
  },
  {
    from: { layer: "L2", group: "Statuses", value: "vouch_id_issued" },
    to: { layer: "L3", group: "Tables", value: "vouch_ids" },
  },
  {
    from: { layer: "L2", group: "Statuses", value: "reusable_signal_ready" },
    to: { layer: "L3", group: "Tables", value: "candidates" },
  },
  {
    from: { layer: "L2", group: "Notifications", value: "candidate_vouch_id_ready" },
    to: { layer: "L3", group: "Tables", value: "vouch_responses" },
  },
  {
    from: { layer: "L2", group: "Notifications", value: "candidate_vouch_id_ready" },
    to: { layer: "L4", group: "Services", value: "resend-email" },
  },
  {
    from: { layer: "L3", group: "Tables", value: "vouch_ids" },
    to: { layer: "L5", group: "Tests", value: "candidate-vouch-id.spec.ts" },
  },
  {
    from: { layer: "L3", group: "Tables", value: "vouch_responses" },
    to: { layer: "L5", group: "Tests", value: "candidate-vouch-id.spec.ts" },
  },
  {
    from: { layer: "L4", group: "Services", value: "supabase-database" },
    to: { layer: "L5", group: "Tests", value: "candidate-vouch-id.spec.ts" },
  },
  {
    from: { layer: "L4", group: "Services", value: "resend-email" },
    to: { layer: "L5", group: "Tests", value: "candidate-vouch-id.spec.ts" },
  },
  {
    from: { layer: "L1", group: "Components", value: "VouchIdCard" },
    to: { layer: "L5", group: "Tests", value: "candidate-vouch-id.spec.ts" },
  },
  {
    from: { layer: "L1", group: "Components", value: "SharingControls" },
    to: { layer: "L5", group: "Tests", value: "candidate-vouch-id.spec.ts" },
  },
];

/** Referee evidence shown in the VouchMe page body. */
export const reference = {
  refereeName: "Sarah Jenkins",
  refereeRole: "Director of Engineering",
  refereeInitials: "SJ",
  completedAt: "Today, 09:41 AM",
  trustScore: "High (0.94)",
};
