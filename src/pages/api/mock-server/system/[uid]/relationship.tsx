// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { faker } from '@faker-js/faker'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    const getDirection = () => {
      var textArray = ['from', 'to']
      var randomNumber = Math.floor(Math.random() * textArray.length)
      return textArray[randomNumber]
    }
    const getRelation = () => {
      var textArray = ['HAS_SUBSYSTEM', 'IS_SPARE_FOR']
      var randomNumber = Math.floor(Math.random() * textArray.length)
      return textArray[randomNumber]
    }
    const getFakeRelation = () => {
      return {
        direction: getDirection(),
        relationTypeCode: getRelation(),
        foreignSystemName: faker.company.catchPhrase(),
        relationUid: faker.datatype.uuid()
      }
    }
    const fetchFakeRelations = () => {
      const res = [...Array(faker.datatype.number({ min: 1, max: 10 }))]

      return res.map(() => getFakeRelation())
    }
    res.status(200).json(fetchFakeRelations())
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
