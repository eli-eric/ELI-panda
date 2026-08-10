/**
 * @jest-environment node
 */
import sharp from 'sharp'
import { Readable } from 'stream'

import s3Client from '@/server/s3client'

import { listObjectsWithMetadata } from '../api/list-files'
import { handleMiniImages, ImageDecodeError, resizeImageAndUpload } from '../service/image-service'
import { saveUrlsToNode } from '../service/node-service'
import { safeGetObject, safeStatObject } from '../utils/s3-error-utils'

jest.mock('@/server/s3client', () => ({
    __esModule: true,
    default: { putObject: jest.fn() },
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

jest.mock('../api/list-files', () => ({ listObjectsWithMetadata: jest.fn() }))
jest.mock('../service/node-service', () => ({ saveUrlsToNode: jest.fn() }))
jest.mock('next-auth/jwt', () => ({ getToken: jest.fn().mockResolvedValue({ sub: 'user-1' }) }))

const putObject = s3Client.putObject as jest.Mock
const getObject = safeGetObject as jest.Mock
const statObject = safeStatObject as jest.Mock
const listObjects = listObjectsWithMetadata as jest.Mock
const saveUrls = saveUrlsToNode as jest.Mock

const SOURCE_METADATA = { 'content-type': 'image/jpeg' }

const givenSourceImage = async (buffer: Buffer, metaData = SOURCE_METADATA) => {
    getObject.mockResolvedValue(Readable.from([buffer]))
    statObject.mockResolvedValue({ size: buffer.length, metaData })
}

const uploadedThumbnail = () => putObject.mock.calls[0][2] as Buffer

describe('resizeImageAndUpload', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        putObject.mockResolvedValue(undefined)
    })

    it('writes a 100px-wide PNG thumbnail to the image-small directory', async () => {
        const source = await sharp({
            create: { width: 400, height: 200, channels: 3, background: '#ff0000' },
        })
            .jpeg()
            .toBuffer()
        await givenSourceImage(source)

        await resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1')

        expect(putObject).toHaveBeenCalledTimes(1)
        const [bucket, key, buffer, size] = putObject.mock.calls[0]
        expect(bucket).toBe('test-bucket')
        expect(key).toBe('system/uid-1/image-small/file-1')
        expect(size).toBe(buffer.length)

        const thumbnail = await sharp(uploadedThumbnail()).metadata()
        expect(thumbnail.format).toBe('png')
        expect(thumbnail.width).toBe(100)
    })

    it('preserves the aspect ratio, as Jimp.AUTO did', async () => {
        const source = await sharp({
            create: { width: 400, height: 200, channels: 3, background: '#00ff00' },
        })
            .png()
            .toBuffer()
        await givenSourceImage(source, { 'content-type': 'image/png' })

        await resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1')

        const thumbnail = await sharp(uploadedThumbnail()).metadata()
        expect(thumbnail.height).toBe(50)
    })

    it('copies webp sources through untouched instead of re-encoding them', async () => {
        const source = await sharp({
            create: { width: 400, height: 200, channels: 3, background: '#0000ff' },
        })
            .webp()
            .toBuffer()
        await givenSourceImage(source, { 'content-type': 'image/webp' })

        await resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1')

        expect(uploadedThumbnail()).toEqual(source)
    })

    it('applies EXIF orientation, as jimp did implicitly', async () => {
        // Orientation 6 means "rotate 90° CW to display", so a 400x200 source is really
        // a 200x400 image. The PNG encode drops the tag, so if we do not bake the
        // rotation in here nothing downstream can: the thumbnail is sideways forever.
        const source = await sharp({
            create: { width: 400, height: 200, channels: 3, background: '#ff00ff' },
        })
            .jpeg()
            .withMetadata({ orientation: 6 })
            .toBuffer()
        await givenSourceImage(source)

        await resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1')

        const thumbnail = await sharp(uploadedThumbnail()).metadata()
        expect(thumbnail.width).toBe(100)
        expect(thumbnail.height).toBe(200)
    })

    it('decodes truncated JPEGs rather than aborting, as jimp did', async () => {
        // sharp defaults to failOn:'warning', which throws "premature end of JPEG image"
        // on a partial upload that is still largely decodable.
        const full = await sharp({
            create: { width: 400, height: 200, channels: 3, background: '#0a0' },
        })
            .jpeg()
            .toBuffer()
        await givenSourceImage(full.subarray(0, Math.floor(full.length * 0.6)))

        await resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1')

        const thumbnail = await sharp(uploadedThumbnail()).metadata()
        expect(thumbnail.width).toBe(100)
    })

    it('raises ImageDecodeError when the source cannot be decoded, keeping the cause', async () => {
        await givenSourceImage(Buffer.from('not an image at all'))

        const rejection = resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1')

        await expect(rejection).rejects.toBeInstanceOf(ImageDecodeError)
        await expect(rejection).rejects.toHaveProperty('cause')
        expect(putObject).not.toHaveBeenCalled()
    })

    it('does not disguise a thumbnail store failure as a decode failure', async () => {
        const source = await sharp({
            create: { width: 400, height: 200, channels: 3, background: '#abc' },
        })
            .png()
            .toBuffer()
        await givenSourceImage(source, { 'content-type': 'image/png' })
        putObject.mockRejectedValue(new Error('minio is down'))

        const rejection = resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1')

        await expect(rejection).rejects.toThrow('Failed to resize and upload image')
        await expect(rejection).rejects.not.toBeInstanceOf(ImageDecodeError)
    })

    it('skips quietly when the source object is missing', async () => {
        getObject.mockResolvedValue(null)

        await resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1')

        expect(putObject).not.toHaveBeenCalled()
    })
})

describe('handleMiniImages', () => {
    // `/api/system/uid-1/images/` -> prefix `system/uid-1/images/`, uid `uid-1`.
    const request = { url: '/api/system/uid-1/images/' } as any

    beforeEach(() => {
        // clearAllMocks wipes calls but keeps implementations, so restore the happy
        // path explicitly - otherwise a rejection set by one test leaks into the next.
        jest.clearAllMocks()
        putObject.mockResolvedValue(undefined)
        listObjects.mockResolvedValue([{ name: 'system/uid-1/image-small/file-0' }])
        saveUrls.mockResolvedValue(undefined)
    })

    it('still refreshes the node URL list when the image cannot be thumbnailed', async () => {
        // The whole point of tolerating undecodable uploads: the node must still pick up
        // the thumbnails that DO exist, rather than silently keeping a stale list.
        await givenSourceImage(Buffer.from('a bmp sharp cannot read'))

        await expect(
            handleMiniImages({ req: request, id: 'file-1', isDelete: false }),
        ).resolves.toBeUndefined()

        expect(saveUrls).toHaveBeenCalledTimes(1)
        expect(saveUrls).toHaveBeenCalledWith(
            'uid-1',
            ['/api/system/uid-1/image-small/file-0'],
            { sub: 'user-1' },
            'System',
        )
    })

    it('propagates an S3 failure instead of mistaking it for an undecodable image', async () => {
        const source = await sharp({
            create: { width: 400, height: 200, channels: 3, background: '#abc' },
        })
            .png()
            .toBuffer()
        await givenSourceImage(source, { 'content-type': 'image/png' })
        putObject.mockRejectedValue(new Error('minio is down'))

        await expect(
            handleMiniImages({ req: request, id: 'file-1', isDelete: false }),
        ).rejects.toThrow('Failed to resize and upload image')
        expect(saveUrls).not.toHaveBeenCalled()
    })

    it('propagates a node URL sync failure so the caller can 500', async () => {
        const source = await sharp({
            create: { width: 400, height: 200, channels: 3, background: '#fff' },
        })
            .png()
            .toBuffer()
        await givenSourceImage(source, { 'content-type': 'image/png' })
        saveUrls.mockRejectedValue(new Error('graph is unreachable'))

        await expect(
            handleMiniImages({ req: request, id: 'file-1', isDelete: false }),
        ).rejects.toThrow('graph is unreachable')
    })
})
