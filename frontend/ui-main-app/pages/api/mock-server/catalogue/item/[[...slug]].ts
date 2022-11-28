// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  
    const { slug } = req.query
    if (slug && slug.length === 2 && slug[1] === 'image') {
      const uid = slug[0]

      let filePath = path.resolve('.', 'mock-data/images/catalogue/item/' + uid + '/main.png')
      if (!fs.existsSync(filePath))
        filePath = path.resolve('.', 'mock-data/images/catalogue/item/no-image.png')

      const imageBuffer = fs.readFileSync(filePath)

      res.setHeader('Content-Type', 'image/png')
      res.send(imageBuffer)
  
}
}
