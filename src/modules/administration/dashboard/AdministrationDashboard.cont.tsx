import { AdministrationDashboard } from './components/AdministrationDashboard.comp'
import { useCronHistory } from './hooks/useCronHistory'
import { useEmployeesSync } from './hooks/useEmployeesSync'
import { findLastEmployeesSync } from './utils/cronHistory'

export const AdministrationDashboardContainer = () => {
    const { data: history, isLoading, isError } = useCronHistory()
    const { runSync, isPending } = useEmployeesSync()

    return (
        <AdministrationDashboard
            lastRun={findLastEmployeesSync(history)}
            isHistoryLoading={isLoading}
            isHistoryError={isError}
            isSyncing={isPending}
            onRun={runSync}
        />
    )
}
