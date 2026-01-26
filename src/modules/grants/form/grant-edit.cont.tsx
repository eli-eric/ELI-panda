import { type FC, useEffect } from 'react'
import { toast } from 'sonner'

import ErrorPage from '@/components/error/ErrorPage'
import RecordNotFound from '@/components/pages/record-not-found.comp'
import { Skeleton } from '@/components/ui/skeleton'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { useGrant } from '../hooks/useGrant'
import { GrantFormContainer } from './grant-form.cont'

interface Props {
  uid: string
}

const GrantFormSkeleton = () => (
  <div className="flex flex-col gap-4 py-4">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-10 w-full" />
  </div>
)

export const GrantEditContainer: FC<Props> = ({ uid }) => {
  const { closeModal } = useDynamicModalStore()

  const {
    data: grant,
    isLoading,
    isFetching,
    isError,
    error,
    refetch
  } = useGrant(uid)

  useEffect(() => {
    if (isError) {
      toast.error('Failed to load grant')
    }
  }, [isError])

  const handleClose = () => {
    closeModal(`grant-edit-${uid}`)
  }

  if (error?.response?.status === 404) {
    return <RecordNotFound onClick={handleClose} />
  }

  if (isError) {
    return <ErrorPage />
  }

  if (isLoading || isFetching) {
    return <GrantFormSkeleton />
  }

  if (!grant) {
    return <GrantFormSkeleton />
  }

  return <GrantFormContainer grant={grant} onSuccess={refetch} />
}
