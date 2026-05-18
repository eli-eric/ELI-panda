import { LayoutDashboard } from 'lucide-react'

import type { NavigationItem } from '@/lib/navigation/types'
import { ROLE } from '@/types/constants/roles'

import { filterNavigationByPermission } from '../utils'

const items: NavigationItem[] = [
    { title: 'Public', url: '/p', role: ROLE.BASICS, icon: LayoutDashboard },
    {
        title: 'Admin',
        url: '/a',
        role: ROLE.ADMIN,
        icon: LayoutDashboard,
        items: [
            { title: 'Users', url: '/a/u', role: ROLE.ADMIN },
            { title: 'CatView', url: '/a/c', role: ROLE.CATALOGUE_VIEW },
        ],
    },
    {
        title: 'Catalogue',
        url: '/c',
        role: ROLE.CATALOGUE_VIEW,
        icon: LayoutDashboard,
        items: [],
    },
]

describe('filterNavigationByPermission', () => {
    it('returns [] for missing/empty roles', () => {
        expect(filterNavigationByPermission(items)).toEqual([])
        expect(filterNavigationByPermission(items, [])).toEqual([])
    })

    it('filters root items by user role', () => {
        const out = filterNavigationByPermission(items, [ROLE.BASICS])
        expect(out.map(i => i.title)).toEqual(['Public'])
    })

    it('filters subitems by user role + sets items to undefined when none accessible', () => {
        const out = filterNavigationByPermission(items, [ROLE.ADMIN])
        const admin = out.find(i => i.title === 'Admin')!
        // ADMIN has access to Users (ADMIN) but not CatView (CATALOGUE_VIEW)
        expect(admin.items?.map(s => s.title)).toEqual(['Users'])
    })

    it('keeps user items array empty -> undefined', () => {
        const out = filterNavigationByPermission(items, [ROLE.CATALOGUE_VIEW])
        const cat = out.find(i => i.title === 'Catalogue')!
        // empty initial items -> filter returns empty -> set to undefined
        expect(cat.items).toBeUndefined()
    })

    it('flattens correctly with multiple roles', () => {
        const out = filterNavigationByPermission(items, [ROLE.ADMIN, ROLE.BASICS])
        const titles = out.map(i => i.title)
        expect(titles).toEqual(expect.arrayContaining(['Public', 'Admin']))
    })
})
