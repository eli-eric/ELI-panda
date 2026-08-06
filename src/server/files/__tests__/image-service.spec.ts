/**
 * @jest-environment node
 */
import sharp from 'sharp'
import { Readable } from 'stream'

import s3Client from '@/server/s3client'

import { resizeImageAndUpload } from '../service/image-service'
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

const putObject = s3Client.putObject as jest.Mock
const getObject = safeGetObject as jest.Mock
const statObject = safeStatObject as jest.Mock

const SOURCE_METADATA = { 'content-type': 'image/jpeg' }

const givenSourceImage = async (buffer: Buffer, metaData = SOURCE_METADATA) => {
    getObject.mockResolvedValue(Readable.from([buffer]))
    statObject.mockResolvedValue({ size: buffer.length, metaData })
}

const uploadedThumbnail = () => putObject.mock.calls[0][2] as Buffer

describe('resizeImageAndUpload', () => {
    beforeEach(() => {
        jest.clearAllMocks()
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

    it('rejects when the source cannot be decoded', async () => {
        await givenSourceImage(Buffer.from('not an image at all'))

        await expect(
            resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1'),
        ).rejects.toThrow('Failed to resize and upload image')
        expect(putObject).not.toHaveBeenCalled()
    })

    it('skips quietly when the source object is missing', async () => {
        getObject.mockResolvedValue(null)

        await resizeImageAndUpload('system/uid-1', 'system/uid-1/images/file-1')

        expect(putObject).not.toHaveBeenCalled()
    })
})
