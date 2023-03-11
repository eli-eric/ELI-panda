import { classNames } from '@/helpers'

export const TableRowItem = ({ text }: { text?: string }) => (
  <td className="whitespace-nowrap text-sm  sm:pl-6 text-gray-500">{text || 'N/A'}</td>
)

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
