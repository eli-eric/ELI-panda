// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.body && req.body.username === 'admin' && req.body.password === 'elipanda2022') {
    const user = {
      uid: '71864520-9e86-427c-901c-0c220f951775',
      username: 'admin',
      fullName: 'Albert Einstein',
      email: 'albert.einstein@eli-laser.eu',
      facility: 'ELI ERIC',
      roles: ['basics', 'catalogue-view', 'systems-view', 'reports-view'],
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOiIxMjM0NTY3ODk5In0.4UuocEvJTR3c1t2kB4f5lbRKfs5yKe7dW1Qtm_LITII'
    }

    res.status(200).json(user)
  } else if (req.body && req.body.username === 'test1' && req.body.password === 'test1') {
    const user = {
      uid: '71864520-9e86-427c-901c-0c220f951776',
      username: 'test1',
      fullName: 'Darth Vader',
      email: 'darth.vader@eli-laser.eu',
      facility: 'Sith Lord',
      roles: ['basics'],
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOiIxMjM0NTY3ODk5In0.4UuocEvJTR3c1t2kB4f5lbRKfs5yKe7dW1Qtm_LITII'
    }

    res.status(200).json(user)
  } else if (req.body && req.body.username === 'test2' && req.body.password === 'test2') {
    const user = {
      uid: '71864520-9e86-427c-901c-0c220f951777',
      username: 'test2',
      fullName: 'Albert Einstein',
      email: 'test2@eli-laser.eu',
      facility: 'ELI ERIC',
      roles: ['basics', 'catalogue-view'],
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOiIxMjM0NTY3ODk5In0.4UuocEvJTR3c1t2kB4f5lbRKfs5yKe7dW1Qtm_LITII'
    }

    res.status(200).json(user)
  } else if (req.body && req.body.username === 'test3' && req.body.password === 'test3') {
    const user = {
      uid: '71864520-9e86-427c-901c-0c220f951776',
      username: 'test3',
      fullName: 'Albert Einstein',
      email: 'test3@eli-laser.eu',
      facility: 'ELI ERIC',
      roles: ['basics', 'catalogue-view', 'systems-view'],
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOiIxMjM0NTY3ODk5In0.4UuocEvJTR3c1t2kB4f5lbRKfs5yKe7dW1Qtm_LITII'
    }

    res.status(200).json(user)
  } else if (req.body && req.body.username === 'test4' && req.body.password === 'test4') {
    const user = {
      uid: '71864520-9e86-427c-901c-0c220f951776',
      username: 'test4',
      fullName: 'Albert Einstein',
      email: 'test4@eli-laser.eu',
      facility: 'ELI ERIC',
      roles: ['basics', 'reports-view'],
      accessToken:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOiIxMjM0NTY3ODk5In0.4UuocEvJTR3c1t2kB4f5lbRKfs5yKe7dW1Qtm_LITII'
    }

    res.status(200).json(user)
  } else {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
