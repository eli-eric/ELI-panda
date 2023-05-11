import { Disclosure, Menu, Transition } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react'
import { Fragment, useEffect, useState } from 'react'

import ModalComponent from '@/components/modal/modal.comp'
import { classNames } from '@/helpers'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'
import { ModalButtons } from '@/types/form'

import ProfileCardComponent from '../card/profile-card.comp'

const messages = message.common.buttons

interface Props {
  open: boolean
}

const ProfileDropdownComponent = ({ open }: Props) => {
  const user = useSession().data?.user
  const fullName = user?.fullName
  const [inicials, setInicials] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(() => {
    if (!fullName) return
    const split = fullName.split(' ')
    const firstLetter = split[0].substring(0, 1)
    const secondLetter = split[1].substring(0, 1)
    setInicials(firstLetter + secondLetter)
  }, [fullName])

  const signOutHandler = () => {
    signOut({ callbackUrl: PATH.ROOT })
  }

  const showModalHandler = () => {
    setModalOpen(true)
  }
  const modalButtons: ModalButtons = {
    goNext: {
      text: messages.close,
      testid: 'modal-button-close',
      onClick: () => {
        setModalOpen(false)
      }
    }
  }
  return (
    <Fragment>
      {open === false ? (
        <div data-testid="layout-profile" className="hidden z-30 sm:ml-6 sm:flex sm:items-center z-20">
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
                <span className="sr-only">Open user menu</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                  <span className="font-medium leading-none text-white">{inicials}</span>
                </span>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className=" absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={showModalHandler}
                      className={classNames(
                        'w-full text-left block px-4 py-2 text-sm text-gray-700',
                        active ? 'bg-gray-100' : ''
                      )}
                    >
                      Your Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={signOutHandler}
                      className={classNames(
                        'w-full text-left block px-4 py-2 text-sm text-gray-700',
                        active ? 'bg-gray-100' : ''
                      )}
                    >
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <div className="border-t border-gray-200 pt-4 pb-3">
          <div className="flex items-center px-4">
            <div className="flex-shrink-0">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                <span className="font-medium leading-none text-white">{inicials}</span>
              </span>
            </div>
            <div className="ml-3">
              <div className="text-base font-medium text-gray-800">{fullName}</div>
              <div className="text-sm font-medium text-gray-500">{user?.email}</div>
            </div>
          </div>
          <div className="mt-3 space-y-1">
            <Disclosure.Button
              onClick={signOutHandler}
              className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800"
            >
              Sign out
            </Disclosure.Button>
          </div>
        </div>
      )}
      <ModalComponent open={modalOpen} setOpen={setModalOpen} buttons={modalButtons} testid="profile">
        <ProfileCardComponent />
      </ModalComponent>
    </Fragment>
  )
}

export default ProfileDropdownComponent
