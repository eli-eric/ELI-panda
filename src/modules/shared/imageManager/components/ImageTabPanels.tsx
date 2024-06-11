import { Tab } from '@headlessui/react'
import Image from 'next/image'
import type { InputHTMLAttributes } from 'react'

import { ImageIcon } from '@/components/SvgIcons'

import type { FileItem } from '../../fileManager/types'

interface ImageTabPanelsProps {
  data: FileItem[] | undefined
  getRootProps: () => InputHTMLAttributes<HTMLInputElement>
  open: () => void
}

export const ImageTabPanels = ({
  data,
  getRootProps,
  open
}: ImageTabPanelsProps) => (
  <Tab.Panels
    {...getRootProps()}
    className="h-full flex rounded-b-md border border-t-0 border-gray-300 justify-center"
  >
    {data?.length ? (
      data?.map(obj => (
        <Tab.Panel key={obj.id} className="flex">
          <Image
            width={400}
            height={400}
            className="object-contain rounded-b-md max-h-56 min-h-56 p-[1px]"
            src={obj.url}
            alt={obj.name}
          />
        </Tab.Panel>
      ))
    ) : (
      <Tab.Panel
        className="mt-1 w-full items-center flex cursor-pointer justify-center rounded-md  border-gray-300 px-6 pt-5 pb-6 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2"
        onClick={open}
      >
        <div className="space-y-1 text-center">
          <div className=" text-sm text-gray-600 dark:text-gray-200">
            <ImageIcon />
            <div className="relative  rounded-md bg-white dark:bg-gray-800 font-medium text-primary-500">
              <span>Upload a image</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      </Tab.Panel>
    )}
  </Tab.Panels>
)
