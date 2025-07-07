import { type FC } from 'react'

import { Disclosure } from '@/components/ui'

import { SystemDetailParameter } from '../system-detail-parameter.comp'
import { SystemLink } from '../SystemLink.comp'

interface CatalogueItemSectionProps {
  catalogueItem: any
}

export const CatalogueItemSection: FC<CatalogueItemSectionProps> = ({
  catalogueItem
}) => {
  if (!catalogueItem?.uid) return null

  return (
    <Disclosure
      title="Catalogue Item"
      defaultOpen={true}
      className="w-full border rounded-md overflow-hidden"
      buttonClassName="p-3 bg-gray-50 dark:bg-gray-700"
      panelClassName="px-3 py-3 space-y-2"
      transparentButton={false}
    >
      <div className="grid grid-cols-1 gap-2 text-sm">
        <SystemDetailParameter
          title="Catalogue Item Name"
          value={catalogueItem.name}
        />
        <SystemDetailParameter
          title="Part Number"
          value={catalogueItem.catalogueNumber}
        />
        <SystemDetailParameter
          title="Category"
          value={catalogueItem.catalogueCategory?.name}
        />
        <SystemDetailParameter
          title="Supplier"
          value={catalogueItem.supplier?.name}
        />
        {catalogueItem.description && (
          <div className="pt-2">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Description:
            </p>
            <p className="text-xs text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded">
              {catalogueItem.description}
            </p>
          </div>
        )}
      </div>

      <div className="pt-2">
        <SystemLink href={`/catalogue/item/${catalogueItem.uid}`} external>
          Open Catalogue Item Detail
        </SystemLink>
      </div>
    </Disclosure>
  )
}
