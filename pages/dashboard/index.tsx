import { message } from 'core/i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

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
    }
  ]

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>

      <main className="mx-auto max-w-7xl flex-1">
        <h1 className="text-2xl font-semibold font-mono text-gray-600 mt-2 ml-1 sm:mt-4 sm:ml-4 uppercase">
          Release History
        </h1>
        <ul role="list" className=" font-mono">
          {releases.map((item, idx) => (
            <li key={item.id} className="px-2 py-2 sm:px-4 sm:py-4 shadow-lg my-5 mx-2">
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
