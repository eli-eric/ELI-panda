import React from 'react'

import Combobox from '@/components/form/Combobox'
import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input } from '@/components/form/Input'
import { Col, Grid } from '@/components/grid/Grid'

import useCatalogueFormFields from './CatalogueForm.fields'

const DefaultItemForm = () => {
  const fields = useCatalogueFormFields()

  return (
    <Grid className="px-4 py-5 sm:px-6">
      <Col lg={6}>
        <Input {...fields.name} />
      </Col>
      <Col lg={6}>
        <Input {...fields.catalogueNumber} />
      </Col>
      <Col lg={12}>
        <ComboboxTree {...fields.category} />
      </Col>
      <Col lg={6}>
        <Combobox {...fields.supplier} />
      </Col>
      <Col lg={6}>
        <Input {...fields.manufacturerUrl} />
      </Col>
    </Grid>
  )
}

export default DefaultItemForm
