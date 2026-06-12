# ContextAtlas UX: Atlas Blinds and Topology HUD

## Summary

ContextAtlas should feel like a transparent semantic debug layer over a live or local app. The app remains the main surface. ContextAtlas appears as a thin Topology HUD with small pull tabs, Atlas Pins, coordinate badges, and draggable Atlas Blinds that reveal product meaning and implementation evidence only when needed.

The core interaction model:

- Top blind pulled down = `L0` product and user-journey meaning.
- Bottom blind pulled up = `L1`-`L5` implementation topology, evidence, routes, components, data, services, tests, and operations.
- Middle remains visible = the actual app or site being mapped.

## Core Metaphor

ContextAtlas should feel like:

- Stripe Workbench for precise operational context.
- Minecraft F3 for always-available debug truth.
- A git client or observability console for status, evidence, and review.
- A transparent browser overlay that sits on the product instead of replacing it.

It is a map room for software topology, projected directly over the product surface.

## Why Overlay-First

The product surface is the context. A separate dashboard can inspect dense topology, but the first experience should be the user seeing their actual app with ContextAtlas layered on top.

Overlay-first helps because:

- users keep their visual bearings in the product
- coordinates are attached to the thing they describe
- product meaning and implementation evidence can be revealed progressively
- screenshots become useful AI context
- support, product, design, engineering, and AI agents can refer to the same coordinate

Context packs, JSON, Markdown, and MCP exports remain useful later. They are secondary outputs from the mapped overlay, not the center of the UX.

## Core Components

- `AtlasPin`: small embedded marker for the current mapped surface.
- `CoordinateBadge`: compact coordinate, route, layer, label, and confidence display.
- `Top L0 Blind`: draggable top panel for product/user-journey meaning.
- `Bottom L1-L5 Blind`: draggable bottom workbench for implementation evidence.
- `LayerControl`: layer visibility control for `L0` through `L5`.
- `EvidenceStrip`: compact trail showing why a classification exists.
- `CoordinateInspector`: focused panel for coordinate details, copy actions, aliases, evidence, and relationships.
- `ReviewQueueOverlay`: overlay/workbench mode for uncertain, stale, split, merge, and needs-review mappings.

## UX Modes

### Collapsed Mode

- Website or app is fully visible.
- Only tiny Atlas pull tabs remain visible at the top and bottom.
- User can continue normal product usage.
- Atlas Pin may remain as a subtle marker on the current surface.

### Peek Mode

- Thin transparent coordinate overlay appears.
- Shows current coordinate, route, layer, label, and confidence.
- Keeps the product almost fully visible.
- Useful for quick orientation and copying a coordinate.

### Inspect Mode

- Top `L0` blind is pulled down.
- Shows user-facing product meaning, journey position, actor, intent, state, and coordinate map.
- Keeps the active app surface visible below.

### Workbench Mode

- Bottom `L1`-`L5` blind is pulled up.
- Shows routes, components, workflow, data, integrations, tests, operational notes, and evidence.
- Supports layer controls and evidence inspection.

### Full Review Mode

- Blinds expand further or meet.
- Used for review queue, uncertain mappings, coordinate edits, split/merge decisions, and dense evidence inspection.
- More opaque than normal reading mode because the user is editing or reviewing.

## Top Blind: L0 Product Meaning

The top blind explains what the current surface means to users and product teams.

It should show:

- current coordinate
- label
- actor
- intent
- state
- journey position
- safe customer-facing explanation
- nearby `L0` coordinate relationships
- accepted, uncertain, stale, or needs-review status

The top blind answers: "What is this place in the product?"

## Bottom Blind: L1-L5 Implementation Evidence

The bottom blind explains how the current surface is implemented and operated.

It should show:

- `L1` routes, pages, layouts, and components
- `L2` workflow states, permissions, notifications, and business logic
- `L3` tables, records, auth, policies, storage, and data models
- `L4` external APIs, platform services, webhooks, deployment, and infrastructure
- `L5` tests, prompts, UAT notes, agent instructions, optional context exports, and runbooks
- evidence confidence and source references

The bottom blind answers: "Why does ContextAtlas think this is the right coordinate, and what does it connect to?"

## Atlas Pin Behaviour

The existing `AtlasPin` is a seed component, not the complete UX.

It should eventually support:

- copy coordinate
- copy route
- open in ContextAtlas
- show layer
- show confidence
- collapsed and expanded states
- glass/debug HUD styling
- accepted, uncertain, stale, and needs-review states

The pin should be subtle by default and should not interrupt normal product usage.

## Screenshot-Ready AI Context

The screen itself becomes the AI context.

A screenshot or copied coordinate from the overlay should give ChatGPT, Claude, Codex, Cursor, or a support ticket enough context to continue, provided discovery has already run and the repo has been mapped.

Useful visible context includes:

- coordinate
- route or URL
- layer
- label
- confidence
- actor, intent, and state
- top evidence sources
- review status
- adjacent coordinates

Copy actions should include:

- copy current coordinate
- copy route
- copy visible context
- copy evidence summary
- open resolve command

## Transparency and Readability Rules

- Transparent by default.
- Frosted when reading.
- More opaque when editing or reviewing.
- Never block the product surface unnecessarily.
- Always keep coordinates copyable.
- Always show why a classification exists.
- Always distinguish accepted, uncertain, stale, and needs-review states.
- Keep the middle product surface visible unless the user intentionally enters Full Review Mode.

## Keyboard and Handle Behaviour

Snap points:

- Collapsed
- Peek
- Half
- Full

Keyboard ideas:

- toggle overlay
- open resolve command
- copy current coordinate
- cycle layers
- collapse blinds
- expand top blind
- expand bottom blind

Exact shortcuts do not need to be finalized yet. The important behavior is that mouse, touch, and keyboard users can reveal, collapse, and copy topology context quickly.

## Relationship To Standalone Screens

Standalone screens still matter, but they are secondary. They should support dense inspection, bulk review, generated maps, and workflows that need more space than a HUD can provide.

Secondary/reference screens:

- Atlas Overview Dashboard
- Layered Topology Map
- Coordinate Detail Page
- Discovery Run Review
- Human Review Queue
- Resolve URL Flow
- Context Pack View
- Embedded Atlas Pin

These screens should consume the same atlas model as the overlay. They should not define a separate dashboard-first product metaphor.

## First Design Screens For Claude Design

Primary screens:

1. Embedded Live App With Collapsed Atlas Tabs
2. Top L0 Atlas Blind Pulled Down
3. Bottom L1-L5 Workbench Blind Pulled Up
4. Full Topology HUD With Both Blinds Active
5. Coordinate Inspector Overlay
6. Human Review Queue Overlay / Expanded Workbench
7. Resolve URL Command Overlay
8. Screenshot-Ready AI Context View

Secondary/reference screens:

1. Atlas Overview Dashboard
2. Layered Topology Map
3. Coordinate Detail Page
4. Discovery Run Review
5. Human Review Queue
6. Resolve URL Flow
7. Context Pack View
8. Embedded Atlas Pin
