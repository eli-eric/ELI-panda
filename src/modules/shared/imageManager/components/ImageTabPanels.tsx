import { TabPanel, TabPanels } from '@headlessui/react'
import Image from 'next/image'
import type { InputHTMLAttributes } from 'react'

import { ImageIcon } from '@/components/SvgIcons'
import { cx } from '@/utils'

import type { FileItem } from '../../fileManager/types'

interface ImageTabPanelsProps {
  data: FileItem[] | undefined
  getRootProps: () => InputHTMLAttributes<HTMLInputElement>
  open: () => void
  canEdit?: boolean
}

export const ImageTabPanels = ({
  data,
  getRootProps,
  open,
  canEdit = false
}: ImageTabPanelsProps) => (
  <TabPanels
    {...getRootProps()}
    className={cx(
      'h-full flex rounded-b-md border border-t-0 border-gray-300 justify-center',
      canEdit ? 'cursor-pointer' : 'cursor-default'
    )}
  >
    {data?.length ? (
      data?.map(obj => (
        <TabPanel key={obj.id} className="flex">
          <Image
            width={400}
            height={400}
            className="object-contain rounded-b-md max-h-56 min-h-56 p-[1px]"
            src={obj.url}
            alt={obj.name}
          />
        </TabPanel>
      ))
    ) : (
      <TabPanel
        className={cx(
          'mt-1 w-full items-center flex cursor-pointer justify-center rounded-md  border-gray-300 px-6 pt-5 pb-6',
          canEdit &&
            'focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2',
          !canEdit && 'bg-gray-100 dark:bg-gray-900'
        )}
        onClick={open}
      >
        <div className="space-y-1 text-center">
          <div className=" text-sm text-gray-600 dark:text-gray-200">
            <ImageIcon />
            <div className="relative  rounded-md font-medium text-primary-500">
              <span>Upload an image</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
        </div>
      </TabPanel>
    )}
  </TabPanels>
)
