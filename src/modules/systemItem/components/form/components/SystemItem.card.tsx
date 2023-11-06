import Link from 'next/link'
import { Fragment } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import { LinkDecorator } from '@/components/decorators'
import Card from '@/components/layout/Card'
import { Heading } from '@/components/layout/Heading'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { PATH } from '@/types/constants/paths'

import { AssignPhysicalItem } from '../../AssignPhysicalItem'
import { PhysicalItemForm } from './PhysicalItem.form'

export const SystemItemCard = () => {
  const { control } = useFormContext()
  const { systemDetail } = useSystemDetail()
  const item = useWatch({ control, name: 'physicalItem' })

  return (
    <Card>
      <Card className="bg-amber-100 rounded-md  shadow-md">
        <Fragment>
          <Heading customText={'ITEM: ' + item?.catalogueItem?.name ?? 'No item Connectect'}>
            <div className="flex space-x-10">
              {item?.catalogueItem?.uid && (
                <Link href={PATH.CATALOGUE_ITEM + '/' + item.catalogueItem.uid} target={'_blank'}>
                  <LinkDecorator>View Catalogue Item</LinkDecorator>
                </Link>
              )}
              <AssignPhysicalItem />
            </div>
          </Heading>
          {item && <PhysicalItemForm />}
        </Fragment>
      </Card>
    </Card>
  )
}
