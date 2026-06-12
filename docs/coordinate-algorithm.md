# Coordinate Algorithm

ContextAtlas needs a stable coordinate algorithm, not an ever-growing set of special cases.

## Coordinate Formula

Use this neutral formula:

```txt
CA:{ORG}:{PROPERTY}:{NODE}
```

Example:

```txt
CA:KZA:VOUCHME:N00042
```

Meaning:

- `CA`: ContextAtlas coordinate.
- `ORG`: owning organisation short code.
- `PROPERTY`: site, app, repo, or property short code.
- `NODE`: stable neutral node ID.

The coordinate itself should not describe the actor, journey, page type, status, or workflow. Meaning belongs in metadata.

## Metadata Carries Meaning

An atlas node can carry aliases, labels, classifications, evidence, and graph relationships:

```yaml
coordinate: CA:KZA:VOUCHME:N00042
aliases:
  - VM.J.CAN.040
  - Candidate completed vouch
label: Candidate receives completed Vouch ID
classification:
  layer: L0
  actor: candidate
  surface: page
  intent: review-share
  state: completed
evidence:
  routes:
    - /vouches/[id]?view=candidate
  headings:
    - Your vouch is complete
  statuses:
    - completed
```

Aliases can be human-friendly, customer-specific, or legacy references. They are not the coordinate.

## Classification Axes

The stable axes are questions ContextAtlas asks, not fixed lists of possible answers:

- Property
- Surface
- Actor
- Intent
- State
- Layer
- Dependency
- Edge

Classifier outputs should be evidence-backed and confidence-scored where possible. Unknowns should be queued for human or AI review rather than forced into a stale vocabulary.

## Coordinate Assignment

Coordinates should be assigned or reused after topology discovery and signal extraction:

1. Discover addressable and dependent nodes.
2. Compare evidence against existing coordinates.
3. Reuse a coordinate when the node is the same stable thing even if route, copy, or implementation details changed.
4. Assign a new node ID when evidence shows a distinct surface, dependency, workflow, data object, integration, test context, or operations context.
5. Preserve project aliases when useful, but keep them separate from the coordinate.

## Stability Rule

A coordinate should survive copy edits, route rewrites, component refactors, and terminology changes when the underlying node is still the same mapped thing.

Split a coordinate when the topology or evidence shows a materially different node, such as a different actor context, permission boundary, intent, state transition, data boundary, integration, or operational responsibility.

## Discovery Before Vocabulary

ContextAtlas should discover first and name later:

```txt
Repository or site
|
v
Discover routes, pages, APIs, components, tests, docs, data files, integrations
|
v
Extract signals from paths, names, imports, headings, metadata, forms, calls, statuses, events
|
v
Build a topology graph of nodes and edges
|
v
Classify each node by evidence, not by fixed lists
|
v
Assign or reuse coordinates
|
v
Generate maps, diagrams, context packs, and shareable layer views
|
v
Ask humans or AI agents to review uncertain classifications
```
