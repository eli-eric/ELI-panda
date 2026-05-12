# ELI PANDA — user guide

This is the entry point for end-user documentation of the ELI PANDA maintenance management system. Each feature module has its own folder with a README and per-workflow pages.

## Start here

- [Getting around the app](./getting-around.md) — login, sidebar, keyboard shortcuts, dark mode, logout. Read this once before diving into specific modules.

## Modules

| Module | Status | Documentation |
|---|---|---|
| System Hierarchy | 📝 Documented | [systemHierarchy/](./systemHierarchy/README.md) |
| Systems Overview | 📝 Documented | [systems/](./systems/README.md) |
| Systems Relations | 📝 Documented | [systemsRelations/](./systemsRelations/README.md) |
| Systems Moving | 📝 Documented | [systemsMoving/](./systemsMoving/README.md) |
| Systems Multi-Move | 📝 Documented | [systemsMultiMove/](./systemsMultiMove/README.md) |
| Catalogue | 📝 Documented | [catalogue/](./catalogue/README.md) |
| Items | 🚧 Planned | — |
| Orders | 🚧 Planned | — |
| Room Cards | 🚧 Planned | — |
| User Settings | 🚧 Planned | — |

**Status legend:**
- 📝 **Documented** — the module's README and at least one workflow page exist.
- 🚧 **Planned** — the module exists in the application; documentation has not been written yet.

## How this guide is organized

Each documented module follows the same structure:

```
<module>/
├── README.md         — module overview, access, key concepts, layout, workflow links
└── workflows/        — one page per user-facing workflow
    ├── <workflow-a>.md
    └── <workflow-b>.md
```

Workflow pages are designed to stand on their own — you can land on one directly via search and find what you need without needing to read the parent README first. Cross-page links are provided where context matters.

## Conventions

- **Audience:** engineers and technicians who actually work with the systems being documented. Engineering-precise language is fine where it helps; access and responsibility sections stay user-friendly.
- **Personas:** every workflow declares which personas (👁️ Viewer / ✏️ Editor / Admin) can perform it. See each module's *Access & Responsibilities* section for what those personas are.
- **UI labels** in step instructions match the English UI.
- **Screenshots and videos** are recorded during the Confluence publishing stage. Placeholder boxes in the Markdown describe what the missing media should show.

## Templates

If you are documenting a new module, copy the templates from [`_template/`](./_template/):

- `README.template.md` — copy to `<module>/README.md` and fill in.
- `workflow.template.md` — copy to `<module>/workflows/<workflow-name>.md` and fill in.

When the module is ready, update the table above: change 🚧 Planned to 📝 Documented and add the link.

## Language

This documentation is English-only. The app currently ships English translations only; Hungarian is planned for ELI ALPS but not on the immediate roadmap.
