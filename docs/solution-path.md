# ContextAtlas Solution Path

ContextAtlas should be built as a repo-native, local-first engine before it becomes a hosted dashboard, standalone app, or packaged desktop executable.

The product value is a durable topology graph that lives with the codebase and can be read by humans, AI coding agents, CI jobs, and future renderers. The preferred UX is a transparent Topology HUD over the user's live or local app, not a dashboard-first product.

## Recommended Stack Direction

The core implementation path is:

1. TypeScript CLI
2. Repo-native atlas files
3. Shared core engine
4. Optional local MCP server
5. Lightweight Atlas HUD renderer
6. Optional web viewer or review workbench
7. Desktop app or executable only after the workflow proves itself

## Why CLI First

The CLI should be the first serious implementation surface because it can run inside any product repo without hosting, login, or deployment.

Planned commands:

```bash
contextatlas init
contextatlas discover
contextatlas classify
contextatlas generate
contextatlas resolve <url-or-coordinate>
contextatlas context <coordinate>
```

Command intent:

- `discover`: find topology.
- `classify`: infer meaning from evidence.
- `generate`: produce maps, diagrams, docs, overlay-ready atlas data, and optional context exports.
- `resolve`: turn a URL, page, file, or coordinate into coordinate candidates.
- `context`: produce bounded visible context or an export for a coordinate.

`scan` can remain as an early placeholder, but scanning is only one operation inside discovery.

## Repo Files As Source Of Truth

ContextAtlas should store reviewable source and generated artifacts in versioned files:

- YAML for coordinates, discovered nodes, route maps, and review queues.
- JSON for configuration.
- Mermaid for layer diagrams.
- Markdown for optional generated human and agent context exports.

This keeps the atlas reviewable in pull requests, readable by AI tools, portable across repos, and independent of a hosted service.

## Add A Core Package Next

Before building a UI, add a shared `@contextatlas/core` package.

The core package should own:

- loading atlas config
- discovering topology from repo or site inputs
- extracting signals
- building and updating topology graphs
- classifying nodes and edges
- indexing coordinates and aliases
- resolving routes, URLs, files, and coordinates
- generating layer views and screenshot-ready coordinate context
- creating review queues for uncertain mappings

Recommended future structure:

```txt
packages/
  schema
  core
  cli
  react
  mcp
  viewer
```

## MCP As The Agent Layer

A local MCP server is the best next agent-facing surface after the CLI and core engine exist.

Potential MCP tools:

- `get_coordinate_context`
- `resolve_atlas_reference`
- `list_layer_views`
- `list_uncertain_mappings`
- `generate_agent_prompt`

This lets Codex, Claude, and other agent tools ask ContextAtlas for scoped repo context instead of searching the whole codebase from scratch.

## Product Rollout

Phase 1:

- Discovery engine
- Coordinate model
- Example atlas
- Basic CLI or local generation

Phase 2:

- Atlas Pin
- Coordinate badges
- Overlay shell
- Collapsed pull tabs
- Top `L0` blind
- Bottom `L1`-`L5` blind

Phase 3:

- Human review queue
- Uncertain mapping resolution
- Split, merge, and accept workflows
- Evidence inspection

Phase 4:

- Screenshot-ready AI context
- Copy coordinate / copy visible context
- Optional Markdown, JSON, and MCP export

## Atlas HUD Before Viewer

The first visual surface should be the transparent Atlas HUD over a live or local app:

- collapsed top and bottom pull tabs
- peek coordinate overlay
- top `L0` product meaning blind
- bottom `L1`-`L5` workbench blind
- coordinate inspector overlay
- review queue overlay when necessary

The user should be able to keep using the app while ContextAtlas adds just enough topology context to understand the current surface.

## Viewer Later

A small local web viewer can come after the core workflow is proven. It should render diagrams, coordinate records, route maps, review queues, and layer visibility controls.

The viewer should consume generated atlas output and shared core APIs. It should not become the source of truth.

## Executable Last

A desktop app or `.exe` may be useful later for non-technical users, but it should not be the first product shape.

Packaging too early would add complexity around installers, updates, permissions, and platform behavior before the core mapping workflow is proven.

## Product Principle

Build the discovery and classification engine first. Expose it through the CLI. Make it agent-readable through MCP. Add a transparent overlay UI once the underlying coordinate system is useful.

Do not make context packs the center of the UX. AI context matters, but the first experience should be visible, screenshot-ready topology on top of the product surface. Context packs, JSON exports, Markdown exports, and MCP tools are downstream surfaces for the same atlas graph.

Documentation should stay alive and symbiotic with the repo: it should describe the current architecture, schema, package roles, and intended build path instead of preserving stale decisions.
