/** Third-party links are rendered only when they are absolute HTTP(S) URLs. */
export const safeHttpUrl = (value?: string) => {
    if (!value) return undefined
    try {
        const parsed = new URL(value)
        return (parsed.protocol === 'https:' || parsed.protocol === 'http:') &&
            !parsed.username &&
            !parsed.password
            ? value
            : undefined
    } catch {
        return undefined
    }
}
