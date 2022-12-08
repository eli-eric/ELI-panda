import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import ModalComponent from 'core/components/ui/modal.comp'
import LoadingAppContext from 'core/store/app-loading.context'
import { signOut, useSession } from 'next-auth/react'
import { Fragment, useContext, useEffect, useState } from 'react'

import ProfileCardComponent from './profile-card.comp'

const ProfileActionsContainer = () => {
  const fullName = useSession().data?.user.fullName
  const [inicials, setInicials] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const { setLoadingApp } = useContext(LoadingAppContext)

  useEffect(() => {
    if (!fullName) return
    const split = fullName.split(' ')
    const firstLetter = split[0].substring(0, 1)
    const secondLetter = split[1].substring(0, 1)
    setInicials(firstLetter + secondLetter)
  }, [fullName])

  const signOutHandler = () => {
    setLoadingApp(true)
    signOut({ redirect: false })
      .then()
      .finally(() => {
        setLoadingApp(false)
      })
  }

  const showModalHandler = () => {
    setModalOpen(true)
  }
  return (
    <Fragment>
      <div className="flex flex-shrink-0 p-4">
        <div className="group block w-full flex-shrink-0">
          <div className="flex items-center">
            <button onClick={showModalHandler}>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                <span className="font-medium leading-none text-white">{inicials}</span>
              </span>
            </button>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-700 group-hover:text-gray-900">{fullName}</p>
              <button
                data-testid="view-profile"
                onClick={showModalHandler}
                className="text-xs font-medium text-gray-500 hover:text-blue-600"
              >
                View profile
              </button>
            </div>
            <button data-testid="sign-out" className="ml-8" onClick={signOutHandler}>
              <ArrowLeftOnRectangleIcon className="w-8 h-8 text-gray-700 hover:text-blue-600" />
            </button>
          </div>
        </div>
      </div>
      <ModalComponent open={modalOpen} setOpen={setModalOpen} testid="profile">
        <ProfileCardComponent />
      </ModalComponent>
    </Fragment>
  )
}

export default ProfileActionsContainer
