const DISPLAY = [
  'importanceCode',
  'zoneCode',
  'systemTypeUID',
  'systemAlias',
  'locationCode',
  'ownerUID',
]

const SystemDetail = ({ data, isEditMode, register }) => {
  const rows = Object.entries(data).filter(([title]) => DISPLAY.includes(title))

  return (
    <div className="mb-4">
      {rows.map(([title, value], idx) => (
        <div
          key={title}
          className={`flex gap-x-4 justify-between w-full ${
            idx % 2 && 'bg-gray-100'
          }`}
        >
          <div className="text-sm font-medium text-gray-400">{title}</div>
          {isEditMode ? (
            <input {...register(title)} defaultValue={value} />
          ) : (
            <div>{value as String}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default SystemDetail
