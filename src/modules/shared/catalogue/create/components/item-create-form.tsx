import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm } from 'react-hook-form'
import { useIntl } from 'react-intl'

import Combobox from '@/components/form/Combobox'
import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input } from '@/components/form/inputs'
import { Col, Grid } from '@/components/grid/Grid'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import useCatalogueFormFields from '@/modules/catalogueItem/components/form/CatalogueForm.fields'
import { useItemCreate } from '@/modules/catalogueItem/hooks/useItemCreate'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'

import {
  createItemSchema,
  type ItemCreateFormData
} from './item-create-form.schema'

const { form } = message.cataloguePage.itemDetail

interface ItemCreateFormProps {
  title?: string
  onItemCreated?: (item: CatalogueItem) => void
  onClose?: () => void
}

export const ItemCreateForm = ({
  onItemCreated,
  onClose
}: ItemCreateFormProps) => {
  const { formatMessage: fm } = useIntl()
  const fields = useCatalogueFormFields()

  // Create schema with i18n messages
  const schema = useMemo(() => createItemSchema(fm), [fm])

  const formMethods = useForm<ItemCreateFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      catalogueNumber: '',
      category: null as any,
      supplier: null,
      manufacturerUrl: '',
      description: ''
    }
  })

  const { handleSubmit, formState } = formMethods
  const { submit, loading } = useItemCreate()

  const onSubmit: SubmitHandler<ItemCreateFormData> = data => {
    submit(data as any, {
      onSuccess: response => {
        onItemCreated?.(response.data)
        onClose?.()
      }
    })
  }

  // Handle cancel with dirty state check
  const handleCancel = () => {
    if (formState.isDirty) {
      const confirmDiscard = window.confirm(
        'You have unsaved changes. Are you sure you want to close this form?'
      )
      if (confirmDiscard) {
        onClose?.()
      }
    } else {
      onClose?.()
    }
  }

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Grid>
          <Col lg={12}>
            <Input {...fields.name} required />
          </Col>
          <Col lg={12}>
            <Input {...fields.catalogueNumber} required />
          </Col>
          <Col lg={12}>
            <ComboboxTree
              {...fields.category}
              customLabel={fm({ id: form.category.label })}
              required
            />
          </Col>
          <Col lg={12}>
            <Combobox {...fields.supplier} />
          </Col>
        </Grid>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={handleCancel}>
            {fm({ id: message.common.buttons.cancel })}
          </Button>
          <Button type="submit" disabled={loading} variant="default">
            {loading
              ? fm({ id: message.common.buttons.save })
              : fm({ id: message.common.buttons.addNew })}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
