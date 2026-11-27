import { filterUsers, type UserListItem } from '../filterUsers'

const user = (uid: string, overrides: Partial<UserListItem> = {}): UserListItem => ({
    uid,
    username: `${uid}@eli-laser.eu`,
    email: `${uid}@eli-laser.eu`,
    firstName: '',
    lastName: '',
    isEnabled: true,
    roles: [],
    teams: [],
    ...overrides,
})

const users = [
    user('jan.novak', {
        firstName: 'Jan',
        lastName: 'Novák',
        roles: [{ uid: 'r1', code: 'admin', name: 'Administrator' }],
        teams: [{ uid: 't1', name: '300 Lasers' }],
    }),
    user('jana.nova', {
        firstName: 'Jana',
        lastName: 'Nová',
        employee: {
            uid: 'e1',
            fullName: 'Nová Jana',
            ldapUser: 'jana.nova@eli-laser.eu',
            orgUnitCode: '410',
        },
    }),
    user('petr.svoboda', { firstName: 'Petr', lastName: 'Svoboda' }),
]

const uids = (result: UserListItem[]) => result.map(u => u.uid)

describe('filterUsers', () => {
    it('returns all users for an empty search', () => {
        expect(filterUsers(users, '')).toBe(users)
        expect(filterUsers(users, '   ')).toBe(users)
        expect(filterUsers(users, null)).toBe(users)
    })

    it('ignores case and diacritics', () => {
        expect(uids(filterUsers(users, 'NOVAK'))).toEqual(['jan.novak'])
        expect(uids(filterUsers(users, 'nová'))).toEqual(['jan.novak', 'jana.nova'])
    })

    it('requires every term to match some field', () => {
        expect(uids(filterUsers(users, 'jan admin'))).toEqual(['jan.novak'])
        expect(uids(filterUsers(users, 'petr admin'))).toEqual([])
    })

    it('searches employee, role and team fields', () => {
        expect(uids(filterUsers(users, '410'))).toEqual(['jana.nova'])
        expect(uids(filterUsers(users, 'administrator'))).toEqual(['jan.novak'])
        expect(uids(filterUsers(users, 'lasers'))).toEqual(['jan.novak'])
    })
})
