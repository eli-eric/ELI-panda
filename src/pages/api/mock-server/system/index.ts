// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    if (req.method === 'GET') {
      const getFakeName = () => faker.company.catchPhrase()

      const getFakePath = (): string[] => {
        const length = faker.datatype.number({ min: 0, max: 10 })
        return [...Array(length)].map(() => faker.datatype.uuid())
      }

      const getFakeSystem = () => {
        const uid = faker.datatype.uuid()
        const name = getFakeName()
        return {
          uid,
          name,
          path: getFakePath(),
          description: `${faker.commerce.productDescription()} ${faker.lorem.paragraphs(2)}`,
          children: getFakePath(),
          importanceCode: faker.datatype.string(),
          zoneCode: faker.datatype.string(),
          subZoneCode: faker.datatype.string(),
          systemCode: faker.datatype.string(),
          systemAlias: faker.datatype.string(),
          locationCode: faker.datatype.string(),
          ownerUID: faker.datatype.string(),
          catalogueUID: faker.datatype.uuid()
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
