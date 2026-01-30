import { type Driver } from 'neo4j-driver'
import type { TransactionPromise } from 'neo4j-driver-core'
import type { JWT } from 'next-auth/jwt'

const moveSystemResolver = async (
    _source: unknown,
    {
        systemUid,
        newParentUid,
        oldParentUid,
    }: { systemUid: string; newParentUid: string; oldParentUid?: string },
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

        // Step 1: Delete ALL existing parent relationships
        // (child can have max 1 parent according to schema, so safe to delete all)
        const disconnectQuery = `
      MATCH (child:System {uid: $systemUid})<-[r:HAS_SUBSYSTEM]-()
      DELETE r
    `
        await transaction.run(disconnectQuery, {
            systemUid,
        })

        // Step 2: Connect new parent
        const connectQuery = `
      MATCH (newParent:System {uid: $newParentUid}), (child:System {uid: $systemUid})
      CREATE (newParent)-[:HAS_SUBSYSTEM]->(child)
    `
        await transaction.run(connectQuery, {
            newParentUid,
            systemUid,
        })

        // Step 3: Create WAS_MOVED_FROM relationship for history
        if (oldParentUid) {
            const historyQuery = `
        MATCH (oldParent:System {uid: $oldParentUid}), (child:System {uid: $systemUid})
        CREATE (child)-[:WAS_MOVED_FROM { at: datetime(), userUid: $userUid }]->(oldParent)
      `
            await transaction.run(historyQuery, {
                oldParentUid,
                systemUid,
                userUid: context.authorization.jwt.sub,
            })
        }

        await transaction.commit()

        return 'System moved successfully'
    } catch (error: unknown) {
        if (transaction) {
            await transaction.rollback()
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error'
        throw new Error(`Failed to move system: ${errorMessage}`)
    } finally {
        await session.close()
    }
}

export default moveSystemResolver
