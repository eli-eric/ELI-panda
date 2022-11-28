import { message } from 'core/i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
const messages = message.dashboardPage

const DashboardPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>

      <main className="flex-1">
        <div className="py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          </div>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="z-20 -mt-20 w-64 absolute transition duration-150 ease-in-out left-0 ml-8 shadow-lg bg-orange-100 p-4 rounded">
              <svg
                className="absolute left-0 -ml-2 bottom-0 top-0 h-full"
                width="9px"
                height="16px"
                viewBox="0 0 9 16"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g id="Page-1" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                  <g id="Tooltips-" transform="translate(-874.000000, -1029.000000)" fill="#FFFFFF">
                    <g id="Group-3-Copy-16" transform="translate(850.000000, 975.000000)">
                      <g id="Group-2" transform="translate(24.000000, 0.000000)">
                        <polygon
                          id="Triangle"
                          transform="translate(4.500000, 62.000000) rotate(-90.000000) translate(-4.500000, -62.000000) "
                          points="4.5 57.5 12.5 66.5 -3.5 66.5"
                        />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <p className="text-sm font-bold text-gray-800 pb-1">Description</p>
              <p className="text-xs leading-4 w-64 text-gray-600 pb-3 pr-3 break-normal">
                huiozg eru ueoiut ertiueropitu oer te eur toiueroi uoioieroi ueoi
                oieroieuroiueoiuoeiuoi eoritu oer eroiutoire uoi er toore werr wer wer eewreewrre
              </p>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  )
}

export default DashboardPage
