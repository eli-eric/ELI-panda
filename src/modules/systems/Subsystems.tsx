import Link from 'next/link'
import { fetchFakeSystems } from 'src/pages/systems/[slug]'
import useSWR from 'swr/immutable'

import { System } from '@/types/system'

export const Item = (props: { href: string; text: string }) => {
  const { href, text } = props
  return (
    <Link
      href={href}
      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
    >
      <span className="truncate">{text}</span>
    </Link>
  )
}

const Subsystems = ({ ids }) => {
  const { data } = useSWR<System[]>(ids, fetchFakeSystems)
  return (
    <>
      {data && data.length > 0 ? (
        data.map(({ uid, name }) => (
          <Item key={uid} href={'/systems/' + uid} text={name} />
        ))
      ) : (
        <div className="text-gray-600 flex items-center px-3 py-2 text-sm font-medium rounded-md">
          <span className="truncate">This node has no subsystems</span>
        </div>
      )}
    </>
  )
}

export default Subsystems
