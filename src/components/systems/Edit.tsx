import { TrashIcon } from '@heroicons/react/24/outline'
import { yupResolver } from '@hookform/resolvers/yup'
import Image from 'next/image'
import { Dispatch, SetStateAction, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useForm, UseFormRegister } from 'react-hook-form'
import { object, string } from 'yup'

import { System } from '@/types/system'

import Button from '../ui/Buttons'
import { InputWithError, TextareaWithError } from '../ui/form/Input'
import { GenericButtons } from '../ui/modal/modal.buttons'
import { ImageIcon } from '../ui/SvgIcons'

const stringFields = [
  'name',
  'importanceCode',
  'zoneCode',
  'subZoneCode',
  'systemCode',
  'systemAlias',
  'locationCode',
]

const StringField = ({
  name,
  register,
  errors,
}: {
  name: string
  register: UseFormRegister<System>
  errors
}) => {
  const { message: errorMessage } = errors ?? {}
  return (
    <div>
      <label className="text-sm font-medium text-gray-700 capitalize">
        {name}
      </label>
      <div className="mt-1">
        <InputWithError
          name={name}
          register={register}
          isError={!!errorMessage}
          rounded="rounded-md"
        />
      </div>
    </div>
  )
}

const schema = object({
  name: string().min(5).required(),
  description: string(),
  importanceCode: string(),
  zoneCode: string().required(),
  systemTypeUID: string(),
  systemAlias: string().max(12).required(),
  locationCode: string().required(),
})

interface Props {
  data?: System
  onSubmit: (data: System) => void
  setIsEditing: Dispatch<SetStateAction<string>>
}

const Edit = ({ data, onSubmit, setIsEditing }: Props) => {
  const [image, setImage] = useState(data?.image ?? '')

  const { reset, handleSubmit, register, formState, getValues } =
    useForm<System>({
      defaultValues: data,
      resolver: yupResolver(schema),
    })

  const { errors } = formState

  const onDrop = useCallback(
    files => {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = () => setImage(reader.result as string)
    },
    [setImage],
  )
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    accept: { 'image/*': [] },
    onDrop,
  })

  const buttons = [
    {
      primary: false,
      type: 'button',
      value: 'Discard',
      onClick: () => {
        reset()
        setIsEditing('')
      },
    },
    {
      type: 'submit',
      value: 'Submit',
      primary: true,
    },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col flex-grow ml-10">
        {stringFields.map((name, idx) => (
          <StringField
            key={idx}
            name={name}
            register={register}
            errors={errors[name]}
          />
        ))}
        <div className="flex gap-x-4 ">
          <div className="flex flex-col pb-5">
            <label className="text-sm font-medium text-gray-700 capitalize">
              Preview Image
            </label>
            {image ? (
              <div className="mt-1 flex-col justify-center rounded border-gray-300 ">
                <Image width={200} height={200} alt="" src={image} />
                <Button
                  onClick={() => {
                    setImage('')
                  }}
                  className="w-full justify-center"
                  rounded="rounded-b-md"
                >
                  <TrashIcon
                    className="h-5 w-5 text-red-700"
                    aria-hidden="true"
                  />
                </Button>
              </div>
            ) : (
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
                      <input
                        {...getInputProps()}
                        name="image"
                        className="sr-only"
                      />
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
              </label>
            )}
          </div>
          <div className="grow">
            <label className="text-sm font-medium text-gray-700 capitalize">
              Description
            </label>
            <TextareaWithError
              register={register}
              isError={!!errors['description']}
              name="description"
              rounded="rounded-md"
            />
          </div>
        </div>
      </div>
      <GenericButtons buttons={buttons} />
    </form>
  )
}

export default Edit
