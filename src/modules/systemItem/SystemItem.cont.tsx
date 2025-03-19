import { Suspense, useCallback, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { toast } from 'react-hot-toast'

import ErrorPage from '@/components/error/ErrorPage'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import usePermission from '@/hooks/usePermission'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ROLE } from '@/types/constants/roles'

import FileManager from '../shared/fileManager/FileManager'
import { SystemForm } from './components/form/SystemForm.cont'
import { SparePartsFor } from './components/spare-for/SpareFor.cont'
import { SparePartsContainer } from './components/spare-parts/SpareParts.cont'
import { SubSystemsContainer } from './components/subsystems/SubSystems.cont'

interface Props {
  uid?: string
}

export const SystemItemContainer = ({ uid }: Props) => {
  const hasEditRole = usePermission([ROLE.SYSTEM_EDIT])
  const [errorState, setErrorState] = useState<Error | null>(null)

  const handleError = useCallback((error: Error) => {
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
        <SystemForm>
          {uid && (
            <Card className="flex flex-col justify-between">
              <ErrorBoundary fallback={<ErrorPage />}>
                <SparePartsContainer />
              </ErrorBoundary>
              <ErrorBoundary fallback={<ErrorPage />}>
                <SubSystemsContainer />
              </ErrorBoundary>
              <ErrorBoundary fallback={<ErrorPage />}>
                <SparePartsFor />
              </ErrorBoundary>
              <ErrorBoundary fallback={<ErrorPage />}>
                <Suspense fallback={<ProgressBarComponent />}>
                  <FileManager
                    itemType={FILE_TYPE.SYSTEM}
                    uid={uid}
                    hasEditRole={hasEditRole}
                  />
                </Suspense>
              </ErrorBoundary>
            </Card>
          )}
        </SystemForm>
      </ErrorBoundary>
    </div>
  )
}
