import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { ResearchersContainer } from '@/modules/researchers/researchers.cont'

const ResearchersPage: NextPage = (): JSX.Element => {
    const { formatMessage: fm } = useIntl()

    return (
        <Fragment>
            <Head>
                <title>{fm({ id: message.researchersPage.head })}</title>
                <meta
                    name="description"
                    content={fm({ id: message.researchersPage.description })}
                />
            </Head>
            <ResearchersContainer />
        </Fragment>
    )
}

export default ResearchersPage
