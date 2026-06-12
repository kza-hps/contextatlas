# ContextAtlas Architecture

ContextAtlas starts as a TypeScript monorepo with small package boundaries, shared schema types, a lightweight CLI, a React marker package, and a worked example atlas.

The implementation strategy is documented in [solution-path.md](./solution-path.md). The coordinate model is documented in [coordinate-algorithm.md](./coordinate-algorithm.md).

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
6. Generate maps, diagrams, context packs, and shareable layer views.
7. Ask humans or AI agents to review uncertain classifications.

## React Renderer Intent

The React package should render Atlas Pins, Waypoints, coordinate badges, and eventually layer-aware controls. It should stay framework-light so active apps can adopt it without redesigning their UI.

## Examples Folder

The `examples` folder contains customer-shaped atlas examples. `examples/vouchme/context-atlas` is the first static example and should be treated as illustrative until connected to verified production routes and data. It may contain aliases like `VM.J.CAN.040`, but those aliases map to generic coordinates such as `CA:KZA:VOUCHME:N00042`.

## Documentation Principle

ContextAtlas documentation should be alive and symbiotic with the repo. It should describe the current architecture, schema, package roles, and intended build path. It should not preserve stale decisions just because they were once written down.
