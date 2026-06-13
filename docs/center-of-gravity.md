# ContextAtlas Center Of Gravity

ContextAtlas began with a concrete product problem: VouchMe needed a compact journey header that could orient a user inside a specific historical or active record.

The original question was not "what page is this account on?" It was:

```txt
In this specific record, on this specific page, wearing this specific role, where am I?
```

That remains the center of the product.

## First Surface: L0 Journey Header

The first useful ContextAtlas surface is a record-aware `L0` Journey Header embedded into an active product.

It should show:

- role context
- current journey stage
- current status
- "you are here" position
- nearby journey steps
- next action
- copyable coordinate or Atlas Pin

For VouchMe, the same account might open one dashboard card as a candidate, another as a referee, and another as a recruiter. The header must resolve fresh from the route, record, viewer relationship, and status.

## Power Layer: Context Inversion

The same `L0` coordinate should point down through:

- `L1`: routes, pages, components, layouts
- `L2`: workflow states, events, permissions, notifications
- `L3`: tables, records, storage, auth, policies
- `L4`: APIs, platform services, webhooks, deployment, integrations
- `L5`: tests, UAT notes, prompts, runbooks, AI and delivery context

This is the context inversion model: start from the visible user experience, resolve the coordinate, load only the mapped context, and widen only when the coordinate does not contain enough evidence.

## Product Shape

ContextAtlas therefore has two related surfaces:

- `L0 Journey Header`: the embedded product wedge that can be shown to users.
- `L1-L5 Workbench`: the admin, engineering, support, and AI-agent surface that exposes deeper implementation context.

The Atlas HUD, Atlas Blinds, review queues, generated diagrams, MCP tools, and context packets should grow from this center rather than replacing it.
