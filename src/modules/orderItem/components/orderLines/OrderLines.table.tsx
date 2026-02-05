import { Fragment } from 'react'

import { PlusButton } from '@/components/Buttons'
import { Heading } from '@/components/layout/Heading'
import { Tooltip } from '@/components/Tooltip'
import { Table } from '@/components/ui/table/table'
import { message } from '@/i18n/src/messages'

import { useOrderLineContext } from '../../context'
import useOrderLinesColumns from './components/OrderLines.columns'
import { useOrderLineModal } from './form/OrderLineForm.cont'

const messages = message.ordersPage.orderDetail.sectionHeadings

interface OrderLinesTableProps {
    disabledEdit?: boolean
}

const OrderLinesTable = ({ disabledEdit }: OrderLinesTableProps) => {
    const { openOrderLineModal } = useOrderLineModal()
    const { setOrderLine, fields } = useOrderLineContext()
    const columns = useOrderLinesColumns()

    const handleOpenOrderLineForm = () => {
        openOrderLineModal(orderLine => {
            setOrderLine(orderLine)
        })
    }

    return (
        <Fragment>
            <Heading text={messages.orderLines} showBorder={false}>
                {!disabledEdit && (
                    <Tooltip content="Add new order line">
                        <PlusButton
                            type="button"
                            onClick={handleOpenOrderLineForm}
                            className="mb-2"
                        />
                    </Tooltip>
                )}
            </Heading>
            <div className="w-full overflow-hidden">
                <Table
                    columns={columns}
                    data={fields}
                    enablePagination
                    enableFiltering
                    enableFooter
                    enablePinning
                    className="overflow-x-auto overflow-y-auto"
                    headerClassName="whitespace-nowrap sticky"
                    rowClassName="whitespace-nowrap group/row"
                    getRowProps={() => ({})}
                />
            </div>
        </Fragment>
    )
}

export default OrderLinesTable
