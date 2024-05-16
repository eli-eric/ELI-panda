import { type Driver } from 'neo4j-driver'
import type { TransactionPromise } from 'neo4j-driver-core'

import { ROLE } from '@/types/constants/roles'
import type { JWT } from 'next-auth/jwt'

const createSparePartRelationsResolver = async (
  _source: unknown,
  {
    fromSystemIds,
    toSystemIds
  }: { fromSystemIds: string[]; toSystemIds: string[] },
  context: {
    executor: { executionContext: Driver }
    authorization: { isAuthenticated: boolean; jwt: JWT }
  },
  // eslint-disable-next-line
  _info: unknown
): Promise<string> => {
  const session = context.executor.executionContext.session()
  let transaction: TransactionPromise | undefined
  const existingRelationsDetails: string[] = []

  if (
    !context.authorization.isAuthenticated ||
    !context.authorization.jwt.roles.includes(ROLE.SYSTEM_EDIT)
  ) {
    throw new Error(
      'Unauthorized: You do not have permission to perform this action.'
    )
  }
  try {
    transaction = session.beginTransaction()

    for (const fromSystemId of fromSystemIds) {
      for (const toSystemId of toSystemIds) {
        const relationExistsQuery = `
          MATCH (from:System {uid: $fromSystemId}), (to:System {uid: $toSystemId})
          OPTIONAL MATCH (from)-[r:IS_SPARE_FOR]->(to)
          RETURN count(r) as count, from.name as fromName, to.name as toName
        `
        const result = await transaction.run(relationExistsQuery, {
          fromSystemId,
          toSystemId
        })
        const count = result.records[0].get('count').toInt()
        const fromName = result.records[0].get('fromName')
        const toName = result.records[0].get('toName')

        if (count === 0) {
          const createRelationQuery = `
            MATCH (from:System {uid: $fromSystemId}), (to:System {uid: $toSystemId})
            CREATE (from)-[:IS_SPARE_FOR]->(to)
          `
          await transaction.run(createRelationQuery, {
            fromSystemId,
            toSystemId
          })
        } else {
          existingRelationsDetails.push(
            `Relation between "${fromName}" and "${toName}" already exists.`
          )
        }
      }
    }

    await transaction.commit()

    if (existingRelationsDetails.length > 0) {
      return `Some relations were not created because they already exist: ${existingRelationsDetails.join('; ')}`
    }

    return 'All relations created successfully'
  } catch (error: unknown) {
    if (transaction) {
      await transaction.rollback()
    }
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to create spare part relations: ${errorMessage}`)
  } finally {
    await session.close()
  }
}

export default createSparePartRelationsResolver
