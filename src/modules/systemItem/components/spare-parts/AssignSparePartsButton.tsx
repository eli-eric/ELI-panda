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

  return (
    <Tooltip content="Redirect to assign Spare Part page">
      <div>
        <Button
          primary
          buttonSize="large"
          onClick={() => {
            const parentTechnologicalUnit = systemDetail?.parentPath
              ?.reverse()
              .find(
                element => element?.systemLevel === SystemLevel.TechnologyUnit
              )
            setColumnFilters([
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
              }
            ])
            setSearch('for-system', systemDetail?.uid)
            setSelectedUidForSystem(systemDetail?.uid)
            router.push(PATH.SPARE_PARTS)
          }}
        >
          <FormattedMessage id={messages.assign} />
        </Button>
      </div>
    </Tooltip>
  )
}
