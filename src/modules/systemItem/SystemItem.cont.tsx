import { Fragment, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import Card from '@/components/layout/Card'
import { Heading } from '@/components/layout/Heading'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { FILE_TYPE } from '@/types/constants/files'

import FileManager from '../shared/fileManager/FileManager'
import SystemForm from './components/form/SystemForm.cont'
import RelationsSection from './components/relationsSection/RelationsSection'
import { useSystemDetail } from './hooks/useSystemDetail'

export const SystemItemContainer = () => {
  const { disabledEdit, uid, systemDetail } = useSystemDetail()

  return (
    <Fragment>
      <SystemForm />
      {uid && (
        <Card className="flex flex-col justify-between">
          <Heading customText="Relations" />
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<ProgressBarComponent />}>
              <RelationsSection systemName={systemDetail?.name} />
            </Suspense>
          </ErrorBoundary>
          <ErrorBoundary fallback={<ErrorPage />}>
            <Suspense fallback={<ProgressBarComponent />}>
              <FileManager itemType={FILE_TYPE.SYSTEM} uid={uid} hasEditRole={!disabledEdit} />
            </Suspense>
          </ErrorBoundary>
        </Card>
      )}
    </Fragment>
  )
}
