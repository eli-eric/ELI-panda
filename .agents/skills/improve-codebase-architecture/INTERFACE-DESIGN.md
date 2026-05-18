# Interface Design

When the user wants to explore alternative interfaces for a chosen deepening candidate, use this parallel sub-agent pattern. Based on "Design It Twice" (Ousterhout) — your first idea is unlikely to be the best.

Uses the vocabulary in [LANGUAGE.md](LANGUAGE.md) — **module**, **interface**, **seam**, **adapter**, **leverage**.

## Process

### 1. Frame the problem space

Before spawning sub-agents, write a user-facing explanation of the problem space for the chosen candidate:

- The constraints any new interface would need to satisfy (PANDA conventions from `CLAUDE.md` and `docs/technical/` — container/component split, `queryFetcher`/`queryMutate`, `toast.promise`, dynamic modals, RHF + Zod, `data-testid` selectors)
- The dependencies it would rely on, and which category they fall into (see [DEEPENING.md](DEEPENING.md))
- A rough illustrative code sketch in TypeScript to ground the constraints — not a proposal, just a way to make the constraints concrete

Show this to the user, then immediately proceed to Step 2. The user reads and thinks while the sub-agents work in parallel.

### 2. Spawn sub-agents

Spawn 3+ sub-agents in parallel using the Agent tool. Each must produce a **radically different** interface for the deepened module.

Prompt each sub-agent with a separate technical brief (file paths in `src/`, coupling details, dependency category from [DEEPENING.md](DEEPENING.md), what sits behind the seam, the relevant per-feature page in `docs/technical/`, the relevant terms from `docs/CONTEXT.md`, and any related ADRs in `docs/adr/`). The brief is independent of the user-facing problem-space explanation in Step 1. Give each agent a different design constraint:

- Agent 1: "Minimize the interface — aim for 1–3 entry points max. Maximise leverage per entry point."
- Agent 2: "Maximise flexibility — support many use cases and extension. Lean on RHF/TanStack Query primitives the codebase already uses."
- Agent 3: "Optimise for the most common caller — make the default case trivial. Reuse `data-testid`, `toast.promise`, and the dynamic modal store where applicable."
- Agent 4 (if applicable): "Design around ports & adapters for cross-seam dependencies — explicit production and in-memory adapters for `queryFetcher` / GraphQL access."

Include [LANGUAGE.md](LANGUAGE.md) vocabulary, the relevant entries from `docs/CONTEXT.md`, and the per-feature page in `docs/technical/<feature>.md` in the brief so each sub-agent names things consistently with both the architecture language and PANDA's domain language. Remind the agents to respect the file-naming and folder conventions from the `architecture` skill (`*.cont.tsx`, `*.comp.tsx`, `use*.ts`, module folder layout) and to flag any contradiction with an existing ADR.

Each sub-agent outputs:

1. Interface (types, methods, params — plus invariants, ordering, error modes)
2. Usage example showing how callers use it from a `.cont.tsx`
3. What the implementation hides behind the seam
4. Dependency strategy and adapters (see [DEEPENING.md](DEEPENING.md))
5. Trade-offs — where leverage is high, where it's thin

### 3. Present and compare

Present designs sequentially so the user can absorb each one, then compare them in prose. Contrast by **depth** (leverage at the interface), **locality** (where change concentrates), and **seam placement**.

After comparing, give your own recommendation: which design you think is strongest and why. If elements from different designs would combine well, propose a hybrid. Be opinionated — the user wants a strong read, not a menu.
