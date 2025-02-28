import type { FieldArrayWithId, UseFieldArrayUpdate } from 'react-hook-form'
import { useFormContext } from 'react-hook-form'

interface DeliveryHandlerProps {
  fields: FieldArrayWithId[]
  update: UseFieldArrayUpdate<any, any>
  refetch: () => void
}

export const useDeliveryHandler = () => {
  const { setValue } = useFormContext()

  const handleSuccessfulDelivery = <
    T extends { uid?: string; lastUpdateTime?: string }
  >(
    data: T[],
    { fields, update, refetch }: DeliveryHandlerProps
  ) => {
    if (data.length > 0 && data[0].lastUpdateTime) {
      setValue('lastUpdateTime', data[0].lastUpdateTime)
    }

    const updatedLines = data.map(line => ({
      ...line,
      isDelivered: true,
      uuid: line.uid
    }))

    updatedLines.forEach(line => {
      if (line.uid) {
        const index = fields.findIndex((field: any) => field.uuid === line.uid)
        if (index !== -1) {
          update(index, line)
        }
      }
    })

    refetch()
  }

  return { handleSuccessfulDelivery }
}
