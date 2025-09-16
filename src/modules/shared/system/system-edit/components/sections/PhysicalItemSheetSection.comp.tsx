import type { FC } from 'react'
import { useFormContext } from 'react-hook-form'

import { InlineEditInput } from '@/components/form/inline-edit/InlineEditInput'
import { InlineEditListbox } from '@/components/form/inline-edit/InlineEditListbox'
import { InlineEditTextArea } from '@/components/form/inline-edit/InlineEditTextArea'
import { Disclosure } from '@/components/ui'
import { SystemDetailParameter } from '@/modules/shared/system/device-info-overlay/components/system-detail-parameter.comp'
import { PATH } from '@/types/constants/paths'

interface PhysicalItemSheetSectionProps {
  physicalItem: any
  catalogueItem: any
}

export const PhysicalItemSheetSection: FC<PhysicalItemSheetSectionProps> = ({
  physicalItem,
  catalogueItem
}) => {
  const { control } = useFormContext()
  if (!physicalItem) return null

  return (
    <Disclosure
      title="Physical Item"
      defaultOpen={true}
      className="w-full border rounded-md overflow-hidden shadow-md"
      buttonClassName="bg-amber-100 dark:bg-amber-600 text-gray-900 dark:text-gray-100 hover:bg-amber-200 dark:hover:bg-amber-700 transition-colors"
      panelClassName="px-3 py-3 space-y-2 shadow-md shadow-gray-200 dark:shadow-gray-800"
      transparentButton={false}
    >
      <div className="grid grid-cols-1 gap-2 text-sm">
        {/* Serial Number (inline edit) */}
        <InlineEditInput
          name="physicalItem.serialNumber"
          label="Serial Number"
          placeholder="Enter serial number"
        />
        {/* Item Usage (inline edit) */}
        <InlineEditListbox
          name="physicalItem.itemUsage"
          label="Item Usage"
          codebook={'ITEM_USAGE' as any}
        />
        {/* Condition Status (inline edit) */}
        <InlineEditListbox
          name="physicalItem.conditionStatus"
          label="Condition Status"
          codebook={'ITEM_CONDITION_STATUS' as any}
        />
        {/* Notes (inline edit) */}
        <InlineEditTextArea
          name="physicalItem.notes"
          label="Notes"
          placeholder="Enter notes"
        />
        {/* Read-only fields (styled as in device info overlay) */}
        {physicalItem.eun && (
          <SystemDetailParameter title="EUN" value={physicalItem.eun} />
        )}
        {physicalItem.serialNumber && (
          <SystemDetailParameter
            title="Serial Number"
            value={physicalItem.serialNumber}
          />
        )}
        {physicalItem.itemUsage?.name && (
          <SystemDetailParameter
            title="Item Usage"
            value={physicalItem.itemUsage.name}
          />
        )}
        {catalogueItem?.catalogueNumber && (
          <SystemDetailParameter
            title="Part Number"
            value={catalogueItem.catalogueNumber}
            href={PATH.CATALOGUE_ITEM + '/' + catalogueItem.uid}
          />
        )}
        {catalogueItem?.catalogueCategory?.name && (
          <SystemDetailParameter
            title="Category"
            value={catalogueItem.catalogueCategory.name}
            href={`${PATH.CATALOGUE}?page=1&category=${encodeURIComponent(JSON.stringify({ uid: catalogueItem.catalogueCategory.uid, name: catalogueItem.catalogueCategory.name }))}`}
          />
        )}
        {catalogueItem?.supplier?.name && (
          <SystemDetailParameter
            title="Supplier"
            value={catalogueItem.supplier.name}
          />
        )}
        {physicalItem.conditionStatus?.name && (
          <SystemDetailParameter
            title="Condition Status"
            value={physicalItem.conditionStatus.name}
          />
        )}
      </div>
    </Disclosure>
  )
}
