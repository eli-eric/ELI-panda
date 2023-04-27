// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'

type SystemCodebok = { uid: string; name: string }
type ParentPath = { name: string; uid: string }[]
type Order = {
  uid: string
  name: string
  orderNumber: number
  requestNumber: number
  contractNumber: number
  supplier: string
  orderStatus: string
  notes: string
  orderDate: string
}
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    if (req.method === 'GET') {
      const getFakeName = () => faker.company.catchPhrase()
      const getFakeOrder = (): Order => {
        const uid = faker.datatype.uuid()
        const name = getFakeName()
        return {
          uid,
          name,
          orderNumber: faker.datatype.number({ min: 99944, max: 1234567 }),
          requestNumber: faker.datatype.number({ min: 99944, max: 1234567 }),
          contractNumber: faker.datatype.number({ min: 99944, max: 1234567 }),
          supplier: faker.company.catchPhrase(),
          notes: faker.datatype.string(),
          orderStatus: faker.word.adjective(),
          orderDate: '2023-04-26T10:45:28.363976432+02:00'
        }
      }
      const fetchFakeOrders = () => {
        const res = [...Array(faker.datatype.number({ min: 50, max: 100 }))]
        return res.map(() => getFakeOrder())
      }

      const systems = fetchFakeOrders()
      const timeout = faker.datatype.number({ min: 50, max: 500 })
      const timer = setTimeout(() => {
        res.status(200).json({ data: systems, totalCount: systems.length === 0 ? 0 : 45 })
      }, timeout)
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
