# ContextAtlas Sprint Report - 2026-06-14

## Summary

This sprint pulled ContextAtlas back toward its center of gravity: a browser-first wayfinding product that helps a user understand where they are, what journey they are on, and how much deeper context is available beneath the visible page.

The prototype now demonstrates the core ContextAtlas interaction model on the VouchMe example:

- `L0` is a lightweight journey HUD over a live product page.
- `L1-L5` are revealed through a bottom workbench.
- The workbench is now a progressive layered map, not a row of cards.
- Evidence nodes are connected by visual paths, making the deeper context feel like a navigable atlas rather than static metadata.

The current implementation is roughly 80% of the desired product direction. Remaining work is mostly interaction polish, product-tier affordances, and deeper grounding of the map generation model.

## What We Implemented

### L0 Journey Header

The header was refined from a generic navigation strip into a ContextAtlas HUD.

Implemented:

- The visible header now focuses on the journey only:
  `Candidate > Request sent > Reference responds > Vouch completed > Share`
- The cA logo sits on the left.
- The canonical coordinate `CA:KZA:VOUCHME:N00050` is hidden by default.
- Hovering or focusing the cA logo reveals the coordinate in a fast slide-out panel.
- The coordinate reveal includes a copy affordance.
- The active journey pill owns the locator behavior.
- The active `Vouch completed` pill includes:
  - check icon on the left
  - red pulsing locator icon on the right
  - copy icon swap on hover/focus
  - Atlas Pin packet reveal beneath the active pill
- The Atlas Pin packet now drops from the current location rather than appearing as a full-width card.
- The Candidate role icon returned beside `Candidate`, without the old pill border.
- The opacity control moved to the far-right edge as an unlabeled vertical control.
- The logo treatment was made visually transparent/blended rather than boxed.

Files:

- `examples/vouchme/prototype/app.js`
- `examples/vouchme/prototype/atlas.css`
- `packages/react/src/JourneyHeader.tsx`

### L1-L5 Workbench

The footer was changed from five horizontal cards into a progressive layered reveal.

Implemented:

- The bottom workbench starts collapsed.
- Each pull/click reveals one more layer:
  - `L1 Page / Interface`
  - `L2 Workflow`
  - `L3 Data`
  - `L4 Platform / Integrations`
  - `L5 AI / Delivery / DevOps`
- Hidden layers remain compressed.
- Revealed layers become swimlanes.
- Swimlane labels live on the left.
- Evidence nodes render on the right.
- Users can stop at a layer rather than opening the full stack.
- React `AtlasWorkbench` now supports the same progressive depth model.

Files:

- `examples/vouchme/prototype/app.js`
- `examples/vouchme/prototype/atlas.css`
- `examples/vouchme/prototype/data.js`
- `packages/react/src/AtlasWorkbench.tsx`

### Connector Edges

The layered map now includes connector paths between evidence nodes.

Implemented:

- Explicit `workbenchEdges` data for the VouchMe sample.
- Stable `data-node-id` values for rendered evidence nodes.
- SVG overlay for connector paths.
- Curved connector paths with arrowheads.
- Connectors only render when both endpoint layers are revealed.
- Connector trace-in animation.
- React `AtlasWorkbench` now accepts optional `edges`.
- Exported `WorkbenchEdge` and `WorkbenchNodeRef` types.

Files:

- `examples/vouchme/prototype/data.js`
- `examples/vouchme/prototype/app.js`
- `examples/vouchme/prototype/atlas.css`
- `packages/react/src/AtlasWorkbench.tsx`
- `packages/react/src/index.ts`

### Prototype Stability

The prototype remains local-first and inspectable.

Verified repeatedly with:

- `npm run typecheck`
- `npm run build`
- local Chrome render checks
- staged screenshots for collapsed, partial-depth, and full-depth workbench states

Latest relevant commits:

- `947af7e` Refine prototype journey header
- `3eeed00` Move Atlas Pin into active journey pill
- `b50da8f` Render workbench as progressive swimlanes
- `4dacb2a` Draw workbench connector edges

## Product Decisions

### ContextAtlas Starts In The Browser

The product journey should begin as a browser extension, not as a repo analysis tool.

The browser extension is the first moment of value:

- it sees the current page
- infers the visible journey/context
- gives the user a quiet HUD
- lets the user reveal progressively deeper map layers

The repo/app-backed experience comes later, when the user wants verified deeper terrain.

### Product Language

The language should stay in the family of navigation and wayfinding.

Preferred terms:

- map
- route
- path
- waypoint
- coordinate
- layer
- reveal
- pull
- trace
- record
- journey
- terrain
- wayfinder
- discover
- navigate

Avoid product language that sounds like generic analytics, dashboards, SaaS admin, or code-search tooling.

### Product Tiers

The tier model was clarified.

#### Free: Browser Wayfinder

No account required.

Includes:

- `L0` HUD
- current page/context position
- coordinate reveal/copy
- Atlas Pin reveal/copy
- pull-down `L1-L2` map for the current observed page/context
- browser-observed/inferred mapping

Free value should be real. It should let a user experience ContextAtlas immediately.

#### Paid Unlock 1: Journey Recorder

Account required.

Likely one-time unlock or per-map transaction, not SaaS.

This is the macro-recorder product.

Includes:

- user presses Record
- ContextAtlas listens only to the pages/actions the user visits
- it maps that specific journey, not the whole site
- user stops recording
- user can reveal, trim, save, replay, or export the route
- `L0-L2` become route-specific rather than just current-page inferred

Important distinction:

- ContextAtlas is not crawling the whole site.
- It records the user journey that was actually navigated.
- Standalone pages such as terms, privacy, or about are only mapped if the user visits them during the recording.

#### Paid Unlock 2: Deep Atlas

Account plus app/download required.

Likely one-time unlock or per-project transaction.

Includes:

- `L3 Data`
- `L4 Platform / Integrations`
- `L5 AI / Delivery / DevOps`
- repo/local/project verification
- table/service/test connections
- conversion from observed browser map to verified implementation atlas

This is where ContextAtlas moves from inferred wayfinding into implementation truth.

### Browser-Only Versus Verified Maps

Browser-only can infer:

- current route
- visible page state
- journey labels
- buttons/actions
- headings
- visible statuses
- some workflow meaning

Browser-only cannot reliably verify:

- database tables
- services
- integrations
- tests
- repo ownership
- hidden workflows
- implementation dependencies

Decision:

- browser maps should be marked as observed/inferred
- app/repo-backed maps should be marked as verified

### Journey Scope

The full system journey and the active mapped slice are different concepts.

Example full journey:

`Candidate > Request sent > Reference responds > Vouch completed > Share`

Possible active slice:

`Vouch completed > Share`

Decision:

- the product should support a focus slice
- recording should reflect the actual path taken
- users should be able to trim recorded journeys
- the deeper map should know whether it is representing the full journey or a focused slice

## Current Product Shape

The prototype currently demonstrates:

- Free browser-style `L0` wayfinding
- an inferred map underneath the current page
- progressive layer reveal
- evidence-node connectors
- an Atlas Pin attached to the current location

It does not yet fully demonstrate:

- locked/unlocked product states
- account/sign-up affordances
- Journey Recorder controls
- recorded session timeline
- route trimming
- verified versus inferred badges
- desktop/app unlock for `L3-L5`
- real browser extension packaging

## Next Work

### 1. Add Product Tier Affordances

Add locked/unlocked states to the prototype.

Proposed behavior:

- Free users can access `L0-L2`.
- `L3-L5` are visible as locked compressed layers.
- Pulling a locked layer reveals a small, unobtrusive unlock affordance.
- Unlock language should be navigational:
  - `Unlock deeper terrain`
  - `Verify this route`
  - `Open Deep Atlas`
  - `Download mapper app`

Avoid large marketing modals inside the workbench.

### 2. Add Journey Recorder Concept

Prototype the Paid Unlock 1 interaction.

Controls:

- Record route
- Pause
- Stop
- Reveal route
- Trim route
- Save waypoint/map

Behavior:

- recording creates a route from visited pages/actions
- recorded route can differ from full system journey
- map output is marked observed/inferred

### 3. Support Focus Slices

Add a way to display:

- full system journey
- recorded route
- focused slice

For the current VouchMe example, test with:

`Vouch completed > Share`

instead of the full:

`Candidate > Request sent > Reference responds > Vouch completed > Share`

### 4. Polish Workbench Connectors

The current connector implementation works, but needs design polish.

Next refinements:

- improve routing to reduce line overlap
- add hover highlighting from node to connected nodes
- add edge labels only when useful
- make connector density readable at depth 5
- support responsive/mobile connector behavior

### 5. Clarify Inferred Versus Verified

Add visual language for:

- browser-observed
- inferred
- verified
- locked

This matters because Free and Journey Recorder tiers are browser-led, while Deep Atlas is repo/app verified.

### 6. Design Extension-Specific UX

The current prototype is a web page simulation. Next, design the actual extension shell:

- small HUD
- collapsed browser overlay
- record button
- route tray
- layer pull-down
- account/unlock links
- minimal landing-page handoff

## Open Questions

- Should Free expose all of `L0-L2` for one page, or cap the number of mapped nodes?
- Should Paid Unlock 1 be per-recorded-map, per-domain, or per-user pack?
- What is the minimum viable account model for Journey Recorder?
- Does Deep Atlas require a desktop app, CLI, local companion app, or browser-native repo connector?
- How should Atlas Pins distinguish current location from recorded route from verified coordinate?
- Should the active journey header default to full journey or focused slice?

## Working Definition

ContextAtlas is becoming:

> A browser-first wayfinding tool for digital products. It starts by showing where you are, then lets you reveal the layers beneath that moment. Free users can orient themselves. Paid users can record their own routes. Deep Atlas users can verify the terrain against code, data, services, and tests.

