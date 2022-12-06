import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import SearchBarComponent from './search-bar/search-bar.comp'
import SideBarHideoutComponent from './side-bar/side-bar-hideout.comp'
import SideBarStaticComponent from './side-bar/side-bar-static.comp'

interface Props {
  children: React.ReactNode
}

export default function LayoutComponent({ children }: Props) {
  const { status } = useSession()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <SideBarHideoutComponent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <SideBarStaticComponent />

        <div className="flex-1 md:pl-64">
          {status === 'authenticated' && !router.query.uid && (
            <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="false" />
              </button>
              <SearchBarComponent />
            </div>
          )}

          {children}
        </div>
      </div>
    </>
  )
}
