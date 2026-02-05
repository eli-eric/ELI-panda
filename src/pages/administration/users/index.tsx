import type { NextPage } from 'next'
import Head from 'next/head'
import { FormattedMessage } from 'react-intl'

import { messages } from '@/i18n/src/locale/en'
import { UsersContainer } from '@/modules/administration/users/Users.cont'

const AdministrationPage: NextPage = (): React.ReactElement => (
    //const intl = useIntl()

    <>
        <Head>
            <title>
                <FormattedMessage id={messages.common.pages.administration} />
            </title>
            <meta name="description" content="...." />
        </Head>
        <UsersContainer />
    </>
)

export default AdministrationPage
