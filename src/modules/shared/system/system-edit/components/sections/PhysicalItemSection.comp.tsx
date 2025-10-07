import type { FC } from 'react'

import { InlineEditInput } from '@/components/form/inline-edit/InlineEditInput'
import { InlineEditListbox } from '@/components/form/inline-edit/InlineEditListbox'
import { InlineEditTextArea } from '@/components/form/inline-edit/InlineEditTextArea'
import { Disclosure } from '@/components/ui'
import { SystemDetailParameter } from '@/modules/shared/system/device-info-overlay/components/system-detail-parameter.comp'
import useSystemEditFormFields from '@/modules/systemItem/components/form/SystemForm.fields'
import { PATH } from '@/types/constants/paths'
import { encodeURIWithStringify } from '@/utils'

interface PhysicalItemSheetSectionProps {
  physicalItem: any
  catalogueItem: any
}

export const PhysicalItemSection: FC<PhysicalItemSheetSectionProps> = ({
  physicalItem,
  catalogueItem
}) => {
  const fields = useSystemEditFormFields()
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
        <InlineEditInput {...fields.serialNumber} />
        {/* Item Usage (inline edit) */}
        <InlineEditListbox {...fields.itemUsage} />
        {/* Condition Status (inline edit) */}
        <InlineEditListbox {...fields.itemConditionStatus} />
        {/* Notes (inline edit) */}
        <InlineEditTextArea {...fields.itemNotes} />
        {/* Read-only fields (styled as in device info overlay) */}
        {physicalItem.eun && (
          <SystemDetailParameter title="EUN" value={physicalItem.eun} />
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
            href={`${PATH.CATALOGUE}?page=1&category=${encodeURIWithStringify({ uid: catalogueItem.catalogueCategory.uid, name: catalogueItem.catalogueCategory.name })}`}
          />
        )}
        {catalogueItem?.supplier?.name && (
          <SystemDetailParameter
            title="Supplier"
            value={catalogueItem.supplier.name}
          />
        )}
      </div>
    </Disclosure>
  )
}
