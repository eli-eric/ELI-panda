import { type FC, useEffect } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import ErrorPage from '@/components/error/ErrorPage'
import RecordNotFound from '@/components/pages/record-not-found.comp'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useZone } from '../hooks/useZone'
import { ZoneFormContainer } from './zone-form.cont'

interface Props {
    uid: string
}

const ZoneFormSkeleton = () => (
    <div className="flex flex-col gap-4 py-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
    </div>
)

export const ZoneEditContainer: FC<Props> = ({ uid }) => {
    const { formatMessage: fm } = useIntl()
    const { closeModal } = useDynamicModalStore()

    const { data: zone, isLoading, isError, error, refetch } = useZone(uid)

    useEffect(() => {
        if (isError) {
            toast.error(fm({ id: message.zonesPage.form.loadFailed }))
        }
    }, [isError, fm])

    const handleClose = () => {
        closeModal(`zone-edit-${uid}`)
    }

    if (error?.response?.status === 404) {
        return <RecordNotFound onClick={handleClose} />
    }

    if (isError) {
        return <ErrorPage />
    }

    if (isLoading) {
        return <ZoneFormSkeleton />
    }

    if (!zone) {
        return <ZoneFormSkeleton />
    }

    return <ZoneFormContainer zone={zone} onSuccess={refetch} />
}
