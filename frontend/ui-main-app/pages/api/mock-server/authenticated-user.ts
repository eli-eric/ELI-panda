// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (req.headers.authorization) {
    res.status(200).json({
      "uid": "71864520-9e86-427c-901c-0c220f951775",
      "username": "albert.einstein@eli-laser.eu",
      "fullName": "Albert Einstein",
      "facility": "ELI ERIC"
    })
  } else {
    res.status(401).json({ 'message': "Unauthorized" })
  }
}
