import createSparePartRelationsResolver from './createSparePartRelationResolver'
import itemOriginatedResolver from './itemOriginatedResolver'
import updatedByResolver from './updatedByResolver'

const resolvers = {
  Mutation: {
    createSparePartRelation: createSparePartRelationsResolver,
    updatedByResolver: updatedByResolver,
    itemOriginatedResolver: itemOriginatedResolver
  }
}

export default resolvers
