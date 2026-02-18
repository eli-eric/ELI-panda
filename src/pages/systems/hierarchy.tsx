import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

const SystemHierarchyExplorerContainer = dynamic(
    () => import('@/modules/systemHierarchy/SystemHierarchyExplorer.cont'),
    {
        ssr: false,
    },
)

const SystemHierarchyPage: NextPage = () => {
    const { formatMessage: fm } = useIntl()

    return (
        <Fragment>
            <Head>
                <title>{fm({ id: message.systemHierarchy.pages.hierarchy })}</title>
            </Head>
            <SystemHierarchyExplorerContainer />
        </Fragment>
    )
}

export default SystemHierarchyPage
