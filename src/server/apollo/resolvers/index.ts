import createSparePartRelationsResolver from './createSparePartRelationResolver'
import updatedByResolver from './updatedByResolver'

const resolvers = {
  Mutation: {
    createSparePartRelation: createSparePartRelationsResolver,
    updatedByResolver: updatedByResolver
  }
}

export default resolvers
