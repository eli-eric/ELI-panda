// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.headers.authorization) {
    const getFakeSystem = () => {
      return {
        name: faker.company.catchPhrase(),
        systemType: faker.datatype.string(),
        systemCodePath: faker.datatype.string(),
        uid: faker.datatype.uuid()
      }
    }
    const fetchFakeSystems = () => {
      const res = [...Array(faker.datatype.number({ min: 0, max: 10 }))]
      return res.map(() => getFakeSystem())
    }
    const systems = fetchFakeSystems()
    res.status(200).json({ systems, count: systems.length })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
