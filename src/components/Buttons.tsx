import { classNames } from '@/helpers'

import ButtonLoaderComponent from './button-loader.comp'

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  rounded?:
    | 'rounded-l-md'
    | 'rounded-t-md'
    | 'rounded-r-md'
    | 'rounded-b-md'
    | 'rounded-md'
    | 'rounded-tl-md'
    | 'rounded-tr-md'
    | 'rounded-br-md'
    | 'rounded-bl-md'
    | 'rounded-md'
    | ''
  loading?: boolean
  primary?: boolean
  type?: 'button' | 'submit' | 'reset'
  buttonSize?: 'small' | 'large'
  testid?: string
}

export const Button = ({
  rounded = 'rounded-md',
  loading,
  disabled,
  primary = false,
  children,
  className,
  buttonSize,
  testid,
  ...restProps
}: ButtonProps) => (
  <button
    {...restProps}
    data-testid={testid}
    disabled={loading ? true : disabled}
    className={classNames(
      className,
      rounded,
      disabled ? 'bg-gray-200 text-gray-400' : '',
      loading ? 'bg-primary-700' : `bg-${!primary ? 'white' : 'primary-600'}`,
      buttonSize === 'small' ? 'px-2 py-1' : 'px-4 py-2',
      !primary ? !disabled && 'hover:bg-gray-100 text-gray-600' : !disabled && 'hover:bg-primary-700 text-white',
      'relative text-sm font-medium shadow-sm z-10 inline-flex items-center border border-gray-300 focus:outline-none focus:ring-0 focus:ring-primary-500'
    )}
  >
    {loading && <ButtonLoaderComponent />}
    {children}
  </button>
)
