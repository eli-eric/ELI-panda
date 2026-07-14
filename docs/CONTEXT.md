# CONTEXT — Domain glossary

Cross-cutting domain vocabulary for ELI PANDA. Authoritative definitions live in the per-feature pages under [`docs/technical/`](./technical/README.md); this file is a lightweight index so reviewers, AI agents, and new contributors can pick the right name without bouncing between pages.

When you sharpen a term during a design conversation, update both this file and the relevant per-feature page. Vocabulary drift across docs is the most common cause of repeat-suggested refactors.

## How to use this file

- **Pick names from here first** when proposing modules, hooks, or table columns.
- **Add an entry** the moment a design conversation names a concept that isn't already here. Keep entries short (one or two lines + a link to the page that owns the long definition).
- **Don't duplicate** the long-form definition. The per-feature page is the source of truth.

## Terms

> Each entry: short gloss → page that owns the full definition.

### Cross-cutting

- **Feature module** — a folder under `src/modules/<feature>/` containing `*.cont.tsx` + `*.comp.tsx` + hooks/queries/store/types. See [`app-architecture.md`](./technical/app-architecture.md#module-organization).
- **Container / Component split** — `.cont.tsx` wires data, mutations, navigation; `.comp.tsx` is pure presentation. See [`app-architecture.md`](./technical/app-architecture.md#module-organization).
- **PANDA API gateway** — external REST surface reached via `queryFetcher` / `queryMutate` against `PANDA_API_GW_URL`. See [`app-architecture.md`](./technical/app-architecture.md#data-layer).
- **In-process GraphQL** — `/api/graphql` (Apollo + `@neo4j/graphql`); JWT-gated; schema in `src/server/apollo/schema.graphql`. See [`app-architecture.md`](./technical/app-architecture.md#data-layer).
- **Dynamic modal system** — `useDynamicModalStore` + `DynamicModalProvider`; current modal surface. See [`app-architecture.md`](./technical/app-architecture.md#app-shell).
- **Legacy modal system** — `ModalProvider` + `useModalStore` / `useModalFormStateStore` / `useModalGlobalStore`. Being retired.
- **Form Wizard V3** — multi-step RHF wizard in `src/modules/shared/form/wizardV3`. See the `wizard` skill.
- **`@authorization` directive** — per-entity JWT-gated rule in the GraphQL schema. See [`permissions-model.md`](./technical/permissions-model.md).
- **JWT role** — string entry in `session.user.roles` (e.g. `systems-view`, `systems-edit`, `admin`). See [`permissions-model.md`](./technical/permissions-model.md).
- **Per-system edit responsibility** — beyond the `systems-edit` role, may-edit-*this*-system check (direct responsible / `responsibleTeam` / ancestor). Backend `GET /system/{uid}/can-edit`; frontend enforced by the shared `edit-permission` module (`useSystemEditPermission` / `guardSystemEdit`) across both System Hierarchy and the Edit System sheet. See [`permissions-model.md`](./technical/permissions-model.md#per-system-edit-responsibility).
- **Codebook** — generic admin-managed reference list (`CODEBOOK` enum). See [`codebooks.md`](./technical/codebooks.md).

### Systems family

- **System** — facility item with hierarchy and relations. See [`systems-family/systems-overview.md`](./technical/systems-family/systems-overview.md).
- **System hierarchy** — parent/child tree of systems. See [`systems-family/system-hierarchy.md`](./technical/systems-family/system-hierarchy.md).
- **System item** — leaf attached to a system. The `systemItem` module / `/system/<uid>` page is **deprecated** — detail now lives in the hierarchy explorer (`/systems/hierarchy?leaf=<uid>`). See [`systems-family/system-item.md`](./technical/systems-family/system-item.md).
- **System type** — schema/template that drives a system's editable fields. See [`systems-family/system-type-edit.md`](./technical/systems-family/system-type-edit.md).
- **Moving flow / Multi-move** — bulk re-parenting of systems. See [`systems-family/moving.md`](./technical/systems-family/moving.md).
- **Relations / Spares** — non-hierarchical links between systems. See [`systems-family/relations-and-spares.md`](./technical/systems-family/relations-and-spares.md).

### Catalogue & items

- **Catalogue category** — node in the category hierarchy.
- **Catalogue item** — purchasable thing; three-layer property model (category / type / instance). See [`catalogue-and-items.md`](./technical/catalogue-and-items.md).
- **Image manager v2** — current image-attachment subsystem.

### Orders

- **Order** — purchase header.
- **Order line / line item** — single purchasable entry on an order.
- **Service line** — service variant of an order line. See [`orders-and-order-items.md`](./technical/orders-and-order-items.md).
- **Delivery flow** — receive-against-line lifecycle. See [`orders-and-order-items.md`](./technical/orders-and-order-items.md).

### Services

- **ServiceType** — REST-side catalogue entry.
- **ServiceItem** — graph-side instance. See [`services.md`](./technical/services.md).

### Room cards

- **RoomCard** — operational record for a room. See [`room-cards.md`](./technical/room-cards.md).
- **Hall / department contact** — responsible person attached to a RoomCard.
- **Operational state** — audited status field on a RoomCard.

### Control systems

- **System code** — auto-generated identifier produced by the bulk factory. See [`control-systems.md`](./technical/control-systems.md).
- **Preview → Create flow** — two-stage creation pipeline for system codes.

### Zones

- **Zone** — graph node with `HAS_SUBZONE` self-reference. See [`zones.md`](./technical/zones.md).

### Publications

- **Publication / Researcher / Grant** — REST-only entities. See [`publications.md`](./technical/publications.md).
- **RIV export** — periodic report-generation flow.

### Administration

- **User** — `User` node with row-level `@authorization`. See [`administration.md`](./technical/administration.md).
- **Role** — see *JWT role* above.
- **Responsible team** — a `System`'s `responsibleTeam`. Now enforced for system edits (backend REST 403 + frontend guard) via [*Per-system edit responsibility*](#per-system-edit-responsibility); still policy-only at the GraphQL schema layer.

## See also

- [`docs/technical/README.md`](./technical/README.md) — per-feature engineering pages (authoritative).
- [`docs/adr/README.md`](./adr/README.md) — architecture decision records.
- [`CLAUDE.md`](../CLAUDE.md) — coding conventions and canonical patterns.
- [`.agents/skills/improve-codebase-architecture/SKILL.md`](../.agents/skills/improve-codebase-architecture/SKILL.md) — uses this file as the domain-vocabulary source.
