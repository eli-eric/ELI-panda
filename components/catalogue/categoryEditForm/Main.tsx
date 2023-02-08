import { TrashIcon } from '@heroicons/react/24/outline'
import { Input } from 'components/ui/form/Input'
import Image from 'next/image'
import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { CatalogueFormType } from 'types/catalogue'

const ImgIcon = () => (
  <svg
    className="mx-auto h-12 w-12 text-gray-400"
    stroke="currentColor"
    fill="none"
    viewBox="0 0 48 48"
    aria-hidden="true"
  >
    <path
      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const Main = () => {
  const { register, watch, setValue } = useFormContext<CatalogueFormType>()
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

  const image = watch('image')
  const groupName = watch('name')

  useEffect(() => {
    const codeValue = groupName ? groupName.replace(/\s+/g, '-').toLowerCase() : ''
    setValue('code', codeValue)
  }, [groupName, setValue])

  return (
    <div className="flex flex-row pb-5">
      {!image ? (
        <div className="mt-1 justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
          <div className="space-y-1 text-center">
            <ImgIcon />
            <div {...getRootProps()} className=" text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input {...getInputProps()} name="image" className="sr-only" />
              </label>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
      ) : (
        image && (
          <div className="mt-1 flex-col justify-center  border-gray-300 ">
            <Image width={160} height={160} alt="" src={image} />
            <button
              type="button"
              onClick={() => setValue('image', '')}
              className="w-full flex justify-center rounded-b-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            >
              <span className="sr-only">Delete</span>
              <TrashIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )
      )}
      <div className="flex flex-col flex-grow ml-10">
        <div>
          <label className="text-sm font-medium text-gray-700">Name</label>
          <div className="mt-1">
            <Input
              id="text"
              name="name"
              required
              type="text"
              register={register}
              className="appearance-none w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Code</label>
          <div className="mt-1">
            <Input
              name="code"
              disabled
              register={register}
              className="appearance-none w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Main
