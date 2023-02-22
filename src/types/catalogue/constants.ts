export const units = [
  {
    uid: '8a18b753-e0c9-4d5b-80ef-2e0de38ac2b8',
    code: 'mm',
    name: 'mm',
  },

  {
    uid: '00f9909d-0adf-43ef-9cb2-49bc1c4bcc52',
    code: 'hpa',
    name: 'hPa',
  },

  {
    uid: '787ada0e-6699-4269-8060-314d1bcf7079',
    code: 'n',
    name: 'N',
  },

  {
    uid: '5c01425a-9e43-4123-8ba1-62d2e647f498',
    code: 'nm',
    name: 'nm',
  },

  {
    uid: '101947b8-5dfb-4a81-8808-0c8eb777634e',
    code: 'mp',
    name: 'MP',
  },

  {
    uid: '42156793-804a-4d82-a3f6-949b84369446',
    code: 'fps',
    name: 'fps',
  },

  {
    uid: '1c4eada6-ea52-41a2-bd31-8cfb66b8416e',
    code: 'bit',
    name: 'bit',
  },

  {
    uid: '426e2685-2ac3-4823-a406-807efd1148d4',
    code: 'nm-(rms)',
    name: 'nm (RMS)',
  },

  {
    uid: '2ecdb787-b2bf-4c42-a74e-e9ba5b704162',
    code: 'mj',
    name: 'mJ',
  },

  {
    uid: '7d1c7b70-a50a-4fb4-abc8-f83856a2bedd',
    code: 'uj',
    name: 'uJ',
  },

  {
    uid: '76eb38d0-f5e5-4453-b988-c6f53597eee9',
    code: 'hz',
    name: 'Hz',
  },

  {
    uid: '37c0c169-1df7-44b0-b3bc-85a0c4fe7d92',
    code: 'w',
    name: 'W',
  },

  {
    uid: 'dcf713f6-2ecc-439e-9c65-024874a3dc8d',
    code: 'l/sec',
    name: 'L/sec',
  },

  {
    uid: '0088912f-39c9-4c28-a458-f81a96affd3f',
    code: 'm3/hod',
    name: 'm3/hod',
  },

  {
    uid: '5d3bd548-5712-4c79-b783-5b13153f3ba0',
    code: 'mbar',
    name: 'mbar',
  },

  {
    uid: '81cfe53e-1242-43bf-81fb-10ffa6ade6ca',
    code: 'min',
    name: 'min',
  },
]

export const propertyTypes = [
  {
    uid: 'be2d4bd1-602b-42e6-a0ee-7e24324b75bb',
    code: 'text',
    name: 'text',
  },

  {
    uid: '45f0d238-4067-4033-9e52-58f1d454b6d3',
    code: 'number',
    name: 'number',
  },

  {
    uid: '918766a8-a7c0-4361-b85d-21d7b75449bb',
    code: 'boolean',
    name: 'boolean',
  },

  {
    uid: '9b56eba5-d650-442c-9235-0f6fd3cc8a91',
    code: 'list',
    name: 'List Of Values',
  },
]

export const defaultBoolOptions = [
  { value: 1, name: 'true' },
  { value: 0, name: 'false' },
]

export enum PROPERTY_TYPE {
  TEXT = 'be2d4bd1-602b-42e6-a0ee-7e24324b75bb',
  NUMBER = '45f0d238-4067-4033-9e52-58f1d454b6d3',
  BOOLEAN = '918766a8-a7c0-4361-b85d-21d7b75449bb',
  LIST = '9b56eba5-d650-442c-9235-0f6fd3cc8a91',
}

export const PROPERTY_INPUT_TYPE: Record<PROPERTY_TYPE, string> = {
  [PROPERTY_TYPE.TEXT]: 'text',
  [PROPERTY_TYPE.NUMBER]: 'number',
  [PROPERTY_TYPE.BOOLEAN]: 'number',
  [PROPERTY_TYPE.LIST]: 'text',
}
