import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

interface Props {
  name: string
  link: string
}

const BreadcrumpItemComponent = ({ name, link }: Props) => {
  return (
    <li key={name} className="flex">
      <div className="flex items-center">
        <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />

        <Link
          href={link}
          className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          //aria-current={page.current ? 'page' : undefined}
        >
          {name}
        </Link>
      </div>
    </li>
  )
}

export default BreadcrumpItemComponent
