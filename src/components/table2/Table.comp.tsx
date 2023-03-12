import { Fragment } from 'react'

import ItemListColumnTitleComponent from './item-list-column-title.comp'
interface TableProps {
  loadingData?: boolean
  noData?: boolean
  tableHeaders: string[]
  children?: React.ReactNode
}
const TableComponent2 = ({ tableHeaders, noData, loadingData, children }: TableProps) => (
  <Fragment>
    {loadingData && children && (
      <div data-testid="item-list" className="h-full overflow-auto border-t border-gray-300  ">
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
                {!noData && <tbody className="bg-white">{children}</tbody>}
              </table>
            </div>
          </div>
        </div>
      </div>
    )}
  </Fragment>
)

export default TableComponent2
