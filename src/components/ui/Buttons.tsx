import ButtonLoaderComponent from './button-loader.comp'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  rounded?:
    | 'rounded-l-md'
    | 'rounded-t-md'
    | 'rounded-r-md'
    | 'rounded-b-md'
    | 'rounded-md'
  loading?: boolean
  primary?: boolean
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  rounded = 'rounded-md',
  loading,
  disabled,
  primary = false,
  children,
  className,
  ...restProps
}: ButtonProps) => (
  <button
    {...restProps}
    disabled={loading ? true : disabled}
    className={classNames(
      className,
      rounded,
      disabled ? 'bg-gray-100 text-gray-300' : '',
      loading ? 'bg-primary-700' : `bg-${!primary ? 'white' : 'primary-600'}`,
      'px-4 py-2 text-sm font-medium shadow-sm',
      !primary
        ? !disabled && 'hover:bg-gray-100 text-gray-400'
        : !disabled && 'hover:bg-primary-700 text-white hover:text-primary-400',
      'relative z-10 inline-flex items-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
    )}
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

export default Button
