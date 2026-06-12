# ContextAtlas Product Vision

**Tagline:** Discover topology. Classify meaning. Generate layered maps.

ContextAtlas is a generic, repo-native topology discovery and classification engine for AI-assisted software teams. It can be pointed at an active repo or website, discover its surfaces and dependencies, classify nodes and edges from evidence, assign stable coordinates, and generate maps that connect experience, code, data, integrations, tests, and AI context.

The product should feel like a semantic debug layer for software products: a map room for software topology, projected directly over the product surface. The live app remains the primary visual environment while ContextAtlas appears as a thin transparent Topology HUD with Atlas Pins, coordinate badges, and draggable Atlas Blinds.

## Core Product

ContextAtlas is not a catalogue of every possible page type, journey type, actor, workflow, or site category. It owns the algorithm:

1. Discover topology
2. Extract signals
3. Build graph
4. Classify facets
5. Assign or reuse stable coordinates
6. Generate layer views
7. Queue uncertain mappings for human review

Project-specific language emerges from evidence and review. A customer can call something a candidate journey, checkout flow, onboarding task, admin surface, webhook, or support operation without requiring ContextAtlas to encode those words as a global ontology.

## Product Metaphor

ContextAtlas should feel like:

- Stripe Workbench for precise operational context.
- Minecraft F3 for visible debug truth over the thing being used.
- A git client or observability console for evidence, status, and change review.
- A transparent browser overlay rather than a separate destination.

Standalone dashboards and review screens still exist for dense inspection, uncertain mappings, and bulk workflows. The core product experience is the transparent topology HUD over the live or local app.

## Classification Axes

The stable axes are questions ContextAtlas asks, not fixed lists of allowed answers:

- Property: what kind of repo, site, app, or system is being mapped?
- Surface: what kind of visible or addressable surface was discovered?
- Actor: who or what experiences, operates, or triggers this node?
- Intent: what is this node trying to help the actor do?
- State: what condition can this node or process be in?
- Layer: at what depth is this node visible or operating?
- Dependency: what does this node rely on?
- Edge: how does this node connect to other nodes?

## Coordinate Model

Coordinates are stable neutral addresses:

```txt
CA:{ORG}:{PROPERTY}:{NODE}
```

Example:

```txt
CA:KZA:VOUCHME:N00042
```

The coordinate should not describe the journey. Meaning belongs in metadata: aliases, labels, classifications, evidence, and relationships.

## Layer Model

ContextAtlas uses six generic layers:

- `L0` Surface layer: user-facing meaning, public journeys, visible copy, external explanation.
- `L1` Page/interface layer: routes, pages, components, layouts, UI entry points.
- `L2` Workflow layer: statuses, events, permissions, notifications, business logic.
- `L3` Data layer: database tables, records, storage, auth, policies, data models.
- `L4` Integration/platform layer: external APIs, platform services, webhooks, deployment, infrastructure.
- `L5` AI/operations layer: tests, optional context exports, prompts, UAT notes, agent instructions, operational runbooks.

## Atlas Pins And Waypoints

Atlas Pins are copyable page markers attached to live app surfaces. A header, route, modal, admin view, or mapped UI region can expose a marker such as:

```txt
Atlas Pin
Coordinate: CA:KZA:VOUCHME:N00042
Route: /vouches/[id]?view=candidate
Layer: L0
Label: Candidate receives completed Vouch ID
```

The user should not need to know coordinates manually. They should be able to provide a URL and ask what ContextAtlas coordinates apply, or copy a marker from the page.

Waypoints are human-friendly markers over the same neutral coordinate graph. They can use project language, but they do not replace coordinates.

The current `AtlasPin` is a seed component, not the complete UX. The fuller direction is:

- `AtlasPin`: embedded marker for the current mapped surface.
- `CoordinateBadge`: compact coordinate, route, layer, label, and confidence display.
- `AtlasBlind`: draggable top or bottom glass panel.
- `AtlasWorkbenchOverlay`: transparent shell that anchors pins, blinds, and review panels over the app.
- `LayerControl`: toggles for `L0`-`L5` visibility.
- `EvidenceStrip`: compact evidence trail for the visible coordinate.
- `CoordinateInspectorPanel`: focused coordinate detail and copy actions.
- `ReviewQueuePanel`: uncertain, stale, split, merge, and needs-review workflows.

## Shareable Diagrams

The same coordinate system should support marketing, product, engineering, support, and AI coding agents without exposing unnecessary depth. Diagrams can be exported or shared by layer:

- `L0` only: marketing, copy, journey narrative.
- `L1` only: product, page, route, and interface planning.
- `L2` only: workflow, status, permission, and notification logic.
- `L3` only: data and storage architecture.
- `L4` only: integration and platform architecture.
- `L5` only: AI, dev, test, and operations context.
- Full stack: all layers connected by coordinates.

## Screenshot-Ready AI Context

The screen itself becomes the AI context. A screenshot or copied coordinate from the overlay should give ChatGPT, Claude, Codex, Cursor, or a support workflow enough location and meaning to continue, provided discovery has already mapped the repo.

Context packs, JSON, Markdown, and MCP output remain valuable exports. They should be secondary results of the visible topology model rather than the center of the UX.

## Claude Design Screen Direction

Primary design targets:

1. Embedded Live App With Collapsed Atlas Tabs
2. Top L0 Atlas Blind Pulled Down
3. Bottom L1-L5 Workbench Blind Pulled Up
4. Full Topology HUD With Both Blinds Active
5. Coordinate Inspector Overlay
6. Human Review Queue Overlay / Expanded Workbench
7. Resolve URL Command Overlay
8. Screenshot-Ready AI Context View

Secondary/reference screens:

1. Atlas Overview Dashboard
2. Layered Topology Map
3. Coordinate Detail Page
4. Discovery Run Review
5. Human Review Queue
6. Resolve URL Flow
7. Context Pack View
8. Embedded Atlas Pin

## First Worked Example

VouchMe is the first customer-shaped example. It is useful because the same trust record may be viewed by different actors at different layers. That makes it a good proving ground for classification and coordinates, but it is not the ContextAtlas ontology.
