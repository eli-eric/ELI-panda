import classNames from 'classnames'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import NavigationLinkComponent from './navigation-link.comp'
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
            {userRoles?.includes(ROLE.SYSTEMS_VIEW) && (
              <NavigationLinkComponent
                name={intl.formatMessage({ id: navMessages.systemsOverview })}
                href={PATH.SYSTEMS}
                open={open}
              />
            )}
            {userRoles?.includes(ROLE.CATALOGUE_VIEW) && (
              <NavigationLinkComponent
                name={intl.formatMessage({ id: navMessages.catalogue })}
                href={PATH.CATALOGUE}
                open={open}
              />
            )}

            {userRoles?.includes(ROLE.ORDERS_VIEW) && (
              <NavigationLinkComponent
                name={intl.formatMessage({ id: navMessages.orders })}
                href={PATH.ORDERS}
                open={open}
              />
            )}
            <NavigationLinkComponent
              name={intl.formatMessage({ id: navMessages.dashboard })}
              href={PATH.DASHBOARD}
              open={open}
            />
            {open && (
              <Link href={PATH.SUPPORT} legacyBehavior>
                <a
                  target="_blank"
                  className={classNames(
                    'block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium',
                    'text-gray-900 border-primary-500',
                    'text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
                  )}
                >
                  {intl.formatMessage({ id: navMessages.support })}
                </a>
              </Link>
            )}
          </Fragment>
        ) : (
          <NavigationLinkComponent name={intl.formatMessage({ id: navMessages.login })} href={PATH.ROOT} open={open} />
        )}
      </div>
    </Fragment>
  )
}

export default NavigationListContainer
