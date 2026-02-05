import createSparePartRelationsResolver from './createSparePartRelationResolver'
import itemOriginatedResolver from './itemOriginatedResolver'
import moveSystemResolver from './moveSystemResolver'
import systemMovedFromResolver from './systemMovedFromResolver'
import updatedByResolver from './updatedByResolver'

const resolvers = {
    Mutation: {
        createSparePartRelation: createSparePartRelationsResolver,
        updatedByResolver: updatedByResolver,
        itemOriginatedResolver: itemOriginatedResolver,
        systemMovedFromResolver: systemMovedFromResolver,
        moveSystem: moveSystemResolver,
    },
}

export default resolvers
