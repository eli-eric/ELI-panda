import { Bars3Icon } from '@heroicons/react/24/outline'
import { APP_VERSION } from 'core/types/constants/common'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import EliLogoComponent from '../ui/eli-logo.comp'
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
          <div id="md-nav-header" className="md:hidden">
            <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-1.5">
              <div>
                <EliLogoComponent customClass="h-8 w-auto" />
              </div>
              <div>
                <button
                  type="button"
                  className="-mr-3 inline-flex h-12 w-12 items-center justify-center rounded-md text-gray-500 hover:text-gray-900"
                  onClick={() => setSidebarOpen(true)}
                >
                  <span className="sr-only">Open sidebar</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

          {children}
        </div>
      </div>
      <div className="h-5 w-20 fixed top-0 left-[calc(100vw-5rem)] z-50 font-mono text-gray-300 text-xs pt-2">
        {APP_VERSION}
      </div>
    </>
  )
}
