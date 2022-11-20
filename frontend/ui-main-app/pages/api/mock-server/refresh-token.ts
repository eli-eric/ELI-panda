// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {

  if (req.method === "POST") {
    if (req.headers.authorization) {
      res.status(200).json({ 'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOiIxMjM0NTY3ODk5In0.4UuocEvJTR3c1t2kB4f5lbRKfs5yKe7dW1Qtm_LITII' })
    } else {
      res.status(401).json({ 'message': "Unauthorized" })
    }
  } else {
    res.status(500).json({ 'message': 'Bad method' })
  }
}
