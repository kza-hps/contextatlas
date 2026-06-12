# ContextAtlas Solution Path

ContextAtlas should be built as a repo-native, local-first engine before it becomes a standalone app or packaged desktop executable.

The product value is a durable topology graph that lives with the codebase and can be read by humans, AI coding agents, CI jobs, and future renderers.

## Recommended Stack Direction

The core implementation path is:

1. TypeScript CLI
2. Repo-native atlas files
3. Shared core engine
4. Optional local MCP server
5. Optional web viewer
6. Desktop app or executable only after the workflow proves itself

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
- `generate`: produce maps, diagrams, docs, and context packs.
- `resolve`: turn a URL, page, file, or coordinate into coordinate candidates.
- `context`: produce a bounded context pack for a coordinate.

`scan` can remain as an early placeholder, but scanning is only one operation inside discovery.

## Repo Files As Source Of Truth

ContextAtlas should store reviewable source and generated artifacts in versioned files:

- YAML for coordinates, discovered nodes, route maps, and review queues.
- JSON for configuration.
- Mermaid for layer diagrams.
- Markdown for generated human and agent context packs.

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
- generating layer views and coordinate context
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

## Viewer Later

A small local web viewer can come after the core workflow is proven. It should render diagrams, coordinate records, route maps, review queues, and layer visibility controls.

The viewer should consume generated atlas output and shared core APIs. It should not become the source of truth.

## Executable Last

A desktop app or `.exe` may be useful later for non-technical users, but it should not be the first product shape.

Packaging too early would add complexity around installers, updates, permissions, and platform behavior before the core mapping workflow is proven.

## Product Principle

Build the discovery and classification engine first. Expose it through the CLI. Make it agent-readable through MCP. Add UI once the underlying coordinate system is useful.

Documentation should stay alive and symbiotic with the repo: it should describe the current architecture, schema, package roles, and intended build path instead of preserving stale decisions.
