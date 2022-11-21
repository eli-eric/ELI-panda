// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { AllCategories, CategoryResponse } from '../catalogue-mock-data';

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    if (req.headers.authorization) {

        ////this will be implemented later with items filtering func.
        //const searchParam = req.query["search"]

        const { slug } = req.query;
        let result: Array<CategoryResponse> = []
        //default we want root cateogries = undefined slug
        let parentPath = ""
        //if slug is definded we want children of presented parentPath
        if (slug && typeof (slug) === "object") {
            let parentPath = slug.join("/").toLowerCase()
        }

        result = AllCategories.filter(f => f.parentPath === parentPath)

        res.status(200).json(result)
    } else {
        res.status(401).json({ message: 'Unauthorized' })
    }
}
