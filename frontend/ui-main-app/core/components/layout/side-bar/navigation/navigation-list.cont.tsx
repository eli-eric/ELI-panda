import { ChartBarIcon, FolderIcon, HomeIcon, InboxIcon, KeyIcon } from '@heroicons/react/24/outline'
import { message } from 'core/i18n/src/messages'
import { PATHS } from 'core/types/constants/paths'
import { ROLES } from 'core/types/constants/roles'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import NavigationLinkComponent from './navigation-link.comp'
import NavigationTitleComponent from './navigation-title.comp'
const navMessages = message.layout

const NavigationListContainer = () => {
  const { status, data } = useSession()
  const userRoles = data?.user.roles
  const intl = useIntl()
  return (
    <>
      {status === 'authenticated' ? (
        <Fragment>
          {userRoles?.includes(ROLES.CATALOGUE_VIEW) && (
            <NavigationTitleComponent title={intl.formatMessage({ id: navMessages.catalogue })}>
              <NavigationLinkComponent
                name={intl.formatMessage({ id: navMessages.catalogue })}
                href={PATHS.CATALOGUE}
                Icon={FolderIcon}
              />
            </NavigationTitleComponent>
          )}
          {userRoles?.includes(ROLES.SYSTEMS_VIEW) && (
            <NavigationTitleComponent title={intl.formatMessage({ id: navMessages.systems })}>
              <NavigationLinkComponent
                name={intl.formatMessage({ id: navMessages.systems })}
                href={PATHS.SYSTEMS}
                Icon={InboxIcon}
              />
              <NavigationLinkComponent
                name={intl.formatMessage({ id: navMessages.systemsOverview })}
                href={PATHS.SYSTEMS_OVERVIEW}
                Icon={InboxIcon}
              />
            </NavigationTitleComponent>
          )}
          {userRoles?.includes(ROLES.REPORTS_VIEW) && (
            <NavigationTitleComponent title={intl.formatMessage({ id: navMessages.reports })}>
              <NavigationLinkComponent
                name={intl.formatMessage({ id: navMessages.reports })}
                href={PATHS.REPORTS}
                Icon={ChartBarIcon}
              />
            </NavigationTitleComponent>
          )}
          <NavigationTitleComponent title={intl.formatMessage({ id: navMessages.dashboard })}>
            <NavigationLinkComponent
              name={intl.formatMessage({ id: navMessages.dashboard })}
              href={PATHS.DASHBOARD}
              Icon={HomeIcon}
            />
          </NavigationTitleComponent>
        </Fragment>
      ) : (
        <NavigationLinkComponent
          name={intl.formatMessage({ id: navMessages.login })}
          href={PATHS.ROOT}
          Icon={KeyIcon}
        />
      )}
    </>
  )
}

export default NavigationListContainer
