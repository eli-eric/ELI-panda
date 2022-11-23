// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    //get category image
    const { slug } = req.query
    if (slug && slug.length === 2 && slug[1] === 'image') {
      const uid = slug[0]

      let filePath = path.resolve('.', 'mock-data/images/catalogue/category/' + uid + '/image.png')
      if (!fs.existsSync(filePath))
        filePath = path.resolve('.', 'mock-data/images/catalogue/category/no-image.png')

      const imageBuffer = fs.readFileSync(filePath)

      res.setHeader('Content-Type', 'image/png')
      res.send(imageBuffer)
    } else res.status(400).json({ message: 'Bad request' })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
