import { TrashIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import useSWR from 'swr'

import { Button } from '@/components/Buttons'
import ImagePlaceHolder from '@/components/form/ImagePlaceHolder'
import { Input } from '@/components/form/Input'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { SystemTypeComboBox } from '@/modules/shared/form/systemType/SelectSystemType.combo'
import type { CategoryFormType } from '@/types/catalogue/categoryFormTypes'

interface FormImageProps {
  image: string
  onDelete: () => void
}

const FormImage = ({ image, onDelete }: FormImageProps) => (
  <div className="mt-1 flex-col w-full justify-center  border-gray-300 ">
    <Image width={300} height={300} alt="" src={image} />
    <Button type="button" onClick={onDelete} className="w-full justify-center" rounded="rounded-b-md">
      <TrashIcon
        className="h-4 w-4

 text-red-700"
        aria-hidden="true"
      />
    </Button>
  </div>
)

const Main = ({ uid }: { uid?: string }) => {
  const { catalogueCategoryImage } = useEndpoint({ uid: uid })
  const { data: categoryImage } = useSWR(uid ? catalogueCategoryImage : undefined)

  const [showImageUid, setShowImage] = useState<boolean>(!!uid)
  const { watch, setValue } = useFormContext<CategoryFormType>()
  const onDrop = useCallback(
    files => {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => setValue('image', reader.result as string)
    },
    [setValue]
  )
  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: { 'image/*': [] },
    onDrop
  })

  const image = watch('image')
  const name = watch('name')

  useEffect(() => {
    const codeValue = name ? name.replace(/\s+/g, '-').toLowerCase() : ''
    setValue('code', codeValue)
  }, [name, setValue, categoryImage, image])

  return (
    <div className="grid grid-cols-4 pb-5">
      {image === 'deleted' || (!categoryImage && !image) ? (
        <ImagePlaceHolder getInputProps={getInputProps} getRootProps={getRootProps} />
      ) : (
        <FormImage
          image={image ? image : categoryImage}
          onDelete={() => {
            if (showImageUid && !!categoryImage) {
              setShowImage(false)
              setValue('image', 'deleted')
            } else {
              setValue('image', '')
            }
          }}
        />
      )}
      <div className="flex flex-col col-span-3 flex-grow ml-10">
        <div className="mt-1">
          <Input name="name" label="Name" rounded="rounded-md" />
        </div>
        <div className="mt-1">
          <Input name="code" label="Code" disabled={true} rounded="rounded-md" />
        </div>
        <div className="mt-1">
          <SystemTypeComboBox systemTypeField={{ name: 'systemType', customLabel: 'System Type' }} />
        </div>
      </div>
    </div>
  )
}

export default Main
