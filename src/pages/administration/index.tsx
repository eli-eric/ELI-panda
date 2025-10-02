import { Users } from 'lucide-react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { FormattedMessage } from 'react-intl'

import { Tile, TileContainer } from '@/components/card/tile.comp'
import { messages } from '@/i18n/src/locale/en'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

const Links = [
  {
    name: 'Users',
    link: PATH.ADMIN_USERS,
    Icon: () => <Users className="mx-auto h-24 w-24 shrink-0 rounded-full" />,
    role: ROLE.ADMIN
  }
]

const AdministrationPage: NextPage = (): React.ReactElement => (
  <>
    <Head>
      <title>
        <FormattedMessage id={messages.common.pages.administration} />
      </title>
      <meta name="description" content="...." />
    </Head>
    <main className="mx-auto max-w-7xl flex-1">
      <h1 className="text-2xl font-semibold font-mono text-gray-600 dark:text-gray-200 mt-2 ml-1 sm:mt-4 sm:ml-4 uppercase">
        <FormattedMessage id={messages.common.pages.adminSection} />
      </h1>
      <TileContainer>
        {Links.map(link => (
          <Tile
            key={link.link}
            name={link.name}
            Icon={link.Icon}
            link={link.link}
            role={link.role}
          />
        ))}
      </TileContainer>
    </main>
  </>
)

export default AdministrationPage
