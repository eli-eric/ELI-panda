import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

const { head } = message.cataloguePage

const NoSSRCatalogueExplorer = dynamic(
    () => import('@/modules/catalogueExplorer/CatalogueExplorer.cont'),
    { ssr: false },
)

const CatalogueExplorerPage: NextPage = (): JSX.Element => {
    const intl = useIntl()

    return (
        <Fragment>
            <Head>
                <title>{intl.formatMessage({ id: head })}</title>
                <meta name="description" content="Catalogue explorer" />
            </Head>
            <NoSSRCatalogueExplorer />
        </Fragment>
    )
}

export default CatalogueExplorerPage
