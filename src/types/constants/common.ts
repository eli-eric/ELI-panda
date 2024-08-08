import type { FileItem } from '@/modules/shared/fileManager/types'

export const BASE_URL =
  process.env.PANDA_API_GW_URL ?? 'http://localhost:5001/api/mock-server'

export const APP_VERSION = 'ver. 0.0.1'

export enum ENV {
  DEV = 'dev',
  TEST = 'test',
  LOCAL = 'localhost'
}

export const PROCESS_ENV = process.env.PANDA_ENV
export const APP_BASE_URL =
  PROCESS_ENV == ENV.DEV
    ? 'https://dev.panda.eli-beams.eu'
    : PROCESS_ENV == ENV.TEST
      ? 'https://test.panda.eli-beams.eu'
      : PROCESS_ENV == ENV.LOCAL
        ? 'http://localhost:5001'
        : 'https://panda.eli-laser.eu'

export const fallbackImage: FileItem = {
  id: 'fallback',
  name: 'fallback image',
  url: '/no-image.png',
  size: 0
}
