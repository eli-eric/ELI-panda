// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  if (req.headers.authorization) {
    res.status(200).json({ message: 'OK' })
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
