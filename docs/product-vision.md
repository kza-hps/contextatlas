# ContextAtlas Product Vision

**Tagline:** Discover topology. Classify meaning. Generate layered maps.

ContextAtlas is a generic, repo-native topology discovery and classification engine for AI-assisted software teams. It can be pointed at an active repo or website, discover its surfaces and dependencies, classify nodes and edges from evidence, assign stable coordinates, and generate maps that connect experience, code, data, integrations, tests, and AI context.

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
- `L5` AI/operations layer: tests, context packs, prompts, UAT notes, agent instructions, operational runbooks.

## Atlas Pins And Waypoints

Atlas Pins are copyable page markers attached to live app surfaces. A header, dashboard card, modal, route, or admin view can expose a marker such as:

```txt
Atlas Pin
Coordinate: CA:KZA:VOUCHME:N00042
Route: /vouches/[id]?view=candidate
Layer: L0
Label: Candidate receives completed Vouch ID
```

The user should not need to know coordinates manually. They should be able to provide a URL and ask what ContextAtlas coordinates apply, or copy a marker from the page.

Waypoints are human-friendly markers over the same neutral coordinate graph. They can use project language, but they do not replace coordinates.

## Shareable Diagrams

The same coordinate system should support marketing, product, engineering, support, and AI coding agents without exposing unnecessary depth. Diagrams can be exported or shared by layer:

- `L0` only: marketing, copy, journey narrative.
- `L1` only: product, page, route, and interface planning.
- `L2` only: workflow, status, permission, and notification logic.
- `L3` only: data and storage architecture.
- `L4` only: integration and platform architecture.
- `L5` only: AI, dev, test, and operations context.
- Full stack: all layers connected by coordinates.

## First Worked Example

VouchMe is the first customer-shaped example. It is useful because the same trust record may be viewed by different actors at different layers. That makes it a good proving ground for classification and coordinates, but it is not the ContextAtlas ontology.
