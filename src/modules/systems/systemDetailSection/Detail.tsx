import { Fragment } from 'react'

import Description from '../components/Description'
import Preview from '../components/Preview'

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
    <Fragment>
      <div className="flex flex-wrap lg:flex-nowrap gap-2 lg:gap-4">
        <section>
          <Preview image={data.image} alt={data.name} />
        </section>
        <section>
          <div className="mb-4">
            {rows.map(([title, value], idx) => (
              <div
                key={title}
                className={`flex px-3 py-1 justify-between w-full ${
                  idx % 2 && 'bg-gray-100'
                }`}
              >
                <div>{title}</div>
                <div>{value as string}</div>
              </div>
            ))}
            <Description data={data} />
          </div>
        </section>
      </div>
    </Fragment>
  )
}

export default SystemDetail
