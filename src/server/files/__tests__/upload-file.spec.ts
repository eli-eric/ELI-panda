/**
 * @jest-environment node
 */
import type { NextApiRequest, NextApiResponse } from 'next'

import s3Client from '@/server/s3client'

import uploadFile from '../api/upload-file'
import { handleMiniImages } from '../service/image-service'

jest.mock('@/server/s3client', () => ({
    __esModule: true,
    default: { putObject: jest.fn(), statObject: jest.fn() },
    config: { bucket: 'test-bucket' },
}))

jest.mock('@/server/logger', () => ({
    __esModule: true,
    default: { info: jest.fn(), warn: jest.fn(), error: jest.fn() },
}))

jest.mock('../service/image-service', () => ({ handleMiniImages: jest.fn() }))

const putObject = s3Client.putObject as jest.Mock
const statObject = s3Client.statObject as jest.Mock
const miniImages = handleMiniImages as jest.Mock

// `/api/system/uid-1/images` -> getPathInfo yields prefix `system/uid-1/images/`,
// which contains `/image` and so triggers thumbnail generation.
const imageUploadRequest = () =>
    ({
        url: '/api/system/uid-1/images',
        body: {
            name: 'photo.png',
            payload: 'data:image/png;base64,aGVsbG8=',
            tags: ['a'],
        },
    }) as NextApiRequest

const mockResponse = () => {
    const res = {
        status: jest.fn(() => res),
        json: jest.fn(() => res),
    }
    return res as unknown as NextApiResponse & { status: jest.Mock; json: jest.Mock }
}

describe('uploadFile', () => {
    beforeEach(() => {
        jest.clearAllMocks()
        putObject.mockResolvedValue(undefined)
        statObject.mockResolvedValue({ size: 5 })
        miniImages.mockResolvedValue(undefined)
    })

    it('stores the file and returns 201', async () => {
        const res = mockResponse()

        await uploadFile(imageUploadRequest(), res)

        expect(putObject).toHaveBeenCalledTimes(1)
        expect(res.status).toHaveBeenCalledWith(201)
    })

    it('still returns 201 when thumbnail generation fails', async () => {
        // sharp cannot decode every type the galleries accept (they take image/*,
        // which includes bmp/ico). The original is already stored at this point.
        miniImages.mockRejectedValue(new Error('Input buffer contains unsupported image format'))
        const res = mockResponse()

        await uploadFile(imageUploadRequest(), res)

        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.status).not.toHaveBeenCalledWith(500)
    })

    it('returns 500 when storing the file itself fails', async () => {
        putObject.mockRejectedValue(new Error('minio is down'))
        const res = mockResponse()

        await uploadFile(imageUploadRequest(), res)

        expect(res.status).toHaveBeenCalledWith(500)
    })
})
