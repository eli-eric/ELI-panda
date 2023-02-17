import Link from 'next/link'
import { fetchFakeSystems } from 'src/pages/tree/[slug]'
import useSWR from 'swr'

const Breadcrumbs = (props: { path: string[] }) => {
  const { path } = props
  const { data } = useSWR(path, fetchFakeSystems)
  return (
    <div className="flex gap-x-1 flex-wrap">
      <div className="flex items-center px-1 py-1 text-sm font-medium ">
        <span className="truncate">Systems</span>
      </div>
      <div className="text-gray-600 flex items-center py-1 text-sm font-medium ">
        <span className="truncate">/</span>
      </div>
      {data?.map(({ uid, name }) => (
        <>
          <Link
            className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-1 py-1 text-sm font-medium "
            key={uid}
            href={`/tree/${uid}`}
          >
            <span className="truncate">{name}</span>
          </Link>
          <div className="text-gray-600 flex items-center py-1 text-sm font-medium ">
            <span className="truncate">/</span>
          </div>
        </>
      ))}
    </div>
  )
}

export default Breadcrumbs
