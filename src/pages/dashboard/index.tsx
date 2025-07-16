import {
  Cog,
  CreditCard,
  Image as ImageIcon,
  Layers,
  LayoutGrid,
  Library,
  LifeBuoy,
  ShoppingCart,
  Table,
  Users
} from 'lucide-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { Tile, TileContainer } from '@/components/card/tile.comp'
import { ReleasesContainer } from '@/components/Releases.cont'
import { useAccessControl } from '@/hooks/useAccessControl'
import FileManager from '@/modules/shared/fileManager/FileManager'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

type Tile = {
  name: string
  link: string
  Icon: () => JSX.Element
  role: ROLE
}

const tiles: Tile[] = [
  {
    name: 'Systems',
    link: PATH.SYSTEMS,
    Icon: () => (
      <LayoutGrid className="mx-auto h-24 w-32 shrink-0 rounded-full" />
    ),
    role: ROLE.SYSTEMS_VIEW
  },
  {
    name: 'Catalogue',
    link: PATH.CATALOGUE,
    Icon: () => <Layers className="mx-auto h-24 w-32 shrink-0 rounded-full" />,
    role: ROLE.CATALOGUE_VIEW
  },
  {
    name: 'Orders',
    link: PATH.ORDERS,
    Icon: () => (
      <ShoppingCart className="mx-auto h-24 w-32 shrink-0 rounded-full" />
    ),
    role: ROLE.ORDERS_VIEW
  },
  {
    name: 'Room Cards',
    link: PATH.ROOM_CARDS,
    Icon: () => (
      <CreditCard className="mx-auto h-24 w-32 shrink-0 rounded-full" />
    ),
    role: ROLE.ROOM_CARD_VIEW
  },
  {
    name: 'Users',
    link: PATH.ADMIN_USERS,
    Icon: () => <Users className="mx-auto h-24 w-32 shrink-0 rounded-full" />,
    role: ROLE.ADMIN
  },
  {
    name: 'Codebooks',
    link: PATH.CODEBOOKS,
    Icon: () => <Table className="mx-auto h-24 w-32 shrink-0 rounded-full" />,
    role: ROLE.CODEBOOKS_ADMIN
  },
  {
    name: 'Support/Feedback',
    link: 'mailto:jiri.svacha@eli-beams.eu',
    Icon: () => (
      <LifeBuoy className="mx-auto h-24 w-32 shrink-0 rounded-full" />
    ),
    role: ROLE.BASICS
  },
  {
    name: 'Layout',
    link: PATH.LAYOUT,
    Icon: () => (
      <ImageIcon className="mx-auto h-24 w-32 shrink-0 rounded-full" />
    ),
    role: ROLE.BASICS
  },
  {
    name: 'Publications',
    link: PATH.PUBLICATIONS,
    Icon: () => <Library className="mx-auto h-24 w-32 shrink-0 rounded-full" />,
    role: ROLE.PUBLICATIONS_VIEW
  },
  {
    name: 'Services',
    link: PATH.SERVICES,
    Icon: () => <Cog className="mx-auto h-24 w-32 shrink-0 rounded-full" />,
    role: ROLE.BASICS
  }
]

const messages = message.dashboardPage

const DashboardPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  const hasEditRole = useAccessControl(ROLE.DASHBOARD_FILES_ADMIN)()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <main className="mx-auto max-w-7xl flex-1">
        <TileContainer>
          {tiles.map(tile => (
            <Tile
              key={tile.link}
              name={tile.name}
              Icon={tile.Icon}
              link={tile.link}
              role={tile.role}
            />
          ))}
        </TileContainer>
        <FileManager
          itemType={FILE_TYPE.GENERAL}
          uid="dashboard-files"
          hasEditRole={hasEditRole}
          customTitle="GENERAL FILES"
        />
        <ReleasesContainer />
      </main>
    </Fragment>
  )
}

export default DashboardPage
