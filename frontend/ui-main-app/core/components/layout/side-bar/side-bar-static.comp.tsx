import EliLogoComponent from 'core/components/ui/eli-logo.comp'
import { useSession } from 'next-auth/react'

import ProfileActionsComponent from '../profile/profile-actions.cont'
import NavigationListContainer from './navigation/navigation-list.cont'

const SideBarStaticComponent = () => {
  const { status } = useSession()
  return (
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
        {status === 'authenticated' && <ProfileActionsComponent />}
      </div>
    </div>
  )
}

export default SideBarStaticComponent
