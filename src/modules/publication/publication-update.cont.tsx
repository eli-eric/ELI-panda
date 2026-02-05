import { useEffect } from 'react'
import { toast } from 'sonner'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import RecordNotFound from '@/components/pages/record-not-found.comp'
import { PATH } from '@/types/constants/paths'

import { usePublication } from './hooks/usePublication'
import { PublicationDetailContainer } from './publication-detail.cont'

export const PublicationUpdateContainer = () => {
    const { data: publication, isLoading, isError, error, refetch } = usePublication()

    useEffect(() => {
        if (isError) {
            toast.error('Something went wrong')
        }
    }, [isError])

    if (error?.response?.status === 404) {
        return <RecordNotFound returnUrl={PATH.PUBLICATIONS} />
    }

    if (isError) {
        return <ErrorPage />
    }

    if (isLoading) {
        return <LoaderComponent />
    }

    if (!publication) {
        return <LoaderComponent />
    }

    return <PublicationDetailContainer publication={publication} refetch={refetch} />
}
