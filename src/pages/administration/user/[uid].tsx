import type { NextPage } from 'next'
import Head from 'next/head'
import { createContext,Fragment } from 'react'

import LoaderComponent from '@/components/loader.comp'
import { EditUserContainer } from '@/modules/administration/user/EditUser.cont'
import { useRoles } from '@/modules/administration/user/hooks/useRoles'
import { useUserDetail } from '@/modules/administration/user/hooks/useUserDetail'
import type { UserQueryQuery } from '@/types/gql/graphql'

interface Props {
  key?: string
  userUid?: string
}

type EditUserContextType = {
  userDetail?: UserQueryQuery['users'][0]
  refetch: () => void
}

export const EditUserContext = createContext<EditUserContextType>({
  userDetail: undefined,
  refetch: () => {}
})

const EditUserPage: NextPage = ({ userUid }: Props): React.ReactElement => {
  //const intl = useIntl()
  const { userDetail, refetch, loading } = useUserDetail(userUid)
  const roles = useRoles()

  if (loading && roles.length === 0 && !userDetail) {
    return <LoaderComponent />
  }

  return (
    <Fragment>
      <Head>
        <title>{'Administration'}</title>
        <meta name="description" content="...." />
      </Head>
      <EditUserContext.Provider value={{ userDetail, refetch }}>
        {userDetail && <EditUserContainer userUid={userUid} roles={roles} />}
      </EditUserContext.Provider>
    </Fragment>
  )
}

EditUserPage.getInitialProps = ({ query }) => ({
  key: query.uid,
  userUid: query.uid
})

export default EditUserPage
