/**
 * @jest-environment node
 *
 * Simulates a broken native binding - the Alpine runner failing to resolve
 * `@img/sharp-linuxmusl-x64`. Isolated in its own file because the mock has to
 * fail at module-resolution time, which would poison every other suite.
 */
import { Readable } from 'stream'

import s3Client from '@/server/s3client'

import { handleMiniImages, ImageDecodeError, resizeImageAndUpload } from '../service/image-service'
import { saveUrlsToNode } from '../service/node-service'
import { safeGetObject, safeStatObject } from '../utils/s3-error-utils'

jest.mock('sharp', () => {
    throw new Error("Could not load the 'sharp' module using the linuxmusl-x64 runtime")
})

jest.mock('@/server/s3client', () => ({
    __esModule: true,
    default: { putObject: jest.fn(), removeObject: jest.fn() },
    config: { bucket: 'test-bucket' },
}))

jest.mock('@/server/logger', () => ({
    __esModule: true,
    default: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}))

jest.mock('../utils/s3-error-utils', () => ({
    safeGetObject: jest.fn(),
    safeStatObject: jest.fn(),
}))

jest.mock('../api/list-files', () => ({
    listObjectsWithMetadata: jest.fn().mockResolvedValue([
        { name: 'system/uid-1/image-small/file-0' },
    ]),
}))
jest.mock('../service/node-service', () => ({ saveUrlsToNode: jest.fn() }))
jest.mock('next-auth/jwt', () => ({ getToken: jest.fn().mockResolvedValue({ sub: 'user-1' }) }))

const request = { url: '/api/system/uid-1/images/' } as any

beforeEach(() => {
    jest.clearAllMocks()
    ;(saveUrlsToNode as jest.Mock).mockResolvedValue(undefined)
    ;(safeGetObject as jest.Mock).mockResolvedValue(Readable.from([Buffer.from('anything')]))
    ;(safeStatObject as jest.Mock).mockResolvedValue({
        size: 8,
        metaData: { 'content-type': 'image/jpeg' },
    })
})

describe('when the sharp native binding cannot be loaded', () => {
    it('does not import sharp on the delete path', async () => {
        // remove-file.ts reaches this module and never needs sharp. Before the lazy
        // import, a broken binding took the whole route down at module load.
        await expect(
            handleMiniImages({ req: request, id: 'file-1', isDelete: true }),
        ).resolves.toBeUndefined()
        expect(saveUrlsToNode).toHaveBeenCalledTimes(1)
    })

    it('does not import sharp for a webp copy-through', async () => {
        ;(safeStatObject as jest.Mock).mockResolvedValue({
            size: 8,
            metaData: { 'content-type': 'image/webp' },
        })

        await resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1')

        expect(s3Client.putObject).toHaveBeenCalledTimes(1)
    })

    it('fails loudly rather than silently skipping thumbnails', async () => {
        // A broken install is infrastructure, not an undecodable image: it must not be
        // swallowed by the tolerant path, or every upload quietly loses its preview.
        const rejection = resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1')

        await expect(rejection).rejects.toThrow('Failed to resize and upload image')
        await expect(rejection).rejects.not.toBeInstanceOf(ImageDecodeError)
    })

    it('propagates that failure through handleMiniImages so the upload 500s', async () => {
        await expect(
            handleMiniImages({ req: request, id: 'file-1', isDelete: false }),
        ).rejects.toThrow('Failed to resize and upload image')
        expect(saveUrlsToNode).not.toHaveBeenCalled()
    })
})
