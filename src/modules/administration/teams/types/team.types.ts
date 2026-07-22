// Team list row (GET /teams)
export interface TeamListItem {
    uid: string
    name: string
    code: string
    description: string
    memberCount: number
}

// Base team (create/update/patch response)
export interface Team {
    uid: string
    name: string
    code: string
    description: string
}

// Team member — includes deactivated users (isEnabled === false)
export interface TeamMember {
    uid: string
    firstName: string
    lastName: string
    username: string
    email: string
    isEnabled: boolean
}

// Team detail with members (GET detail + all member operations)
export interface TeamDetail {
    uid: string
    name: string
    code: string
    description: string
    members: TeamMember[]
}

// 409 conflict body when deleting a referenced team
export interface TeamDeleteConflict {
    errorMessage: string
    relatedNodes: { label: 'System' | 'RoomCard'; count: number }[]
}
