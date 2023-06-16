import {
  ArrowDownTrayIcon,
  ArrowUturnLeftIcon,
  FolderOpenIcon,
  FolderPlusIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon} from '@heroicons/react/24/outline'
import { FormattedMessage } from 'react-intl'

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
  text?: string
}

export const Button = ({
  rounded = 'rounded-md',
  loading,
  text,
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
      'relative text-sm font-medium shadow-sm z-10 inline-flex items-center border border-gray-300 focus:outline-none focus:ring-0 focus:ring-primary-500',
      rounded,
      className,
      disabled ? 'bg-gray-200 text-gray-400' : '',
      loading ? 'bg-primary-700' : `bg-${!primary ? 'white' : 'primary-500'}`,
      buttonSize === 'small' ? 'px-1 py-1' : 'px-2 py-2',
      !primary ? !disabled && 'hover:bg-gray-100 text-gray-600' : !disabled && 'hover:bg-primary-700 text-white'
    )}
  >
    {loading && <ButtonLoaderComponent />}
    {children}
    {text && <FormattedMessage id={text} />}
  </button>
)

export const DeleteButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <TrashIcon className="h-5 w-5 text-red-700" aria-hidden="true" />
  </Button>
)

export const EditButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <PencilSquareIcon className="h-5 w-5" aria-hidden="true" />
  </Button>
)

export const DetailButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <FolderOpenIcon className="h-5 w-5" aria-hidden="true" />
  </Button>
)

export const DownloadButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <ArrowDownTrayIcon className="h-5 w-5" aria-hidden="true" />
  </Button>
)

export const PlusButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <PlusIcon className="h-5 w-5" aria-hidden="true" />
  </Button>
)

export const BackButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <ArrowUturnLeftIcon className="h-5 w-5" aria-hidden="true" />
  </Button>
)

export const SaveButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <FolderPlusIcon className="h-5 w-5" aria-hidden="true" />
  </Button>
)

export const CancelButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <NoSymbolIcon className="h-5 w-5" aria-hidden="true" />
  </Button>
)
