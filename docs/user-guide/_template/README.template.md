# <Module name>

<!--
Template for a per-module README — the parent page in the user guide for one feature module.

Audience: hybrid engineering/business. The README sets the stage and links out to per-workflow pages. Keep it scannable.

This file maps to one wiki page (the module's parent). Each workflow under `workflows/` is a separate child page.
-->

## Overview

<!-- 2-3 sentences: what the module does, who uses it, what part of the facility's lifecycle it covers. -->

`[SCREENSHOT PLACEHOLDER: full module landing screen with all primary panels visible]`

## Access & Responsibilities

<!--
Two sub-sections:
1. Today's reality — short list of roles and what they grant in plain English.
2. A persona table: persona | role(s) | what they can do.

Then 🔮 callouts for coming-soon phases (level-based split, team-based scoping) where they apply.
-->

**Today's reality:**
- `systems-view` — read-only.
- `systems-edit` and `admin` — both grant full edit on every system (functionally equivalent right now).

**Personas (today):**

| Persona | Role(s) | Can do |
|---|---|---|
| 👁️ **Viewer** | `systems-view` | … |
| ✏️ **Editor / Admin** | `systems-edit` or `admin` | … |

> 🔮 **Coming soon — Phase 1: split between Editor and Admin** — admin retains exclusive edit on `SYSTEM_DOMAIN` and `TECHNOLOGY_UNIT` levels; Editor is restricted to `KEY_SYSTEMS`, `SUBSYSTEMS_AND_PARTS`, `TRASH`.

> 🔮 **Coming soon — Phase 2: team-based scoping (policy today, enforced later)** — only members of a system's *responsible team* should edit that system and its subtree. Today this is policy only; technical enforcement is planned but the data structure is not yet in place.

## Key concepts

<!-- Bulleted glossary: term + 1-line definition. No inline schema links. Terms should be the ones users will see in workflow pages. -->

- **Term** — definition.

## Layout

<!-- Describe the main panels/regions of the module. One bullet per panel, plus a screenshot placeholder per area where layout matters. -->

- **Left** — …
- **Middle** — …
- **Right** — …

## Common workflows

<!--
Bulleted list of links to per-workflow files in `./workflows/`, with a 1-line summary each.

Cross-module workflow references go to the [user guide index](../README.md).
-->

- [Workflow A](./workflows/workflow-a.md) — 1-line summary.
- [Workflow B](./workflows/workflow-b.md) — 1-line summary.

## Coming soon

<!-- Roadmap items. Each item gets a 🔮 callout-style bullet, short. Include both module features and permission phases. -->

- **Feature X** — short description.

`[VIDEO PLACEHOLDER: 60s end-to-end walkthrough of the module]`

## Data model reference

> 🔧 *This section is for engineers reading the docs in the repo. The wiki generator strips it.*
>
> Authoritative entity definitions live in `src/server/apollo/schema.graphql`. Look up the relevant types for full field shapes and relationship directions. The repo is open-source on GitHub.

## Language

This documentation reflects the English UI. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
