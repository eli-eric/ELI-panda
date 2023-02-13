import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { MouseEventHandler } from 'react'

interface IconButtonProps {
  onClickAction: MouseEventHandler<HTMLButtonElement>
  customClass?: string
  rounded?: 'rounded-l-md' | 'rounded-t-md' | 'rounded-r-md' | 'rounded-b-md' | 'rounded-md'
}

export const TrashIconButton = ({ onClickAction, rounded = 'rounded-r-md', customClass }: IconButtonProps) => (
  <button
    type="button"
    onClick={onClickAction}
    className={`${customClass} relative z-0 inline-flex items-center ${rounded} border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
  >
    <span className="sr-only">Delete</span>
    <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
  </button>
)

export const PlusIconButton = ({ onClickAction, rounded = 'rounded-md', customClass }: IconButtonProps) => (
  <button
    type="button"
    onClick={onClickAction}
    className={`${customClass} relative z-0 inline-flex items-center ${rounded} border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
  >
    <span className="sr-only">Delete</span>
    <PlusIcon className="h-5 w-5" aria-hidden="true" />
  </button>
)
