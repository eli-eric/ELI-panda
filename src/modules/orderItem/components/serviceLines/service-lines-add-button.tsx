import { useCallback, useRef } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'
import useTableStateStore from '@/store/useTableStateStore'
import { TABLE_IDS } from '@/types/constants/tableIds'

import { useServiceLine } from '../../hooks/useServiceLine'
import type { ServiceLineFormType } from '../../types/form'
import { detailsToArray } from '../../utils/service-line-details'
import { ServiceLineV3Wizard } from './form/service-line-v3.wizz'

export const ServiceLinesAddButton = () => {
    const { openModal, closeModal } = useDynamicModalStore()
    const { setServiceLine } = useServiceLine()
    const modalIdRef = useRef<string | undefined>(undefined)

    const { reset: resetTable } = useTableStateStore()

    const handleSubmit = useCallback(
        (data: ServiceLineFormType, reset: () => void) => {
            const { items, details, selectedProperties, ...rest } = data

            const detailsArray = detailsToArray(details)
            const filteredDetails = Array.isArray(selectedProperties)
                ? detailsArray.filter(detail => selectedProperties.includes(detail.property.uid))
                : []

            if (items && items.length > 0) {
                items.forEach(item => {
                    setServiceLine({
                        ...rest,
                        price: Number(rest.price),
                        item: { uid: item.uid, name: item.name },
                        eun: item.eun,
                        serialNumber: item.serialNumber,
                        details: filteredDetails,
                    })
                })
            }

            reset()
            resetTable(TABLE_IDS.SERVICE_LINE_ITEMS_SELECT)
            if (modalIdRef.current) {
                closeModal(modalIdRef.current)
            }
        },
        [setServiceLine, resetTable, closeModal],
    )
    // Use useCallback for handleAddServiceLine
    const handleOpenAddServiceLine = () => {
        modalIdRef.current = openModal('dialog', {
            id: 'service-line-add',
            component: ServiceLineV3Wizard,
            props: {
                title: 'Add Service Line',
                size: 'xl',
                handleSubmit,
            },
        })
    }

    return (
        <Tooltip content="Add Service Line">
            <PlusButton type="button" onClick={handleOpenAddServiceLine} className="mb-2" />
        </Tooltip>
    )
}
