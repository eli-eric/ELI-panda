// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const { uid } = req.query
  if (uid) {
    let filePath = path.resolve('.', 'mock-data/images/catalogue/item/' + uid + '/main.png')
    if (!fs.existsSync(filePath))
      filePath = path.resolve('.', 'mock-data/images/catalogue/item/no-image.png')

    const imageBuffer = fs.readFileSync(filePath)

    res.setHeader('Content-Type', 'image/png')
    res.send(imageBuffer)
  } else res.status(400).json({ message: 'Not found' })
}
