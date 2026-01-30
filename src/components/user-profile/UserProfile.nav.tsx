import { Fingerprint, UserCircle, Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { cn } from '@/lib/utils'
import { PATH } from '@/types/constants/paths'

const userProfileNavigation = [
    { name: 'General', href: PATH.PROFILE_GENERAL, icon: UserCircle },
    { name: 'Security', href: PATH.PROFILE_SECURITY, icon: Fingerprint },
    { name: 'Team members', href: PATH.PROFILE_TEAM, icon: Users },
]

export const UserProfileNav = () => {
    const router = useRouter()
    const currentPath = router.pathname

    return (
        <aside className="flex overflow-x-auto border-b border-gray-900/5 py-16 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
            <nav className="flex-none px-4 sm:px-6 lg:px-0">
                <ul role="list" className="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
                    {userProfileNavigation.map(item => (
                        <li key={item.name}>
                            <Link
                                href={item.href}
                                className={cn(
                                    item.href === currentPath
                                        ? 'bg-gray-50 dark:bg-gray-700 text-orange-600'
                                        : 'text-gray-700 dark:text-gray-200 hover:text-orange-600 hover:bg-gray-50 dark:hover:bg-gray-600',
                                    'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold',
                                )}
                            >
                                <item.icon
                                    className={cn(
                                        item.href === currentPath
                                            ? 'text-orange-600'
                                            : 'text-gray-400 group-hover:text-orange-600',
                                        'h-6 w-6 shrink-0',
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}
