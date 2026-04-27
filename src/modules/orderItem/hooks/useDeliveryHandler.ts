import { useFormContext } from 'react-hook-form'

interface DeliveryHandlerProps<T> {
    setOrderLine: (line: T) => void
    refetch: () => void
    getExistingLine: (uid: string) => T | undefined
}

type DeliveryResponseFields = {
    uid?: string
    lastUpdateTime?: string
    serialNumber?: string
    eun?: string
}

export const useDeliveryHandler = () => {
    const { setValue } = useFormContext()

    const handleSuccessfulDelivery = <T extends DeliveryResponseFields>(
        data: T[],
        { setOrderLine, refetch, getExistingLine }: DeliveryHandlerProps<T>,
    ) => {
        if (data.length > 0 && data[0].lastUpdateTime) {
            setValue('lastUpdateTime', data[0].lastUpdateTime)
        }

        data.forEach(line => {
            if (!line.uid) return
            const existing = getExistingLine(line.uid)
            if (!existing) return
            setOrderLine({
                ...existing,
                isDelivered: true,
                lastUpdateTime: line.lastUpdateTime,
                serialNumber: line.serialNumber,
                eun: line.eun,
            })
        })

        refetch()
    }

    return { handleSuccessfulDelivery }
}
