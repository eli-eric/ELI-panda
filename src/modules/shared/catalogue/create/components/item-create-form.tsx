import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useEffect, useMemo, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { FormProvider, useForm, useWatch } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { ComboboxTree } from '@/components/form/ComboboxTree'
import { Input } from '@/components/form/inputs'
import { Col, Grid } from '@/components/grid/Grid'
import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { useCatalogueNumberUnique } from '@/modules/catalogueItem/hooks/useCatalogueNumberUnique'
import { useItemCreate } from '@/modules/catalogueItem/hooks/useItemCreate'
import type { CatalogueItem } from '@/modules/catalogueItem/types/responses'
import type { CodebookType } from '@/types/responses/codebook'

import { useItemCreateFormFields } from './item-create.fields'
import {
  createItemSchema,
  type ItemCreateFormData
} from './item-create-form.schema'

const { form } = message.cataloguePage.itemDetail

const CATEGORY_DEFAULT = {
  uid: '97598f04-948f-4da5-95b6-b2a44e0076db',
  name: 'General (unsorted)',
  code: 'general-(unsorted)'
} as CodebookType

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
  const fields = useItemCreateFormFields()

  // Create schema with i18n messages
  const schema = useMemo(() => createItemSchema(fm), [fm])

  const formMethods = useForm<ItemCreateFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      catalogueNumber: '',
      category: CATEGORY_DEFAULT
    }
  })

  const { handleSubmit, setError, clearErrors, control } = formMethods
  const { submit, loading } = useItemCreate()

  // Track which catalogue number value has been validated
  const [catalogueNumberToValidate, setCatalogueNumberToValidate] = useState<
    string | null
  >(null)

  const catalogueNumber = useWatch({
    control,
    name: 'catalogueNumber'
  })

  // Reset validation when catalogue number changes
  useEffect(() => {
    if (catalogueNumberToValidate !== null) {
      setCatalogueNumberToValidate(null)
      clearErrors('catalogueNumber')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalogueNumber])

  // Uniqueness validation hook - runs when catalogueNumberToValidate is set
  const { isUnique, isChecking } = useCatalogueNumberUnique({
    catalogueNumber: catalogueNumberToValidate || '',
    enabled: Boolean(catalogueNumberToValidate)
  })

  // Handle catalogue number blur - trigger uniqueness check
  const handleCatalogueNumberBlur = useCallback(() => {
    const currentValue = catalogueNumber?.trim()
    if (currentValue && currentValue.length > 0) {
      setCatalogueNumberToValidate(currentValue)
    }
  }, [catalogueNumber])

  // Update form error state based on uniqueness check result
  useEffect(() => {
    if (catalogueNumberToValidate && !isChecking && isUnique === false) {
      setError('catalogueNumber', {
        type: 'manual',
        message: fm({
          id: message.cataloguePage.itemDetail.validation.catalogueNumberExists
        })
      })
    } else if (catalogueNumberToValidate && !isChecking && isUnique === true) {
      clearErrors('catalogueNumber')
    }
  }, [
    isUnique,
    isChecking,
    catalogueNumberToValidate,
    setError,
    clearErrors,
    fm
  ])

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
    onClose?.()
  }

  // Determine if submit button should be disabled
  const isSubmitDisabled = useMemo(() => {
    if (loading || isChecking) return true

    const currentValue = catalogueNumber?.trim()
    if (!currentValue) return false

    // Disable if not yet validated or validation failed
    return (
      catalogueNumberToValidate !== currentValue || isUnique === false
    )
  }, [
    loading,
    isChecking,
    catalogueNumber,
    catalogueNumberToValidate,
    isUnique
  ])

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Grid>
          <Col lg={12}>
            <Input {...fields.name} />
          </Col>
          <Col lg={12}>
            <Input
              {...fields.catalogueNumber}
              onBlur={handleCatalogueNumberBlur}
            />
            {isChecking && (
              <p className="text-sm text-muted-foreground mt-1">
                {fm({ id: message.common.ui.loading })}
              </p>
            )}
          </Col>
          <Col lg={12}>
            <ComboboxTree
              {...fields.category}
              customLabel={fm({ id: form.category.label2 })}
            />
          </Col>
        </Grid>

        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button type="button" variant="outline" onClick={handleCancel}>
            {fm({ id: message.common.buttons.cancel })}
          </Button>
          <Button type="submit" disabled={isSubmitDisabled} variant="default">
            {loading
              ? fm({ id: message.common.buttons.save })
              : fm({ id: message.common.buttons.addNew })}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
