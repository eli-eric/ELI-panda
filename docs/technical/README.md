# Technical Documentation

Engineering-facing reference material for developers and operators of ELI PANDA.

> 🚧 **Empty for now** — content is being authored. This page exists as a placeholder so the documentation hub has a complete top-level structure.

## Planned sections

- **Architecture overview** — Next.js frontend, Neo4j backend, GraphQL layer, module organization.
- **GraphQL schema reference** — entities, relationships, authorization rules.
- **Permissions & roles** — `systems-view`, `systems-edit`, `admin`, planned phases of permission tightening.
- **Deployment & runbook** — Azure environments, Docker images, release procedure.
- **Data model & migrations** — Neo4j schema migrations, codebooks, seeding.
- **Authentication setup** — Microsoft Entra ID app registration, token flow.
- **Observability & monitoring** — logs, metrics, alerts, dashboards.
- **Local development** — getting started, common commands, conventions.

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
