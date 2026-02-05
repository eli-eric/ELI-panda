import { type FC, useEffect } from 'react'
import { toast } from 'sonner'

import ErrorPage from '@/components/error/ErrorPage'
import RecordNotFound from '@/components/pages/record-not-found.comp'
import { Skeleton } from '@/components/ui/skeleton'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useResearcher } from '../hooks/useResearcher'
import { ResearcherFormContainer } from './researcher-form.cont'

interface Props {
    uid: string
}

const ResearcherFormSkeleton = () => (
    <div className="flex flex-col gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
        </div>
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
    </div>
)

export const ResearcherEditContainer: FC<Props> = ({ uid }) => {
    const { closeModal } = useDynamicModalStore()

    const { data: researcher, isLoading, isFetching, isError, error, refetch } = useResearcher(uid)

    useEffect(() => {
        if (isError) {
            toast.error('Failed to load researcher')
        }
    }, [isError])

    const handleClose = () => {
        closeModal(`researcher-edit-${uid}`)
    }

    if (error?.response?.status === 404) {
        return <RecordNotFound onClick={handleClose} />
    }

    if (isError) {
        return <ErrorPage />
    }

    if (isLoading || isFetching) {
        return <ResearcherFormSkeleton />
    }

    if (!researcher) {
        return <ResearcherFormSkeleton />
    }

    return <ResearcherFormContainer researcher={researcher} onSuccess={refetch} />
}
