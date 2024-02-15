import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { NAV_BAR_CONFIG, PATH } from '@/types/constants/paths'

import { NavBarLink } from './NavBarLink'
const navMessages = message.layout

export const MenuItemsList = ({ open }: { open: boolean }) => {
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
          </Fragment>
        ) : (
          <NavBarLink name={intl.formatMessage({ id: navMessages.login })} links={[{ path: PATH.ROOT }]} open={open} />
        )}
      </div>
    </Fragment>
  )
}
