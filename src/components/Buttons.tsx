import {
  ArrowDown,
  ArrowLeft,
  Download,
  Edit,
  Filter,
  FolderOpen,
  Minus,
  Plus,
  QrCode,
  RotateCcw,
  Save,
  Share,
  Table,
  Trash2,
  X,
  XCircle
} from 'lucide-react'
import Link from 'next/link'
import type { FC, PropsWithChildren } from 'react'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import type { UrlObject } from 'url'

import { Button as ShadcnButton } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import ButtonLoaderComponent from './button-loader.comp'

interface ButtonProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  loading?: boolean
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  className?: string
  testid?: string
  text?: string
  onClick?: () => void
  children?: React.ReactNode
}

export const Button = ({
  variant = 'default',
  size = 'default',
  loading,
  text,
  disabled,
  children,
  className,
  testid,
  type = 'button',
  onClick,
  ...restProps
}: ButtonProps) => (
  <ShadcnButton
    variant={variant}
    size={size}
    disabled={loading || disabled}
    type={type}
    className={cn(loading && 'opacity-50', 'cursor-pointer', className)}
    data-testid={testid}
    onClick={onClick}
    {...restProps}
  >
    {loading && <ButtonLoaderComponent />}
    {children}
    {text && <FormattedMessage id={text} />}
  </ShadcnButton>
)

export const DeleteButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <Trash2 className="h-4 w-4 text-red-600" />
  </Button>
)

export const EditButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <Edit className="h-4 w-4" />
  </Button>
)

export const DetailButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <FolderOpen className="h-4 w-4" />
  </Button>
)

export const DownloadButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <Download className="h-4 w-4" />
  </Button>
)

export const PlusButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <Plus className="h-4 w-4" />
  </Button>
)

export const MinusButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <Minus className="h-4 w-4" />
  </Button>
)

export const BackButton = ({
  size,
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <ArrowLeft className="h-4 w-4" />
  </Button>
)

export const SaveButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <Save className="h-4 w-4" />
  </Button>
)

export const CancelButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <XCircle className="h-4 w-4" />
  </Button>
)

export const RefreshButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <RotateCcw className="h-4 w-4" />
  </Button>
)

export const QRReaderButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <QrCode className="h-4 w-4" />
  </Button>
)

export const FilterButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <Filter className="h-4 w-4" />
  </Button>
)

export const CSVButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <ArrowDown className="h-4 w-4" />
  </Button>
)

export const StatsButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <Table className="h-4 w-4" />
  </Button>
)

export const GraphTreeButton = ({
  size = 'sm',
  variant = 'outline',
  ...restProps
}: ButtonProps) => (
  <Button {...restProps} size={size} variant={variant}>
    <Share className="h-4 w-4" />
  </Button>
)

export const TableEditButton = ({
  type = 'button',
  className,
  ...props
}: ButtonProps) => (
  <ShadcnButton
    variant="ghost"
    size="icon"
    className={cn('ml-2 h-8 w-8 hover:text-orange-500', className)}
    type={type}
    {...props}
  >
    <Edit className="h-4 w-4" />
  </ShadcnButton>
)

export const TableGraphTreeButton = ({
  type = 'button',
  className,
  ...props
}: ButtonProps) => (
  <ShadcnButton
    variant="ghost"
    size="icon"
    className={cn('ml-2 h-8 w-8 hover:text-orange-500', className)}
    type={type}
    {...props}
  >
    <Share className="h-4 w-4" />
  </ShadcnButton>
)

export const TableOpenButton = ({
  type = 'button',
  className,
  ...props
}: ButtonProps) => (
  <ShadcnButton
    variant="ghost"
    size="icon"
    className={cn('ml-2 h-8 w-8 hover:text-orange-500', className)}
    type={type}
    {...props}
  >
    <FolderOpen className="h-4 w-4" />
  </ShadcnButton>
)

export const XmarkButton = ({
  type = 'button',
  className,
  ...props
}: ButtonProps) => (
  <ShadcnButton
    variant="ghost"
    size="icon"
    className={cn('ml-2 h-8 w-8 hover:text-orange-500', className)}
    type={type}
    {...props}
  >
    <X className="h-4 w-4" />
  </ShadcnButton>
)

export const TableDeleteButton = ({
  type = 'button',
  className,
  ...props
}: ButtonProps) => (
  <ShadcnButton
    variant="ghost"
    size="icon"
    className={cn('ml-2 h-8 w-8 hover:text-orange-500 text-red-600', className)}
    type={type}
    {...props}
  >
    <Trash2 className="h-4 w-4" />
  </ShadcnButton>
)

export const TableStatsButton = ({
  type = 'button',
  className,
  ...props
}: ButtonProps) => (
  <ShadcnButton
    variant="ghost"
    size="icon"
    className={cn('ml-2 h-8 w-8 hover:text-orange-500', className)}
    type={type}
    {...props}
  >
    <Table className="h-4 w-4" />
  </ShadcnButton>
)

export const TablePlusButton = ({
  type = 'button',
  className,
  ...props
}: ButtonProps) => (
  <ShadcnButton
    variant="ghost"
    size="icon"
    className={cn('ml-2 h-8 w-8 hover:text-orange-500', className)}
    type={type}
    {...props}
  >
    <Plus className="h-4 w-4" />
  </ShadcnButton>
)

export const TableDownloadButton = ({
  type = 'button',
  className,
  ...props
}: ButtonProps) => (
  <ShadcnButton
    variant="ghost"
    size="icon"
    className={cn('ml-2 h-8 w-8 hover:text-orange-500', className)}
    type={type}
    {...props}
  >
    <Download className="h-4 w-4" />
  </ShadcnButton>
)

type TableButtonWrapperProps = {
  position?: 'left-0' | 'right-0'
  className?: string
}
export const TableButtonsWrapper: FC<
  PropsWithChildren<TableButtonWrapperProps>
> = ({ children, position = 'right-0', className }) => (
  <div
    className={cn(
      'absolute flex items-center bg-inherit pr-1',
      'sm:opacity-0 sm:group-hover:opacity-100 opacity-100',
      'z-50',
      position,
      className
    )}
  >
    {children}
  </div>
)

interface TableActionsButtonsProps {
  onDeleteClick?: () => void
  canEdit?: boolean
  detailLink?: UrlObject | string
  addLink?: UrlObject | string
  isShown?: boolean
  position?: 'left-0' | 'right-0'
  className?: string
}
export const TableActionsButtons: FC<
  PropsWithChildren<TableActionsButtonsProps>
> = ({
  onDeleteClick,
  canEdit,
  detailLink,
  addLink,
  position,
  children,
  className
}) => (
  <TableButtonsWrapper position={position} className={className}>
    {detailLink && (
      <Link href={detailLink} className={'flex items-center'}>
        <Fragment>
          {canEdit ? <TableEditButton /> : <TableOpenButton />}
        </Fragment>
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
