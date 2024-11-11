import Link from 'next/link'
import { Fragment } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { LinkDecorator } from '@/components/decorators'
import Card from '@/components/layout/Card'
import { Heading } from '@/components/layout/Heading'
import { ItemAssignButton } from '@/modules/shared/form/itemAssign/item-assign.button'
import { ItemMoveButton } from '@/modules/shared/form/itemMoving/item-move.button'
import { PATH } from '@/types/constants/paths'

import { PhysicalItemForm } from './PhysicalItem.form'

export const SystemItemCard = () => {
  const { control } = useFormContext()
  const item = useWatch({ control, name: 'physicalItem' })

  return (
    <Card>
      <Card className="bg-amber-100 dark:bg-amber-600 rounded-md  shadow-md">
        <Fragment>
          <Heading
            customText={
              'ITEM: ' + (item?.catalogueItem?.name || 'No item Connectect')
            }
          >
            <div className="flex space-x-4 items-center">
              {item?.catalogueItem?.uid && (
                <Link
                  href={PATH.CATALOGUE_ITEM + '/' + item.catalogueItem.uid}
                  target={'_blank'}
                >
                  <LinkDecorator>View Catalogue Item</LinkDecorator>
                </Link>
              )}
              {item ? <ItemMoveButton /> : <ItemAssignButton />}
            </div>
          </Heading>
          {item && <PhysicalItemForm uid={item.uid} />}
        </Fragment>
      </Card>
    </Card>
  )
}
