import { InformationCircleIcon, PhotoIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import noImage from 'public/no-image.png'
import { Fragment } from 'react'

import TooltipComponent from '../tooltip.comp'

const ImageWithText = ({ text, image }: { text: string; image?: string }) => (
  <div className="flex items-center">
    <div className="flex-shrink-0">
      {image ? (
        <Image alt={text} src={image || noImage} width={28} height={28} className="rounded-sm" />
      ) : (
        <PhotoIcon className="w-7 h-7 rounded-sm" />
      )}
    </div>
    <div className="ml-4">{text}</div>
  </div>
)
export const TableRowItem = ({
  text,
  image,
  isInfoTooltip
}: {
  text?: string
  image?: string
  isInfoTooltip?: boolean
}) => (
  <Fragment>
    {isInfoTooltip ? (
      <td className="text-sm sm:pl-6 text-gray-500">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <TooltipComponent text={text}>
              <InformationCircleIcon className="h-6 w-6" />
            </TooltipComponent>
          </div>
        </div>
      </td>
    ) : (
      <td className="whitespace-nowrap text-sm  sm:pl-6 sm:pr-6 text-gray-500">
        {image ? <ImageWithText text={text || 'N/A'} image={image} /> : text || 'N/A'}
      </td>
    )}
  </Fragment>
)
