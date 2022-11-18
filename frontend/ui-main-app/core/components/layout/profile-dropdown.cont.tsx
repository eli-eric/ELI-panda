import { Fragment, MouseEvent, useContext, useEffect, useState } from 'react'
import ProfileCardComponent from './profile-card.comp'
import ModalComponent from '../ui/modal.comp'
import { signOut, useSession } from 'next-auth/react'
import ProfileDropdownComponent from './profile-dropdown.comp'
import LoadingContext from 'core/store/loading-context'

const ProfileDropdownContainer = () => {
  const fullName = useSession().data?.user.fullName
  const [inicials, setInicials] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const { setLoading } = useContext(LoadingContext)

  useEffect(() => {
    if (!fullName) return
    const split = fullName.split(' ')
    const firstLetter = split[0].substring(0, 1)
    const secondLetter = split[1].substring(0, 1)
    setInicials(firstLetter + secondLetter)
  }, [fullName])

  const signOutHandler = (e: MouseEvent) => {
    setLoading(true)
    signOut({ redirect: false })
  }

  const showModalHandler = (e: MouseEvent) => {
    setModalOpen(true)
  }

  return (
    <Fragment>
      <ProfileDropdownComponent
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
