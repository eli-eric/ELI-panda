// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

import { generateUid, jsonWrite } from './helpers/helpers'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    const jsonPathSystemTree = path.resolve(
      process.cwd(),
      'pages',
      'api',
      'mock-server',
      'systems',
      'data',
      'systems-tree.json'
    )
    const jsonPathSystem = path.resolve(process.cwd(), 'pages', 'api', 'mock-server', 'systems', 'data', 'systems.json')

    if (req.method === 'POST') {
      const newChild = req.body
      newChild.uid = generateUid()
      fs.readFile(jsonPathSystemTree, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({ message: 'Error reading JSON file' })
          return
        }
        const jsonData = JSON.parse(data)
        jsonData.push({ name: newChild.name, uid: newChild.uid, systemCode: newChild.systemCode })
        jsonWrite(jsonPathSystemTree, jsonData, res)
      })
      fs.readFile(jsonPathSystem, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({ message: 'Error reading JSON file' })
          return
        }
        const jsonData = JSON.parse(data)
        jsonData.push(newChild)
        jsonWrite(jsonPathSystem, jsonData, res)
      })
      res.status(200).json({ message: 'JSON file updated successfully' })
    } else {
      res.status(500).json({ message: 'Bad request' })
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
