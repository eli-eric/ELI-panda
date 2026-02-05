import type { FC } from 'react'

import { Disclosure } from '@/components/ui'
import { CheckboxWithLabel } from '@/components/ui/checkbox'

interface Props {
    getIsAllColumnsVisible: () => boolean
    getToggleAllColumnsVisibilityHandler: () => (e: unknown) => void
    getAllLeafColumns: () => any[]
}

export const TableSettings: FC<Props> = ({
    getAllLeafColumns,
    getIsAllColumnsVisible,
    getToggleAllColumnsVisibilityHandler,
}) => (
    <div id="column-hiding">
        <Disclosure title="Show table options" defaultOpen={false}>
            <ul className="divide-y divide-gray-200">
                <li>
                    <div className="py-1 px-4">
                        <CheckboxWithLabel
                            id="toggle-all"
                            checked={getIsAllColumnsVisible()}
                            onChange={checked =>
                                getToggleAllColumnsVisibilityHandler()({ target: { checked } })
                            }
                            label="Toggle All"
                            className="hover:text-primary"
                        />
                    </div>
                </li>
                <li>
                    <div className="gap-1 py-2 px-4 flex flex-wrap">
                        {getAllLeafColumns().map(column => {
                            return (
                                <CheckboxWithLabel
                                    key={column.id}
                                    id={`checkbox-${column.id}`}
                                    checked={column.getIsVisible()}
                                    onChange={checked =>
                                        column.getToggleVisibilityHandler()({ target: { checked } })
                                    }
                                    label={
                                        typeof column.columnDef?.header === 'string'
                                            ? column.columnDef?.header || column.id
                                            : column.id
                                    }
                                    className="mr-4 hover:text-primary"
                                />
                            )
                        })}
                    </div>
                </li>
            </ul>
        </Disclosure>
    </div>
)
