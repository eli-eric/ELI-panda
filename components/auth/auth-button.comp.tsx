import ButtonLoaderComponent from 'components/ui/button-loader.comp'
import { message } from 'i18n/src/messages'
import { FormattedMessage } from 'react-intl'

const authButtonMessages = message.authPage.form.button

interface Props {
  loading: boolean
}

const AuthButton = ({ loading }: Props) => {
  return (
    <div>
      <button
        disabled={loading}
        type="submit"
        className="flex w-full justify-center rounded-md border border-transparent bg-primary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        {loading && <ButtonLoaderComponent />}
        <FormattedMessage id={loading ? authButtonMessages.isLoading : authButtonMessages.default} />
      </button>
    </div>
  )
}

export default AuthButton
