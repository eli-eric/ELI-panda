# Language

Shared vocabulary for every suggestion this skill makes. Use these terms exactly — don't substitute "component," "service," "API," or "boundary." Consistent language is the whole point.

## Terms

**Module**
Anything with an interface and an implementation. Deliberately scale-agnostic — applies equally to a function, a hook, a `.cont.tsx`/`.comp.tsx` pair, a Zustand store, a feature folder under `src/modules/`, or a tier-spanning slice.
_Avoid_: unit, component, service.

> **Term collision in this repo.** PANDA's docs and `src/modules/` folder also use "module" to mean a feature folder (`src/modules/orders/`, `src/modules/catalogue/`, …). When the distinction matters, say **feature module** for the folder convention and **module** for the skill-level concept. Most of the time they line up — a feature folder *is* a module in the skill sense — but a single hook or a `.cont.tsx` is also a module, and so is a Zustand store. Don't let the folder name narrow your search.

**Interface**
Everything a caller must know to use the module correctly. Includes the TypeScript signature, but also invariants, ordering constraints, error modes, required configuration, and performance characteristics. For an RHF-aware input it includes which `Controller` props it owns; for a TanStack Query hook it includes the cache-key shape and which params force a refetch.
_Avoid_: API, signature (too narrow — those refer only to the type-level surface).

**Implementation**
What's inside a module — its body of code. Distinct from **Adapter**: a thing can be a small adapter with a large implementation (the `fetchClient` wrapping an HTTP call) or a large adapter with a small implementation (an in-memory test fake). Reach for "adapter" when the seam is the topic; "implementation" otherwise.

**Depth**
Leverage at the interface — the amount of behaviour a caller (or test) can exercise per unit of interface they have to learn. A module is **deep** when a large amount of behaviour sits behind a small interface. A module is **shallow** when the interface is nearly as complex as the implementation.

**Seam** _(from Michael Feathers)_
A place where you can alter behaviour without editing in that place. The *location* at which a module's interface lives. Choosing where to put the seam is its own design decision, distinct from what goes behind it. In PANDA: the boundary between `.cont.tsx` and `.comp.tsx` is a seam; the `queryFetcher` / `queryMutate` factories are seams between TanStack Query and the REST gateway; `useDynamicModalStore` is a seam between feature code and the modal infrastructure.
_Avoid_: boundary (overloaded with DDD's bounded context).

**Adapter**
A concrete thing that satisfies an interface at a seam. Describes *role* (what slot it fills), not substance (what's inside). The codegen-generated GraphQL hook is an adapter from the schema to React; an in-memory test fake for the REST gateway is an adapter at the same seam as `fetchClient`.

**Leverage**
What callers get from depth. More capability per unit of interface they have to learn. One implementation pays back across N call sites and M tests.

**Locality**
What maintainers get from depth. Change, bugs, knowledge, and verification concentrate at one place rather than spreading across containers, hooks, and stores. Fix once, fixed everywhere.

## Principles

- **Depth is a property of the interface, not the implementation.** A deep module can be internally composed of small, mockable, swappable parts — they just aren't part of the interface. A module can have **internal seams** (private to its implementation, used by its own tests) as well as the **external seam** at its interface.
- **The deletion test.** Imagine deleting the module. If complexity vanishes, the module wasn't hiding anything (it was a pass-through). If complexity reappears across N callers, the module was earning its keep.
- **The interface is the test surface.** Callers and tests cross the same seam. If you want to test *past* the interface, the module is probably the wrong shape. In PANDA this maps to: test through the `.cont.tsx`, not by exporting half its internals to `__tests__/`.
- **One adapter means a hypothetical seam. Two adapters means a real one.** Don't introduce a seam unless something actually varies across it.

## Relationships

- A **Module** has exactly one **Interface** (the surface it presents to callers and tests).
- **Depth** is a property of a **Module**, measured against its **Interface**.
- A **Seam** is where a **Module**'s **Interface** lives.
- An **Adapter** sits at a **Seam** and satisfies the **Interface**.
- **Depth** produces **Leverage** for callers and **Locality** for maintainers.

## Rejected framings

- **Depth as ratio of implementation-lines to interface-lines** (Ousterhout): rewards padding the implementation. We use depth-as-leverage instead.
- **"Interface" as the TypeScript `interface` keyword or a class's public methods**: too narrow — interface here includes every fact a caller must know.
- **"Boundary"**: overloaded with DDD's bounded context. Say **seam** or **interface**.
- **"Module = `src/modules/<feature>/`"**: too narrow — see the term-collision note under **Module**.
