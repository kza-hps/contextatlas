# ContextAtlas Solution Path

ContextAtlas should be built as a repo-native, local-first tool before it becomes a standalone app or packaged desktop executable.

The product value is not a UI shell. The product value is a durable map that lives with the codebase and can be read by humans, AI coding agents, CI jobs, and future renderers.

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
contextatlas scan
contextatlas generate
contextatlas context VM.J.CAN.040
```

The CLI should read local files, scan likely implementation surfaces, generate maps, and return focused context for a coordinate.

## Repo Files as the Source of Truth

ContextAtlas should store its source of truth in versioned files:

- YAML for journey registers and page maps.
- JSON for configuration.
- Mermaid for layer diagrams.
- Markdown for generated human and agent context packs.

This keeps the atlas reviewable in pull requests, readable by AI tools, portable across repos, and independent of a hosted service.

## Add a Core Package Next

Before building a UI, add a shared `@contextatlas/core` package.

The core package should own:

- loading atlas config
- parsing journey registers
- indexing coordinates
- resolving routes and page maps
- building layer graphs
- generating coordinate context

The CLI, MCP server, and viewer should call this shared core instead of each implementation re-reading atlas files in its own way.

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

## MCP as the Agent Layer

A local MCP server is the best next agent-facing surface after the CLI and core engine exist.

Potential MCP tools:

- `get_coordinate_context`
- `list_journey_steps`
- `find_routes_for_coordinate`
- `generate_agent_prompt`
- `list_layer_diagrams`

This lets Codex, Claude, and other agent tools ask ContextAtlas for scoped repo context instead of searching the whole codebase from scratch.

## Viewer Later

A small local web viewer can come after the core workflow is proven. It should render diagrams, registers, coordinates, and layer visibility controls.

The viewer should consume generated atlas output and shared core APIs. It should not become the source of truth.

## Executable Last

A desktop app or `.exe` may be useful later for non-technical users, but it should not be the first product shape.

Packaging too early would add complexity around installers, updates, permissions, and platform behavior before the core mapping workflow is proven.

## Product Principle

Build the map engine first. Expose it through the CLI. Make it agent-readable through MCP. Add UI once the underlying coordinate system is useful.

The coordinate system itself needs a compact algorithm that can scale without hand-authored sprawl. See [coordinate-algorithm.md](./coordinate-algorithm.md) for the current working rule and open design questions.
