import type { NextApiRequest, NextApiResponse } from 'next'
import handler from 'src/modules/fileManager/handler'

export default async (req: NextApiRequest, res: NextApiResponse) => handler(req, res)
