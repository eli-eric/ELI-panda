import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import type { GraphNode } from './types'

interface Props {
    node: GraphNode
}

export const NodeDetails: FC<Props> = ({ node }) => {
    const { formatMessage: fm } = useIntl()
    const keys = Object.keys(node.properties)

    if (keys.length) {
        return (
            <div className="h-[600px] overflow-auto col-span-5 border rounded-lg shadow-sm p-4 bg-white">
                <div className="mb-4">
                    <div className="text-xl font-semibold text-gray-800">
                        {fm({ id: message.common.d3.detailProperties })}
                    </div>
                </div>
                <div className="overflow-y-auto">
                    {keys.map((key, idx) => (
                        <div
                            key={key}
                            className={`${
                                idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                            } p-2 rounded-md flex justify-between items-center`}
                        >
                            <span className="font-medium text-gray-600">{key}:</span>
                            <div className="ml-2 overflow-x-auto max-w-full">
                                <span className="whitespace-nowrap text-gray-900">
                                    {node.properties[key]}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    return (
        <div className="h-full col-span-5 border rounded-lg shadow-sm p-4 bg-white">
            {fm({ id: message.common.d3.noPropertiesAvailable })}
        </div>
    )
}
