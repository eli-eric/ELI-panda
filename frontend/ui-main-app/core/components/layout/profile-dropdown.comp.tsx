import { Menu, Transition } from '@headlessui/react'
import { message } from 'core/i18n/src/messages'
import { DOMAttributes, Fragment, MouseEvent, MouseEventHandler, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import ProfileCardComponent from './profile-card.comp'
import ModalComponent from '../ui/modal.comp'
import { signOut, useSession } from 'next-auth/react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const messages = message.layout.userMenu

interface Props {
  inicials: string
  showModalHandler: MouseEventHandler<HTMLButtonElement> | undefined
  signOutHandler: MouseEventHandler<HTMLButtonElement> | undefined
}

const ProfileDropdownComponent = ({ inicials, showModalHandler, signOutHandler }: Props) => {
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
            <span className="font-medium leading-none text-white">{inicials}</span>
          </span>
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                )}
                onClick={showModalHandler}
              >
                <FormattedMessage id={messages.profile} />
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                type="button"
                className={classNames(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700 w-full text-left'
                )}
                onClick={signOutHandler}
              >
                <FormattedMessage id={messages.singout} />
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ProfileDropdownComponent
