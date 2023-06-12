// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PROPERTY_TYPE } from '@/types/catalogue/constants'
import type { NextApiRequest, NextApiResponse } from 'next'

const fakeItem = [
  {
    property: {
      name: 'Inlet flange type',
      unit: '',
      type: {
        uid: PROPERTY_TYPE.NUMBER,
        name: '100MEGA DISTRIBUTION s.r.o.'
      },
      defaultValue: '0'
    },
    propertyGroup: 'Flanges',
    value: 'ISO-KF'
  },
  {
    property: {
      name: 'Inlet flange size ',
      unit: '',
      type: {
        uid: PROPERTY_TYPE.NUMBER
      }
    },
    propertyGroup: 'Flanges',
    value: '1123'
  },
  {
    property: {
      name: 'Outlet flange type',
      unit: '',
      type: {
        uid: PROPERTY_TYPE.LIST
      },
      listOfValues: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'],
      defaultValue: 'c'
    },
    propertyGroup: 'Flanges',
    value: 'ISO-KF'
  },
  {
    property: {
      name: 'Outlet flange size',
      unit: '',
      type: {
        uid: PROPERTY_TYPE.TEXT
      }
    },
    propertyGroup: 'Flanges',
    value: 'DN 16'
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  res.status(200).json(fakeItem)
}
