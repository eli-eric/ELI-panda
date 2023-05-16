import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

import FormImage from '@/components/form/FormImage'
import ImagePlaceHolder from '@/components/form/ImagePlaceHolder'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { useImage } from '@/hooks/useImage'

import type { SystemEditFormType } from '../../types/form'

const SystemFormImage = ({ uid }: { uid?: string }) => {
  const { systemImage: systemDetailImage } = useEndpoint({ uid: uid as string })
  const systemImage = useImage(uid ? systemDetailImage : undefined, false)
  const { setValue, watch } = useFormContext<SystemEditFormType>()

  const image = watch('image')
  const [showImageUid, setShowImage] = useState<boolean>(!!uid)

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
  return (
    <div className="flex h-full ">
      {image === 'deleted' || (!systemImage && !image) ? (
        <ImagePlaceHolder getInputProps={getInputProps} getRootProps={getRootProps} />
      ) : (
        <FormImage
          image={image ? image : systemImage}
          onDelete={() => {
            if (showImageUid && !!systemImage) {
              setShowImage(false)
              setValue('image', 'deleted')
            } else {
              setValue('image', '')
            }
          }}
        />
      )}
    </div>
  )
}

export default SystemFormImage
