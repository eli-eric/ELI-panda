# systemItem — DEPRECATED (2026-06)

Replaced by `src/modules/systemHierarchy`. System detail now lives in the
hierarchy explorer: `/systems/hierarchy?leaf=<uid>` (build links with
`getSystemHierarchyDetailPath` from `@/modules/systemHierarchy/utils/hierarchyLinks`).

## What changed

- `/system/<uid>` is a thin redirect to the hierarchy detail view — old
  bookmarks, QR codes and shared links keep working.
- All external link sites build hierarchy deep links; the missing `parent`
  context is resolved client-side by `useHierarchyDeepLinkResolver`.
- History/field-change types (`HISTORY_TYPE`, `FieldChangeEntry`,
  `HistoryResponse`, …) moved to `systemHierarchy/types/history.ts`;
  `types/constants.ts` and `types/responses.ts` here re-export them for
  back-compat.

## Must NOT gain new consumers

- `SystemItemContainer` (page-level detail UI)
- `hooks/useSystemDetail`, `hooks/useSuspenseSystemDetail`, `hooks/useSystemCreate`
- `store/useSystemItemStore`

Links inside this module still target `/system/<uid>` on purpose — they
resolve via the redirect page and the module is no longer reachable as a page.

## Allowed until extracted

These are still legitimately imported by active modules (systemHierarchy,
shared/system, systems, components/system); move them to a shared location
before deleting this module:

- `utils` — `getColorBySystemLevel`, `getFontBySystemLevel`,
  `getBadgeVariantBySystemLevel`, `formatParentPath`
- `utils/hookHelpers` — `showErrorToast`, `showSuccessToast`, `validateSystemForm`
- `hooks/useRecalculate`, `hooks/useSystemCodeClear`, `hooks/useSystemCodeGenerate`
- `hooks/utils` — `makeSystemInputBody`
- `components/form/SystemForm.fields`, `components/subsystems/types`
- `types/form` — `SystemDetailFormType`

## Remaining page consumers

- `pages/system/index.tsx` — legacy create form (nothing links to it)
- `pages/system/alias/[alias].tsx` — alias → uid resolution, then redirects to hierarchy
- `pages/system/item/[itemUid].tsx` — physical item → system resolution (QR codes), then redirects to hierarchy

Known quirk: `hooks/useSystemDetail` does `router.push(PATH.NOT_FOUND)` itself on an
empty result, which races the alias/item pages' own not-found UI. Pre-existing;
fix when the alias/item resolution gets its own query.

## Removal criteria

1. Extract the "allowed until extracted" utils/hooks/types to
   `src/modules/shared/system/` or `src/components/system/`.
2. Give alias/itemUid resolution its own query (shared or systemHierarchy).
3. Delete the module and the `pages/system/index.tsx` create form.
