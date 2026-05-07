# <Workflow title — imperative, e.g. "Copying systems">

<!--
Template for a single workflow page.

Audience: hybrid engineering/business — technicians and engineers actually working with systems.
- Engineering parts (entities, relationships, lifecycle, "how it works") may use precise technical terms.
- Business parts (access, when to use) stay plain and friendly.
- Never reference .tsx paths or component names.
- Match UI labels to the EN messages dictionary verbatim.
- All screenshots and videos are placeholders only — describe what they should show.
-->

## What this is for

<!-- 1-3 sentences: what this workflow accomplishes, when a user reaches for it. State key constraints up-front (e.g. "structural skeleton only", "1-to-1 cardinality"). -->

## Who can do this

<!--
Persona badge — pick the lowest tier that can perform the workflow.

Today (Editor and Admin are functionally equivalent):
✏️ **Editor / Admin** — requires the `systems-edit` role.
👁️ **Viewer** — requires the `systems-view` role (read-only workflows only).
👁️ All personas — when the workflow is read-only and visible to anyone with `systems-view`.

If different actions inside this workflow have different gates, follow the badge with a small per-action role table:

| Action | Required role |
|---|---|
| View | `systems-view` |
| Create / delete | `systems-edit` |

If Phase 1 (level-based admin/editor split) or Phase 2 (team scoping) changes the gate for this workflow, add a 🔮 callout under the badge.
-->

✏️ **Editor / Admin** — requires the `systems-edit` role.

> 🔮 *Coming soon — Phase 1:* …

See [Access & Responsibilities](../README.md#access--responsibilities) for what these personas mean.

## Prerequisites

<!-- Bulleted: where the user should be in the app, what they should know going in. Always link out to README key concepts when terminology matters. No inline glossary. -->

- You are looking at the System Hierarchy module.
- See [Key concepts](../README.md#key-concepts) for terminology.

## Steps

<!--
Numbered list. Each step is a single bold-led instruction sentence followed by clarifying detail.

Embed `[SCREENSHOT PLACEHOLDER: <description>]` after a step where the UI state matters. Every placeholder MUST describe what should be in the screenshot — never bare `[SCREENSHOT]`.

Use exact UI labels from the EN locale (`src/i18n/src/locale/en.ts`) — wrap them in **bold** or *italic* and quote verbatim.

Tables are encouraged for option matrices.
-->

1. **Step one.** Explanation.

   `[SCREENSHOT PLACEHOLDER: <what should be visible>]`

2. **Step two.** …

`[VIDEO PLACEHOLDER: <duration + what is demonstrated end-to-end>]`

## What gets <created / changed / removed>

<!-- OPTIONAL section. Use when an action's effect is non-obvious or partial — e.g. copy is "structural skeleton only", spare swap moves items but keeps history.

Use ✅/❌ bulleted lists for what does and does not happen. State this in user-facing terms (Catalogue item / Physical item / Responsible team), not GraphQL types. -->

## Limitations

<!-- OPTIONAL section. Hard constraints the user cannot work around: scope (same facility), depth caps, atomicity, rate limits. Keep to bullets. -->

## Tips & gotchas

<!--
OPTIONAL combined section: useful tips for efficient use AND edge cases / validation pitfalls / error triggers.

Include this section only when there is real content. Never pad with "no known gotchas".
-->

- **Tip.** …
- **Gotcha.** …

## Related

<!-- Bullets: links to sibling workflow files (./other.md). Cross-module references go to the user-guide root index, not to nonexistent module files. -->

- [Other workflow](./other-workflow.md)
- Other module → see [user guide index](../../README.md).
