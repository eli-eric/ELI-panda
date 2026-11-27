import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import LoaderComponent from '@/components/loader.comp'
import { PATH } from '@/types/constants/paths'

// The explorer moved to /systems/explorer — old links (bookmarks, QR codes,
// shared deep links) are forwarded with their query string intact.
const SystemsHierarchyRedirectPage: NextPage = () => {
    const { isReady, query, replace } = useRouter()

    useEffect(() => {
        if (!isReady) return
        void replace({ pathname: PATH.SYSTEMS_EXPLORER, query })
    }, [isReady, query, replace])

    return <LoaderComponent />
}

export default SystemsHierarchyRedirectPage
