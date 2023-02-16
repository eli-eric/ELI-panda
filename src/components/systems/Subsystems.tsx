import { PlusIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import { fetchFakeSystems } from 'src/pages/tree/[slug]'
import useSWR from 'swr/immutable'

import Card, { Heading } from '@/components/ui/card/card.comp'
import { System } from '@/types/system'

import ProgressBarComponent from '../ui/progress-bar.comp'

export const Item = (props: { href: string; text: string }) => {
  const { href, text } = props
  return (
    <a
      href={href}
      className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 flex items-center px-3 py-2 text-sm font-medium rounded-md"
    >
      <span className="truncate">{text}</span>
    </a>
  )
}

const List = ({ ids }) => {
  const { data } = useSWR<System[]>(ids, fetchFakeSystems)
  return (
    <>
      {data && data.length > 0 ? (
        data.map(({ uid, name }) => <Item key={uid} href={'/tree/' + uid} text={name} />)
      ) : (
        <div className="text-gray-600 flex items-center px-3 py-2 text-sm font-medium rounded-md">
          <span className="truncate">This node has no subsystems.</span>
        </div>
      )}
    </>
  )
}

function Subsystems({ data: ids }) {
  const router = useRouter()
  return (
    <nav aria-label="Subsystems">
      <Card>
        <Heading
          text="Subsystems"
          action={{ label: <PlusIcon className="h-5" />, href: router.asPath.split('?')[0] + '/new' }}
        />
        <Suspense fallback={<ProgressBarComponent />}>
          <List ids={ids} />
        </Suspense>
      </Card>
    </nav>
  )
}

export default Subsystems
