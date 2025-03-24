import Combobox from '@/components/form/Combobox'
import { Input } from '@/components/form/inputs'
import { useFormFilterState } from '@/hooks/form/useFormFilters'
import { SelectLocationCombo } from '@/modules/shared/form/location/SelectLocation.combo'
import { SelectSystemComboBox } from '@/modules/shared/form/systemSelect/SelectSystem.combo'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import { useSystemsFilterFields } from '@/modules/systems/components/filters/form/SystemsFilter.fields'
import { cx } from '@/utils'

export const FilterForm = ({
  tableId,
  enableQueryUrl
}: {
  tableId: string
  enableQueryUrl: boolean
}) => {
  const fields = useSystemsFilterFields()

  const { setFilter } = useFormFilterState({ tableId, enableQueryUrl })

  return (
    <div className={cx('md:grid md:grid-cols-2 md:gap-4 md:min-w-[500px]')}>
      <div className="flex flex-col gap-2">
        <SelectSystemComboBox
          selectSystemField={fields.parentSystem}
          onChange={setFilter(fields.parentSystem.name)}
          isFilter={true}
        />
        <Input
          {...fields.name}
          onChange={setFilter(fields.name.name)}
          isFilter={true}
        />
        <SystemTypeComboBox
          systemTypeField={fields.systemType}
          clickIcon={true}
          onChange={setFilter(fields.systemType.name)}
          isFilter={true}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Input
          {...fields.systemCode}
          onChange={setFilter(fields.systemCode.name)}
          isFilter={true}
        />
        <Combobox
          {...fields.zone}
          onSelect={setFilter(fields.zone.name)}
          isFilter={true}
        />
        <SelectLocationCombo
          locationField={fields.location}
          onSelect={setFilter(fields.location.name)}
          isFilter={true}
        />
      </div>
    </div>
  )
}
