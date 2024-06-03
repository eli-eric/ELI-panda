import type { NextApiRequest } from 'next'
import winston from 'winston'

export const composeDebugMessage = (req: NextApiRequest, message: string) =>
  `Request URL: ${req.url} | Method: ${req.method} | ${message}`

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
})

export default logger
