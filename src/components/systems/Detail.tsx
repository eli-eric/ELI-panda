const DISPLAY = [
  'importanceCode',
  'zoneCode',
  'systemTypeUID',
  'systemAlias',
  'locationCode',
  'ownerUID',
]

const SystemDetail = ({ data }) => {
  const rows = Object.entries(data).filter(([title]) => DISPLAY.includes(title))

  return (
    <div className="mb-4">
      {rows.map(([title, value], idx) => (
        <div
          key={title}
          className={`flex px-3 py-1 justify-between w-full ${
            idx % 2 && 'bg-gray-100'
          }`}
        >
          <div>{title}</div>
          <div>{value as String}</div>
        </div>
      ))}
    </div>
  )
}

export default SystemDetail
