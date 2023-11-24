import type { NextPage } from 'next'
import Head from 'next/head'
import { createContext, Fragment } from 'react'

import LoaderComponent from '@/components/loader.comp'
import { EditUserContainer } from '@/modules/administration/user/EditUser.cont'
import { useUserDetail } from '@/modules/administration/user/hooks/useUserDetail'
import type { User } from '@/types/gql/graphql'

interface Props {
  key?: string
  userUid?: string
}

type EditUserContextType = {
  userDetail?: User
  refetch: () => void
}

export const EditUserContext = createContext<EditUserContextType>({
  userDetail: undefined,
  refetch: () => {}
})

const EditUserPage: NextPage = ({ userUid }: Props): React.ReactElement => {
  //const intl = useIntl()
  const { userDetail, refetch, loading } = useUserDetail(userUid)

  if (loading) {
    return <LoaderComponent />
  }

  return (
    <Fragment>
      <Head>
        <title>{'Administration'}</title>
        <meta name="description" content="...." />
      </Head>
      <EditUserContext.Provider value={{ userDetail, refetch }}>
        <EditUserContainer userUid={userUid} />
      </EditUserContext.Provider>
    </Fragment>
  )
}

EditUserPage.getInitialProps = ({ query }) => ({
  key: query.uid,
  userUid: query.uid
})

export default EditUserPage
