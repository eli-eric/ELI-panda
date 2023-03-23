import { PhotoIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import useSWR from 'swr'

import { classNames } from '@/helpers'
import { fetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import { PATH } from '@/types/constants/paths'

import { useSystemEdit } from '../hooks/useSystemEdit'
import { SubsystemsResponse } from '../types/responses'

export const Item = (props: { uid: string; text: string }) => {
  const { uid, text } = props

  const { systemImage: systemDetailImage } = useEndpoint({
    uid: uid
  })
  const { data: image } = useSWR(systemDetailImage, fetcher, { suspense: false })
  const { getDeleteButton } = useSystemEdit({ deleteSystemUid: uid })

  return (
    <div
      className={classNames(
        'text-gray-600 hover:bg-primary-100 hover:text-gray-900',
        'flex flex-row justify-between items-center rounded-md px-3 py-2 text-sm font-medium  border-gray-100'
      )}
    >
      <Link href={{ pathname: PATH.SYSTEMS + '/' + uid }} className="flex flex-grow gap-2">
        {image ? (
          <Image alt="" src={image} width={28} height={28} className="rounded-sm" />
        ) : (
          <PhotoIcon className="w-7 h-7 rounded-sm" />
        )}
        <span className="truncate">{text}</span>
      </Link>
      {getDeleteButton()}
    </div>
  )
}

interface Props {
  uid?: string
}

const Subsystems = ({ uid }: Props) => {
  const { data: session } = useSession()
  const { systemSubsystems } = useEndpoint({ uid })
  const { data: subsystems } = useSWR<SubsystemsResponse>(session && systemSubsystems)
  return (
    <nav aria-label="Subsystems">
      {subsystems &&
        (subsystems.length > 0 ? (
          subsystems.map(({ uid, name }) => <Item key={uid} uid={uid} text={name} />)
        ) : (
          <div className="text-gray-600 flex items-center px-3 py-2 text-sm font-medium rounded-md">
            <span className="truncate">This node has no subsystems</span>
          </div>
        ))}
    </nav>
  )
}

export default Subsystems
