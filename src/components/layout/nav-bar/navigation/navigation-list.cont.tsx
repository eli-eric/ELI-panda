import classNames from 'classnames'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { NAV_BAR_CONFIG, PATH, SUPPORT } from '@/types/constants/paths'

import { NavBarLink } from './NavBarLink'
const navMessages = message.layout

interface Props {
  open: boolean
}

const NavigationListContainer = ({ open }: Props) => {
  const { status, data } = useSession()
  const userRoles = data?.user.roles
  const intl = useIntl()
  return (
    <Fragment>
      <div className={open === false ? 'hidden sm:ml-6 sm:flex sm:space-x-8' : 'space-y-1 pt-2 pb-3'}>
        {status === 'authenticated' ? (
          <Fragment>
            {NAV_BAR_CONFIG.map((navBarSetting, index) => {
              if (userRoles?.includes(navBarSetting.role)) {
                return <NavBarLink key={index} name={navBarSetting.name} links={navBarSetting.links} open={open} />
              }
            })}
            {open && (
              <Link href={SUPPORT} legacyBehavior>
                <a
                  target="_blank"
                  className={classNames(
                    'block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium',
                    'text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                  )}
                >
                  {intl.formatMessage({ id: navMessages.support })}
                </a>
              </Link>
            )}
          </Fragment>
        ) : (
          <NavBarLink name={intl.formatMessage({ id: navMessages.login })} links={[{ path: PATH.ROOT }]} open={open} />
        )}
      </div>
    </Fragment>
  )
}

export default NavigationListContainer
