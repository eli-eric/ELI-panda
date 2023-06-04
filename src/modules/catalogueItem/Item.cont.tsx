import { FormProvider } from 'react-hook-form'

import { Input, TextArea } from '@/components/form/Input'
import { message } from '@/i18n/src/messages'

import ImageGalleryComponent from '../../components/item-detail/ImageGallery'
import useItemForm from './components/form/ItemForm.cont'
import ItemPropertiesComponent from './default-properties/item-properties.comp'
import ItemDetailHeaderComponent from './header/Header.comp'

const messages = message.cataloguePage.itemList.header

const ItemContainer = () => {
  const {
    FormWarningModal,
    item: { item, image, groups },
    ...formMethods
  } = useItemForm()

  return (
    <FormProvider {...formMethods}>
      <ItemDetailHeaderComponent />
      <div className="bg-white pb-10">
        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 h-full overflow-auto">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 pb-3">
              <ImageGalleryComponent images={[image]} />
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 col-span-2">
                <Input name="name" register={formMethods.register} label={'Name'} rounded={'rounded-md'} />
                <ItemPropertiesComponent item={item} groups={groups} />
              </div>
            </div>
            <TextArea name="description" register={formMethods.register} label={'Description'} rounded={'rounded-md'} />
          </div>
        </main>
      </div>
      <FormWarningModal />
    </FormProvider>
  )
}

export default ItemContainer
