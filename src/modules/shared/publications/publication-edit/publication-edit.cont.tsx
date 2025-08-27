import { useEffect } from 'react'
import toast from 'react-hot-toast'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import RecordNotFound from '@/components/pages/record-not-found.comp'
import { usePublication } from '@/modules/publication/hooks/usePublication'
import { PATH } from '@/types/constants/paths'

import { PublicationFormContainer } from '../publication-create/publication-form.cont'

type Props = {
  uid: string
}

export const PublicationEditContainer = ({ uid }: Props) => {
  const {
    data: publication,
    isLoading,
    isError,
    error,
    refetch
  } = usePublication(uid)

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

  return (
    <PublicationFormContainer publication={publication} refetch={refetch} />
  )
}
