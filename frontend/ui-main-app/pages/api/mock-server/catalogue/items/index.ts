// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { AllCatalogueItems, CatalogueItemPagingResponse } from '../catalogue-mock-data'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    let dataResult = AllCatalogueItems

    const pageNumParam = req.query['page']
    const pageSizeParam = req.query['pageSize']
    const searchParam = req.query['search']
    const categoryPathParam = req.query['categoryPath']

    let pageNum = pageNumParam && typeof pageNumParam === 'string' ? parseInt(pageNumParam) : 1
    let pageSize = pageSizeParam && typeof pageSizeParam === 'string' ? parseInt(pageSizeParam) : 10
    pageNum = pageNum - 1
    let startIndex = pageNum * pageSize
    let endIndex = startIndex + pageSize

    if (searchParam && typeof searchParam === 'string') {
      dataResult = dataResult.filter(f => f.name.toLowerCase().includes(searchParam))
    }

    if (categoryPathParam && typeof categoryPathParam === 'string') {
      dataResult = dataResult.filter(f => f.categoryPath === categoryPathParam.toLowerCase())
    }

    dataResult = dataResult.sort((a, b) => (a.name < b.name ? -1 : 0)).slice(startIndex, endIndex) //.filter(f => f.parentPath === parentPath)

    const result: CatalogueItemPagingResponse = {
      totalCount: AllCatalogueItems.length,
      data: dataResult
    }

    res.status(200).json(result)
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
