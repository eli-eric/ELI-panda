import { ArrowUturnLeftIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { message } from 'core/i18n/src/messages'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'

const messages = message.cataloguePage.itemDetail.buttons

const ItemDetailHeaderComponent = () => {
  const router = useRouter()

  const goBackHandler = () => {
    router.back()
  }

  return (
    <div className="sticky items-center top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <div className="flex-1" />
      <button
        onClick={goBackHandler}
        type="button"
        className="mr-5 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <ArrowUturnLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        <FormattedMessage id={messages.back} />
      </button>
      <button
        type="button"
        className="mr-5 inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        <FormattedMessage id={messages.edit} />
      </button>
    </div>
  )
}

export default ItemDetailHeaderComponent
