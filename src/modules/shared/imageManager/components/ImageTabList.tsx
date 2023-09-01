import { Tab } from '@headlessui/react'
import type { InputHTMLAttributes } from 'react'

import { DeleteButton, PlusButton } from '@/components/Buttons'

import type { FileItem } from '../../fileManager/types'

type ImageTabListProps = {
  data: FileItem[] | undefined
  canEdit: boolean | undefined
  open: () => void
  getInputProps: () => InputHTMLAttributes<HTMLInputElement>
  handleDelete: (obj: FileItem) => void
  withWarnModal: (callback: (arg: any) => any, message: string) => (arg: any) => void
  selectedIndex: number
}

export const ImageTabList = ({
  data,
  canEdit,
  open,
  getInputProps,
  handleDelete,
  withWarnModal,
  selectedIndex
}: ImageTabListProps) => (
  <Tab.List className={`rounded-t-md border border-gray-300 flex gap-1 justify-between`}>
    {canEdit && (
      <div>
        <input {...getInputProps()} />
        <PlusButton type="button" onClick={open} className="h-full flex border-0 border-r rounded-none rounded-tl-md" />
      </div>
    )}
    <div className="flex flex-wrap w-full justify-center">
      {data?.map(obj => (
        <Tab key={obj.id}>
          {({ selected }) => <span className={`px-1 ${selected && 'text-orange-600'} text-sm`}>&bull;</span>}
        </Tab>
      ))}
    </div>
    {canEdit && (
      <div>
        <DeleteButton
          type="button"
          onClick={() =>
            withWarnModal(
              handleDelete,
              `Are you sure you want to delete ${(data ?? [])[selectedIndex]?.name}?`
            )((data ?? [])[selectedIndex])
          }
          className="flex border-0 border-l rounded-none rounded-tr-md"
          disabled={!data || data.length === 0}
        />
      </div>
    )}
  </Tab.List>
)
