import Link from 'next/link'
import { useRouter } from 'next/router'
import useSWR from 'swr/immutable'

import { mockFetcher } from '@/features/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import { System } from '@/modules/systems/types'
import { PATH } from '@/types/constants/paths'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const Item = (props: { uid: string; text: string }) => {
  const { uid, text } = props
  return (
    <Link
      key={uid}
      href={{ pathname: PATH.SYSTEMS + '/' + uid }}
      className={classNames(
        'text-gray-600 hover:bg-primary-100 hover:text-gray-900',
        'flex items-center rounded-md px-3 py-2 text-sm font-medium'
      )}
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
  const router = useRouter()
  const { data: systemsDetailsRes } = useSWR<System[]>(
    systemsDetails,
    mockFetcher
  )
  return (
    <nav aria-label="Subsystems">
      {systemsDetailsRes && systemsDetailsRes.length > 0 ? (
        systemsDetailsRes.map(({ uid, name }) => (
          <Item key={uid} uid={uid} text={name} />
        ))
      ) : (
        <div className="text-gray-600 flex items-center px-3 py-2 text-sm font-medium rounded-md">
          <span className="truncate">This node has no subsystems</span>
        </div>
      )}
    </nav>
  )
}

export default Subsystems
