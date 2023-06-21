// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CodebookType } from '@/hooks/fetch/useCodebook'
import { SystemDetail } from '@/modules/systems/types/responses'
import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'

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
  if (req.method === 'GET') {
    const systems = makeData(30)
    const timeout = faker.datatype.number({ min: 0, max: 0 })
    const timer = setTimeout(() => {
      res.status(200).json(systems)
    }, timeout)
  }
}
