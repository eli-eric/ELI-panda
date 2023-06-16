import type { StaticImageData } from 'next/image'
import { useRouter } from 'next/router'

import { Grid } from '@/components/grid/Grid'
import useImageManager from '@/hooks/useImageManager'
import { message } from '@/i18n/src/messages'
import { FILE_TYPE } from '@/types/constants/files'

import ItemPropertyTitle from '../item-property/item-property-title.comp'
import ItemPropertyValue from '../item-property/item-property-value.comp'

interface Props {
  title: string
  images: Array<string | StaticImageData>
  description?: string
  children: React.ReactNode
}

const messages = message.common.property

const ItemDetailComponent = ({ title, images, description, children }: Props) => {
  const router = useRouter()
  const { save, Gallery: ImageGallery } = useImageManager({
    itemCategory: FILE_TYPE.SYSTEM,
    itemId: String(router.query.uid)
  })
  return (
    <Grid className="pb-10">
      <div className="col-span-3 md:col-span-2 lg:col-span-4 mr-auto pr-4">
        <ImageGallery hasEditRole={true} />
        <button onClick={() => save()}>yallah</button>
      </div>
      <div className="col-span-3 md:col-span-4 lg:col-span-8">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 mb-4 mt-4 md:mt-0">{title}</h1>
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">{children}</dl>
      </div>
      {description && (
        <div className="col-span-full mt-4">
          <ItemPropertyTitle title={messages.description}>
            <ItemPropertyValue text={description} />
          </ItemPropertyTitle>
        </div>
      )}
    </Grid>
  )
}

export default ItemDetailComponent
