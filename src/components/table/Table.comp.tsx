import { classNames } from '@/helpers'

import ItemListColumnTitleComponent from './item-list-column-title.comp'
interface TableProps {
  tableHeaders: string[]
  children?: React.ReactNode
  overflow?: boolean
  loading?: boolean
  noData?: boolean
}
const TableComponent = ({ tableHeaders, children, overflow = true, loading }: TableProps) => (
  <div
    data-testid="item-list"
    className={classNames('h-full border-t border-gray-300 pb-4', overflow ? 'overflow-y-hidden' : '')}
  >
    <div className="-my-2  sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
        <div className=" shadow ring-1 ring-black ring-opacity-5 ">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                {tableHeaders.map(title => (
                  <ItemListColumnTitleComponent key={title} title={title} />
                ))}
              </tr>
            </thead>
            <tbody className="bg-white">{children}</tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
)

export default TableComponent
