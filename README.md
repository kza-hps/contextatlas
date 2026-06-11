# ContextAtlas

**Map the user journey. Trace the code beneath it.**

ContextAtlas is a repo-native mapping toolkit for active web apps. It helps teams connect user-facing journeys to the pages, components, statuses, data, integrations, tests, and AI development context beneath them.

Instead of asking a human or AI coding agent to search an entire codebase, ContextAtlas gives every user-facing experience a coordinate.

## Planned Commands

```bash
contextatlas init
contextatlas scan
contextatlas generate
contextatlas context VM.J.CAN.040
```

These commands are currently placeholders. The bootstrap sets up the package boundaries, types, example atlas, and documentation that future scanner and generator work will build on.

## Repository Layout

```txt
packages/schema   Shared TypeScript schema and journey mapping types
packages/cli      Future scanner/generator CLI
packages/react    Future React rendering helpers
examples/vouchme  First example ContextAtlas implementation
docs              Product and architecture notes
```

## Development

This repo uses npm workspaces.

```bash
npm install
npm run typecheck
npm run build
```

## First Example

The first example atlas lives at:

```txt
examples/vouchme/context-atlas
```

VouchMe is used as the first customer-shaped implementation target, but ContextAtlas is intended to remain generic and reusable across product repos.
