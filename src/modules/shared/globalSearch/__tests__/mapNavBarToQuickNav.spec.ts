import { LayoutDashboard, Settings, Users } from 'lucide-react'

import type { NavigationItem } from '@/lib/navigation/types'
import { ROLE } from '@/types/constants/roles'

import { mapNavBarToQuickNav } from '../utils/mapNavBarToQuickNav'

const navConfig: NavigationItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        role: ROLE.BASICS,
        icon: LayoutDashboard,
    },
    {
        title: 'Admin',
        url: '/admin',
        role: ROLE.ADMIN,
        icon: Settings,
        items: [
            { title: 'Users', url: '/admin/users', role: ROLE.ADMIN },
            { title: 'Logs', url: '/admin/logs', role: ROLE.ADMIN },
            { title: 'Hidden', url: '/admin/hidden', role: ROLE.CATALOGUE_VIEW },
        ],
    },
    {
        title: 'NoIcon',
        url: '/no-icon',
        role: ROLE.BASICS,
    },
    {
        title: 'People',
        url: '/people',
        role: ROLE.BASICS,
        icon: Users,
        items: [],
    },
]

describe('mapNavBarToQuickNav', () => {
    it('returns empty list when user has no roles', () => {
        expect(mapNavBarToQuickNav(navConfig)).toEqual([])
        expect(mapNavBarToQuickNav(navConfig, [])).toEqual([])
    })

    it('filters out items the user cannot access', () => {
        const result = mapNavBarToQuickNav(navConfig, [ROLE.BASICS])
        const titles = result.map(i => i.title)
        expect(titles).toContain('Dashboard')
        expect(titles).toContain('People')
        expect(titles).not.toContain('Admin')
        expect(titles).not.toContain('Users')
    })

    it('flattens accessible submenu items and tags them with the parent category', () => {
        const result = mapNavBarToQuickNav(navConfig, [ROLE.ADMIN])
        const users = result.find(i => i.title === 'Users')
        expect(users).toMatchObject({ url: '/admin/users', category: 'Admin', icon: Settings })

        const hidden = result.find(i => i.title === 'Hidden')
        expect(hidden).toBeUndefined()
    })

    it('skips items missing an icon', () => {
        const result = mapNavBarToQuickNav(navConfig, [ROLE.BASICS])
        expect(result.find(i => i.title === 'NoIcon')).toBeUndefined()
    })

    it('keeps parent entry with no subitems as a direct link', () => {
        const result = mapNavBarToQuickNav(navConfig, [ROLE.BASICS])
        const dashboard = result.find(i => i.title === 'Dashboard')
        expect(dashboard).toEqual({
            title: 'Dashboard',
            url: '/dashboard',
            icon: LayoutDashboard,
        })
        expect(dashboard?.category).toBeUndefined()
    })
})
