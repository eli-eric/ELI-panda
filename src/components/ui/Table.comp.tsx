const ColumnTitle = ({ title }: { title: string }) => {
  return (
    <th
      scope="col"
      className="whitespace-nowrap sticky top-0 z-9 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 "
    >
      {title}
    </th>
  )
}

const TableHeader = ({ collumsTitle }: { collumsTitle: string[] }) => {
  return (
    <thead className="bg-gray-50">
      <tr>
        {collumsTitle.map(title => (
          <ColumnTitle key={title} title={title} />
        ))}
      </tr>
    </thead>
  )
}

const TableRow = ({ value }: { value: JSX.Element | string }) => (
  <td className="whitespace-nowrap text-sm  sm:pl-6 text-gray-500">{value}</td>
)

interface Props {
  collumsTitle: string[]
  data?: JSX.Element[][]
}

const TableComponent = ({ collumsTitle, data }: Props) => {
  return (
    <div className="-my-2 sm:-mx-6 w-full lg:-mx-8 inline-block py-2 align-middle md:px-6 lg:px-8">
      <table className="w-full border border-gray-300 divide-y divide-gray-300">
        <TableHeader collumsTitle={collumsTitle} />
        <tbody className="bg-white">
          {data?.map((row, index) => (
            <tr
              key={index}
              className={
                (index % 2 === 0 ? undefined : 'bg-gray-100') +
                ' hover:bg-primary-200'
              }
            >
              {row.map(item => (
                <TableRow key={index} value={item} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableComponent
