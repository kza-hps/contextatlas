# ContextAtlas - VouchMe Prototype

A working, local, inspectable prototype of the ContextAtlas product wedge:

- the record-aware **L0 Journey Header** at the top of a live VouchMe page,
- a copyable **Atlas Pin / Waypoint**,
- and an expandable **L1-L5 Workbench** as a bottom blind.

It is built around one sample coordinate:

```txt
Coordinate:   CA:KZA:VOUCHME:N00050
Alias:        VM.J.CAN.050
Role:         Candidate
Journey:      Candidate -> Request sent -> Reference responds -> Vouch completed -> Share
You are here: Vouch completed
Status:       Ready to share
Next:         Share with an employer
Route:        /candidate/vouch-id
```

## What you should understand at a glance

> I am a **Candidate**, this record is at **Vouch completed**, it is **ready to share**,
> and I can **copy the Atlas Pin** or **open deeper context**.

## How it is wired

The prototype is intentionally static and local-first so it is easy to validate.
It does not require React from a CDN, browser-side Babel, external fonts, or the
compiled `dist/` output.

The reusable React component versions live in
[`packages/react`](../../../packages/react/src): `JourneyHeader`, `AtlasWorkbench`,
`CopyAtlasPinButton`, and the `buildAtlasPin` packet helper. This static demo mirrors
those components visually so the prototype can run anywhere with a local HTTP server.

| File | Role |
| --- | --- |
| `index.html` | Page shell |
| `app.js` | Static local renderer for the prototype interactions |
| `data.js` | Static sample data from `examples/vouchme/context-atlas/*.yaml` |
| `atlas.css` | Cartographic dark theme for the `ca-` component class hooks |

The L1-L5 evidence (routes, components, statuses, notifications, tables, services,
tests) is the real mapped evidence for `CA:KZA:VOUCHME:N00050`.

## Run it

Serve the repo root over HTTP. ES module imports do not reliably work from `file://`.

```bash
# from the repo root
npx serve .        # or: python -m http.server 8000
```

Then open:

```txt
http://localhost:3000/examples/vouchme/prototype/      (npx serve)
http://localhost:8000/examples/vouchme/prototype/      (python http.server)
```

## States to try

- **Active step** - "Vouch completed" is highlighted as a status chip.
- **Copied pin** - click *Copy Atlas Pin*; the button confirms and the packet appears.
- **Hover / focus** - the pin button, share button, and workbench handle all respond.
- **Expanded / collapsed** - click the *L1-L5 Workbench* handle to pull the blind up.
- **Responsive** - narrow the window; the header stacks and the workbench reflows.
