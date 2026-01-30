import { useFormContext } from 'react-hook-form'
import { useIntl } from 'react-intl'

import CheckBox from '@/components/form/CheckBox'
import { Input } from '@/components/form/inputs'
import { Col, Grid } from '@/components/grid/Grid'
import { message } from '@/i18n/src/messages'

const orderLines = message.ordersPage.orderLines
export const OrderIsDeliveryForm = () => {
    const { formatMessage: fm } = useIntl()
    const formMethods = useFormContext()
    const manualEun = formMethods.watch('manualEun')
    return (
        <Grid>
            <Col md={12}>
                <Input
                    name="serialNumber"
                    label={fm({ id: orderLines.form.serialNumber.label })}
                    placeholder={fm({ id: orderLines.form.serialNumber.placeholder })}
                    rounded="rounded-md"
                />
            </Col>
            <Col md={12}>
                <CheckBox
                    name="manualEun"
                    label={fm({ id: orderLines.form.manualEun.label })}
                    rounded="rounded-md"
                />
            </Col>
            {manualEun && (
                <Col md={12}>
                    <Input
                        name="eun"
                        label={fm({ id: orderLines.form.eun.label })}
                        placeholder={fm({ id: orderLines.form.eun.placeholder })}
                        rounded="rounded-md"
                    />
                </Col>
            )}
        </Grid>
    )
}
