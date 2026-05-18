# ELI PANDA documentation

Welcome to the documentation hub for ELI PANDA — the maintenance management system for ELI scientific facilities.

The documentation is split into two streams:

## [User Guide](User-Guide)

End-user documentation: how to use the application, per-feature workflows, screenshots and walkthroughs. Start with [Getting around the app](User-Guide-Getting-around) for layout, login, keyboard shortcuts, and dark mode.

Currently documented modules:

- [System Hierarchy](User-Guide-System-Hierarchy)
- [Systems Overview](User-Guide-Systems)
- [Systems Relations](User-Guide-Systems-Relations)
- [Systems Moving](User-Guide-Systems-Moving)
- [Systems Multi-Move](User-Guide-Systems-Multi-Move)
- [System Type Edit](User-Guide-System-Type-Edit)
- [Catalogue](User-Guide-Catalogue)
- [Orders](User-Guide-Orders)
- [Services](User-Guide-Services)
- [Room Cards](User-Guide-Room-Cards)
- [Codebooks](User-Guide-Codebooks)
- [Control Systems](User-Guide-Control-Systems)
- [Zones](User-Guide-Zones)
- [Publications, Researchers & Grants](User-Guide-Publications)
- [Administration — Users & Roles](User-Guide-Administration)

More modules will follow — see the [User Guide](User-Guide) index for the full status table.

## [Technical Documentation](Technical-Documentation)

Engineering-facing documentation: architecture, deployment, data model, ops procedures.

Currently documented:

**Cross-cutting**

- [App architecture](Technical-Documentation-App-architecture) — stack, module layout, request lifecycle, codegen pipeline.
- [Authentication](Technical-Documentation-Authentication) — NextAuth + Entra ID, JWT/session shape, middleware role gates.
- [Permissions model](Technical-Documentation-Permissions-model) — role inventory, schema `@authorization`, UI gates, audit trail.
- [Deployment & runbook](Technical-Documentation-Deployment-runbook) — environments, pipelines, env vars, rollback, common failure modes.
- [Local development & conventions](Technical-Documentation-Local-development) — setup, daily commands, coding style, testing, troubleshooting.

**Modules**

- [Systems family](Technical-Documentation-Systems-family) — `systemHierarchy`, `systems`, `systemItem`, `systemsRelations`, moving flows, `system-type-edit`.
- [Catalogue & Items](Technical-Documentation-Catalogue-and-items) — category hierarchy, property model, image manager v2, cross-module integration.
- [Orders & Order Items](Technical-Documentation-Orders-and-order-items) — order/line/service-line model, delivery flow, optimistic concurrency.
- [Services](Technical-Documentation-Services) — `ServiceType` catalogue (REST) vs. graph-side `ServiceItem`.
- [Room Cards](Technical-Documentation-Room-cards) — `RoomCard` model, contacts, operational-state audit, field-level edit gate.
- [Codebooks](Technical-Documentation-Codebooks) — generic codebook surface, `CODEBOOK` enum, admin UI.
- [Control Systems](Technical-Documentation-Control-systems) — bulk system-code factory, Zod-first schemas, preview→create flow.
- [Zones](Technical-Documentation-Zones) — `Zone` graph, `HAS_SUBZONE`, CSV import, cross-module consumers.
- [Publications](Technical-Documentation-Publications) — `Publication` / `Researcher` / `Grant` (REST-only), RIV export.
- [Administration (Users & Roles)](Technical-Documentation-Administration) — `User` row-level `@authorization`, role assignment, profile pages.

See the [Technical Documentation](Technical-Documentation) index for the full list.

---

*Source for these pages lives in [`docs/`](https://github.com/eli-eric/ELI-panda/tree/dev/docs) in the main repository. Edits go through pull requests; this wiki is auto-synced on merge to `dev`.*
