import React, { startTransition, useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input } from '@/components/form/inputs'
import { Col, Grid } from '@/components/grid/Grid'
import { message } from '@/i18n/src/messages'
import { useCategory } from '@/modules/catalogue/hooks/useCategory'

import useCatalogueFormFields from './CatalogueForm.fields'

const { form } = message.cataloguePage.itemDetail

const DefaultItemForm = () => {
  const { control } = useFormContext()
  const category = useWatch({ name: 'category', control })
  const fields = useCatalogueFormFields()
  const [parentPath, setParentPath] = React.useState<string>('')
  const { formatMessage: fm } = useIntl()

  const { catalogueCategory } = useCategory(category?.uid)

  useEffect(() => {
    startTransition(() => {
      if (catalogueCategory) {
        const categoryPathString = catalogueCategory.parentPath
          ?.map((path: any) => path?.name)
          .join(' > ')
        setParentPath(categoryPathString)
      }
    })
  }, [category, catalogueCategory])

  return (
    <Grid className="px-4 py-5 sm:px-6">
      <Col lg={6}>
        <Input {...fields.name} />
      </Col>
      <Col lg={6}>
        <Input {...fields.catalogueNumber} />
      </Col>
      <Col lg={12}>
        <ComboboxTree
          {...fields.category}
          customLabel={fm({ id: form.category.label }, { parentPath })}
        />
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
