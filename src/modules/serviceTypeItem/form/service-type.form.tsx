import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input, TextArea } from '@/components/form/inputs'
import { Col, Grid } from '@/components/grid/Grid'
import { CODEBOOK } from '@/types/constants/codebook'

export const ServiceTypeForm: React.FC = () => {
  return (
    <Grid>
      <Col md={6}>
        <Input label="Service Type Name" name="name" rounded="rounded-md" />
      </Col>
      <Col md={6}>
        <ComboboxTree
          label="Catalogue Category"
          name="category"
          rounded="rounded-md"
          codebook={CODEBOOK.CATALOGUE_CATEGORY}
        />
      </Col>

      <Col md={12}>
        <TextArea
          label="Service Type Description"
          name="description"
          rounded="rounded-md"
        />
      </Col>
    </Grid>
  )
}
