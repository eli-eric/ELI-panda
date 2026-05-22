import { Actions, type SystemCreateInput, type SystemLevel } from '@/types/gql/graphql'
import { connectN, whereC, whereN } from '@/utils/graphql/mutations'

export interface BuildCreateSubsystemPayloadArgs {
    parentUid: string
    name: string
    systemLevel: SystemLevel
    sessionUserUid: string
    facilityCode: string
    inherit: {
        responsibleUid?: string
        locationUid?: string
        zoneUid?: string
    }
}

export const buildCreateSubsystemPayload = (
    args: BuildCreateSubsystemPayloadArgs,
): SystemCreateInput => ({
    name: args.name,
    systemLevel: args.systemLevel,
    deleted: false,
    parentSystem: { connect: whereN(args.parentUid) },
    facility: { connect: whereC(args.facilityCode) },
    responsible: connectN(args.inherit.responsibleUid),
    location: connectN(args.inherit.locationUid),
    zone: connectN(args.inherit.zoneUid),
    updatedBy: {
        connect: [
            {
                where: { node: { uid: args.sessionUserUid } },
                edge: { action: Actions.Insert },
            },
        ],
    },
})
