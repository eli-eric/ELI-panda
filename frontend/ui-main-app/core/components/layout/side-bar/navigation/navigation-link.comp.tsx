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
    _props: SVGProps<SVGSVGElement> & {
      _title?: string | undefined
      _titleId?: string | undefined
    }
  ) => JSX.Element
}

const NavigationLinkComponent = ({ href, name, Icon }: Props) => {
  const router = useRouter()
  const selectedClassName = 'bg-primary-100 text-gray-900'
  const nonSelectedClassName = 'text-gray-600 hover:bg-primary-50 hover:text-gray-900'
  const variableClassName = !router.query.slug
    ? router.asPath === href
      ? selectedClassName
      : nonSelectedClassName
    : router.asPath.startsWith(href)
    ? selectedClassName
    : nonSelectedClassName
  return (
    <Link
      href={href}
      className={classNames(variableClassName, 'group flex items-center px-2 py-2 text-base font-medium rounded-md')}
    >
      <Icon
        className={classNames(
          router.asPath.startsWith(href) ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500',
          'mr-4 flex-shrink-0 h-6 w-6'
        )}
        aria-hidden="true"
      />
      {name}
    </Link>
  )
}

export default NavigationLinkComponent
