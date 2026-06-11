# ContextAtlas Architecture

ContextAtlas starts as a TypeScript monorepo with small package boundaries and an example atlas.

The implementation strategy is documented in [solution-path.md](./solution-path.md). In short: build the repo-native CLI and shared core engine first, add MCP for AI agents next, and defer app or executable packaging until the workflow is proven.

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

`@contextatlas/schema` contains shared TypeScript types for atlas layers, coordinates, and journey steps. It is the stable contract that future scanners, generators, renderers, and validators should share.

`@contextatlas/cli` is the future command-line entrypoint. The initial commands are placeholders for:

- `contextatlas init`
- `contextatlas scan`
- `contextatlas generate`
- `contextatlas context <coordinate>`

`@contextatlas/react` is the future React renderer package. It currently exposes a minimal `JourneyHeader` component that can attach a ContextAtlas coordinate to semantic page UI.

## CLI Intent

The CLI will eventually initialize atlas folders, scan known app surfaces, generate static maps, and return focused context for a coordinate. It should remain repo-native and work without needing a hosted service.

## Schema Intent

The schema package should define durable shared contracts before runtime behavior grows. Future versions can add validation, file formats, and compatibility helpers without forcing every consumer to invent its own shape.

## React Renderer Intent

The React package should render journey headers, coordinate pins, and eventually layer-aware controls. It should stay framework-light so active apps can adopt it without redesigning their UI.

## Examples Folder

The `examples` folder contains customer-shaped atlas examples. `examples/vouchme/context-atlas` is the first static example and should be treated as illustrative until connected to verified production routes and data.

## Future Generated Maps

Generated maps will likely combine explicit atlas files with scanner output. The scanner can discover routes, component names, test files, database references, and integration hints. Human-maintained registers can then confirm which findings are authoritative.

The intended flow is:

1. Define journey coordinates.
2. Scan the repo for likely implementation links.
3. Generate layer-specific maps.
4. Review and verify the generated context.
5. Use `contextatlas context <coordinate>` to hand focused implementation context to humans or AI agents.
