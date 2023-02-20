// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

import { CatalogueItems } from '../catalogue-mock-data'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const { slug } = req.query
  if (slug && slug.length === 2 && slug[1] === 'image') {
    const uid = slug[0]

    let filePath = path.resolve(
      '.',
      'mock-data/images/catalogue/item/' + uid + '/main.png',
    )
    if (!fs.existsSync(filePath))
      filePath = path.resolve(
        '.',
        'mock-data/images/catalogue/item/no-image.png',
      )

    const imageBuffer = fs.readFileSync(filePath)

    res.setHeader('Content-Type', 'image/png')
    res.send(imageBuffer)
  } else if (slug && slug.length === 1) {
    const uid = slug[0]

    let item = CatalogueItems.filter(f => f.uid === uid)

    if (item.length > 0) return res.status(200).json(item[0])
    else res.status(400).json({ message: 'Not found' })
  }
}
