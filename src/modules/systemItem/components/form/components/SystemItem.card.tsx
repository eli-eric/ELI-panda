import Link from 'next/link'
import { Fragment } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { LinkDecorator } from '@/components/decorators'
import { Heading } from '@/components/layout/Heading'
import { Card as CardUI, CardContent } from '@/components/ui/card'
import { message } from '@/i18n/src/messages'
import { ItemAssignButton } from '@/modules/shared/form/itemAssign/item-assign.button'
import { ItemMoveButton } from '@/modules/shared/form/itemMoving/item-move.button'
import { PATH } from '@/types/constants/paths'

import { PhysicalItemForm } from './PhysicalItem.form'

export const SystemItemCard = () => {
  const { formatMessage: fm } = useIntl()
  const { control } = useFormContext()
  const item = useWatch({ control, name: 'physicalItem' })

  return (
    <CardUI className="border-2 border-amber-600 rounded-md shadow-md mt-8 ">
      <CardContent>
        <Fragment>
          <Heading
            customText={'ITEM: ' + (item?.catalogueItem?.name || 'No item')}
          >
            <div className="flex space-x-4 items-center">
              {item?.catalogueItem?.uid && (
                <Link
                  href={PATH.CATALOGUE_ITEM + '/' + item.catalogueItem.uid}
                  target={'_blank'}
                >
                  <LinkDecorator>
                    {fm({ id: message.common.systemItem.viewCatalogueItem })}
                  </LinkDecorator>
                </Link>
              )}
              {item ? <ItemMoveButton /> : <ItemAssignButton />}
            </div>
          </Heading>
          {item && <PhysicalItemForm uid={item.uid} />}
        </Fragment>
      </CardContent>
    </CardUI>
  )
}
