# ContextAtlas Product Vision

**Tagline:** Map the user journey. Trace the code beneath it.

ContextAtlas is a repo-native journey and architecture mapping toolkit for AI-assisted software teams. It connects product experiences to the pages, components, statuses, data, integrations, tests, and AI development context that support them.

## Context Inversion

Most software work starts from the implementation layer: files, routes, database tables, tests, and tickets. Humans and AI agents then have to infer which user journey those implementation details belong to.

ContextAtlas inverts that lookup. A team starts with a user-facing coordinate, such as `VM.J.CAN.040`, and follows it downward into the code and operational context beneath it.

The result is a shared map that can be read by product people, designers, engineers, testers, admins, and AI coding agents at the right depth for their role.

## Layer Model

ContextAtlas uses six layers:

- `L0` Surface layer: user-facing journey, public copy, and page meaning.
- `L1` Page layer: routes, pages, components, and layouts.
- `L2` Workflow layer: statuses, events, notifications, and access states.
- `L3` Data layer: database tables, storage, auth, records, and policies.
- `L4` Integration layer: external services, webhooks, APIs, and platform infrastructure.
- `L5` AI and operations layer: tests, prompts, context packs, UAT notes, and agent instructions.

## Shareable Diagrams

Each layer can be rendered as a shareable diagram. Public stakeholders can see `L0` without exposing implementation details. Admins, engineers, and agents can inspect deeper layers when their work requires it.

## Atlas Pins and Waypoints

Atlas Pins are copyable page markers attached to live app surfaces. A header, dashboard card, modal, or admin view can expose a coordinate that identifies the current journey location.

Waypoints extend that idea across a full journey. They help answer questions like:

- Where is the user right now?
- Which role is this view serving?
- Which records, services, and tests protect this path?
- What is the safe starting scope for an AI coding agent?

## First Customer

VouchMe is the first customer-shaped implementation. Its role-aware journeys make it a strong example for ContextAtlas because the same historical record may be viewed by candidates, referees, recruiters, admins, and developers at different depths.

ContextAtlas must stay generic and reusable while using VouchMe to prove the first workflows.
