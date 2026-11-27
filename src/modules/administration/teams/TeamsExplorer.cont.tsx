import type { FC } from 'react'

import { TeamDetailView } from './components/detail/TeamDetailView.cont'
import { TeamsLayoutComponent } from './components/layout/TeamsLayout.comp'
import { TeamsListPanel } from './components/list/TeamsListPanel.cont'

const TeamsExplorerContainer: FC = () => (
    <TeamsLayoutComponent list={<TeamsListPanel />} detail={<TeamDetailView />} />
)

export default TeamsExplorerContainer
