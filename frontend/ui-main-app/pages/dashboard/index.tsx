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
        <div className="flex-col h-[calc(100vh-176px)] bg-purple-400">
          <div className="bg-green-200 h-14">01</div>
          <div className="bg-blue-500 h-full overflow-auto">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold bg-blue-50 text-gray-900 sm:pl-6 lg:pl-8"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold bg-blue-50 text-gray-900"
                  >
                    Name
                  </th>
                  {data[0].details.map(itm => (
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      {itm.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map(item => (
                  <tr key={item.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium bg-blue-50 text-gray-900 sm:pl-6 lg:pl-8">
                      {item.id}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm bg-blue-50 text-gray-500">
                      {item.name}
                    </td>
                    {item.details.map(itm => (
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {itm.value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-green-200 h-14">03</div>
        </div>
      </main>
    </Fragment>
  )
}

export default DashboardPage
