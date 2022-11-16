import Link from 'next/link'
import { useRouter } from 'next/router'
import { SVGProps } from 'react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  href: string
  name: string
  Icon: (
    props: SVGProps<SVGSVGElement> & {
      title?: string | undefined
      titleId?: string | undefined
    }
  ) => JSX.Element
}

const NavigationLinkComponent = ({ href, name, Icon }: Props) => {
  const router = useRouter()
  return (
    <Link
      href={href}
      className={classNames(
        href === router.pathname
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
      )}
    >
      <Icon
        className={classNames(
          href === router.pathname ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
          'mr-4 flex-shrink-0 h-6 w-6'
        )}
        aria-hidden="true"
      />
      {name}
    </Link>
  )
}

export default NavigationLinkComponent
