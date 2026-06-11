# VouchMe First Customer Notes

VouchMe is the first implementation target for ContextAtlas. It gives the product a realistic proving ground because its journeys are role-aware and trust-sensitive.

## Role-Aware Journey Headers

VouchMe needs Journey Headers that can show the correct role and journey context for the current page. A candidate, referee, recruiter, admin, or developer may be looking at related records for different reasons.

Headers should make the active coordinate easy to identify and copy without exposing deeper internal layers to public users.

## Historical Records

Historical records must resolve role and journey context dynamically. The same underlying vouch, access request, or signal view can mean different things depending on who is viewing it and which stage they are in.

ContextAtlas coordinates should help the app answer:

- Which journey does this record belong to?
- Which role is viewing it now?
- Which route or dashboard card should open for that role?
- Which layers can this viewer safely see?

## Dashboard Cards

Dashboard cards should open into the correct role and location. A card for a completed vouch should not send every user to the same generic record view if the candidate, referee, and recruiter each need a different page surface.

## Layer Visibility

Public users should see `L0` only. This means public diagrams, labels, and journey copy can be shared without exposing implementation details.

Admins and developers can see deeper layers when authorized:

- `L1` for pages and routes.
- `L2` for statuses and notifications.
- `L3` for data records and policies.
- `L4` for integrations and platform dependencies.
- `L5` for tests, context packs, UAT notes, and AI handoff instructions.

## Bootstrap Boundary

The current VouchMe atlas is an initial example only. It should not be treated as verified production truth until a scanner or human review connects the coordinates to the real VouchMe repo.
