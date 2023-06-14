// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'

type SystemDetail = {
  uid: string
  name: string
  systemCode?: string
  systemAlias?: string
  subSystems?: SystemDetail[]
}

type SystemsResponse = {
  data: SystemDetail[]
  totalCount: number
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newSystem = (): SystemDetail => {
  return {
    uid: faker.datatype.uuid(),
    name: faker.name.lastName(),
    systemCode: faker.commerce.productName(),
    systemAlias: faker.commerce.productName()
  }
}

function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): SystemDetail[] => {
    const len = lens[depth]!
    return range(len).map((d): SystemDetail => {
      return {
        ...newSystem(),
        subSystems: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      }
    })
  }
  return makeDataLevel()
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    if (req.method === 'GET') {
      const systems = makeData(100, 5, 3)
      const timeout = faker.datatype.number({ min: 50, max: 200 })
      const timer = setTimeout(() => {
        res.status(200).json({ data: systems, totalCount: systems.length })
      }, timeout)
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
