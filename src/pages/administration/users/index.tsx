import { UserGroupIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import Head from 'next/head'

import { UsersContainer } from '@/modules/administration/users/Users.cont'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

const Links = [
  {
    name: 'Users',
    link: PATH.SYSTEMS,
    Icon: () => <UserGroupIcon className="mx-auto h-24 w-324 flex-shrink-0 rounded-full" />,
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
    <UsersContainer />
  </>
)

export default AdministrationPage
