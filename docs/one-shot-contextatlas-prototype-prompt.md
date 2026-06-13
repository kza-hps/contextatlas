# One-Shot Prompt: ContextAtlas Prototype

Use this prompt with Codex, Claude Code, v0, Open Design, or another capable design/coding agent.

```txt
You are working in the public GitHub repo:

https://github.com/kza-hps/contextatlas

Build the first usable ContextAtlas prototype from the repo material. Do not create another abstract design system or landing page.

Your goal:

Create a working, local, inspectable prototype of ContextAtlas centered on the record-aware L0 Journey Header, with a copyable Atlas Pin and an expandable L1-L5 workbench.

Start by reading these files in this order:

1. DESIGN.md
2. docs/center-of-gravity.md
3. docs/product-vision.md
4. docs/ux-atlas-blinds.md
5. examples/ContextAtlas_Foundational_Conversation.docx
6. examples/vouchme/context-atlas/atlas.config.json
7. examples/vouchme/context-atlas/atlas-nodes.yaml
8. examples/vouchme/context-atlas/atlas-routes.yaml
9. design-references/stitch-second-attempt-l0-header.png
10. design-references/stitch-second-attempt-l0-page.png
11. design-references/stitch_contextatlas_design_system_second_attempt.zip

The center of gravity:

ContextAtlas starts from this question:

"In this specific record, on this specific page, wearing this specific role, where am I?"

The first product surface is the L0 Journey Header. It is a compact, record-aware orientation strip embedded in the product page.

The deeper product surface is the L1-L5 Workbench. It reveals the page, workflow, data, platform, test, and AI/developer context behind the same coordinate.

Build the prototype around this sample coordinate:

Coordinate: CA:KZA:VOUCHME:N00050
Alias: VM.J.CAN.050
Role: Candidate
Journey stage: Vouch completed
Status: Ready to share
Next action: Share with an employer
Route: /candidate/vouch-id

Use this L0 journey strip:

Candidate -> Request sent -> Reference responds -> Vouch completed -> Share

Use real VouchMe-shaped evidence from the repo:

L1 Page:
- /candidate/vouch-id
- /candidate/profile
- VouchIdCard
- SharingControls

L2 Workflow:
- vouch_id_issued
- reusable_signal_ready
- candidate_vouch_id_ready

L3 Data:
- candidates
- vouch_ids
- vouch_responses

L4 Platform:
- supabase-database
- resend-email

L5 AI/Ops:
- candidate-vouch-id.spec.ts

Required UX:

1. Build a VouchMe-like product page with the L0 Journey Header at the top of the product content.
2. The L0 Journey Header must visually follow design-references/stitch-second-attempt-l0-header.png:
   - dark rounded horizontal strip
   - role badge on the left
   - alias and neutral coordinate beside it
   - centered 4-6 step journey path
   - active step highlighted as a status chip
   - current status and next action below the path
   - Copy Atlas Pin button on the right
3. Replace any generic top navigation/header pattern with this Journey Header as the main first-viewport signal.
4. Include a realistic VouchMe page body below it. Keep it simple: "Vouch Completed", a verified reference card, referee details, and a share action are enough.
5. Add a copyable Atlas Pin / Waypoint state. The copied context should include coordinate, alias, role, stage, route, status, and suggested scope.
6. Add an expandable L1-L5 workbench, preferably as a bottom blind or lower panel.
7. The workbench should reveal the implementation context behind the active coordinate, organized exactly by:
   - L1 Page / Interface
   - L2 Workflow
   - L3 Data
   - L4 Platform / Integrations
   - L5 AI / Delivery / Ops
8. Add a coordinate inspector or detail panel if useful, but do not let it replace the Journey Header.
9. Make the experience responsive enough for desktop and mobile.
10. Include visible states for copied, active, hover/focus, and expanded/collapsed workbench.

Important product rule:

The user should not need to understand coordinates first. They should see:

"You are here. This is what happened. This is what to do next."

Then, only if needed, they can copy the Atlas Pin or open deeper layers.

Context inversion must be visible:

Visible product moment -> coordinate -> mapped context -> narrow implementation scope -> widen only if needed.

Visual direction:

- precise, premium, calm
- dark glass/frosted Journey Header
- restrained signal cyan for active status/copy actions
- subtle brass/gold accent for aliases or cartographic identity
- compact status chips
- thin borders
- readable typography
- no oversized hero
- no decorative empty maps as the primary screen

Use these terms:

- L0 Journey / Surface
- L1 Page / Interface
- L2 Workflow
- L3 Data
- L4 Platform / Integrations
- L5 AI / Delivery / Ops
- Atlas Pin
- Waypoint
- Copy context
- Resolve URL
- View evidence

Do not use these terms or concepts:

- telemetry suite
- neural layer
- temporal layer
- quantum layer
- deploy nodes
- optimize synapses
- stabilize field
- latency spikes
- throughput
- packet streams
- regional infrastructure nodes
- empty world map as L0
- generic dashboard-first product

Implementation guidance:

- Prefer existing repo structure and TypeScript patterns.
- If adding UI components, put reusable React pieces in packages/react.
- If a runnable demo is needed, add a small example app under examples/ rather than turning the repo into a large app.
- Use local static data from examples/vouchme/context-atlas.
- Keep the prototype lightweight and easy to inspect.
- Avoid unrelated refactors.
- Add or update types only if needed.
- Run typecheck/build before finishing.

Expected final output:

- A working local prototype/demo.
- Reusable React components for the Journey Header, Atlas Pin/copy state, and L1-L5 workbench if appropriate.
- Clear instructions for running the demo.
- A short summary of what was built and what remains intentionally stubbed.

Success criteria:

When someone opens the prototype, they should immediately understand that ContextAtlas is not a dashboard. It is a record-aware journey context layer.

The first thing they see should communicate:

"I am a Candidate, this record is at Vouch completed, it is ready to share, and I can copy the Atlas Pin or open deeper context."
```

