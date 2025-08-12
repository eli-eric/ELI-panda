import { Fragment, useCallback, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { toast } from 'react-hot-toast'

import ErrorPage from '@/components/error/ErrorPage'

import { SystemForm } from './components/form/SystemForm.cont'
import { SparePartsFor } from './components/spare-for/SpareFor.cont'
import { SparePartsContainer } from './components/spare-parts/SpareParts.cont'
import { SubSystemsContainer } from './components/subsystems/SubSystems.cont'

interface Props {
  uid?: string
}

export const SystemItemContainer = ({ uid }: Props) => {
  const [errorState, setErrorState] = useState<Error | null>(null)

  const handleError = useCallback((error: Error) => {
    // eslint-disable-next-line no-console
    console.error('Error in SystemItemContainer:', error)
    setErrorState(error)
    toast.error(`An error occurred: ${error.message}`)
  }, [])

  if (errorState) {
    return <ErrorPage />
  }

  return (
    <div className="h-screen overflow-auto">
      <ErrorBoundary FallbackComponent={ErrorPage} onError={handleError}>
        <SystemForm
          subsystemsComponent={
            uid ? (
              <ErrorBoundary fallback={<ErrorPage />}>
                <SubSystemsContainer />
              </ErrorBoundary>
            ) : null
          }
        >
          {uid && (
            <Fragment>
              <ErrorBoundary fallback={<ErrorPage />}>
                <SparePartsContainer />
              </ErrorBoundary>
              <ErrorBoundary fallback={<ErrorPage />}>
                <SparePartsFor />
              </ErrorBoundary>
            </Fragment>
          )}
        </SystemForm>
      </ErrorBoundary>
    </div>
  )
}
