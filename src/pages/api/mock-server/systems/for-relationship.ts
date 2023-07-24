import { SystemDetail } from '@/modules/systems/types/responses'
import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'

type SystemsResponse = {
  data: SystemDetail[]
  totalCount: number
}

const range = (len: number) => {
  const arr = []
  for (let i = 0; i < len; i++) {
    arr.push(i as never)
  }
  return arr
}

const newSystem = (): SystemDetail => {
  return {
    uid: faker.datatype.uuid(),
    name: faker.name.lastName(),
    systemCode: faker.commerce.productName(),
    systemAlias: faker.commerce.productName(),
    description: faker.commerce.productName(),
    location: {
      uid: faker.datatype.uuid(),
      name: faker.name.lastName()
    },
    zone: {
      uid: faker.datatype.uuid(),
      name: faker.name.lastName()
    },
    systemType: {
      uid: faker.datatype.uuid(),
      name: faker.name.lastName()
    },
    owner: {
      uid: faker.datatype.uuid(),
      name: faker.name.lastName()
    },
    importance: {
      uid: faker.datatype.uuid(),
      name: faker.name.lastName()
    },
    hasSubsystems: faker.datatype.boolean()
  }
}

function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): SystemDetail[] => {
    const len = lens[depth]!
    return range(len).map((d): SystemDetail => {
      return {
        ...newSystem()
        //subSystems: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      }
    })
  }
  return makeDataLevel()
}

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    if (req.method === 'GET') {
      const systems = makeData(10)
      const timeout = faker.datatype.number({ min: 50, max: 200 })
      const timer = setTimeout(() => {
        res.status(200).json({ data: systems, totalCount: 1000 })
      }, timeout)
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
