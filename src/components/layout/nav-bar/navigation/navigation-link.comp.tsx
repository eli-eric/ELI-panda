import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

import { classNames } from '@/helpers'
import type { PATH } from '@/types/constants/paths'

interface Props {
  href: string | PATH
  name: string
  open: boolean
}

const NavigationLinkComponent = ({ href, name, open }: Props) => {
  const router = useRouter()
  const selectedClassName = 'text-gray-900 border-primary-500'
  const nonSelectedClassName =
    open === false
      ? 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
      : 'text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'

  const variableClassName = router.asPath.startsWith(href) ? selectedClassName : nonSelectedClassName

  return (
    <Fragment>
      {open === false ? (
        <Link
          href={href}
          className={classNames(
            'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium',
            variableClassName
          )}
        >
          {name}
        </Link>
      ) : (
        <Disclosure.Button
          onClick={() => {
            router.push(href)
          }}
          className={classNames(
            'block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium',
            variableClassName
          )}
        >
          {name}
        </Disclosure.Button>
      )}
    </Fragment>
  )
}

export default NavigationLinkComponent
