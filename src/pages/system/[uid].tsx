import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import LoaderComponent from '@/components/loader.comp'
import { getSystemHierarchyDetailPath } from '@/modules/systemHierarchy/utils/hierarchyLinks'

// The systemItem detail page is deprecated — old /system/<uid> links (bookmarks,
// QR codes) land here and are forwarded to the hierarchy explorer detail view.
const SystemDetailRedirectPage: NextPage = () => {
    const { isReady, query, replace } = useRouter()
    const intl = useIntl()

    useEffect(() => {
        if (!isReady) return
        const uid = query.uid as string | undefined
        if (uid) {
            replace(getSystemHierarchyDetailPath(uid))
        }
    }, [isReady, query.uid, replace])

    return (
        <Fragment>
            <Head>
                <title>{intl.formatMessage({ id: message.systemItem.head })}</title>
                <meta name="description" content="...." />
            </Head>
            <LoaderComponent />
        </Fragment>
    )
}

export default SystemDetailRedirectPage
