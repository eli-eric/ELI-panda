# Deepening

How to deepen a cluster of shallow modules safely in this codebase, given its dependencies. Assumes the vocabulary in [LANGUAGE.md](LANGUAGE.md) — **module**, **interface**, **seam**, **adapter**.

## Dependency categories in PANDA

When assessing a candidate for deepening, classify its dependencies. The category determines how the deepened module is tested across its seam.

### 1. In-process

Pure computation, in-memory state, no I/O. Examples: helpers under `src/utils/` and `src/lib/`, predicates in `src/lib/predicates/`, Zod schemas, pure formatters, derivation functions inside hooks.

Always deepenable — merge the modules and test through the new interface directly with Jest. No adapter needed.

### 2. Local-substitutable

Dependencies that have local test stand-ins running inside Jest. In PANDA this typically means:

- React Hook Form + Zod (test with `@testing-library/react` and real RHF state, not mocks)
- TanStack Query (test with a real `QueryClient` and `MswJS`-style fetch stubs, not a mocked `useQuery`)
- Zustand stores (use the real store; reset between tests)
- The dynamic modal system (`useDynamicModalStore`) — render with a real provider in the test

Deepenable if the stand-in exists. The deepened module is tested with the stand-in running in the test suite. The seam is internal; no port at the module's external interface.

### 3. Remote but owned (Ports & Adapters)

Your own services across a network boundary. In PANDA this is two things, and they need different treatment:

- **In-process GraphQL (`/api/graphql` + `@neo4j/graphql`)** — technically same-process today, but logically remote: the JWT round-trips, `@authorization` runs, and the surface is the GraphQL schema. Treat as remote-but-owned. Define the port in terms of the codegen-generated hooks (or a thin wrapper); production uses the generated adapter, tests use an in-memory adapter (handcrafted result, or `MockedProvider` from `@apollo/client/testing`).
- **PANDA API gateway (REST, via `queryFetcher` / `queryMutate`)** — actually remote. The port is the endpoint key + params shape from `src/utils/getEndpoints.ts`. The production adapter is `fetchClient`; the test adapter is an in-memory stub keyed by endpoint.

Recommendation shape: *"Define a port at the seam, implement one adapter for production and an in-memory adapter for testing, so the logic sits in one deep module even though it crosses GraphQL/REST."*

### 4. True external (Mock)

Third-party services PANDA doesn't control: Microsoft Entra ID (NextAuth), MinIO S3 (file/image upload), the browser's `window`/`document`, anything time- or random-based. The deepened module takes the external dependency as an injected port; tests provide a mock adapter.

## Seam discipline

- **One adapter means a hypothetical seam. Two adapters means a real one.** Don't introduce a port unless at least two adapters are justified (typically production + test). A single-adapter seam is just indirection.
- **Internal seams vs external seams.** A deep module can have internal seams (private to its implementation, used by its own tests) as well as the external seam at its interface. Don't expose internal seams through the interface just because tests use them. The `.cont.tsx` / `.comp.tsx` split is usually best framed as an *internal* seam of the feature module: the external seam is the page-level container's prop and route contract.
- **Respect existing seams from the docs.** Before introducing a new seam, check whether `docs/technical/app-architecture.md` or the per-feature page already names one (e.g. `useDynamicModalStore`, `queryFetcher`, `useTableStateStore`). Reusing a named seam beats inventing a parallel one.

## Testing strategy: replace, don't layer

- Old unit tests on shallow modules (a `.comp.tsx` rendered alone, a helper hook with one caller) become waste once tests at the deepened module's interface exist — delete them.
- Write new tests at the deepened module's interface. The **interface is the test surface**. For a feature module that usually means a test that renders the `.cont.tsx` with a real `QueryClient` and asserts on the rendered output and on the requests issued through the fetch adapter.
- Tests assert on observable outcomes through the interface — what the user sees, what mutations fire, which toast appears — not on internal state.
- Tests should survive internal refactors — they describe behaviour, not implementation. If a test has to change when the `.comp.tsx` is restructured but the user-visible behaviour is identical, it's testing past the interface.
- `data-testid` selectors are the conventional test surface in this repo (see `CLAUDE.md`). Use them in new tests rather than CSS class or DOM-structure selectors.
