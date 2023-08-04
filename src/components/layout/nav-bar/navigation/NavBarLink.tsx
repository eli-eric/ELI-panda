import { Disclosure } from '@headlessui/react'
import Link from 'next/link'
import { Fragment } from 'react'

import type { NavBarLinkType } from '@/types/constants/paths'

import { NavBarLinkWrapper } from './components/NavBarLinkWrapper'
import { NavBarMultiLink } from './components/NavBarMultiLink'

interface Props {
  name: string
  links: NavBarLinkType[]
  open?: boolean
}

export const NavBarLink = ({ name, links, open }: Props) => (
  <Fragment>
    {links.length > 1 ? (
      <div className="flex relative">
        <NavBarMultiLink name={name} links={links} open={open} />
      </div>
    ) : (
      <Link href={links[0].path} className="flex items-center h-full">
        <NavBarLinkWrapper href={links[0].path} open={open}>
          {open === false ? (
            <span>{name}</span>
          ) : (
            <Disclosure.Button className={'w-full flex'}>{name}</Disclosure.Button>
          )}
        </NavBarLinkWrapper>
      </Link>
    )}
  </Fragment>
)
