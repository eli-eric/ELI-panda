import { message } from 'core/i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

interface RelaseVersion {
  id: string;
  bugs?: RelaseNote[];
  features?: RelaseNote[];
}

interface RelaseNote {
  description: string;
}

const messages = message.dashboardPage

const DashboardPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  const releases: Array<RelaseVersion> = [
    {
      id: '0.0.1',
      features: [
        {
          description: "Catalogue page: searching items via single search bar"
        },
        {
          description: "Catalogue page: search by categories"
        },
        {
          description: "Catalogue page: item detail"
        },
      ]
    }
  ]

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>

      <main className="flex-1">
        <h1 className='text-2xl font-semibold font-mono text-gray-600 mt-2 ml-1 sm:mt-4 sm:ml-4 uppercase'>Release History</h1>
        <ul role="list" className="divide-y divide-gray-200 font-mono">
          {releases.map((item, idx) => (
            <li key={item.id} className="px-2 py-2 sm:px-4 sm:py-4 ">
              <h3 className='text-xl font-bold text-gray-700'>Version {item.id} {idx === 0 && "- Latest version"}</h3>
              <div className='p-2'>
                {item.bugs && (
                  <>
                    <div className='text-lg'>
                      Bugs fixed:
                    </div>
                    <ul className='p-1'>
                      {item.bugs.map((bug) => (
                        <li key={bug.description}>
                          - {bug.description}
                        </li>
                      ))}
                    </ul>
                  </>)}
                {item.features && (
                  <>
                    <div className='text-lg'>
                      New features:
                    </div>
                    <ul className='p-1'>
                      {item.features.map((feature) => (
                        <li key={feature.description}>
                          - {feature.description}
                        </li>
                      ))}
                    </ul>
                  </>)}
              </div>

            </li>
          ))}
        </ul>

      </main>
    </Fragment>
  )
}

export default DashboardPage
