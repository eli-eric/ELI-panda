import { message } from 'core/i18n/src/messages'
import ComponentLoadingContext from 'core/store/component-loading.context'
import Head from 'next/head'
import { Fragment, useContext } from 'react'
import { useIntl } from 'react-intl'

const messages = message.defaul

interface Props {
  children?: React.ReactNode
}

/*
ComponentLoader wrapping all components and replace all component with Loader if ComponentLoader is true
*/

const ComponentLoader = ({ children }: Props) => {
  const intl = useIntl()

  const { componentLoading } = useContext(ComponentLoadingContext)
  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      {/* {componentLoading ? <LoaderComponent /> : children} */}
      {children}
    </Fragment>
  )
}

export default ComponentLoader
