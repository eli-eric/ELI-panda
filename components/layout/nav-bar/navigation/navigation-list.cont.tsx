import { message } from 'i18n/src/messages'
import { PATHS } from 'types/constants/paths'
import { ROLES } from 'types/constants/roles'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

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
            {userRoles?.includes(ROLES.SYSTEMS_VIEW) && (
              <NavigationLinkComponent
                name={intl.formatMessage({ id: navMessages.systemsOverview })}
                href={PATHS.SYSTEMS_OVERVIEW}
                open={open}
              />
            )}
            {userRoles?.includes(ROLES.CATALOGUE_VIEW) && (
              <NavigationLinkComponent
                name={intl.formatMessage({ id: navMessages.catalogue })}
                href={PATHS.CATALOGUE}
                open={open}
              />
            )}
            {/* {userRoles?.includes(ROLES.REPORTS_VIEW) && (
              <NavigationLinkComponent
                name={intl.formatMessage({ id: navMessages.reports })}
                href={PATHS.REPORTS}
                open={open}
              />
            )} */}
            <NavigationLinkComponent
              name={intl.formatMessage({ id: navMessages.dashboard })}
              href={PATHS.DASHBOARD}
              open={open}
            />
          </Fragment>
        ) : (
          <NavigationLinkComponent name={intl.formatMessage({ id: navMessages.login })} href={PATHS.ROOT} open={open} />
        )}
      </div>
    </Fragment>
  )
}

export default NavigationListContainer
