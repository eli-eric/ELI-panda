// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

const categoryMockObject = {
  uid: '9b56eba5-d650-442c-9235-0f6fd3cc8a91',
  name: 'Capacity Inductors',
  code: 'capacity-inductors',
  groups: [
    {
      uid: '9b56eba5-d650-442c-9235-0f6fd3cc8a91',
      name: 'Group 1',
      properties: [
        {
          uid: '9b56eba5-d650-442c-9235-0f6fd3cc8a91',
          name: 'Capacity',
          typeUID: '45f0d238-4067-4033-9e52-58f1d454b6d3',
          unitUID: '00f9909d-0adf-43ef-9cb2-49bc1c4bcc52',
          defaultValue: '25'
        },
        {
          uid: '9b56eba5-d650-442c-9235-0f6fd3cc8a91',
          name: 'Relative parts',
          typeUID: '9b56eba5-d650-442c-9235-0f6fd3cc8a91',
          unitUID: '',
          defaultValue: '',
          listOfValues: ['a', 'b', 'c']
        }
      ]
    },
    {
      uid: '9b56eba5-d650-442c-9235-0f6fd3cc8a91',
      name: 'Group 2',
      properties: [
        {
          uid: '9b56eba5-d650-442c-9235-0f6fd3cc8a91',
          name: 'Chips',
          typeUID: 'be2d4bd1-602b-42e6-a0ee-7e24324b75bb',
          unitUID: '',
          defaultValue: ''
        }
      ]
    }
  ]
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    if (req.method === 'GET') {
      res.status(200).json(categoryMockObject)
    }
    if (req.method === 'DELETE') res.status(404).json({ message: 'OK' })
    if (req.method === 'PUT') res.status(404).json({ message: 'OK' })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
