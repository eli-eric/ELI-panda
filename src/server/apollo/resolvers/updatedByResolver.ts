import { type Driver } from 'neo4j-driver'
import type { TransactionPromise } from 'neo4j-driver-core'
import type { JWT } from 'next-auth/jwt'

const updatedByResolver = async (
    _source: unknown,
    {
        node,
        nodeUid,
        action,
        previousState,
        newState,
        changes,
    }: {
        node: string
        nodeUid: string
        action: string
        previousState?: string
        newState?: string
        changes?: string
    },
    context: {
        executor: { executionContext: Driver }
        authorization: { isAuthenticated: boolean; jwt: JWT }
    },
    // eslint-disable-next-line
    _info: unknown,
): Promise<string> => {
    const session = context.executor.executionContext.session()
    let transaction: TransactionPromise | undefined

    if (!context.authorization.isAuthenticated) {
        throw new Error('Unauthorized: You do not have permission to perform this action.')
    }

    try {
        transaction = session.beginTransaction()

        // Build properties object conditionally
        const properties: Record<string, any> = {
            action: '$action',
            at: 'datetime()',
        }

        if (previousState !== undefined && previousState !== null) {
            properties.previousState = '$previousState'
        }

        if (newState !== undefined && newState !== null) {
            properties.newState = '$newState'
        }

        if (changes !== undefined && changes !== null) {
            properties.changes = '$changes'
        }

        const propsString = Object.entries(properties)
            .map(([key, value]) => `${key}: ${value}`)
            .join(', ')

        const createRelationQuery = `
        MATCH (a:${node}), (u:User)
        WHERE a.uid = $nodeUid AND u.uid = $userUid
        CREATE (a)-[r:WAS_UPDATED_BY { ${propsString} }]->(u)
        `

        const params: Record<string, any> = {
            nodeUid,
            userUid: context.authorization.jwt.sub,
            action,
        }

        if (previousState !== undefined && previousState !== null) {
            params.previousState = previousState
        }

        if (newState !== undefined && newState !== null) {
            params.newState = newState
        }

        if (changes !== undefined && changes !== null) {
            params.changes = changes
        }

        await transaction.run(createRelationQuery, params)

        await transaction.commit()

        return 'WAS_UPDATED_BY created successfully'
    } catch (error: unknown) {
        if (transaction) {
            await transaction.rollback()
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        throw new Error(`Failed to relation: ${errorMessage}`)
    } finally {
        await session.close()
    }
}

export default updatedByResolver
