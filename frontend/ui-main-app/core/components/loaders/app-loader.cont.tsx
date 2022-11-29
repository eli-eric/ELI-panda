import { message } from 'core/i18n/src/messages'
import AppLoadingContext from 'core/store/app-loading.context'
import Head from 'next/head'
import { Fragment, useContext } from 'react'
import { useIntl } from 'react-intl'

import LoaderComponent from '../ui/loader.comp'
const messages = message.defaul

interface Props {
  children?: React.ReactNode
}

/*
AppLoader wrapping all components and replace all content with Loader if appLoading is true
*/

const AppLoader = ({ children }: Props) => {
  const { appLoading } = useContext(AppLoadingContext)
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      {appLoading ? <LoaderComponent /> : children}
    </Fragment>
  )
}

export default AppLoader
