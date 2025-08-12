import { Package } from 'lucide-react'
import Link from 'next/link'
import { useFormContext, useWatch } from 'react-hook-form'

import { LinkDecorator } from '@/components/decorators'
import {
  Card as CardUI,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { ItemAssignButton } from '@/modules/shared/form/itemAssign/item-assign.button'
import { ItemMoveButton } from '@/modules/shared/form/itemMoving/item-move.button'
import { PATH } from '@/types/constants/paths'

import { PhysicalItemForm } from './PhysicalItem.form'

interface SystemItemCardProps {
  showHeaderActions?: boolean
  hideActions?: boolean
}

export const SystemItemCard = ({ showHeaderActions, hideActions }: SystemItemCardProps) => {
  const { control } = useFormContext()
  const item = useWatch({ control, name: 'physicalItem' })

  // If showing header actions, only show the action button
  if (showHeaderActions) {
    return item ? <ItemMoveButton /> : <ItemAssignButton />
  }

  return (
    <div className="space-y-4">
      {/* Actions Row - only if not hidden and item exists */}
      {!hideActions && item && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {item?.catalogueItem?.uid && (
              <Link
                href={PATH.CATALOGUE_ITEM + '/' + item.catalogueItem.uid}
                target="_blank"
                className="text-sm text-primary hover:text-primary/80 underline"
              >
                View Catalogue
              </Link>
            )}
          </div>
          <div><ItemMoveButton /></div>
        </div>
      )}

      {/* Physical Item Content */}
      {item ? (
        <div>
          <div className="text-base font-medium mb-4">
            {item.catalogueItem?.name || 'Unknown Item'}
          </div>
          <PhysicalItemForm uid={item.uid} />
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground">
          No physical item assigned to this system
        </div>
      )}
    </div>
  )
}
