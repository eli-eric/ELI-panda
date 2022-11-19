import LoadingAppContext from 'core/store/app-loading.context'
import { signOut, useSession } from 'next-auth/react'
import { Fragment, useContext, useEffect, useState } from 'react'

import ModalComponent from '../../ui/modal.comp'
import ProfileCardComponent from '../profile/profile-card.comp'
import DropdownMenuComponent from './dropdown-menu.comp'

const ProfileDropdownContainer = () => {
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
      <DropdownMenuComponent
        inicials={inicials}
        showModalHandler={showModalHandler}
        signOutHandler={signOutHandler}
      />
      <ModalComponent open={modalOpen} setOpen={setModalOpen}>
        <ProfileCardComponent />
      </ModalComponent>
    </Fragment>
  )
}

export default ProfileDropdownContainer
