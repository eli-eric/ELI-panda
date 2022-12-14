// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { SystemsTree, SystemTreeItem } from './../systems-mock-data'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    let result: Array<SystemTreeItem> = []
    result = SystemsTree
    res.status(200).json(result)
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
