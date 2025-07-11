import { UserGroupIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import Head from 'next/head'

import { Tile, TileContainer } from '@/components/card/tile.comp'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

const Links = [
  {
    name: 'Users',
    link: PATH.ADMIN_USERS,
    Icon: () => (
      <UserGroupIcon className="mx-auto h-24 w-324 shrink-0 rounded-full" />
    ),
    role: ROLE.ADMIN
  }
]

const AdministrationPage: NextPage = (): React.ReactElement => (
  //const intl = useIntl()

  <>
    <Head>
      <title>{'Administration'}</title>
      <meta name="description" content="...." />
    </Head>
    <main className="mx-auto max-w-7xl flex-1">
      <h1 className="text-2xl font-semibold font-mono text-gray-600 dark:text-gray-200 mt-2 ml-1 sm:mt-4 sm:ml-4 uppercase">
        Admin Section
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
