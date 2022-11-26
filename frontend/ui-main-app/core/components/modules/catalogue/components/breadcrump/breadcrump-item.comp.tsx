import Link from 'next/link'

interface Props {
  name: string
  link: string
}

const BreadcrumpItemComponent = ({ name, link }: Props) => {
  return (
    <li key={name} className="flex">
      <div className="flex items-center">
        <svg
          className="h-full w-6 flex-shrink-0 text-gray-200"
          viewBox="0 0 24 44"
          preserveAspectRatio="none"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
        </svg>
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
