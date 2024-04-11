import { type Driver } from 'neo4j-driver'
import type { TransactionPromise } from 'neo4j-driver-core'
import type { JWT } from 'next-auth/jwt'

const updatedByResolver = async (
  _source: unknown,
  { node, nodeUid, action }: { node: string; nodeUid: string; action: string },
  context: { executor: { executionContext: Driver }; authorization: { isAuthenticated: boolean; jwt: JWT } },
  // eslint-disable-next-line
  _info: unknown
): Promise<string> => {
  const session = context.executor.executionContext.session()
  let transaction: TransactionPromise | undefined

  if (!context.authorization.isAuthenticated) {
    throw new Error('Unauthorized: You do not have permission to perform this action.')
  }

  try {
    transaction = session.beginTransaction()

    const createRelationQuery = `
        MATCH (a:${node}), (u:User)
        WHERE a.uid = $nodeUid AND u.uid = $userUid
        CREATE (a)-[r:WAS_UPDATED_BY { action: $action, at: datetime() }]->(u)
        `
    await transaction.run(createRelationQuery, { nodeUid, userUid: context.authorization.jwt.sub, action })

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
