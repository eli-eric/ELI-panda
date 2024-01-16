import { Fragment, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import usePermission from '@/hooks/usePermission'
import { FILE_TYPE } from '@/types/constants/files'
import { ROLE } from '@/types/constants/roles'

import FileManager from '../shared/fileManager/FileManager'
import { SystemForm } from './components/form/SystemForm.cont'
import { SubSystemsContainer } from './components/subsystems/SubSystems.cont'

interface Props {
  uid?: string
}

export const SystemItemContainer = ({ uid }: Props) => {
  const hasEditRole = usePermission([ROLE.SYSTEM_EDIT])
  return (
    <Fragment>
      <SystemForm />
      {uid && (
        <Card className="flex flex-col justify-between">
          {/* <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<ProgressBarComponent />}>
              <RelationsSection systemName={systemDetail?.name} />
            </Suspense>
          </ErrorBoundary> */}
          <SubSystemsContainer />
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<ProgressBarComponent />}>
              <FileManager itemType={FILE_TYPE.SYSTEM} uid={uid} hasEditRole={hasEditRole} />
            </Suspense>
          </ErrorBoundary>
        </Card>
      )}
    </Fragment>
  )
}
