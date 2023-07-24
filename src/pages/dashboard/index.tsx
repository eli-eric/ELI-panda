import { IdentificationIcon, LifebuoyIcon, RectangleGroupIcon, ShoppingCartIcon } from '@heroicons/react/24/outline'
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import usePermission from '@/hooks/usePermission'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

//TODO: refactor this page
const Links = {
  catalogue: {
    name: 'Catalogue',
    link: PATH.CATALOGUE,
    Icon: () => <IdentificationIcon className="mx-auto h-24 w-324 flex-shrink-0 rounded-full" />
  },
  orders: {
    name: 'Orders',
    link: PATH.ORDERS,
    Icon: () => <ShoppingCartIcon className="mx-auto h-24 w-324 flex-shrink-0 rounded-full" />
  },
  systems: {
    name: 'Systems',
    link: PATH.SYSTEMS,
    Icon: () => <RectangleGroupIcon className="mx-auto h-24 w-324 flex-shrink-0 rounded-full" />
  },
  support: {
    name: 'Support/Feedback',
    link: 'mailto:jiri.svacha@eli-beams.eu',
    Icon: () => <LifebuoyIcon className="mx-auto h-24 w-324 flex-shrink-0 rounded-full" />
  }
}

interface CardProps {
  name: string
  link: string
  Icon: () => JSX.Element
  legacyBehavior?: boolean
}

//TODO: clean up this page

const Card = ({ name, link, Icon, legacyBehavior }: CardProps) => (
  <Link href={link} legacyBehavior={legacyBehavior}>
    {legacyBehavior ? (
      <a target={'_blank'}>
        <li
          key={name}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow cursor-pointer hover:bg-gray-50 transition"
        >
          <div className="flex flex-1 flex-col p-8">
            <Icon />
            <h2 className="mt-6 text-xl font-medium text-gray-900">{name}</h2>
            <dl className="mt-1 flex flex-grow flex-col justify-between"></dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1"></div>
              <div className="-ml-px flex w-0 flex-1"></div>
            </div>
          </div>
        </li>
      </a>
    ) : (
      <li
        key={name}
        className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow cursor-pointer hover:bg-gray-50 transition"
      >
        <div className="flex flex-1 flex-col p-8">
          <Icon />
          <h2 className="mt-6 text-xl font-medium text-gray-900">{name}</h2>
          <dl className="mt-1 flex flex-grow flex-col justify-between"></dl>
        </div>
        <div>
          <div className="-mt-px flex divide-x divide-gray-200">
            <div className="flex w-0 flex-1"></div>
            <div className="-ml-px flex w-0 flex-1"></div>
          </div>
        </div>
      </li>
    )}
  </Link>
)

function DashboardCard() {
  const hasCatalogueRole = usePermission([ROLE.CATALOGUE_VIEW])
  const hasOrdersRole = usePermission([ROLE.ORDERS_VIEW])
  const hasSystemsRole = usePermission([ROLE.SYSTEMS_VIEW])
  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 py-2 sm:px-4 sm:py-4 my-5 mx-2"
    >
      {hasCatalogueRole && <Card name="Catalogue" link={PATH.CATALOGUE} Icon={Links.catalogue.Icon} />}
      {hasOrdersRole && <Card name="Orders" link={PATH.ORDERS} Icon={Links.orders.Icon} />}
      {hasSystemsRole && <Card name="Systems" link={PATH.SYSTEMS} Icon={Links.systems.Icon} />}
      <Card name="Support/Feedback" link={PATH.SUPPORT} Icon={Links.support.Icon} legacyBehavior />
    </ul>
  )
}

interface RelaseVersion {
  id: string
  bugs?: RelaseNote[]
  features?: RelaseNote[]
}

interface RelaseNote {
  description: string
  link?: string
}

const messages = message.dashboardPage

const DashboardPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  const releases: Array<RelaseVersion> = [
    /* {
      id: '0.0.2',
      features: [
        {
          description:
            'Catalogue categories: you can now edit(create, update, delete) categories, property groups and properties',
          link: '/catalogue'
        },
        {
          description: 'Systems: first draft of the System overview',
          link: '/systems'
        },
        {
          description: 'Systems - relationships: you can see all the relationships for the selected System',
          link: '/systems'
        }
      ],
      bugs: [
        {
          description: 'Logout - show loading indicator during the logout'
        }
      ]
    },
    {
      id: '0.0.1',
      features: [
        {
          description: 'Catalogue page: searching items via search bar - text box in the header of the page',
          link: '/catalogue'
        },
        {
          description: 'Catalogue page: filter by categories - categories tiles',
          link: '/catalogue'
        },
        {
          description: 'Catalogue page: item detail page',
          link: '/catalogue'
        }
      ],
      bugs: [
        {
          description:
            'Loading indicator - show loading indicator during the start, if there is a slow network connection'
        }
      ]
    } */
  ]

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>

      <main className="mx-auto max-w-7xl flex-1">
        {/* <h1 className="text-2xl font-semibold font-mono text-gray-600 mt-2 ml-1 sm:mt-4 sm:ml-4 uppercase">
          Dashboard
        </h1> */}
        <DashboardCard />

        <ul role="list" className=" font-mono">
          {releases.map((item, idx) => (
            <li key={idx} className="px-2 py-2 sm:px-4 sm:py-4 shadow-lg my-5 mx-2">
              <h3 className="text-xl font-bold text-gray-700">
                Version {item.id} {idx === 0 && '- Latest version'}
              </h3>
              <div className="p-2">
                {item.bugs && (
                  <>
                    <div className="text-lg text-red-500">Fixed bugs:</div>
                    <ul className="p-1">
                      {item.bugs.map(bug => (
                        <li className="list-disc ml-3 mb-2" key={bug.description}>
                          {bug.description}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
                {item.features && (
                  <>
                    <div className="text-lg text-green-600">New features:</div>
                    <ul className="p-1">
                      {item.features.map(feature => (
                        <li className="list-disc ml-3 mb-2" key={feature.description}>
                          {feature.description}{' '}
                          {feature.link && (
                            <span>
                              [
                              <Link className="text-sky-600" href={feature.link} target="_blank">
                                {feature.link}
                              </Link>
                              ]
                            </span>
                          )}{' '}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      </main>
    </Fragment>
  )
}

export default DashboardPage
