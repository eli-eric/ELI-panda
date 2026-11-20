export const toCategoryCode = (name: string): string =>
    name ? name.replace(/\s+/g, '-').toLowerCase() : ''
