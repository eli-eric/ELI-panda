import type { NextApiRequest, NextApiResponse } from 'next'
import type { Session } from 'next-auth'
import winston from 'winston'

export const composeDebugMessage = (req: NextApiRequest, message: string) =>
    `Request URL: ${req.url} | Method: ${req.method} | ${message}`

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        }),
    ],
})

export default logger

interface GraphQLRequestBody {
    operationName?: string
    variables?: Record<string, unknown>
    query?: string
}

interface GraphQLResponse {
    data?: unknown
    errors?: Array<{ message: string }>
}

const formatVariables = (variables?: Record<string, unknown>): string => {
    if (!variables) return ''
    const keys = Object.keys(variables)
    if (keys.length === 0) return ''
    return ` | vars: ${keys.join(', ')}`
}

const formatResponseStatus = (response: GraphQLResponse): string => {
    if (response.errors?.length) {
        const errorMessages = response.errors.map(e => e.message).join('; ')
        return `ERROR: ${errorMessages}`
    }
    return 'OK'
}

export const createGraphqlLogger = (
    session: Session | null,
    req: NextApiRequest,
    res: NextApiResponse,
) => {
    const requestId = crypto.randomUUID().slice(0, 8)
    const user = session?.user?.fullName ?? 'anonymous'
    const body = req.body as GraphQLRequestBody
    const operation = body?.operationName ?? 'unknown'

    logger.info(
        `[GraphQL] ${requestId} | ${user} | ${operation}${formatVariables(body?.variables)}`,
    )

    const oldEnd = res.end
    res.end = function (chunk: unknown, ...rest: unknown[]) {
        if (chunk) {
            try {
                const response = JSON.parse(String(chunk)) as GraphQLResponse
                const status = formatResponseStatus(response)
                logger.info(`[GraphQL] ${requestId} | ${operation} | ${status}`)
            } catch {
                logger.info(`[GraphQL] ${requestId} | ${operation} | Response (non-JSON)`)
            }
        }
        return oldEnd.apply(res, [chunk, ...rest] as Parameters<typeof oldEnd>)
    }
}
