// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.body && req.body.username === 'admin' && req.body.password === 'elipanda2022') {

    const user = {
      uid: '71864520-9e86-427c-901c-0c220f951775',
      username: 'admin',
      email: 'albert.einstein@eli-laser.eu',
      facility: 'ELI ERIC',
      roles: ['catalogue-view', 'systems-view'],
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOiIxMjM0NTY3ODk5In0.4UuocEvJTR3c1t2kB4f5lbRKfs5yKe7dW1Qtm_LITII'
    }

    res
      .status(200)
      .json(user)
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
