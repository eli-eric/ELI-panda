import { DevTool } from '@hookform/devtools'
import { FormProvider } from 'react-hook-form'

import DisclosureComponent from '@/components/Disclosure.comp'
import { TextArea } from '@/components/form/Input'
import Card from '@/components/layout/Card'

import ImageGalleryComponent from '../../components/item-detail/ImageGallery'
import DefaultItemForm from './components/form/DefaultItemForm'
import GroupProperty from './components/form/GroupProperty'
import useItemForm from './components/form/ItemForm.cont'
import ItemHeader from './components/header/Header.comp'
import useItemSubmit from './hooks/useItemSubmit'

const ItemContainer = () => {
  const {
    FormWarningModal,
    item: { item, image, groups },
    ...formMethods
  } = useItemForm()

  const { submit } = useItemSubmit()

  const onSubmit = (data: any) => {
    console.log(data)
    submit(data)
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)}>
        <ItemHeader disabledEdit={false} loading={false} />
        <Card className="flex flex-col justify-between">
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 pb-3">
            <ImageGalleryComponent images={[image]} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 col-span-2">
              <DefaultItemForm />
            </div>
          </div>
          <TextArea name="description" register={formMethods.register} label={'Description'} rounded={'rounded-md'} />
          {item?.details &&
            groups?.map(group => (
              <DisclosureComponent key={group} title={group} defaultOpen={true}>
                <div className="px-4 sm:px-6">
                  <dl key={group} className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    {item.details?.map(
                      (detail, index) =>
                        detail.propertyGroup === group && (
                          <GroupProperty
                            key={detail.property.uid + index + detail.property.name}
                            detail={detail}
                            index={index}
                          />
                        )
                    )}
                  </dl>
                </div>
              </DisclosureComponent>
            ))}
          <FormWarningModal />
        </Card>
      </form>
      <DevTool control={formMethods.control} />
    </FormProvider>
  )
}

export default ItemContainer
