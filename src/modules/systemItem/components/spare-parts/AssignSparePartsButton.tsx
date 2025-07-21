import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { message } from '@/i18n/src/messages'
import { useFilters } from '@/modules/shared/table/pandaTable/hooks/useFilters'
import { useSparesStore } from '@/modules/systemsSpareParts/store/useSparesStore'
import useTableStateStore from '@/store/useTableStateStore'
import { PATH } from '@/types/constants/paths'
import { SystemLevel } from '@/types/gql/graphql'

import { useSystemDetail } from '../../hooks/useSystemDetail'

const messages = message.systemsPage.systemDetail.spareParts.buttons

export const AssignSparePartButton = () => {
  const { systemDetail, catalogueItem } = useSystemDetail()
  const router = useRouter()
  const { setSelectedUidForSystem } = useSparesStore()

  const [, setColumnFilters] = useFilters('spare-parts', false, false)

  const { setSearch } = useTableStateStore()

  const handleAssignSparePart = () => {
    const parentTechnologicalUnit = systemDetail?.parentPath
      ?.reverse()
      .find(element => element?.systemLevel === SystemLevel.TechnologyUnit)

    const filters = parentTechnologicalUnit
      ? [
          {
            id: 'catalogueNumber',
            name: 'catalogueNumber',
            value: catalogueItem?.catalogueNumber
          },
          {
            id: 'parentSystem',
            name: 'parentSystem',
            value: {
              name: parentTechnologicalUnit?.name,
              uid: parentTechnologicalUnit?.uid
            }
          },
          {
            id: 'itemUsage',
            name: 'itemUsage',
            value: [
              '25c189d0-0564-43a7-90d9-65b7083bea98',
              '89d68bc5-82cc-45cf-80aa-8edb86bf52f1',
              '5defcd49-5307-4b21-94b1-870b8f61a919',
              '0c7a063d-2bb6-41ef-b808-a137e1deaaa0',
              'a5a2a316-fc23-45fd-b6b2-3dc2af4205ea'
            ]
          }
        ]
      : [
          {
            id: 'catalogueNumber',
            name: 'catalogueNumber',
            value: catalogueItem?.catalogueNumber
          },
          {
            id: 'itemUsage',
            name: 'itemUsage',
            value: [
              '25c189d0-0564-43a7-90d9-65b7083bea98',
              '89d68bc5-82cc-45cf-80aa-8edb86bf52f1',
              '5defcd49-5307-4b21-94b1-870b8f61a919',
              '0c7a063d-2bb6-41ef-b808-a137e1deaaa0',
              'a5a2a316-fc23-45fd-b6b2-3dc2af4205ea'
            ]
          }
        ]

    setColumnFilters(filters)
    setSearch('for-system', systemDetail?.uid)
    setSelectedUidForSystem(systemDetail?.uid)
    router.push(PATH.SPARE_PARTS)
  }

  return (
    <Tooltip content="Redirect to assign Spare Part page">
      <div>
        <Button onClick={handleAssignSparePart}>
          <FormattedMessage id={messages.assign} />
        </Button>
      </div>
    </Tooltip>
  )
}
