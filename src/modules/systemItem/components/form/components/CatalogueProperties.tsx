import { FormattedMessage } from 'react-intl'

import { Disclosure } from '@/components/ui'
import { message } from '@/i18n/src/messages'
import { createMessageValues } from '@/utils/formatters'

const propertyMessage =
  message.systemsPage.systemDetail.form.physicalItem.general.properties

interface CataloguePropertiesProps {
  catalogueItemProperties: any[] | null | undefined
}

export const CatalogueProperties = ({
  catalogueItemProperties
}: CataloguePropertiesProps) => {
  if (!catalogueItemProperties || catalogueItemProperties.length === 0) {
    return null
  }

  return (
    <Disclosure
      title="Catalogue Properties"
      defaultOpen={true}
      className="w-full border rounded-md"
      buttonClassName="p-3"
      panelClassName="px-3 py-3"
      transparentButton={true}
    >
      <ul className="grid grid-cols-4 lg:grid-cols-12 md:grid-cols-6 sm:grid-cols-3 w-full">
        {catalogueItemProperties.map(edge => {
          const type = edge.node.type as unknown as {
            name: string
            uid: string
          }
          if (type.name === 'Range') {
            try {
              const value = JSON.parse(edge.value || '{}')
              const min = value?.min ?? 'N/A'
              const max = value?.max ?? 'N/A'
              const stringValue = `${min} - ${max}`
              return (
                <li key={edge.node.uid} className="flex col-span-3">
                  <FormattedMessage
                    id={propertyMessage.property}
                    values={createMessageValues({
                      name: edge.node.name,
                      value: stringValue,
                      unit: edge.node.unit?.name
                    })}
                  />
                </li>
              )
            } catch (error) {
              // If JSON parsing fails, display the raw value or a fallback
              return (
                <li key={edge.node.uid} className="flex col-span-3">
                  <FormattedMessage
                    id={propertyMessage.property}
                    values={createMessageValues({
                      name: edge.node.name,
                      value: edge.value || 'N/A',
                      unit: edge.node.unit?.name
                    })}
                  />
                </li>
              )
            }
          }
          return (
            <li key={edge.node.uid} className="flex col-span-3">
              <FormattedMessage
                id={propertyMessage.property}
                values={createMessageValues({
                  name: edge.node.name,
                  value: edge.value || 'N/A',
                  unit: edge.node.unit?.name
                })}
              />
            </li>
          )
        })}
      </ul>
    </Disclosure>
  )
}
