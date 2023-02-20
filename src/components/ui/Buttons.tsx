import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline'
import { MouseEventHandler } from 'react'

import ButtonLoaderComponent from './button-loader.comp'

interface ButtonProps {
  onClickAction?: MouseEventHandler<HTMLButtonElement>
  customClass?: string
  rounded?:
    | 'rounded-l-md'
    | 'rounded-t-md'
    | 'rounded-r-md'
    | 'rounded-b-md'
    | 'rounded-md'
  loading?: boolean
  text?: string
  disabled?: boolean
  buttonType?: 'primary' | 'secondary'
  type?: 'submit' | 'button' | 'reset'
  children?: React.ReactNode
}

export const TrashIconButton = ({
  onClickAction,
  rounded = 'rounded-r-md',
  customClass,
}: ButtonProps) => (
  <button
    type="button"
    onClick={onClickAction}
    className={`${customClass} relative z-0 inline-flex items-center ${rounded} border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
  >
    <span className="sr-only">Delete</span>
    <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
  </button>
)

export const PlusIconButton = ({
  onClickAction,
  rounded = 'rounded-md',
  customClass,
}: ButtonProps) => (
  <button
    type="button"
    onClick={onClickAction}
    className={`${customClass} relative z-0 inline-flex items-center ${rounded} border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
  >
    <span className="sr-only">Add</span>
    <PlusIcon className="h-5 w-5" aria-hidden="true" />
  </button>
)

export const Button = ({
  onClickAction,
  rounded = 'rounded-md',
  customClass,
  text,
  loading,
  disabled,
  buttonType = 'primary',
  type = 'button',
}: ButtonProps) => (
  <button
    type={type}
    disabled={loading ? true : disabled}
    onClick={onClickAction}
    className={`${customClass} relative z-0 inline-flex items-center ${rounded} border border-gray-300 ${
      loading
        ? 'bg-primary-700'
        : `bg-${buttonType === 'secondary' ? 'white' : 'primary-600'}`
    } px-4 py-2 text-sm font-medium text-white shadow-sm ${`${
      buttonType === 'secondary' ? 'hover:bg-gray-50' : 'hover:bg-primary-700'
    }`} focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto`}
  >
    {loading && <ButtonLoaderComponent />}
    <p>{text}</p>
  </button>
)

export const IconButton = ({
  onClickAction,
  rounded = 'rounded-r-md',
  customClass,
  children,
}: ButtonProps) => (
  <button
    type="button"
    onClick={onClickAction}
    className={`${customClass} relative z-0 inline-flex items-center ${rounded} border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
  >
    {children}
  </button>
)

const B = props => (
  <button
    {...props}
    className={`hover:text-orange-600 relative z-0 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-1 text-sm font-medium text-gray-400 hover:bg-gray-50 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 ${props.className}`}
  />
)

export default B
