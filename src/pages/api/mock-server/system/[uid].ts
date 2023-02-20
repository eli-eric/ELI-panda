// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs'
import type { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'

import { SystemDetail } from '../systems/systems-mock-data'
import { generateUid, updateSystemObject } from './helpers/helpers'
import { addTreeObject } from './helpers/helpers'
import {
  deleteTreeObject,
  jsonWrite,
  updateTreeObject,
} from './helpers/helpers'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.headers.authorization) {
    const { uid } = req.query
    const jsonPathSystemTree = path.resolve(
      process.cwd(),
      'pages',
      'api',
      'mock-server',
      'systems',
      'data',
      'systems-tree.json',
    )
    const jsonPathSystem = path.resolve(
      process.cwd(),
      'pages',
      'api',
      'mock-server',
      'systems',
      'data',
      'systems.json',
    )

    if (req.method === 'GET') {
      const item = SystemDetail.find(item => item.uid === uid)
      if (!item) {
        res.status(404).json({ message: 'Object not found' })
        return
      }
      res.status(200).json({ systemInfo: item })
    }
    if (req.method === 'PUT') {
      const newData = req.body
      console.log(req.body)
      fs.readFile(jsonPathSystemTree, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({ message: 'Error reading JSON file' })
          return
        }
        const jsonData = JSON.parse(data)
        updateTreeObject(jsonData, uid, {
          name: newData.name,
          systemCode: newData.systemCode,
        })
        jsonWrite(jsonPathSystemTree, jsonData, res).finally(() => {
          fs.readFile(jsonPathSystem, 'utf8', (err, data) => {
            if (err) {
              res.status(500).json({ message: 'Error reading JSON file' })
              return
            }
            const jsonData = JSON.parse(data)
            updateSystemObject(jsonData, uid, newData)
            jsonWrite(jsonPathSystem, jsonData, res).finally(() => {
              res
                .status(200)
                .json({ message: 'JSON file updated successfully' })
            })
          })
        })
      })
    }
    if (req.method === 'POST') {
      const newChild = req.body
      newChild.uid = generateUid()

      fs.readFile(jsonPathSystemTree, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({ message: 'Error reading JSON file' })
          return
        }
        const jsonData = JSON.parse(data)
        addTreeObject(jsonData, uid, {
          name: newChild.name,
          uid: newChild.uid,
          systemCode: newChild.systemCode,
        })
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
    }
    if (req.method === 'DELETE') {
      const itemIndex = SystemDetail.findIndex(item => item.uid === uid)

      fs.readFile(jsonPathSystemTree, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({ message: 'Error reading JSON file' })
          return
        }
        const jsonData = JSON.parse(data)
        deleteTreeObject(jsonData, uid)
        jsonWrite(jsonPathSystemTree, jsonData, res)
      })
      fs.readFile(jsonPathSystem, 'utf8', (err, data) => {
        if (err) {
          res.status(500).json({ message: 'Error reading JSON file' })
          return
        }
        const jsonData = JSON.parse(data)
        jsonData.splice(itemIndex, 1)
        jsonWrite(jsonPathSystem, jsonData, res)
      })
      res.status(200).json({ message: 'JSON file updated successfully' })
    }
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
