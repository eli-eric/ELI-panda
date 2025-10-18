import { Input, TextArea } from '@/components/form/inputs'
import { InputAmountCurrency } from '@/components/form/inputs/components/InputAmountCurrency.comp'
import Listbox from '@/components/form/Listbox'
import { Grid } from '@/components/grid/Grid'
import type { CodebookType } from '@/types/responses/codebook'

import { useServiceLineFields } from '../hooks/useServiceLineFields'

type Props = {
  onServiceTypeChange?: (serviceType?: CodebookType) => void
}

export const ServiceLineStep1BasicInfo = ({ onServiceTypeChange }: Props) => {
  const fields = useServiceLineFields()

  return (
    <Grid>
      {/* Name field - full width (12 columns) */}
      <div className="col-span-12">
        <Input {...fields.name} />
      </div>

      {/* Service Type - 8 columns */}
      <div className="col-span-8">
        <Listbox {...fields.serviceType} onChange={onServiceTypeChange} />
      </div>

      {/* Price with Currency - 4 columns */}
      <div className="col-span-4">
        <InputAmountCurrency
          amountName={fields.price.name}
          currencyName={fields.currency.name}
          label={fields.price.label}
          required={fields.price.required}
        />
      </div>

      {/* Notes - full width (12 columns) */}
      <div className="col-span-12">
        <TextArea {...fields.notes} />
      </div>
    </Grid>
  )
}
