import { type Driver } from 'neo4j-driver'
import type { TransactionPromise } from 'neo4j-driver-core'
import type { JWT } from 'next-auth/jwt'

const systemMovedFromResolver = async (
  _source: unknown,
  { systemFromUid, systemUid }: { systemFromUid: string; systemUid: string },
  context: {
    executor: { executionContext: Driver }
    authorization: { isAuthenticated: boolean; jwt: JWT }
  },
  // eslint-disable-next-line
  _info: unknown
): Promise<string> => {
  const session = context.executor.executionContext.session()
  let transaction: TransactionPromise | undefined

  if (!context.authorization.isAuthenticated) {
    throw new Error(
      'Unauthorized: You do not have permission to perform this action.'
    )
  }

  try {
    transaction = session.beginTransaction()

    const createRelationQuery = `
        MATCH (a:System), (b:System)
        WHERE a.uid = $systemFromUid AND b.uid = $systemUid
        CREATE (b)-[r:WAS_MOVED_FROM { at: datetime(), userUid: $userUid }]->(a)
        `
    await transaction.run(createRelationQuery, {
      systemFromUid,
      userUid: context.authorization.jwt.sub,
      systemUid
    })

    await transaction.commit()

    return 'WAS_UPDATED_BY created successfully'
  } catch (error: unknown) {
    if (transaction) {
      await transaction.rollback()
    }
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to relation: ${errorMessage}`)
  } finally {
    await session.close()
  }
}

export default systemMovedFromResolver
