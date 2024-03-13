import {
  IdentificationIcon,
  LifebuoyIcon,
  RectangleGroupIcon,
  ShoppingCartIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { Tile, TileContainer } from '@/components/card/tile.comp'
import { ReleasesContainer } from '@/components/Releases.cont'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

const tiles = [
  {
    name: 'Systems',
    link: PATH.SYSTEMS,
    Icon: () => <RectangleGroupIcon className="mx-auto h-24 w-324 flex-shrink-0 rounded-full" />,
    role: ROLE.SYSTEMS_VIEW
  },
  {
    name: 'Catalogue',
    link: PATH.CATALOGUE,
    Icon: () => <IdentificationIcon className="mx-auto h-24 w-324 flex-shrink-0 rounded-full" />,
    role: ROLE.CATALOGUE_VIEW
  },
  {
    name: 'Orders',
    link: PATH.ORDERS,
    Icon: () => <ShoppingCartIcon className="mx-auto h-24 w-324 flex-shrink-0 rounded-full" />,
    role: ROLE.ORDERS_VIEW
  },
  {
    name: 'Users',
    link: PATH.ADMIN_USERS,
    Icon: () => <UserGroupIcon className="mx-auto h-24 w-324 flex-shrink-0 rounded-full" />,
    role: ROLE.ADMIN
  },
  {
    name: 'Support/Feedback',
    link: 'mailto:jiri.svacha@eli-beams.eu',
    Icon: () => <LifebuoyIcon className="mx-auto h-24 w-324 flex-shrink-0 rounded-full" />
  }
]

const messages = message.dashboardPage

const DashboardPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>

      <main className="mx-auto max-w-7xl flex-1">
        {/* <h1 className="text-2xl font-semibold font-mono text-gray-600 dark:text-gray-200 mt-2 ml-1 sm:mt-4 sm:ml-4 uppercase">
          Dashboard
        </h1> */}
        <TileContainer>
          {tiles.map(tile => (
            <Tile key={tile.link} name={tile.name} Icon={tile.Icon} link={tile.link} role={tile.role} />
          ))}
        </TileContainer>
        <ReleasesContainer />
      </main>
    </Fragment>
  )
}

export default DashboardPage
