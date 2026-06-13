# ContextAtlas

**Discover topology. Classify meaning. Generate layered maps.**

ContextAtlas is a repo-native topology discovery and classification engine for active repos, websites, and apps. It discovers surfaces and dependencies, extracts evidence, builds a graph, assigns stable neutral coordinates, and generates layered maps from user experience down to code, data, integrations, tests, and AI context.

The first product wedge is a record-aware `L0` Journey Header: a compact "you are here" map that can sit inside an active product and orient the user to the current record, route, role, status, stage, and next action. The same coordinate then links downward into the implementation layers that help product teams, support, engineers, and AI coding agents understand what is behind that moment.

The preferred advanced product experience is overlay-first, not dashboard-first. ContextAtlas can render as a transparent topology HUD over a live or local app so the app itself stays the main surface. Atlas Pins, coordinate badges, Journey Headers, and draggable Atlas Blinds layer coordinates, labels, confidence, and evidence directly over the product being mapped.

ContextAtlas owns the formula and algorithm, not a fixed vocabulary. Project-specific language such as "candidate", "referee", "checkout", "marketing site", or "admin workflow" belongs in classification metadata, evidence, and aliases.

## Center Of Gravity

ContextAtlas starts from visible user experience, not from backend inventory.

The core question is:

```txt
In this specific record, on this specific page, wearing this specific role, where am I?
```

For VouchMe, a dashboard card might open an old vouch where the viewer is the candidate and the record is completed. Another card might open a live request where the same person is acting as a referee. ContextAtlas should resolve each page fresh from route, record, viewer role, status, and evidence.

That `L0` journey context powers:

- a user-facing Journey Header
- a copyable Atlas Pin or Waypoint
- a URL-to-coordinate resolver
- shareable layer diagrams
- scoped context packets for Claude, Codex, ChatGPT, support, and PR review

The lower layers are the context inversion system: start narrow from the coordinate, load only the mapped routes, components, statuses, data, integrations, tests, and notes, then widen only when the coordinate does not contain enough evidence.

## Coordinate Model

Coordinates are stable neutral addresses:

```txt
CA:{ORG}:{PROPERTY}:{NODE}
```

Example:

```txt
CA:KZA:VOUCHME:N00042
```

The coordinate identifies the node. Meaning lives beside it:

- aliases such as `VM.J.CAN.040`
- labels such as `Candidate receives completed Vouch ID`
- classification facets such as actor, intent, state, layer, dependency type
- evidence such as routes, files, headings, statuses, services, tests

## Discovery Pipeline

ContextAtlas should follow this pipeline:

1. Discover topology
2. Extract signals
3. Build graph
4. Classify facets
5. Assign or reuse stable coordinates
6. Generate layer views
7. Queue uncertain mappings for human review

## Overlay-First UX

The primary embedded UX is a record-aware `L0` Journey Header. The primary advanced UX metaphor is a transparent topology HUD:

- The live website or app remains visible and usable.
- A compact Journey Header shows the current role, stage, status, next action, and nearby steps.
- A small Atlas Pin or pull tab marks that the current surface has deeper topology context.
- A top Atlas Blind can be pulled down for expanded `L0` product and user-journey meaning.
- A bottom Atlas Blind can be pulled up for `L1`-`L5` routes, components, workflow, data, integrations, tests, and operations evidence.
- Coordinates and visible context should be screenshot-ready and copyable for AI chatbots, coding agents, support tickets, and product discussions.

Standalone dashboards, review screens, generated diagrams, CLI output, MCP tools, and exports remain useful. They are secondary surfaces around the repo-native atlas, not the first product metaphor.

## Planned Commands

```bash
contextatlas init
contextatlas discover
contextatlas classify
contextatlas generate
contextatlas resolve <url-or-coordinate>
contextatlas context <coordinate>
```

These commands are currently placeholders. `scan` remains an alias-level concept for early CLI work, but scanning is part of the broader discovery and classification pipeline.

## Repository Layout

```txt
packages/schema   Shared TypeScript schema for coordinates, classification, evidence, and edges
packages/cli      Future discovery/classification/generation CLI
packages/react    Lightweight UI markers such as Atlas Pins, with future Atlas HUD components
examples/vouchme  First worked example, not the ContextAtlas ontology
docs              Current product and architecture notes
```

## Development

This repo uses npm workspaces.

```bash
npm install
npm run typecheck
npm run build
```

## Documentation Principle

ContextAtlas documentation should be alive and symbiotic with the repo. It should describe the current architecture, schema, package roles, and intended build path. It should not preserve stale decisions just because they were once written down.

## First Example

The first example atlas lives at:

```txt
examples/vouchme/context-atlas
```

VouchMe is a first customer-shaped example. It can use VouchMe-specific aliases and labels, but those aliases are not the core coordinate model.

## Runnable Prototype

A working, local, inspectable prototype of the product wedge — the record-aware `L0`
Journey Header over a live VouchMe page, a copyable Atlas Pin, and an expandable
`L1`–`L5` workbench — lives at:

```txt
examples/vouchme/prototype
```

It mirrors the `@contextatlas/react` components (`JourneyHeader`,
`AtlasWorkbench`, `CopyAtlasPinButton`) against static data for coordinate
`CA:KZA:VOUCHME:N00050`, but the demo itself is static and local-first so it
does not need CDN React, browser-side Babel, external fonts, or `dist/` output.
Run it with:

```bash
python -m http.server 8000
# then open http://localhost:8000/examples/vouchme/prototype/
```

See [examples/vouchme/prototype/README.md](./examples/vouchme/prototype/README.md) for details.

See [docs/ux-atlas-blinds.md](./docs/ux-atlas-blinds.md) for the Atlas Blinds and Topology HUD interaction model.
