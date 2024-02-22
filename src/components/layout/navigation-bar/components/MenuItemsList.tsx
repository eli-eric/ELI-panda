import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { NAV_BAR_CONFIG, PATH } from '@/types/constants/paths'

import { NavBarLink } from './NavBarLink'
const navMessages = message.layout

interface Props {
  open: boolean
  className?: string
}

export const MenuItemsList = ({ open, className }: Props) => {
  const { status, data } = useSession()
  const userRoles = data?.user.roles
  const intl = useIntl()
  return (
    <Fragment>
      <div className={className}>
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
