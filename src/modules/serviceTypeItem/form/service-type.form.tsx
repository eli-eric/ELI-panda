import { useFormContext } from 'react-hook-form'

import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input, TextArea } from '@/components/form/inputs'
import { Col, Grid } from '@/components/grid/Grid'
import usePermission from '@/hooks/usePermission'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'

export const ServiceTypeForm: React.FC = () => {
  const { setValue } = useFormContext()
  const disabled = !usePermission([ROLE.SERVICE_EDIT])
  const resetProperties = () => {
    setValue('properties', [])
  }
  return (
    <Grid>
      <Col md={6}>
        <Input
          label="Service Type Name"
          name="name"
          rounded="rounded-md"
          disabled={disabled}
        />
      </Col>
      <Col md={6}>
        <ComboboxTree
          label="Catalogue Category"
          name="category"
          disabled={disabled}
          onSelect={resetProperties}
          rounded="rounded-md"
          codebook={CODEBOOK.CATALOGUE_CATEGORY}
        />
      </Col>

      <Col md={12}>
        <TextArea
          label="Service Type Description"
          name="description"
          disabled={disabled}
          rounded="rounded-md"
        />
      </Col>
    </Grid>
  )
}
