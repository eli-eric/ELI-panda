interface PathItem {
    uid: string
    name: string
    systemLevel?: string | null
}

/**
 * Trims a system's ancestor path down to the segment *below* the node the user has
 * selected in the tree.
 *
 * `parentPath` runs from the root to the immediate parent (the system itself is not in
 * it). Everything up to and including the selected node is already on screen in the
 * breadcrumbs above the table, so repeating it in every row costs width and tells the
 * user nothing.
 *
 * Returns an empty array when the system hangs directly off the selected node — the
 * caller decides what to render for "nothing in between".
 */
export const getPathBelow = (
    parentPath: PathItem[] | null | undefined,
    parentUid: string | null | undefined,
): PathItem[] => {
    if (!parentPath?.length || !parentUid) return parentPath ?? []

    const index = parentPath.findIndex(item => item.uid === parentUid)

    // Selected node absent from the path — mismatched data, or a stale cache mid-navigation.
    // Falling back to the full path shows too much; returning nothing would hide where the
    // system lives entirely, which is worse.
    return index === -1 ? parentPath : parentPath.slice(index + 1)
}

/**
 * What the System Path column actually renders: the segment below the selected node, or —
 * when the system hangs directly off it — that node on its own, so the column keeps a
 * constant width and reads as "right here".
 *
 * The fallback name comes from the row's own `parentPath`, not from the selected system's
 * detail query. `getPathBelow` returns empty only when the selected node is the *last*
 * entry in the path, so the node is right there in the row's data. Reading it from
 * `useSystemDetail` instead would mean rendering whatever that query currently holds —
 * and it uses `keepPreviousData`, so mid-navigation that is the *previous* node's name.
 *
 * Cell and accessor both go through this, so the sort/filter value cannot drift from the
 * text on screen.
 */
export const getVisiblePathSegments = (
    parentPath: PathItem[] | null | undefined,
    parentUid: string | null | undefined,
): PathItem[] => {
    if (!parentPath?.length) return []

    const below = getPathBelow(parentPath, parentUid)
    return below.length ? below : [parentPath[parentPath.length - 1]]
}
