import type { TeamDeleteConflict } from '../types/team.types'

/**
 * Formats the `relatedNodes` from a 409 delete conflict into a compact,
 * locale-neutral "Label (count), Label (count)" string. Returns '' when the
 * body doesn't match the expected shape (caller falls back to a generic msg).
 */
export const formatRelatedNodes = (data: unknown): string => {
    const nodes = (data as TeamDeleteConflict)?.relatedNodes
    if (!Array.isArray(nodes)) return ''
    return nodes
        .filter(n => n && n.label)
        .map(n => `${n.label} (${n.count})`)
        .join(', ')
}
