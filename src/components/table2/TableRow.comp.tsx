import { classNames } from '@/helpers'

interface Props {
  index: number
  children: React.ReactNode
  onClick?: () => void
}

const TableRowComponent = ({ index, children, onClick }: Props) => (
  <tr
    className={classNames(
      index % 2 === 0 ? undefined : 'bg-gray-100',
      'hover:bg-primary-200',
      onClick && 'cursor-pointer'
    )}
    onClick={onClick}
  >
    {children}
  </tr>
)

export default TableRowComponent
