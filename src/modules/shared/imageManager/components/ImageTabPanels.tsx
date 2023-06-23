import { Tab } from '@headlessui/react'
import Image from 'next/image'
import type { InputHTMLAttributes } from 'react'

import type { FileItem } from '../../fileManager/types'

const fallbackImage: FileItem = {
  id: 'fallback',
  name: 'fallback image',
  url: '/no-image.png'
}

interface ImageTabPanelsProps {
  data: FileItem[] | undefined
  getRootProps: () => InputHTMLAttributes<HTMLInputElement>
}

export const ImageTabPanels = ({ data, getRootProps }: ImageTabPanelsProps) => (
  <Tab.Panels {...getRootProps()} className="h-full flex rounded-b-md border border-t-0 border-gray-300">
    {(data && data.length > 0 ? data : [fallbackImage]).map(obj => (
      <Tab.Panel key={obj.id} className="flex">
        <Image
          width={400}
          height={400}
          className="object-contain rounded-b-md"
          src={obj.url}
          alt={obj.name}
          unoptimized
        />
      </Tab.Panel>
    ))}
  </Tab.Panels>
)
