# ContextAtlas Architecture

ContextAtlas starts as a TypeScript monorepo with small package boundaries, shared schema types, a lightweight CLI, a React marker package, and a worked example atlas.

The implementation strategy is documented in [solution-path.md](./solution-path.md). The coordinate model is documented in [coordinate-algorithm.md](./coordinate-algorithm.md).

Architecturally, ContextAtlas separates the topology engine from the atlas data model and from presentation surfaces. The preferred presentation surface is now the transparent Atlas HUD overlay, while standalone viewers and dashboards remain secondary tools for dense inspection.

## Monorepo Structure

```txt
packages/schema
packages/cli
packages/react
examples/vouchme/context-atlas
docs
```

The root workspace owns shared scripts for typechecking and building all packages.

## Packages

`@contextatlas/schema` contains shared TypeScript types for atlas layers, neutral coordinates, classification facets, evidence, route maps, and graph edges. It is the stable contract that future discovery, classifier, generator, renderer, and validator code should share.

`@contextatlas/cli` is the future command-line entrypoint. The initial commands are placeholders for:

- `contextatlas init`
- `contextatlas discover`
- `contextatlas classify`
- `contextatlas generate`
- `contextatlas resolve <url-or-coordinate>`
- `contextatlas context <coordinate>`

`contextatlas scan` can remain as an early alias or implementation detail, but the product language should treat scanning as one part of discovery.

`@contextatlas/react` is the future React renderer package. It currently exposes a minimal `AtlasPin` component that can attach a ContextAtlas coordinate, label, route, and layer marker to semantic page UI.

The current `AtlasPin` should be treated as a seed component for the overlay direction, not as the final renderer. Future React components should point toward `CoordinateBadge`, `AtlasBlind`, `AtlasWorkbenchOverlay`, `LayerControl`, `EvidenceStrip`, `CoordinateInspectorPanel`, and `ReviewQueuePanel`.

## Three Architecture Layers

ContextAtlas should be understood as three layers:

1. Discovery and classification engine
2. Atlas data model
3. Presentation surfaces

### Discovery And Classification Engine

The engine scans the repo or site, extracts topology signals, builds the graph, assigns stable coordinates, and queues uncertain mappings for review. It should remain repo-native and local-first so teams can run it without a hosted service.

Engine responsibilities:

- discover routes, pages, APIs, components, tests, docs, data files, and integrations
- extract signals from paths, names, imports, headings, metadata, forms, calls, statuses, and events
- build and update topology graph nodes and edges
- classify each node from evidence
- assign or reuse stable neutral coordinates
- detect uncertain, stale, split, merge, and needs-review mappings

### Atlas Data Model

The atlas data model stores the durable facts and review state that every surface consumes:

- coordinates
- aliases
- labels
- classifications
- evidence
- relationships
- layer metadata
- route and URL mappings
- review status and confidence

### Presentation Surfaces

Presentation surfaces consume the atlas model. They should not become the source of truth.

Primary surfaces:

- transparent Atlas HUD overlay
- Atlas Pin embedded marker
- Coordinate Badge
- Atlas Blinds top and bottom workbench panels

Secondary surfaces:

- standalone review/workbench screens
- generated Mermaid diagrams
- CLI output
- MCP tools
- Markdown and JSON exports

## CLI Intent

The CLI will initialize atlas folders, discover topology, classify nodes and edges from evidence, generate layer-specific maps, resolve URLs or files into coordinate candidates, and return focused context for a coordinate. It should remain repo-native and work without needing a hosted service.

## Schema Intent

The schema package defines durable shared contracts before runtime behavior grows. The core shape is:

- `AtlasCoordinate`: stable neutral coordinate plus aliases, label, classification, evidence, and relationships.
- `AtlasClassification`: generic classifier facets.
- `AtlasEvidence`: observed signals such as routes, files, headings, imports, statuses, tables, services, and tests.
- `AtlasEdge`: typed relationship to another coordinate.
- `AtlasRouteMap`: addressable surfaces mapped to candidate coordinates.

Future versions can add validation, file formats, and compatibility helpers without forcing every consumer to invent its own shape.

## Discovery Algorithm

The intended flow is:

1. Discover routes, pages, APIs, components, tests, docs, data files, and integrations.
2. Extract signals from paths, names, imports, headings, metadata, forms, calls, statuses, and events.
3. Build a topology graph of nodes and edges.
4. Classify each node by evidence, not by fixed lists.
5. Assign or reuse stable coordinates.
6. Generate maps, diagrams, screenshot-ready overlay context, and shareable layer views.
7. Ask humans or AI agents to review uncertain classifications.

## React Renderer Intent

The React package should render Atlas Pins, Waypoints, coordinate badges, Atlas Blinds, and eventually layer-aware overlay controls. It should stay framework-light so active apps can adopt it without redesigning their UI.

The renderer should support the overlay/viewer distinction:

- Overlay components sit transparently above a live or local app and avoid blocking the product surface unnecessarily.
- Viewer components support dense inspection, review queues, coordinate edits, and generated map browsing when the user needs more room.

## Examples Folder

The `examples` folder contains customer-shaped atlas examples. `examples/vouchme/context-atlas` is the first static example and should be treated as illustrative until connected to verified production routes and data. It may contain aliases like `VM.J.CAN.040`, but those aliases map to generic coordinates such as `CA:KZA:VOUCHME:N00042`.

## Documentation Principle

ContextAtlas documentation should be alive and symbiotic with the repo. It should describe the current architecture, schema, package roles, and intended build path. It should not preserve stale decisions just because they were once written down.
