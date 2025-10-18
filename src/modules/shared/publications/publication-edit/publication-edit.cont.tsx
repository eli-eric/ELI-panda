import { useEffect } from 'react'
import { toast } from 'sonner'

import ErrorPage from '@/components/error/ErrorPage'
import RecordNotFound from '@/components/pages/record-not-found.comp'
import { usePublication } from '@/modules/publication/hooks/usePublication'

import PublicationSkeleton from '../components/publication-skeleton.comp'
import { PublicationFormContainer } from '../publication-create/publication-form.cont'
import { usePublicationEditSheet } from './usePublicationEditSheet'

type Props = {
  uid: string
}

export const PublicationEditContainer = ({ uid }: Props) => {
  const {
    data: publication,
    isLoading,
    isFetching,
    isError,
    error,
    refetch
  } = usePublication(uid)

  const [, closeModal] = usePublicationEditSheet(uid)

  useEffect(() => {
    if (isError) {
      toast.error('Something went wrong')
    }
  }, [isError])

  if (error?.response?.status === 404) {
    return <RecordNotFound onClick={closeModal} />
  }

  if (isError) {
    return <ErrorPage />
  }

  if (isLoading || isFetching) {
    return <PublicationSkeleton />
  }

  if (!publication) {
    return <PublicationSkeleton />
  }

  return (
    <PublicationFormContainer publication={publication} refetch={refetch} />
  )
}
