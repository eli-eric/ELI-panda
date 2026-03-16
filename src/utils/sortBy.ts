const getByPath = (item: unknown, path: string): unknown => {
    return path.split('.').reduce<unknown>((current, segment) => {
        if (!current || typeof current !== 'object') return undefined
        return (current as Record<string, unknown>)[segment]
    }, item)
}

const compareValues = (a: unknown, b: unknown): number => {
    if (a === b) return 0
    if (a == null) return 1
    if (b == null) return -1

    if (typeof a === 'number' && typeof b === 'number') return a - b

    const left = String(a)
    const right = String(b)

    if (left < right) return -1
    if (left > right) return 1
    return 0
}

export const sortBy = <T>(list: T[] | null | undefined, paths: string[] | string): T[] => {
    if (!Array.isArray(list)) return []

    const keys = Array.isArray(paths) ? paths : [paths]

    return [...list].sort((left, right) => {
        for (const key of keys) {
            const result = compareValues(getByPath(left, key), getByPath(right, key))
            if (result !== 0) return result
        }
        return 0
    })
}
