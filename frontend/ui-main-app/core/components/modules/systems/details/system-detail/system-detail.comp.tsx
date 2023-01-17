import ProgressBarComponent from 'core/components/ui/progress-bar.comp'
import { message } from 'core/i18n/src/messages'
import { SystemInfo } from 'core/types/responses'

import SystemDetailSectionComponent from './system-detail-section.comp'

const messages = message.systemsPage.systemDetail
interface Props {
  systemInfo: SystemInfo
}

const SystemDetailComponent = ({ systemInfo }: Props) => {
  return (
    <div className="bg-white pb-10">
      {systemInfo ? (
        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 h-full overflow-auto">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{systemInfo.name}</h1>
              <h3 className="sr-only">Description</h3>
              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{
                  __html:
                    systemInfo.description === '' ||
                    systemInfo.description === null ||
                    systemInfo.description === undefined
                      ? 'No description'
                      : systemInfo.description
                }}
              />
              <SystemDetailSectionComponent systemInfo={systemInfo} />
            </div>
          </div>
        </main>
      ) : (
        <ProgressBarComponent />
      )}
    </div>
  )
}
export default SystemDetailComponent
