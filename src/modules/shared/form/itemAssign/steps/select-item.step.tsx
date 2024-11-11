import type { Row } from '@tanstack/react-table'
import { type FC } from 'react'

import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import { Pagination } from '@/modules/shared/table/Pagination'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import type { ModalButtons } from '@/types/form'
import type { SystemDetail } from '@/types/responses/systems'
import { classNames } from '@/utils'

import { FilterBadges } from '../../FilterBadges'
import { FilterButton } from '../../itemMoving/steps/system-selection/filter/FilterButton'
import { useDestinationColumns } from '../../itemMoving/steps/system-selection/SystemSelect.columns'
import { useModalWizardStore } from '../../itemMoving/store/useModalWizardStore'
import { useWizardStore } from '../../wizard/store/useWizardStore'

const messages = message.common.buttons

export const SelectItemStep: FC = () => {
  const tableId = 'assign-item-systems'

  const { setSelectedSystem, selectedSystem } = useModalWizardStore()

  const { goNext, goBack, updateFormData } = useWizardStore()

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
      text: messages.back,
      onClick: () => {
        goBack()
        setSelectedSystem(null)
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
    className: classNames(
      selectedSystem?.uid === row.original.uid
        ? 'bg-primary-200 hover:bg-primary-200 dark:bg-primary-600 dark:hover:bg-primary-600'
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
