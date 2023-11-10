import { Fragment, Suspense, useContext } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import usePermission from '@/hooks/usePermission'
import { SystemDetailContext } from '@/pages/system/[uid]'
import { FILE_TYPE } from '@/types/constants/files'
import { ROLE } from '@/types/constants/roles'

import FileManager from '../shared/fileManager/FileManager'
import { SystemForm } from './components/form/SystemForm.cont'
import RelationsSection from './components/relationsSection/RelationsSection'

interface Props {
  uid?: string
}

export const SystemItemContainer = ({ uid }: Props) => {
  const { systemDetail } = useContext(SystemDetailContext)
  const disableEdit = usePermission([ROLE.SYSTEM_EDIT])

  return (
    <Fragment>
      <SystemForm />
      {uid && (
        <Card className="flex flex-col justify-between">
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<ProgressBarComponent />}>
              <RelationsSection systemName={systemDetail?.name} />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<ProgressBarComponent />}>
              <FileManager itemType={FILE_TYPE.SYSTEM} uid={uid} hasEditRole={!disableEdit} />
            </Suspense>
          </ErrorBoundary>
        </Card>
      )}
    </Fragment>
  )
}
