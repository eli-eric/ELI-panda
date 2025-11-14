import {
  Cog,
  CreditCard,
  Image as ImageIcon,
  Keyboard,
  Layers,
  LayoutGrid,
  Library,
  LifeBuoy,
  Link,
  ShoppingCart,
  Table,
  Users
} from 'lucide-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'

import { Tile, TileContainer } from '@/components/card/tile.comp'
import { DashboardHeader } from '@/components/header/DashboardHeader'
import { ReleasesContainer } from '@/components/Releases.cont'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { VersionControl } from '@/components/version/VersionControl'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import { CatalogueStatisticsContainer } from '@/modules/catalogueItem/components/statistics/CatalogueStatistics.cont'
import FileManager from '@/modules/shared/fileManager/FileManager'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { useGlobalSearchShortcut } from '@/modules/shared/globalSearch'
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
    Icon: () => <LayoutGrid className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    role: ROLE.SYSTEMS_VIEW
  },
  {
    name: 'Catalogue',
    link: PATH.CATALOGUE,
    Icon: () => <Layers className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    role: ROLE.CATALOGUE_VIEW
  },
  {
    name: 'Orders',
    link: PATH.ORDERS,
    Icon: () => (
      <ShoppingCart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />
    ),
    role: ROLE.ORDERS_VIEW
  },
  {
    name: 'Room Cards',
    link: PATH.ROOM_CARDS,
    Icon: () => <CreditCard className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    role: ROLE.ROOM_CARD_VIEW
  },
  {
    name: 'Users',
    link: PATH.ADMIN_USERS,
    Icon: () => <Users className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    role: ROLE.ADMIN
  },
  {
    name: 'Codebooks',
    link: PATH.CODEBOOKS,
    Icon: () => <Table className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    role: ROLE.CODEBOOKS_ADMIN
  },
  {
    name: 'Support/Feedback',
    link: 'mailto:jiri.svacha@eli-beams.eu',
    Icon: () => <LifeBuoy className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    role: ROLE.BASICS
  },
  {
    name: 'Layout',
    link: PATH.LAYOUT,
    Icon: () => <ImageIcon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    role: ROLE.BASICS
  },
  {
    name: 'Publications',
    link: PATH.PUBLICATIONS,
    Icon: () => <Library className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    role: ROLE.PUBLICATIONS_VIEW
  },
  {
    name: 'Services',
    link: PATH.SERVICES,
    Icon: () => <Cog className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8" />,
    role: ROLE.BASICS
  }
]

const messages = message.common.pages

const DashboardPage: NextPage = (): JSX.Element => {
  const hasEditRole = useAccessControl(ROLE.DASHBOARD_FILES_ADMIN)()
  const { formatMessage: fm } = useIntl()
  const { shortcutDisplay } = useGlobalSearchShortcut({
    onToggle: () => {},
    enabled: false
  })

  return (
    <Fragment>
      <Head>
        <title>
          <FormattedMessage id={messages.dashboard} />
        </title>
        <meta name="description" content="...." />
      </Head>
      <main className="flex-1 min-h-0 w-full">
        <DashboardHeader title="Dashboard" />
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-8">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Link className="size-6 text-primary" />
                    <CardTitle>
                      {fm({ id: messages.quickNavigation })}
                    </CardTitle>
                  </div>
                </CardHeader>
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
              </Card>
              <CatalogueStatisticsContainer />
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Keyboard className="size-6 text-primary" />
                    <CardTitle>
                      {fm({ id: message.common.globalSearch.title })}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    {fm({ id: message.common.globalSearch.description })}
                  </p>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="font-mono text-sm">
                      {shortcutDisplay}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {fm(
                        { id: message.common.globalSearch.shortcutHint },
                        { shortcut: shortcutDisplay }
                      )}
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <FileManager
                    itemType={FILE_TYPE.GENERAL}
                    uid="dashboard-files"
                    hasEditRole={hasEditRole}
                    customTitle="GENERAL FILES"
                  />
                </CardContent>
              </Card>
              <VersionControl />
              <ReleasesContainer />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  )
}

export default DashboardPage
