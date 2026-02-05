export const defaultBoolOptions = [
    { uid: '1', name: 'true' },
    { uid: '0', name: 'false' },
]

export enum PROPERTY_TYPE {
    TEXT = 'be2d4bd1-602b-42e6-a0ee-7e24324b75bb',
    NUMBER = '45f0d238-4067-4033-9e52-58f1d454b6d3',
    BOOLEAN = '918766a8-a7c0-4361-b85d-21d7b75449bb',
    LIST = '9b56eba5-d650-442c-9235-0f6fd3cc8a91',
    RANGE = '186d278b-5712-433e-a426-b6a7c8c6177c',
}

export const PROPERTY_INPUT_TYPE: Record<PROPERTY_TYPE, string> = {
    [PROPERTY_TYPE.TEXT]: 'text',
    [PROPERTY_TYPE.NUMBER]: 'number',
    [PROPERTY_TYPE.BOOLEAN]: 'number',
    [PROPERTY_TYPE.LIST]: 'text',
    [PROPERTY_TYPE.RANGE]: 'range',
}
