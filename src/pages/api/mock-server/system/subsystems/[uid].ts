// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.headers.authorization) {
    if (req.method === 'GET') {
      const getFakeName = () => faker.company.catchPhrase()

      const getFakeSystem = () => {
        const uid = faker.datatype.uuid()
        const name = getFakeName()
        return {
          uid,
          name
        }
      }
      const fetchFakeSystems = () => {
        const res = [...Array(faker.datatype.number({ min: 1, max: 5 }))]
        return res.map(() => getFakeSystem())
      }
      res.status(200).json(fetchFakeSystems())
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
