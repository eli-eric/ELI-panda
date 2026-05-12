# Technical Documentation

Engineering-facing reference material for developers and operators of ELI PANDA.

Content is being authored module by module. The list below tracks what is published vs. still planned.

## Cross-cutting

- [**App architecture**](./app-architecture.md) — Next.js frontend, Neo4j backend, GraphQL layer, module organization, request lifecycle.
- [**Authentication**](./authentication.md) — Microsoft Entra ID app registration, NextAuth, JWT/session shape, middleware role gates.
- [**Permissions model**](./permissions-model.md) — `systems-view`, `systems-edit`, `admin`, per-module roles, `@authorization` rules, audit trail.
- [**Deployment & runbook**](./deployment-runbook.md) — Azure Container Apps + Czechia compose, GitHub Actions, env vars, rollback, common failures.
- [**Local development & conventions**](./local-development.md) — prereqs, common commands, lint/format/test setup, canonical patterns, troubleshooting.

## Modules

- [**Systems family**](./systems-family/README.md) — `systemHierarchy`, `systems`, `systemItem`, `systemsRelations`, moving flows, `system-type-edit`.
- **Catalogue & Items.** _Planned._
- **Orders & Order Items.** _Planned._
- **Services.** _Planned._
- **Room Cards.** _Planned._
- **Codebooks.** _Planned._
- **Control Systems.** _Planned._
- **Zones.** _Planned._
- **Publications.** _Planned._
- **Administration (Users & Roles).** _Planned._

## Other planned sections

- **Data model & migrations** — Neo4j schema migrations, codebooks, seeding.
- **Observability & monitoring** — logs, metrics, alerts, dashboards.

## In the meantime

If you need engineering details right now, the codebase itself is the authoritative source:

- **Source code:** <https://github.com/eli-eric/ELI-panda>
- **GraphQL schema:** [`src/server/apollo/schema.graphql`](https://github.com/eli-eric/ELI-panda/blob/dev/src/server/apollo/schema.graphql) — full entity and authorization rules.
- **Permissions today:** see *Access & Responsibilities* in each [User Guide](User-Guide) module page.
- **Repository conventions:** [`CLAUDE.md`](https://github.com/eli-eric/ELI-panda/blob/dev/CLAUDE.md) at the repo root summarizes coding style, build commands, and architecture.

## Contributing

Technical documentation lives alongside user docs in `docs/technical/` in the main repository. To add a section:

1. Create a new `.md` file under `docs/technical/`.
2. Open a pull request against `dev`.
3. On merge, the [GitHub wiki](https://github.com/eli-eric/ELI-panda/wiki) is automatically updated.
