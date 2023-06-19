import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import ErrorPage from '@/components/error/ErrorPage'
import Card from '@/components/layout/Card'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { FILE_TYPE } from '@/types/constants/files'

import FileManager from '../shared/fileManager/FileManager'
import useSystemForm from './components/form/SystemForm.cont'
import useSystemDetail from './hooks/useSystemDetail'

const SystemItemContainer = () => {
  const { disabledEdit, uid } = useSystemDetail()
  const { renderForm } = useSystemForm()

  return (
    <>
      {renderForm()}
      <Card className="flex flex-col justify-between">
        {uid && (
          <>
            <ErrorBoundary fallback={<ErrorPage />}>
              <Suspense fallback={<ProgressBarComponent />}>
                <FileManager itemType={FILE_TYPE.SYSTEM} uid={uid} hasEditRole={!disabledEdit} />
              </Suspense>
            </ErrorBoundary>
          </>
        )}
      </Card>
    </>
  )
}

export default SystemItemContainer
