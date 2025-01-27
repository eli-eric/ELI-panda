import { Tab } from '@headlessui/react'
import Image from 'next/image'
import type { InputHTMLAttributes } from 'react'

import { DeleteButton, PlusButton } from '@/components/Buttons'
import { cx } from '@/utils'

import type { FileItem } from '../../fileManager/types'

type ImageTabListProps = {
  data: FileItem[] | undefined
  canEdit: boolean | undefined
  open: () => void
  getInputProps: () => InputHTMLAttributes<HTMLInputElement>
  handleDelete: (obj: FileItem) => void
  withWarnModal: (
    callback: (arg: any) => any,
    message: string
  ) => (arg: any) => void
  selectedIndex: number
  allowMultipleImages: boolean
}

export const ImageTabList = ({
  data,
  canEdit,
  open,
  getInputProps,
  handleDelete,
  withWarnModal,
  selectedIndex,
  allowMultipleImages
}: ImageTabListProps) => (
  <Tab.List
    className={`rounded-t-md border border-gray-300 flex gap-1 justify-between`}
  >
    <input {...getInputProps()} />
    {canEdit && allowMultipleImages && (
      <div>
        <PlusButton
          type="button"
          onClick={open}
          className="h-full flex border-0 border-r rounded-none rounded-tl-md"
        />
      </div>
    )}
    {allowMultipleImages && (
      <div className="flex flex-wrap w-full justify-center space-x-1">
        {data?.map(obj => (
          <Tab key={obj.id}>
            {({ selected }) => (
              <Image
                className={cx(
                  'rounded-full size-5',
                  selected && 'border-2 border-primary-500 size-6'
                )}
                src={obj.url}
                alt={obj.name}
                width={20}
                height={20}
              />
            )}
          </Tab>
        ))}
      </div>
    )}
    {canEdit && (
      <DeleteButton
        type="button"
        onClick={() =>
          withWarnModal(
            handleDelete,
            `Are you sure you want to delete ${(data ?? [])[selectedIndex]?.name}?`
          )((data ?? [])[selectedIndex])
        }
        className={cx(
          'flex border-0 border-l rounded-none rounded-tr-md',
          !allowMultipleImages &&
            'min-w-full items-center justify-center rounded-tl-md border-l-0'
        )}
        disabled={!data || data.length === 0}
      />
    )}
  </Tab.List>
)
