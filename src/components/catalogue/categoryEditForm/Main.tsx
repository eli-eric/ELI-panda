import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { InputWithError } from 'src/components/ui/form/Input'
import { TrashIconButton } from 'src/components/ui/IconButtons'
import { ImageIcon } from 'src/components/ui/SvgIcons'
import { CatalogueFormType } from '@/types/catalogue/catalogueTypes'

const Main = () => {
  const { register, watch, setValue, formState } = useFormContext<CatalogueFormType>()
  const onDrop = useCallback(
    files => {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => setValue('image', reader.result as string)
    },
    [setValue]
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: { 'image/*': [] },
    onDrop
  })

  const { errors } = formState

  const image = watch('image')
  const groupName = watch('name')

  useEffect(() => {
    const codeValue = groupName ? groupName.replace(/\s+/g, '-').toLowerCase() : ''
    setValue('code', codeValue)
  }, [groupName, setValue])

  return (
    <div className="flex flex-row pb-5">
      {!image ? (
        <label
          htmlFor="file-upload"
          {...getRootProps()}
          className="mt-1 cursor-pointer justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
        >
          <div className="space-y-1 text-center">
            <div className=" text-sm text-gray-600">
              <ImageIcon />
              <div className="relative  rounded-md bg-white font-medium text-primary-600">
                <span>Upload a file</span>
                <input {...getInputProps()} name="image" className="sr-only" />
              </div>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </label>
      ) : (
        <div className="mt-1 flex-col justify-center  border-gray-300 ">
          <Image width={160} height={160} alt="" src={image} />
          <TrashIconButton
            onClickAction={() => setValue('image', '')}
            customClass="w-full justify-center"
            rounded="rounded-b-md"
          />
        </div>
      )}
      <div className="flex flex-col flex-grow ml-10">
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1">
            <InputWithError name="name" register={register} isError={!errors.name?.message} rounded="rounded-md" />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Code</label>
          <div className="mt-1">
            <InputWithError
              name="code"
              register={register}
              disabled={true}
              isError={!errors.code?.message}
              rounded="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
