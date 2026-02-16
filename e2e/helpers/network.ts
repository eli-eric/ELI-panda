import type { Page, Request, Route } from '@playwright/test'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export interface RestMockContext {
    request: Request
    route: Route
    url: URL
}

export interface RestMockDefinition {
    matcher: RegExp | string
    method?: HttpMethod
    resolver: (context: RestMockContext) => Promise<unknown> | unknown
    status?: number
}

export interface GraphQLMockContext {
    operationName: string
    query: string
    request: Request
    variables: Record<string, unknown> | null
}

export type GraphQLMockResolver =
    | ((context: GraphQLMockContext) => Promise<Record<string, unknown>> | Record<string, unknown>)
    | Record<string, unknown>

export interface SetupNetworkMocksOptions {
    allowUnmockedGraphQL?: boolean
    graphQLHandlers?: Record<string, GraphQLMockResolver>
    restHandlers?: RestMockDefinition[]
}

const extractGraphQLOperationName = (query: string): string | null => {
    const match = query.match(/\b(query|mutation)\s+([A-Za-z0-9_]+)/)
    return match?.[2] ?? null
}

const fulfillJson = async (route: Route, body: unknown, status = 200) => {
    await route.fulfill({
        body: JSON.stringify(body),
        contentType: 'application/json',
        status,
    })
}

const toUpperMethod = (method: string): HttpMethod => method.toUpperCase() as HttpMethod

export async function setupNetworkMocks(page: Page, options: SetupNetworkMocksOptions = {}) {
    const restHandlers = options.restHandlers ?? []
    const graphQLHandlers = options.graphQLHandlers ?? {}
    const hasGraphQLHandlers = Object.keys(graphQLHandlers).length > 0

    for (const handler of restHandlers) {
        await page.route(handler.matcher, async route => {
            const request = route.request()
            const requestMethod = toUpperMethod(request.method())

            if (handler.method && handler.method !== requestMethod) {
                await route.fallback()
                return
            }

            const payload = await handler.resolver({
                request,
                route,
                url: new URL(request.url()),
            })

            await fulfillJson(route, payload, handler.status ?? 200)
        })
    }

    if (!hasGraphQLHandlers) {
        return
    }

    await page.route(/\/api\/graphql(?:\?.*)?$/, async route => {
        const request = route.request()
        let body:
            | {
                  operationName?: string
                  query?: string
                  variables?: Record<string, unknown>
              }
            | undefined

        try {
            body = request.postDataJSON?.() as typeof body
        } catch {
            body = undefined
        }

        const query = typeof body?.query === 'string' ? body.query : ''
        const operationName =
            body?.operationName && body.operationName.length > 0
                ? body.operationName
                : extractGraphQLOperationName(query)

        if (!operationName) {
            await fulfillJson(
                route,
                {
                    errors: [{ message: 'Missing GraphQL operation name in mocked request' }],
                },
                400,
            )
            return
        }

        const resolver = graphQLHandlers[operationName]

        if (!resolver) {
            if (options.allowUnmockedGraphQL) {
                await route.fallback()
                return
            }

            await fulfillJson(
                route,
                {
                    errors: [
                        { message: `No GraphQL mock provided for operation: ${operationName}` },
                    ],
                },
                500,
            )
            return
        }

        const context: GraphQLMockContext = {
            operationName,
            query,
            request,
            variables: body?.variables ?? null,
        }

        const data =
            typeof resolver === 'function'
                ? await resolver(context)
                : (resolver as Record<string, unknown>)

        await fulfillJson(route, { data })
    })
}
