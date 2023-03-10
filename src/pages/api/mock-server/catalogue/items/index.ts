// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { CatalogueItemPagingResponse, CatalogueItems } from '../catalogue-mock-data'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.headers.authorization) {
    let dataResult = CatalogueItems

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
      //ther could be possibly more words - we will split them by space and will filter by all of them by AND logic
      const searchWords = searchParam.split(' ')

      searchWords.forEach(wordToSearch => {
        const searchString = wordToSearch.toLocaleLowerCase()

        dataResult = dataResult.filter(
          f =>
            f.name.toLowerCase().includes(searchString) ||
            f.description.toLowerCase().includes(searchString) ||
            f.manufacturer.toLowerCase().includes(searchString) ||
            f.manufacturerNumber.toLowerCase().includes(searchString) ||
            (f.details != null &&
              f.details?.filter(
                df => df.value !== null && df.value.toLowerCase().includes(searchString)
              ).length > 0)
        )
      })
    }

    if (categoryPathParam && typeof categoryPathParam === 'string') {
      dataResult = dataResult.filter(f =>
        f.categoryPath.startsWith(categoryPathParam.toLowerCase())
      )
    }

    const totalCount = dataResult.length

    dataResult = dataResult.sort((a, b) => (a.name < b.name ? -1 : 0)).slice(startIndex, endIndex) //.filter(f => f.parentPath === parentPath)

    const result: CatalogueItemPagingResponse = {
      totalCount: totalCount,
      data: dataResult
    }

    res.status(200).json(result)
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
