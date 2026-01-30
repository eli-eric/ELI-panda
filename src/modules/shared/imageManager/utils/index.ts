export const getEndpoint = (itemCategory?: string, itemId?: string, fileCategory?: string) =>
    `/api/${itemCategory}/${itemId}/${fileCategory}`
