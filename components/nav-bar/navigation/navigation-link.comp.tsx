import { Disclosure } from '@headlessui/react'
import { useRouter } from 'next/router'
import { Fragment } from 'react'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  href: string
  name: string
  open: boolean
}

const NavigationLinkComponent = ({ href, name, open }: Props) => {
  const router = useRouter()
  const selectedClassName = open === false ? 'text-gray-900 border-primary-500' : 'text-indigo-700 border-indigo-500'
  const nonSelectedClassName =
    open === false
      ? 'text-gray-500 hover:border-gray-300 hover:text-gray-700'
      : 'text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'

  const variableClassName = !router.query.slug
    ? router.asPath === href
      ? selectedClassName
      : nonSelectedClassName
    : router.asPATH.startsWith(href)
    ? selectedClassName
    : nonSelectedClassName

  return (
    <Fragment>
      {open === false ? (
        <button
          onClick={() => {
            router.push(href)
          }}
          className={classNames(
            variableClassName,
            'inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium'
          )}
        >
          {name}
        </button>
      ) : (
        <Disclosure.Button
          onClick={() => {
            router.push(href)
          }}
          className={classNames(
            variableClassName,
            'block w-full text-left border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium'
          )}
        >
          {name}
        </Disclosure.Button>
      )}
    </Fragment>
  )
}

export default NavigationLinkComponent
