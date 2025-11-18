import type { Row } from '@tanstack/react-table'
import { type FC } from 'react'

import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { Pagination } from '@/modules/shared/table/Pagination'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import {
  getColorBySystemLevel,
  getFontBySystemLevel
} from '@/modules/systemItem/utils'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import type { ModalButtons } from '@/types/form'
import type { SystemDetail } from '@/types/responses/systems'

import { FilterBadges } from '../../FilterBadges'
import { FilterButton } from '../../itemMoving/steps/system-selection/filter/FilterButton'
import { useDestinationColumns } from '../../itemMoving/steps/system-selection/SystemSelect.columns'
import { useModalWizardStore } from '../../itemMoving/store/useModalWizardStore'
import { useWizardStore } from '../../wizard/store/useWizardStore'

const messages = message.common.buttons

export const SelectItemStep: FC = () => {
  const tableId = 'assign-item-systems'

  const { setSelectedSystem, selectedSystem } = useModalWizardStore()

  const { goNext, updateFormData } = useWizardStore()
  const { closeModal } = useDynamicModalStore()

  const { systems } = useSystems(tableId)

  const columns = useDestinationColumns(tableId)

  const buttons: ModalButtons = {
    goNext: {
      text: messages.next,
      disabled: !selectedSystem,
      onClick: () => {
        goNext()
        updateFormData({ sourceSystemUid: selectedSystem?.uid })
      }
    },
    goBack: {
      text: messages.close,
      onClick: () => {
        setSelectedSystem(null)
        // NOTE: Modal is opened with ID 'item-assign' in item-assign.modal.tsx
        closeModal('item-assign')
      }
    }
  }
  const table = usePandaTable<SystemDetail>({
    tableId,
    data: systems?.data || [],
    columns,
    getSubRows: row => row.subSystems || []
  })

  const getRowProps = (row: Row<SystemDetail>) => ({
    onClick: () => {
      if (row.original.physicalItem) {
        setSelectedSystem(row.original)
      } else {
        return
      }
    },
    className: cn(
      getColorBySystemLevel(row.original?.systemLevel),
      getFontBySystemLevel(row.original?.systemLevel),
      row.original?.physicalItem &&
        'font-bold text-gray-700 dark:text-gray-200',
      row.original?.statistics?.sp_coverage != null &&
        row.original.statistics.sp_coverage < 1 &&
        'text-red-500 dark:text-red-500 font-bold',
      selectedSystem?.uid === row.original.uid
        ? 'bg-orange-200 hover:bg-orange-200 dark:bg-orange-600 dark:hover:bg-orange-600'
        : '',
      'cursor-pointer'
    )
  })

  return (
    <div>
      <SearchBar
        tableId={tableId}
        useQuery={false}
        left={<FilterButton />}
        right={<FilterBadges tableId={tableId} enableQueryURL={false} />}
      />
      <div className="h-[370px]">
        <PandaTableV2
          {...{
            tableId,
            data: systems?.data || [],
            columns,
            table,
            getRowProps
          }}
        />
      </div>
      <Pagination
        tableId={tableId}
        settings={{
          total: systems?.totalCount,
          enableQueryURL: false,
          pageSizeDefault: 50
        }}
      />
      <ModalButtonsComponent buttons={buttons} className="mt-0 sm:mt-0" />
    </div>
  )
}
