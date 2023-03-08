import Link from 'next/link'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { classNames } from '@/features'
import { useEndpoint } from '@/hooks/useEndpoint'
import { PATH } from '@/types/constants/paths'

import { SubsystemsResponse } from '../types/responses'

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
  const { data: session } = useSession()
  const { systemSubsystems } = useEndpoint({ uid })
  const { data: subsystems } = useSWR<SubsystemsResponse>(
    session && systemSubsystems
  )
  return (
    <nav aria-label="Subsystems">
      {subsystems && subsystems.length > 0 ? (
        subsystems.map(({ uid, name }) => (
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
