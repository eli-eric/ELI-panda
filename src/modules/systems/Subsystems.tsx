import Link from 'next/link'
import useSWR from 'swr/immutable'

import { mockFetcher } from '@/features/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import { System } from '@/modules/systems/types'
import { PATH } from '@/types/constants/paths'

export const Item = (props: { uid: string; text: string }) => {
  const { uid, text } = props
  return (
    <Link
      href={{ pathname: PATH.SYSTEMS + '/' + uid }}
      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
    >
      <span className="truncate">{text}</span>
    </Link>
  )
}

interface Props {
  uid?: string
}

const Subsystems = ({ uid }: Props) => {
  const { systemsDetails } = useEndpoint({ uid })
  const { data: systemsDetailsRes } = useSWR<System[]>(
    systemsDetails,
    mockFetcher
  )
  return (
    <div aria-label="Subsystems">
      {systemsDetailsRes && systemsDetailsRes.length > 0 ? (
        systemsDetailsRes.map(({ uid, name }) => (
          <Item key={uid} uid={uid} text={name} />
        ))
      ) : (
        <div className="text-gray-600 flex items-center px-3 py-2 text-sm font-medium rounded-md">
          <span className="truncate">This node has no subsystems</span>
        </div>
      )}
    </div>
  )
}

export default Subsystems
