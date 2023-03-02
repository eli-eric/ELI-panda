// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'

type SystemDetail = {
  uid: string
  name: string
  parentPath: { name; uid }[]
  description: string
  systemType: string
  systemCode: string
  systemAlias: string
  location: string
  itemUID?: string
  owner: string
  importance: string
  zone: string
  subZoneCode: string
  criticalityClass: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.headers.authorization) {
    if (req.method === 'GET') {
      const getFakeName = () => faker.company.catchPhrase()
      const getFakePath = (): { name: string; uid: string }[] => {
        const length = faker.datatype.number({ min: 1, max: 5 })
        return [...Array(length)].map(() => ({
          uid: faker.datatype.uuid(),
          name: faker.company.catchPhrase()
        }))
      }
      const getFakeSystem = (): SystemDetail => {
        const uid = faker.datatype.uuid()
        const name = getFakeName()
        return {
          uid,
          name,
          parentPath: getFakePath(),
          description: `${faker.commerce.productDescription()} ${faker.lorem.paragraphs(
            2
          )}`,
          importance: faker.datatype.string(),
          zone: faker.datatype.string(),
          subZoneCode: faker.datatype.string(),
          systemCode: faker.datatype.string(),
          systemAlias: faker.datatype.string(),
          location: faker.datatype.string(),
          owner: faker.datatype.string(),
          itemUID: '4137b0f1-c8f8-4771-8487-7ce9428b22f8',
          criticalityClass: faker.datatype.string(),
          systemType: faker.datatype.string()
        }
      }
      res.status(200).json(getFakeSystem())
    }
    if (req.method === 'POST') {
      res.status(200).json({ message: 'OK' })
    }
    if (req.method === 'PUT') {
      res.status(200).json({ message: 'OK' })
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
