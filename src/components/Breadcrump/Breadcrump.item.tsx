import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'

interface Props {
  name: string
  link: string
}

const BreadcrumpItem = ({ name, link }: Props) => (
  <li key={name} className="flex">
    <div className="flex items-center whitespace-nowrap">
      <ChevronRightIcon
        className="h-4 w-4

 flex-shrink-0 text-gray-400"
        aria-hidden="true"
      />
      <Link href={{ pathname: link }} className="ml-1 text-sm font-medium text-gray-500 hover:text-gray-700">
        {name}
      </Link>
    </div>
  </li>
)

export default BreadcrumpItem
