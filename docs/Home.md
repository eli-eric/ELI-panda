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

- [App architecture](Technical-App-Architecture) — stack, module layout, request lifecycle, codegen pipeline.
- [Authentication](Technical-Authentication) — NextAuth + Entra ID, JWT/session shape, middleware role gates.
- [Permissions model](Technical-Permissions-Model) — role inventory, schema `@authorization`, UI gates, audit trail.

More pages are being authored — see the [Technical Documentation](Technical-Documentation) index for the full list.

---

*Source for these pages lives in [`docs/`](https://github.com/eli-eric/ELI-panda/tree/dev/docs) in the main repository. Edits go through pull requests; this wiki is auto-synced on merge to `dev`.*
