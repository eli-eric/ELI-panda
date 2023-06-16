import type { NextPage } from 'next'
import Head from 'next/head'

import SystemItemContainer from '@/modules/systemItem/SystemItem.cont'

const SystemItemPage: NextPage = (): React.ReactElement => (
  <>
    <Head>
      <title>@TODO</title>
    </Head>
    <SystemItemContainer />
  </>
)

export default SystemItemPage
