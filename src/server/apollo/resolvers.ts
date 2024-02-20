import type { Driver } from 'neo4j-driver'
import type { TransactionPromise } from 'neo4j-driver-core'

const createSparePartRelationsResolver = async (
  _source: unknown,
  { fromSystemIds, toSystemIds }: { fromSystemIds: string[]; toSystemIds: string[] },
  context: { executor: { executionContext: Driver } },
  // eslint-disable-next-line
  _info: unknown
): Promise<string> => {
  const session = context.executor.executionContext.session()
  let transaction: TransactionPromise | undefined
  const existingRelations: string[] = []

  try {
    transaction = session.beginTransaction()

    for (const fromSystemId of fromSystemIds) {
      for (const toSystemId of toSystemIds) {
        const relationExistsQuery = `
          MATCH (from:System {uid: $fromSystemId})-[r:IS_SPARE_FOR]->(to:System {uid: $toSystemId})
          RETURN count(r) as count
        `
        const result = await transaction.run(relationExistsQuery, { fromSystemId, toSystemId })
        const count = result.records[0].get('count').toInt()

        if (count === 0) {
          const createRelationQuery = `
            MATCH (from:System {uid: $fromSystemId}), (to:System {uid: $toSystemId})
            CREATE (from)-[:IS_SPARE_FOR]->(to)
          `
          await transaction.run(createRelationQuery, { fromSystemId, toSystemId })
        } else {
          existingRelations.push(`Relation between ${fromSystemId} and ${toSystemId} already exists.`)
        }
      }
    }

    await transaction.commit()

    if (existingRelations.length > 0) {
      return `Some relations were not created because they already exist: ${existingRelations.join('; ')}`
    }

    return 'All relations created successfully'
  } catch (error: unknown) {
    if (transaction) {
      await transaction.rollback()
    }
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    throw new Error(`Failed to create spare part relations: ${errorMessage}`)
  } finally {
    await session.close()
  }
}

export const resolvers = {
  Mutation: {
    createSparePartRelation: createSparePartRelationsResolver
  }
}
