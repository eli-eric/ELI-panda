import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import EliLogoComponent from '../ui/eli-logo.comp'
import NavigationComponent from './navigation/navigation.comp'
import NavigationListContainer from './navigation/navigation-list.cont'
import SearchBarComp from './search-bar.comp'

interface Props {
  children: React.ReactNode
}

export default function LayoutComponent({ children }: Props) {
  const { status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <div>
        <NavigationComponent sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Static sidebar for desktop */}
        <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
            <div className="flex flex-shrink-0 items-center px-4">
              <EliLogoComponent customClass="h-8 w-auto" />
            </div>
            <div className="mt-5 flex flex-grow flex-col">
              <nav className="flex-1 space-y-1 px-2 pb-4">
                <NavigationListContainer />
              </nav>
            </div>
          </div>
        </div>

        <div className="flex-1 md:pl-64">
          {status === 'authenticated' && (
            <div id="lyaout-search-bar" className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
              <button
                type="button"
                className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="false" />
              </button>
              <SearchBarComp />
            </div>
          )}

          {children}
        </div>
      </div>
    </>
  )
}
