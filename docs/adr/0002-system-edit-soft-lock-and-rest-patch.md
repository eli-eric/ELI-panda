# ADR 0002 — Soft-lock per-system responsibility; systems edit only through REST PATCH

- **Status**: Accepted
- **Date**: 2026-11-26
- **Deciders**: Systems team (product owner + frontend + API)
- **Related**: [System Hierarchy](../technical/systems-family/system-hierarchy.md), [Permissions model → Per-system edit responsibility](../technical/permissions-model.md#per-system-edit-responsibility), [System Item → Edit System sheet](../technical/systems-family/system-item.md#edit-system-sheet)

## Context

The Systems Explorer (`systemHierarchy`) and the shared Edit System sheet edited systems through GraphQL (`updateSystems`, `updateItems`, `createSystems`, `updatedByResolver`). Three problems followed:

- **Audit was client-built.** The frontend computed the `WAS_UPDATED_BY.changes` diff itself and wrote it through a separate resolver — forgeable, not atomic with the change, and silently missing for operators / maintainers.
- **Per-system responsibility was a hard lock enforced only on the client.** GraphQL gates by role only, so the FE disabled fields and blocked mutations when `GET /system/{uid}/can-edit` said no — while users legitimately needed to fix systems they were not formally responsible for.
- **Three ways to edit a system** (explorer tabs, form-based Edit sheet, deprecated `systemItem` page) with different data shapes.

## Decision

1. **All system writes go through REST, and the API writes the audit.** `PATCH /system/:uid` and `PATCH /system/:uid/physical-item` (absent key = unchanged, `null` = clear), `POST /systems` (root or child via `parentUid`), `POST /system/:uid/subsystems`, `POST /system/:uid/system-code`, `DELETE /system/:uid/relationships/:type/:otherUid`. The server diffs and writes `WAS_UPDATED_BY {action, changes}` in the same transaction. Reads use `GET /system/:uid` (+ `/spare-parts`, `/subsystems`, `/physical-item/:uid/catalogue-properties|orders`).
2. **Optimistic concurrency with one token per system.** Writes carry the system's `lastUpdateTime`; a mismatch is `409 STALE`. The FE serializes all writes to one system (TanStack mutation `scope: system-<uid>`) and reads the token at execution time, so consecutive inline saves never conflict with each other.
3. **Responsibility is a soft lock.** No per-system 403 anywhere. A user who is not responsible is asked once per exact system uid per session to confirm (`confirmSystemEdit`); the server records `outsideResponsibility: true` on the audit edge and the History feed badges it. The `systems-edit` role stays a hard gate. Creating relationships never prompts, except the `HAS_SUBSYSTEM` edge of a new subsystem (prompted against the parent).
4. **One edit implementation.** The explorer tabs and the Edit System sheet compose the same inline-field sections from `shared/system/system-detail`.

## Consequences

- **Positive** — audit is authoritative and atomic; nobody is locked out of fixing data; one read model (`SystemDetail`) and one write path for every surface; GraphQL is gone from the systems detail family.
- **Negative** — a concurrent change to *another* field of the same system still yields a `409 STALE` (the user re-applies after the refetch). The confirmation is per uid, so walking a subtree outside one's responsibility asks for each system.
- **Neutral / follow-ups** — the root "Create System" sheet now posts to `POST /systems`. `systemItem` (deprecated; unused exports marked `@deprecated`) and `roomCard` still write through GraphQL, so `updatedByResolver` stays live until they migrate.

## Alternatives considered

**Keep the hard lock, enforce it on the API.** Correct but rejected by the product owner: responsibility data is incomplete and people must be able to correct systems they don't own. The decision is recorded in history instead of being blocked.

**Per-field conflict detection** (`{ field: { from, to } }` in the PATCH). More precise than one token, but a different contract from the existing catalogue PATCH and harder to parse; the single token + serialized queue was preferred.

**Validate system-level rules on every PATCH.** Rejected — historical data contains violations, and a strict check would block unrelated edits. The rules are enforced only when creating a subsystem.
