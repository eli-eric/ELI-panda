import { useFormContext } from 'react-hook-form'

interface DeliveryHandlerProps<T> {
    setOrderLine: (line: T) => void
    refetch: () => void
}

export const useDeliveryHandler = () => {
    const { setValue } = useFormContext()

    const handleSuccessfulDelivery = <T extends { uid?: string; lastUpdateTime?: string }>(
        data: T[],
        { setOrderLine, refetch }: DeliveryHandlerProps<T>,
    ) => {
        if (data.length > 0 && data[0].lastUpdateTime) {
            setValue('lastUpdateTime', data[0].lastUpdateTime)
        }

        data.forEach(line => {
            if (line.uid) {
                setOrderLine({
                    ...line,
                    isDelivered: true,
                })
            }
        })

        refetch()
    }

    return { handleSuccessfulDelivery }
}
