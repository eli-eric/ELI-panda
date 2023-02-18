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
                href={PATH.SYSTEMS_OVERVIEW}
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
            {/* {userRoles?.includes(Role.REPORTS_VIEW) && (
              <NavigationLinkComponent
                name={intl.formatMessage({ id: navMessages.reports })}
                href={PATH.REPORTS}
                open={open}
              />
            )} */}
            <NavigationLinkComponent
              name={intl.formatMessage({ id: navMessages.dashboard })}
              href={PATH.DASHBOARD}
              open={open}
            />
          </Fragment>
        ) : (
          <NavigationLinkComponent name={intl.formatMessage({ id: navMessages.login })} href={PATH.ROOT} open={open} />
        )}
      </div>
    </Fragment>
  )
}

export default NavigationListContainer
