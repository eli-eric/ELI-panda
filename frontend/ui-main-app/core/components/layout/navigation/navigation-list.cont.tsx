import { useAuth } from 'core/helpers/hooks/useAuth'
import { message } from 'core/i18n/src/messages'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import NavigationLinkComponent from './navigation-link.comp'
import { ChartBarIcon, FolderIcon, HomeIcon, InboxIcon } from '@heroicons/react/24/outline'
import { PATHS } from 'types/constants/paths'
import { ROLES } from 'types/constants/roles'
import { useSession } from 'next-auth/react'
const navMessages = message.layout

const NavigationListContainer = () => {
  const { status, data } = useSession()
  const userRoles = data?.user.roles
  const intl = useIntl()
  return (
    <>
      {status === 'authenticated' ? (
        <Fragment>
          <NavigationLinkComponent
            name={intl.formatMessage({ id: navMessages.dashboard })}
            href={PATHS.DASHBOARD}
            Icon={HomeIcon}
          />
          {userRoles?.includes(ROLES.CATALOGUE_VIEW) && (
            <NavigationLinkComponent
              name={intl.formatMessage({ id: navMessages.catalogue })}
              href={PATHS.CATALOGUE}
              Icon={FolderIcon}
            />
          )}
          {userRoles?.includes(ROLES.SYSTEMS_VIEW) && (
            <NavigationLinkComponent
              name={intl.formatMessage({ id: navMessages.systems })}
              href={PATHS.SYSTEMS}
              Icon={InboxIcon}
            />
          )}
          {userRoles?.includes(ROLES.REPORTS_VIEW) && (
            <NavigationLinkComponent
              name={intl.formatMessage({ id: navMessages.reports })}
              href={PATHS.REPORTS}
              Icon={ChartBarIcon}
            />
          )}
        </Fragment>
      ) : (
        <NavigationLinkComponent
          name={intl.formatMessage({ id: navMessages.login })}
          href={PATHS.AUTH}
          Icon={HomeIcon}
        />
      )}
    </>
  )
}

export default NavigationListContainer
