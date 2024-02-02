import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUturnLeftIcon,
  FolderOpenIcon,
  FolderPlusIcon,
  FunnelIcon,
  MinusIcon,
  NoSymbolIcon,
  PencilSquareIcon,
  PlusIcon,
  QrCodeIcon,
  TableCellsIcon,
  TrashIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import type { FC, PropsWithChildren } from 'react'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import type { UrlObject } from 'url'

import { classNames } from '@/utils'

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
  customDisabled?: boolean
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
  type = 'button',
  customDisabled = false,
  ...restProps
}: ButtonProps) => (
  <button
    {...restProps}
    data-testid={testid}
    disabled={loading ? true : disabled || customDisabled}
    type={type}
    className={classNames(
      'btn',
      rounded,
      loading && 'bg-primary-700',
      buttonSize === 'small' ? 'px-1 py-1' : 'px-2 py-2',
      primary ? 'btn-primary' : 'btn-secondary',
      disabled && 'btn-disabled',
      className
    )}
  >
    {loading && <ButtonLoaderComponent />}
    {children}
    {text && <FormattedMessage id={text} />}
  </button>
)

export const DeleteButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <TrashIcon className="h-4 w-4 text-red-700" aria-hidden="true" />
  </Button>
)

export const EditButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)

export const DetailButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <FolderOpenIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)

export const DownloadButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)

export const PlusButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <PlusIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)

export const MinusButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <MinusIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)

export const BackButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <ArrowUturnLeftIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)

export const SaveButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <FolderPlusIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)

export const CancelButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <NoSymbolIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)

export const RefreshButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <ArrowPathIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)

export const QRReaderButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <QrCodeIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)

export const FilterButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <FunnelIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)
export const StatsButton = ({ buttonSize = 'small', ...restProps }: ButtonProps) => (
  <Button {...restProps} buttonSize={buttonSize}>
    <TableCellsIcon className="h-4 w-4" aria-hidden="true" />
  </Button>
)

export const TableEditButton = ({ type = 'button', ...props }: ButtonProps) => (
  <button className="ml-2  hover:text-primary-500" type={type} {...props}>
    <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
  </button>
)

export const TableOpenButton = ({ type = 'button', ...props }: ButtonProps) => (
  <button className="ml-2  hover:text-primary-500" type={type} {...props}>
    <FolderOpenIcon className="h-4 w-4" aria-hidden="true" />
  </button>
)

export const TableDeleteButton = ({ type = 'button', ...props }: ButtonProps) => (
  <button className="ml-2 hover:text-primary-500 text-red-700" type={type} {...props}>
    <TrashIcon className="h-4 w-4" aria-hidden="true" />
  </button>
)

export const TableStatsButton = ({ type = 'button', ...props }: ButtonProps) => (
  <button className="ml-2 hover:text-primary-500" type={type} {...props}>
    <TableCellsIcon className="h-4 w-4" aria-hidden="true" />
  </button>
)

export const TablePlusButton = ({ type = 'button', ...props }: ButtonProps) => (
  <button className="ml-2  hover:text-primary-500" type={type} {...props}>
    <PlusIcon className="h-4 w-4" aria-hidden="true" />
  </button>
)
export const TableDownloadButton = ({ type = 'button', ...props }: ButtonProps) => (
  <button className="ml-2  hover:text-primary-500" type={type} {...props}>
    <ArrowDownTrayIcon className="h-4 w-4" aria-hidden="true" />
  </button>
)

type TableButtonWrapperProps = {
  position?: 'left-0' | 'right-0'
}
export const TableButtonsWrapper: FC<PropsWithChildren<TableButtonWrapperProps>> = ({
  children,
  position = 'right-0'
}) => <div className={classNames('absolute flex items-center bg-inherit pr-1', position)}>{children}</div>

interface TableActionsButtonsProps {
  onDeleteClick?: () => void
  canEdit?: boolean
  detailLink?: UrlObject | string
  addLink?: UrlObject | string
  isShown?: boolean
  position?: 'left-0' | 'right-0'
}
export const TableActionsButtons: FC<PropsWithChildren<TableActionsButtonsProps>> = ({
  onDeleteClick,
  canEdit,
  detailLink,
  addLink,
  position,
  children
}) => (
  <TableButtonsWrapper position={position}>
    {detailLink && (
      <Link href={detailLink} className={'flex items-center'}>
        <Fragment>{canEdit ? <TableEditButton /> : <TableOpenButton />}</Fragment>
      </Link>
    )}
    {canEdit && (
      <Fragment>
        {children}
        {onDeleteClick && <TableDeleteButton onClick={onDeleteClick} />}
        {addLink && (
          <Link href={addLink} className={'flex items-center'}>
            <TablePlusButton />
          </Link>
        )}
      </Fragment>
    )}
  </TableButtonsWrapper>
)
