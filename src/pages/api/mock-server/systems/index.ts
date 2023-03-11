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
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
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

      const getFakeCodebook = (uid: string, name?: string) => ({
        uid: uid,
        name: name || faker.company.catchPhrase()
      })
      const getFakeSystem = (): SystemDetailResponse => {
        const uid = 'f5fcf985-ec36-45c6-afcf-4fb56bd6920f'
        const name = getFakeName()
        return {
          uid,
          name,
          parentPath: getFakePath(),
          description: `${faker.commerce.productDescription()} ${faker.lorem.paragraphs(2)}`,
          importance: getFakeCodebook('d6a216b0-7e25-4de7-a762-132d9c68bd63'),
          zone: getFakeCodebook('c0873468-d49f-45d8-b9ad-beb83d9c9772'),
          systemCode: faker.datatype.string(),
          systemAlias: faker.datatype.string(),
          location: getFakeCodebook(
            'II.01.02',
            'II.01.02 - Reception and staircase - ELI2 building > Ground floor'
          ),
          owner: getFakeCodebook('71864520-9e86-427c-901c-0c220f951775', 'Administrator Admin'),
          itemUID: undefined,
          systemType: getFakeCodebook('8783fa8c-cfd3-4519-830f-5bfd05166ad9')
        }
      }
      const fetchFakeSystems = () => {
        const res = [...Array(faker.datatype.number({ min: 0, max: 10 }))]
        return res.map(() => getFakeSystem())
      }

      const systems = fetchFakeSystems()
      res.status(200).json({ data: systems, totalCount: systems.length === 0 ? 0 : 45 })
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
