import ProgressBarComponent from 'core/components/ui/progress-bar.comp'
import { message } from 'core/i18n/src/messages'
import { SystemInfo } from 'core/types/responses'

import SystemDetailComponent from './system-detail.comp'
import SystemDetailHeaderComponent from './system-detail-header.comp'
import SystemDetailSectionComponent from './system-detail-section.comp'

const messages = message.systemsPage.systemDetail
interface Props {
  systemInfo: SystemInfo
}

const SystemDetailContainer = ({ systemInfo }: Props) => {
  return (
    <div className="bg-white pb-10 mt-4">
      {systemInfo ? (
        <SystemDetailComponent>
          <SystemDetailHeaderComponent name={systemInfo.name} description={systemInfo.description} />
          <SystemDetailSectionComponent systemInfo={systemInfo} />
        </SystemDetailComponent>
      ) : (
        <ProgressBarComponent />
      )}
    </div>
  )
}
export default SystemDetailContainer
