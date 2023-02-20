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
  disabled?: boolean
  primary?: boolean
  type?: 'submit' | 'button' | 'reset'
  children?: React.ReactNode
}

export const Button = ({
  onClickAction,
  rounded = 'rounded-md',
  customClass,
  loading,
  disabled,
  primary = false,
  type = 'button',
  children,
}: ButtonProps) => (
  <button
    type={type}
    disabled={loading ? true : disabled}
    onClick={onClickAction}
    className={`${rounded} ${customClass} ${
      loading ? 'bg-primary-700' : `bg-${!primary ? 'white' : 'primary-600'}`
    } px-4 py-2 text-sm font-medium shadow-sm ${`${
      !primary
        ? 'hover:bg-gray-50 text-gray-400'
        : 'hover:bg-primary-700 text-white'
    }`} relative z-10 inline-flex items-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2`}
  >
    {loading && <ButtonLoaderComponent />}
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
