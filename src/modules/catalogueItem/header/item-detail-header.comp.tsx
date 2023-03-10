import { ArrowUturnLeftIcon, PencilSquareIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { FormattedMessage } from 'react-intl'
import { message } from 'src/i18n/src/messages'

const messages = message.cataloguePage.itemDetail.buttons

const ItemDetailHeaderComponent = () => {
  const router = useRouter()

  const goBackHandler = () => {
    router.back()
  }

  return (
    <div className="sticky items-center top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
      <button
        data-testid="item-detail-button-back"
        onClick={goBackHandler}
        type="button"
        className="mr-5 ml-5 inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <ArrowUturnLeftIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        <FormattedMessage id={messages.back} />
      </button>
      <button
        data-testid="item-detail-button-edit"
        type="button"
        disabled
        className="mr-5 inline-flex items-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-white shadow-sm "
      >
        <PencilSquareIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        <FormattedMessage id={messages.edit} />
      </button>
    </div>
  )
}

export default ItemDetailHeaderComponent
