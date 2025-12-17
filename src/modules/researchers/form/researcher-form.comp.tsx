import type { FC } from 'react'

import Combobox from '@/components/form/Combobox'
import { Input } from '@/components/form/inputs'
import { CODEBOOK } from '@/types/constants/codebook'

interface Props {
  disabled?: boolean
}

export const ResearcherFormFields: FC<Props> = ({ disabled = false }) => {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          name="firstName"
          label="First Name"
          placeholder="Enter first name"
          disabled={disabled}
          required
        />
        <Input
          name="lastName"
          label="Last Name"
          placeholder="Enter last name"
          disabled={disabled}
          required
        />
      </div>

      <Input
        name="identificationNumber"
        label="Identification Number"
        placeholder="Enter identification number"
        disabled={disabled}
      />

      <div className="border-t pt-4 mt-2">
        <p className="text-sm text-muted-foreground mb-4">
          At least one identifier is required
        </p>

        <div className="flex flex-col gap-4">
          <Input
            name="orcid"
            label="ORCID"
            placeholder="e.g., 0000-0002-1825-0097"
            disabled={disabled}
          />

          <Input
            name="scopusId"
            label="Scopus ID"
            placeholder="e.g., 57200983210"
            disabled={disabled}
          />

          <Input
            name="researcherId"
            label="Researcher ID"
            placeholder="e.g., A-1234-5678"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="border-t pt-4 mt-2">
        <Combobox
          name="citizenship"
          label="Citizenship"
          codebook={CODEBOOK.COUNTRY}
          placeholder="Select country"
          disabled={disabled}
        />
      </div>
    </div>
  )
}
