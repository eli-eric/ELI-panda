import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { useForceChangePassword } from '@/hooks/useForceChangePassword'
import { CodebooksContainer } from '@/modules/codebooks/Codebooks.cont'

const messages = message.orderItem
interface Props {
  selectedCodebook?: string
}

const CodeBookEditorPage: NextPage = ({ selectedCodebook }: Props): JSX.Element => {
  const intl = useIntl()
  useForceChangePassword()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <CodebooksContainer selectedCodebook={selectedCodebook} />
    </Fragment>
  )
}

CodeBookEditorPage.getInitialProps = ({ query }) => ({
  selectedCodebook: query.selectedCodebook
})

export default CodeBookEditorPage
