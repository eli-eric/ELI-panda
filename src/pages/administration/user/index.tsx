import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import LoaderComponent from '@/components/loader.comp'
import { messages } from '@/i18n/src/locale/en'
import { useRoles } from '@/modules/administration/user/hooks/useRoles'
import { NewUserContainer } from '@/modules/administration/user/NewUser.cont'

const NewUserPage: NextPage = (): React.ReactElement => {
    const roles = useRoles()

    return (
        <Fragment>
            <Head>
                <title>
                    <FormattedMessage id={messages.common.pages.administration} />
                </title>
                <meta name="description" content="...." />
            </Head>

            {roles.length > 0 ? <NewUserContainer roles={roles} /> : <LoaderComponent />}
        </Fragment>
    )
}

export default NewUserPage
