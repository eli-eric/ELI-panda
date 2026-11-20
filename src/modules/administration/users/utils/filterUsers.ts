import type { UsersQueryQuery } from '@/types/gql/graphql'

export type UserListItem = UsersQueryQuery['users'][number]

const normalize = (value: string) => value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const getSearchableText = (user: UserListItem) =>
    normalize(
        [
            user.username,
            user.email,
            user.firstName,
            user.lastName,
            user.employee?.fullName,
            user.employee?.ldapUser,
            user.employee?.orgUnitCode,
            user.facility?.name,
            ...user.roles.flatMap(role => [role.code, role.name]),
            ...user.teams.map(team => team.name),
        ]
            .filter(Boolean)
            .join(' '),
    )

/**
 * Every whitespace-separated term has to match some field (e.g. "novak admin"),
 * ignoring case and diacritics.
 */
export const filterUsers = (users: UserListItem[], search?: string | null) => {
    const terms = normalize(search ?? '')
        .split(/\s+/)
        .filter(Boolean)

    if (terms.length === 0) return users

    return users.filter(user => {
        const text = getSearchableText(user)
        return terms.every(term => text.includes(term))
    })
}
