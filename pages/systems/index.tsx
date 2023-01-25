import { message } from 'core/i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

const messages = message.systemsPage

const systems = [
  {
    name: 'ELI - Beamlines',
    code: 'elibm'
  }
]

const SystemsPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <main className="flex-1">
        <div className="flex flex-row h-[calc(100vh-64px)]">
          <div className="flex-[3]">
            <ul className="list-none m-0 p-0">
              <li>
                <span className="cursor-pointer select-none before:text-black before:inline-block before:mr-2 block">
                  System 1
                </span>
                <ul>
                  <li>
                    <span className="cursor-pointer select-none before:text-black before:inline-block before:mr-2 block">
                      System 1 - 1
                    </span>
                    <ul>
                      <li>
                        <span className="cursor-pointer select-none before:text-black before:inline-block before:mr-2">
                          System 1 - 1 - 1
                        </span>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>System 2</li>
              <li>System 3</li>
            </ul>
          </div>
          <div className="flex-[9] h-[calc(100vh-64px)]">
            {/* <iframe */}
            {/*   className="w-full h-full" */}
            {/*   src="https://layout.eli-beams.eu/index.html?layout=main%2FlaserHalls-0&viewBoxX=8158.04&viewBoxY=24516.3&viewBoxWidth=43008&viewBoxHeight=25441&visibleLayers=%5B%22FAC-GRP%22%2C%22FAC-Room_numbers_VIS%22%2C%22FAC-Room_description_VIS%22%2C%22FAC-Racks_and_cabinets_VIS%22%2C%22FAC-TraceTek%22%2C%22L3-GRP%22%2C%22L3-Basic_layout_VIS%22%2C%22L3-Compressor_vacuum_VIS%22%2C%22CS-GRP%22%2C%22CS-Racks_and_cabinets_VIS%22%5D" */}
            {/* ></iframe> */}
          </div>
        </div>
      </main>
    </Fragment>
  )
}

export default SystemsPage
