# Coordinate Algorithm

ContextAtlas needs an elegant coordinate algorithm, not an ever-growing set of special cases.

This document records the current design problem. The final algorithm is not known yet.

## Goal

ContextAtlas exists to make software teams faster. It should compress complex product, code, data, test, and AI context into stable coordinates that can expand only when needed.

The coordinate system must be:

- compact enough for humans to copy and recognize
- precise enough for agents to retrieve safe context
- role-aware without becoming role-sprawled
- stable across UI changes
- deep enough to trace from surface journey to code and lower operational layers

## Working Coordinate Shape

Current examples use:

```txt
VM.J.CAN.020
```

Meaning:

- `VM`: product or atlas prefix
- `J`: journey namespace
- `CAN`: role or actor lens
- `020`: ordered waypoint

This is useful, but it is not the full algorithm. It does not yet answer every question about variants, shared workflow events, nested surfaces, generated components, integrations, or lower-level code coordinates.

## Design Principle

A coordinate should identify a role-aware user-facing location, not merely a workflow event.

Workflow events can affect many actors. For example, "invitation sent" can appear as:

- a candidate tracking that the invitation is pending
- a referee opening an invitation link
- an admin debugging delivery
- an email notification event

Those may share underlying data and statuses, but they should not automatically share one surface coordinate. ContextAtlas should let the algorithm connect them through lower layers instead of conflating them at `L0`.

## Efficiency Tension

Too few coordinates creates ambiguity. One coordinate starts carrying multiple roles, routes, labels, tests, and visibility rules.

Too many coordinates creates noise. The atlas becomes a manual inventory instead of an efficient map.

The algorithm has to find the middle:

```txt
one coordinate per distinct role-aware surface meaning
shared lower-layer links for data, status, services, tests, and AI context
```

## Expansion Rule

Start compact. Split only when a material axis changes.

Material axes include:

- role
- public meaning
- route ownership
- permission or visibility
- workflow action
- data access boundary
- test or compliance responsibility

If two surfaces differ only by copy, layout, or visual treatment, they may remain one coordinate. If they differ by role, permission, or action intent, they probably need distinct coordinates.

## Open Questions

- How should ContextAtlas represent shared workflow events that span many coordinates?
- Should non-user surfaces use a separate namespace from `J`?
- How should generated code, database functions, policies, prompts, and CI checks be addressed below `L5`?
- How should coordinates survive route rewrites and component refactors?
- How should the scanner propose splits without creating noisy coordinate churn?

## Current Working Rule

Until the algorithm matures, use this rule:

```txt
Coordinate = product prefix + journey namespace + actor lens + ordered waypoint
```

Split coordinates when a user-facing surface changes actor lens or permission meaning, even if the underlying workflow event is shared.
