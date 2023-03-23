import { classNames } from '@/helpers'

interface Props {
  index: number
  children: React.ReactNode
  onClick?: () => void
  className?: string
}

const TableRowComponent = ({ index, children, onClick, className }: Props) => (
  <tr
    className={classNames(
      index % 2 === 0 ? undefined : 'bg-gray-100',
      'hover:bg-primary-200',
      className,
      onClick && 'cursor-pointer'
    )}
    onClick={onClick}
  >
    {children}
  </tr>
)

export default TableRowComponent
