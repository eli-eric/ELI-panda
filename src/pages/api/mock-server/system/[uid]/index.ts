// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'

type SystemCodebok = { uid: string; name: string }
type ParentPath = { name: string; uid: string }[]

type SystemDetailResponse = {
  uid: string
  name: string
  parentPath: ParentPath
  description?: string
  location?: SystemCodebok
  zone?: SystemCodebok
  systemType?: SystemCodebok
  systemCode?: string
  systemAlias?: string
  owner?: SystemCodebok
  importance?: SystemCodebok
  itemUID?: string
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

      const getFakeCodebook = () => ({
        uid: faker.datatype.uuid(),
        name: faker.company.catchPhrase()
      })
      const getFakeSystem = (): SystemDetailResponse => {
        const uid = faker.datatype.uuid()
        const name = getFakeName()
        return {
          uid,
          name,
          parentPath: getFakePath(),
          description: `${faker.commerce.productDescription()} ${faker.lorem.paragraphs(
            2
          )}`,
          importance: getFakeCodebook(),
          zone: getFakeCodebook(),
          systemCode: faker.datatype.string(),
          systemAlias: faker.datatype.string(),
          location: getFakeCodebook(),
          owner: getFakeCodebook(),
          itemUID: undefined,
          systemType: getFakeCodebook()
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
