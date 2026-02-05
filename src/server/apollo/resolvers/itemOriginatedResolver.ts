import { type Driver } from 'neo4j-driver'
import type { TransactionPromise } from 'neo4j-driver-core'
import type { JWT } from 'next-auth/jwt'

const itemOriginatedResolver = async (
    _source: unknown,
    { itemUid, systemOriginatedUid }: { itemUid: string; systemOriginatedUid: string },
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

    if (!itemUid || !systemOriginatedUid) {
        return 'No Action'
    }

    try {
        transaction = session.beginTransaction()

        const createRelationQuery = `
        MATCH (i:Item), (s:System)
        WHERE i.uid = $itemUid AND s.uid = $systemOriginatedUid
        CREATE (i)-[r:IS_ORIGINATED_FROM { userUid: $userUid, at: datetime() }]->(s)
        `
        await transaction.run(createRelationQuery, {
            itemUid,
            userUid: context.authorization.jwt.sub,
            systemOriginatedUid,
        })

        await transaction.commit()

        return 'IS_ORIGINATED_FROM created successfully'
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

export default itemOriginatedResolver
