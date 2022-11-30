import { message } from 'core/i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
const messages = message.dashboardPage

const DashboardPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  const data = [
    {
      id: 1,
      name: 'Jirka',
      details: [
        {
          name: 'height',
          value: 175,
          type: 'number'
        },
        {
          name: 'hobby',
          value: 'climbing',
          type: 'string'
        },
        {
          name: 'age',
          value: 36,
          type: 'number'
        }
      ]
    },
    {
      id: 2,
      name: 'Sirka',
      details: [
        {
          name: 'height',
          value: 181,
          type: 'number'
        },
        {
          name: 'hobby',
          value: 'nothing',
          type: 'string'
        },
        {
          name: 'age',
          value: 18,
          type: 'number'
        }
      ]
    },
    {
      id: 3,
      name: 'Bublinka',
      details: [
        {
          name: 'height',
          value: 190,
          type: 'number'
        },
        {
          name: 'hobby',
          value: 'bike',
          type: 'string'
        },
        {
          name: 'age',
          value: 25,
          type: 'number'
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

      <main className="flex-1">
        <h1>Here will be system statistics</h1>
      </main>
    </Fragment>
  )
}

export default DashboardPage
