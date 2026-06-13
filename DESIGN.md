# ContextAtlas Design Brief

Use this file as the primary design prompt for Claude Design, Open Design, Stitch, or any other design-generation tool.

## Product Summary

ContextAtlas is a repo-native context mapping system for active products.

It maps visible user journey moments to stable coordinates, then connects those coordinates downward into routes, components, workflow states, data, integrations, tests, and AI/developer context.

The core product is not a generic dashboard.

The first product surface is the `L0` Journey Header: a compact, record-aware orientation strip embedded in the product itself.

The deeper product surface is the `L1-L5` Atlas Workbench: an admin, engineering, support, and AI-agent layer that reveals why a coordinate is correct and what code/data/processes connect to it.

## Source Hierarchy

Design decisions should follow this order:

1. `examples/ContextAtlas_Foundational_Conversation.docx`
2. `examples/Layer_zero_top_banner.png`
3. `examples/Layers_concept.png`
4. `examples/User_Jounrey_Example.png`
5. `examples/Candidate_Journey_VouchMe_Example.png`
6. `examples/Reference_Journey_VouchMe_Example.png`
7. `examples/Recruiter_Journey_VOuchMe_Example.png`
8. `examples/vouchme/context-atlas/*.yaml`
9. `docs/center-of-gravity.md`
10. `docs/product-vision.md`
11. `docs/ux-atlas-blinds.md`
12. `design-references/stitch_contextatlas_design_system.zip`
13. `design-references/aicovenants-blinds-reference.md`
14. `design-references/*.png`

The Stitch design system is a secondary reference. It should govern what to avoid as much as what to keep.

## Center Of Gravity

Design from the visible journey moment outward.

The key `L0` question is:

```txt
In this specific record, on this specific page, wearing this specific role, where am I?
```

For VouchMe, the same person might open:

- an old vouch they requested as a candidate
- a new reference request they need to answer as a referee
- an access request they made as a recruiter

The ContextAtlas surface must orient them per record, per route, per role, and per status. It must not assume one global account role.

## Product Surfaces

### Surface 1: L0 Journey Header

This is the product wedge.

It is a compact header or banner that sits inside an active product page. It is not a modal, not a dashboard, and not a decorative graph.

It should show:

- role badge: Candidate, Referee, Recruiter, Admin, or project-specific role
- current journey stage
- current status
- "You are here" marker
- nearby steps in a 4-6 step process strip
- next action
- current coordinate or project alias
- copyable Atlas Pin / Waypoint action

Example content:

```txt
Role: Candidate
You are here: Vouch completed
Status: Ready to share
Next: Share with an employer
Coordinate: CA:KZA:VOUCHME:N00050
Alias: VM.J.CAN.050
```

The header must be beautiful, calm, legible, and useful to a non-technical user.

### Surface 2: L0 Expanded Journey Map

This is the expanded public/product map for a journey.

It can open from the Journey Header or a top blind. It should show the public-facing journey only:

- visible journey steps
- the current step
- actor/role context
- stage/status
- previous and next likely steps
- safe customer-facing explanation
- copy/share action

It should not expose private implementation details by default.

### Surface 3: Atlas Pin / Waypoint

This is a tiny branded marker that can be copied from a page.

It should not require the user to understand coordinates first.

Copied context should include:

- coordinate
- alias if available
- route or route pattern
- role context
- journey stage
- visible status
- label
- suggested narrow scope for AI/developer work

Example copied packet:

```txt
ContextAtlas Pin
Coordinate: CA:KZA:VOUCHME:N00050
Alias: VM.J.CAN.050
Role: Candidate
Journey stage: Completed vouch / ready to share
Route: /candidate/vouch-id
Status: completed
Suggested scope: VouchIdCard, SharingControls, candidate-vouch-id.spec.ts
```

### Surface 4: L1-L5 Workbench

This is the deeper layer for admins, product operators, support, engineers, QA, and AI coding agents.

It can use the bottom blind / workbench pattern.

It should show:

- `L1 Page`: routes, pages, layouts, UI components
- `L2 Workflow`: statuses, events, permissions, notifications, business logic
- `L3 Data`: tables, records, auth, storage, policies, data models
- `L4 Platform`: APIs, webhooks, infrastructure, deployments, external services
- `L5 AI/Ops`: tests, UAT notes, prompts, runbooks, context exports

The workbench answers:

- Why does ContextAtlas think this coordinate is correct?
- What evidence supports this classification?
- What files, routes, records, services, and tests connect to it?
- What should Claude, Codex, or a developer load first?
- When should the user widen context?

### Surface 5: Shareable Layer Exports

Every map should be shareable by audience.

Required export modes:

- Layer 0 only: marketing, founder, support, customer-safe journey explanation
- Layer 1 only: product/page/route planning
- Layer 2 only: workflow/status/notification review
- Layer 3 only: data/storage/auth architecture
- Layer 4 only: integrations/platform architecture
- Layer 5 only: AI/dev/test/ops context
- full stacked view: all layers connected by coordinates

## Layer Model

Use exactly these layer meanings:

| Layer | Name | Audience | Meaning |
| --- | --- | --- | --- |
| L0 | Journey / Surface | Public and product users | Human-readable journey meaning, role, stage, status, next action |
| L1 | Page / Interface | Product and app teams | Routes, pages, forms, layouts, UI components |
| L2 | Workflow | Product ops and support | States, events, permissions, notifications, business logic |
| L3 | Data | Engineering and data teams | Tables, records, auth, storage, policies, data models |
| L4 | Platform / Integrations | Engineering and ops | APIs, webhooks, Vercel, Supabase, Resend, Stripe, Gelato, deployment |
| L5 | AI / Delivery / Ops | AI agents, QA, delivery | Tests, UAT, prompts, runbooks, Claude/Codex context, context exports |

Do not rename these layers to:

- telemetry
- neural
- temporal
- quantum
- schema
- nodes
- deploy
- core

Those labels caused the first design attempt to drift.

## Coordinate Model

Stable ContextAtlas coordinates use:

```txt
CA:{ORG}:{PROPERTY}:{NODE}
```

Example:

```txt
CA:KZA:VOUCHME:N00050
```

Project aliases may be shown alongside the coordinate:

```txt
VM.J.CAN.050
```

The coordinate is the neutral address. The alias is the readable project journey marker.

Meaning lives beside the coordinate:

- role
- journey stage
- status
- label
- route
- component
- evidence
- confidence
- relationships
- suggested AI/developer scope

## Context Inversion

ContextAtlas is built around context inversion.

Instead of asking Claude or Codex to search the whole codebase, the user starts from the visible product moment.

Flow:

```txt
Visible page / URL / Atlas Pin
-> resolve coordinate
-> load mapped L0-L5 context
-> work narrowly
-> widen only if mapped context is insufficient
```

This must be visible in the design. The design should make it obvious that a user can copy the current coordinate or context packet and give it to an AI assistant, support ticket, PR, or issue.

## Visual Direction

ContextAtlas should feel like ancient mapmaking for the AI age.

Use:

- precise journey strips
- cartographic arcs
- coordinate labels
- topological route lines
- subtle network spheres
- drafting-grid restraint
- compact status chips
- dark glass surfaces
- thin borders
- elegant pull handles
- calm luminous accents
- readable typography

The product should feel clear, premium, and operational.

It should not feel like a sci-fi control room, crypto brand, generic observability console, or network telemetry dashboard.

## Logo Direction

Use the connected `cA` network sphere direction from:

- `design-references/ChatGPT Image Jun 13, 2026, 10_03_39 AM (1).png`
- `design-references/ChatGPT Image Jun 13, 2026, 10_03_39 AM (2).png`
- `design-references/CONTEXT.png`
- `design-references/images/contextatlas-reference-logo-network-sphere.png`

Rules:

- lowercase `c` and uppercase `A` must remain connected
- the `A` can contain mathematical compass geometry
- the compass geometry must be native to the `A`, not a separate icon
- the sphere can be a network, coordinate mesh, or cartographic frame
- avoid detached compass icons
- avoid generic globe icons
- avoid map pin logos

The brass/gold version has useful cartographic warmth. The blue/violet version has useful luminous AI-era energy. The final identity can combine dark graphite, brass cartography, and restrained signal cyan/violet accents.

## Colour Palette

Primary dark mode:

- Void black: `#05060A`
- Deep space charcoal: `#080A12`
- Obsidian navy: `#101827`
- Dark slate: `#1A2130`

Cartographic accent:

- Brass gold: `#C89B3C`
- Antique gold: `#A8792A`
- Soft parchment: `#F3EAD8`
- Warm ivory: `#FAF6EC`

Signal accent:

- Signal cyan: `#22D3EE`
- Electric indigo: `#3548FF`
- Atlas violet: `#7B3FF2`
- Coordinate magenta: `#D946EF`

Neutral UI:

- Graphite: `#2A2F3A`
- Fine line grey: `#445064`
- Mist grey: `#A7B0C0`
- White: `#FFFFFF`

Use cyan/violet sparingly for active coordinates, copied pins, selected nodes, and live evidence. Do not flood the UI with neon.

## Typography

Use a precise modern sans-serif for UI:

- Inter
- Geist
- Manrope
- IBM Plex Sans

Use monospace sparingly for coordinates, aliases, short evidence labels, and copied context:

- JetBrains Mono
- IBM Plex Mono
- Geist Mono

Do not make the whole product feel like a terminal. The user-facing L0 header should be readable and human, not code-first.

Optional cartographic/editorial accent fonts may appear only in brand or ceremonial moments:

- Cormorant Garamond
- Literata
- Cinzel

## What To Cherry Pick From Stitch

Keep these elements from the Stitch attempt:

- dark glass/frosted overlay feel
- opacity control idea
- top and bottom pull handles
- compact HUD chrome when used carefully
- precise coordinate labels
- small status chips
- active-node glow, used sparingly
- network sphere logo direction
- thin grid and drafting-line discipline
- right-side inspector pattern for dense coordinate details

Improve these elements:

- make `L0` a real journey header, not an empty atmospheric map
- use actual journey/status/route/evidence content from examples
- make every layer label match the actual layer model
- keep the live product or journey surface visible
- reduce neon and sci-fi language

## What To Avoid From Stitch

Do not repeat these first-attempt mistakes:

- do not call the product a telemetry suite
- do not use fake deploy/network/infrastructure nouns as main content
- do not use labels like `L3 Neural`, `L4 Temporal`, or `L5 Quantum`
- do not make `L0` a mostly empty world map or glowing reticle
- do not show latency, throughput, packet streams, or regional nodes unless the mapped product actually needs them
- do not make the UI look like a server control panel
- do not make the main CTA "Deploy nodes", "Optimize synapses", "Stabilize field", or similar
- do not hide the actual user journey behind abstract diagrams
- do not replace the Journey Header with a standalone dashboard
- do not expose L2-L5 implementation detail in the public L0 view

## What To Borrow From aiCOVENANTS

Borrow only the interaction pattern from:

- `design-references/aicovenants-blinds-reference.md`
- `design-references/images/aicovenants-live-bookmark-states-02.png`
- `design-references/images/aicovenants-live-bookmark-states-03.png`

Useful ideas:

- a small edge-attached marker
- progressive reveal
- collapsed / partial / expanded states
- host page remains visible
- the component reveals structure without taking over the page
- keyboard and pointer control of reveal states

Do not borrow:

- aiCOVENANTS branding
- covenant language
- parchment-heavy page identity
- serif-heavy editorial tone for the main app UI
- their colors, logo, or conceptual vocabulary

For ContextAtlas, translate this into Atlas Pins, Waypoints, Journey Headers, and Atlas Blinds.

## Required Screens For Second Design Attempt

Prioritize these in order.

### 1. Embedded L0 Journey Header

Show the header at the top of an active product page.

Use VouchMe-like sample content:

```txt
Candidate -> Request sent -> Reference responds -> Vouch completed -> Share
You are here: Vouch completed
Status: Ready to share
Next: Share with an employer
Alias: VM.J.CAN.050
Coordinate: CA:KZA:VOUCHME:N00050
```

This is the most important screen.

### 2. Dashboard Cards With Record-Aware Context

Show a neutral dashboard with cards that open different role contexts:

- Candidate / Completed / Share this vouch
- Referee / In progress / Finish response
- Recruiter / Waiting / Access request pending

The design should prove that role is record-specific, not account-global.

### 3. L0 Expanded Journey Map

Show the public journey map expanded from the header.

It should be simple, beautiful, screenshot-ready, and non-technical.

### 4. Atlas Pin / Waypoint Copy State

Show a tiny marker and its copied context packet.

It should be obvious that the user can paste this into Claude, Codex, ChatGPT, GitHub, Linear, or support.

### 5. Bottom L1-L5 Workbench

Show the deeper workbench for the same coordinate.

Use real layer content:

- L1 route: `/candidate/vouch-id`
- L1 component: `VouchIdCard`, `SharingControls`
- L2 status: `vouch_id_issued`, `reusable_signal_ready`
- L2 notification: `candidate_vouch_id_ready`
- L3 tables: `candidates`, `vouch_ids`, `vouch_responses`
- L4 services: `supabase-database`, `resend-email`
- L5 tests: `candidate-vouch-id.spec.ts`

### 6. Layer Export / Share Card

Show export options:

- L0 only
- L1 only
- L2 only
- L3 only
- L4 only
- L5 only
- full stacked view
- Markdown
- Mermaid
- image
- context packet

### 7. Coordinate Inspector

Show a right-side inspector for a selected coordinate.

Include:

- coordinate
- alias
- label
- route
- role
- stage
- status
- confidence
- evidence
- relationships
- suggested AI scope
- widen-if rules

### 8. Review Queue

Show uncertain, stale, split, merge, and needs-review mappings.

This can be more opaque and workbench-like.

## Example Content To Use

Use real VouchMe-shaped content from the examples:

```txt
Candidate creates or shares a vouch request
Referee receives invitation
Referee answers structured questions
Vouch is completed
Candidate receives reusable Vouch ID
Recruiter requests access
Referee approves or declines
Recruiter views trusted signal
```

Use real statuses:

```txt
draft
request_created
invitation_sent
awaiting_referee
response_started
response_in_progress
completed
vouch_id_issued
access_requested
access_approved
access_declined
signal_viewed
revoked
expired
```

Use real services:

```txt
Supabase
Resend
Vercel
Stripe
Gelato
Claude
Codex
Playwright
```

Use real routes:

```txt
/candidate/vouches/new
/candidate/vouches/:id
/invite/:token
/respond/:token
/candidate/vouch-id
/recruiter/request-access
/access-review/:token
/trusted-signal/:accessId
```

## Interaction States

Design these states:

- collapsed Journey Header
- expanded Journey Header
- Atlas Pin hover/focus
- copied Atlas Pin
- top L0 blind peek
- top L0 blind half
- bottom workbench peek
- bottom workbench half
- full review mode
- transparent/frosted/opaque opacity settings

Snap points:

- collapsed
- peek
- half
- full

The opacity control must be keyboard accessible.

## Accessibility

Dark mode must maintain strong contrast.

Fine network lines must never be the only way to understand meaning.

Use:

- text labels
- status chips
- selected states
- focus states
- readable contrast
- clear keyboard paths
- copy buttons with accessible labels
- stable dimensions so controls do not shift

## Tone Of Voice

Use clear, precise product language.

Preferred:

- You are here
- Current role
- Current status
- Next action
- Copy Atlas Pin
- Copy context
- Resolve URL
- View evidence
- Share layer
- Map the context before the model guesses
- Give AI agents coordinates, not a haystack
- From URL to user journey to system map

Avoid:

- revolutionary
- game-changing
- 10x
- AI magic
- unlock your potential
- neural
- quantum
- telemetry suite
- deploy nodes
- optimize synapses

## Final Design Goal

The second design attempt should make this immediately obvious:

ContextAtlas starts from the user's visible journey moment, gives that moment a stable coordinate, and lets different audiences reveal only the depth they need.

Public user:

```txt
You are here. This is what happened. This is what to do next.
```

Support/product:

```txt
This record is at this journey stage, with this status and evidence.
```

Engineer/AI agent:

```txt
Start with this coordinate. Load these routes, components, statuses, tables, services, and tests. Widen only if needed.
```

