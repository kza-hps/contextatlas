# ContextAtlas

**Discover topology. Classify meaning. Generate layered maps.**

ContextAtlas is a repo-native topology discovery and classification engine for active repos, websites, and apps. It discovers surfaces and dependencies, extracts evidence, builds a graph, assigns stable neutral coordinates, and generates layered maps from user experience down to code, data, integrations, tests, and AI context.

ContextAtlas owns the formula and algorithm, not a fixed vocabulary. Project-specific language such as "candidate", "referee", "checkout", "marketing site", or "admin workflow" belongs in classification metadata, evidence, and aliases.

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
packages/react    Lightweight UI markers such as Atlas Pins
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
