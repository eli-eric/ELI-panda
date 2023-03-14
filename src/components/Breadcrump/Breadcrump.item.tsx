import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Props {
  name: string
  link: string
}

const BreadcrumpItem = ({ name, link }: Props) => {
  const { query } = useRouter()

  return (
    <li key={name} className="flex">
      <div className="flex items-center">
        <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
        <Link
          href={{ pathname: link }}
          className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          {name}
        </Link>
      </div>
    </li>
  )
}

export default BreadcrumpItem
