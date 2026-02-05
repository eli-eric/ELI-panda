import { Plus, Trash2 } from 'lucide-react'
import { Fragment } from 'react'
import { useFieldArray } from 'react-hook-form'
import { FormattedMessage, useIntl } from 'react-intl'

import { Input } from '@/components/form/inputs'
import { Button } from '@/components/ui/button'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

import { DepartmentListbox } from './department.listbox'
const { form, addDepartmentButton } = message.publication

export const DepartmentsComponent = () => {
    const { fields, append, remove } = useFieldArray({
        name: 'authorsDepartments',
        rules: { required: 'This field is required', minLength: 1 },
    })
    const disabled = !useAccessControl(ROLE.PUBLICATIONS_EDIT)()

    const handleAppend = () => {
        append({ department: null, authorsCount: 0 })
    }

    const handleRemove = (index: number) => {
        remove(index)
    }

    return (
        <div className="w-full">
            {fields.map((item, index) => (
                <div key={item.id} className="grid grid-cols-12 w-full gap-2 pt-2">
                    <Department
                        key={item.id}
                        name={`authorsDepartments.${index}`}
                        disabled={disabled}
                    />
                    {!disabled && (
                        <div className="col-span-1">
                            <button
                                className="text-red-600 dark:text-gray-400 justify-end hover:text-orange-400 dark:hover:text-orange-600 self-end pt-6"
                                onClick={() => handleRemove(index)}
                                disabled={fields.length === 1}
                            >
                                <Trash2 className="w-6 h-6" />
                            </button>
                        </div>
                    )}
                </div>
            ))}
            {!disabled && (
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleAppend}
                    className="mt-4"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    <FormattedMessage id={addDepartmentButton} />
                </Button>
            )}
        </div>
    )
}

type DepartmentProps = {
    name: string
    disabled: boolean
}

const Department = ({ name, disabled }: DepartmentProps) => {
    const { formatMessage: fm } = useIntl()
    return (
        <Fragment>
            <DepartmentListbox name={`${name}.department`} disabled={disabled} />
            <Input
                name={`${name}.authorsCount`}
                rounded="rounded-md"
                label={fm({ id: form.authorsCount.label })}
                type="number"
                disabled={disabled}
                className="col-span-5"
            />
        </Fragment>
    )
}
