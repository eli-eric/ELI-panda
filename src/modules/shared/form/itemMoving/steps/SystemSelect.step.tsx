import type { Row } from '@tanstack/react-table'
import { type FC } from 'react'

import ModalButtonsComponent from '@/components/overlays/modal/modal.buttons'
import { message } from '@/i18n/src/messages'
import { Pagination } from '@/modules/shared/table/Pagination'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import { PandaTableV2 } from '@/modules/shared/table/pandaTableV2/PandaTableV2'
import { SearchBar } from '@/modules/shared/table/SearchBar'
import {
  getColorBySystemLevel,
  getFontBySystemLevel
} from '@/modules/systemItem/utils'
import { useSystems } from '@/modules/systems/hooks/useSystems'
import type { ModalButtons } from '@/types/form'
import type { SystemDetail } from '@/types/responses/systems'
import { classNames } from '@/utils'

import { FilterBadges } from '../../FilterBadges'
import { useWizardStore } from '../../wizard/store/useWizardStore'
import { useModalWizardStore } from '../store/useModalWizardStore'
import { MOVE_TYPE } from '../types/constants'
import { FilterButton } from './system-selection/filter/FilterButton'
import { useDestinationColumns } from './system-selection/SystemSelect.columns'

const messages = message.common.buttons

export const SelectSystemContainer: FC = () => {
  const tableId = 'destination-systems'

  const {
    selectedSystem,
    setSelectedSystem,
    isMovingToNewSystem,
    setMoveType
  } = useModalWizardStore()

  const { goNext, goBack, setFormData } = useWizardStore()

  const { systems } = useSystems(tableId)

  const columns = useDestinationColumns(tableId)

  const buttons: ModalButtons = {
    goNext: {
      text: messages.next,
      disabled: !selectedSystem,
      onClick: () => {
        if (selectedSystem) {
          setFormData({ system: selectedSystem })
          goNext()
        }
      }
    },
    goBack: {
      text: messages.back,
      onClick: () => {
        goBack()
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
        setMoveType(MOVE_TYPE.EXCHANGE)
      } else {
        setSelectedSystem(row.original)
        setMoveType(
          isMovingToNewSystem
            ? MOVE_TYPE.NEW_SYSTEM
            : MOVE_TYPE.DESTINATION_SYSTEM
        )
      }
    },
    className: classNames(
      getColorBySystemLevel(row.original?.systemLevel),
      getFontBySystemLevel(row.original?.systemLevel),
      row.original?.physicalItem &&
        'font-bold text-gray-700 dark:text-gray-200',
      row.original?.statistics?.sp_coverage != null &&
        row.original.statistics.sp_coverage < 1 &&
        'text-red-500 dark:text-red-500 font-bold',
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
