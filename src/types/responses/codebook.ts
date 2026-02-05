import type { ROLE } from '../constants/roles'
import type { SystemLevel } from '../gql/graphql'

export type CodeBookMetaData = {
    code: string
    type: string
    nodeLabel?: string
    roleEdit?: ROLE
}

export type CodebookTypeResponse = {
    metadata: CodeBookMetaData
    data: CodebookType[]
}

export type CodebookType = {
    name: string
    uid: string
    additionalData?: string
    code?: string
    systemLevel?: SystemLevel
}

export type CodebookFilter = {
    key: string
    value: any
}

export type CodebookQuery = {
    filter?: CodebookFilter[]
    searchText?: string
    limit?: number
}
