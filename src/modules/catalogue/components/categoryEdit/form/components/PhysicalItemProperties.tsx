import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { PhysicalItemPropertyList } from './PhysicalItemPropertyList'

export const PhysicalItemProperties = () => {
  const { formatMessage: fm } = useIntl()
  return (
    <div>
      <div className="relative mt-6">
        <div
          className="absolute inset-0 flex items-center z-0"
          aria-hidden="true"
        >
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <p className="dark:text-gray-200 dark:bg-gray-800 bg-white text-base px-2">
            {fm({ id: message.catalogue.category.physicalItemPropertiesTitle })}
          </p>
        </div>
      </div>
      <PhysicalItemPropertyList name="physicalItemProperties" />
    </div>
  )
}
