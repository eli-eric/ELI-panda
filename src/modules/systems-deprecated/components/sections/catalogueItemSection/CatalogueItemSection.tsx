import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import { toast } from 'react-hot-toast'
import * as yup from 'yup'

import { PlusButton } from '@/components/Buttons'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useSubmit from '@/hooks/fetch/useSubmit'
import useFormModal from '@/hooks/form/useFormModal'
import ItemDetailComponent from '@/modules/catalogueItem/Item.cont'
import CatalogueTableSelect from '@/modules/shared/catalogue/table/CatalogueTableSelect'
import type { SystemItemFormType } from '@/modules/systems-deprecated/types/form'
import type { CatalogueItem } from '@/types/responses'

import SystemItemForm from './components/form/SystemItemForm'

const systemItemValidationSchema = yup.object().shape({
  catalogueItemUID: yup.string().required(),
  itemUsageUID: yup.string(),
  eun: yup.string(),
  name: yup.string(),
  serialNumber: yup.string(),
  batchNumber: yup.string(),
  obsolete: yup.string(),
  estimatedLifeTimeMonths: yup.string(),
  conditionStatusUID: yup.string()
})

const CatalogueItemSection = ({ uid }: { uid?: string }) => {
  const router = useRouter()
  const [catalogueItem, setCatalogueItem] = useState<CatalogueItem | undefined>(undefined)

  const { system: systemDetail, systemItemAdd } = useEndpoint({
    uid: router.query.uid as string
  })
  const { submit, loading } = useSubmit({
    endpoint: systemItemAdd,
    method: 'post',
    mutateList: [systemDetail],
    onSuccess: () => {
      setOpen(false)
    },
    onError: () => {
      toast.error('Error adding system item')
    }
  })
  const onSubmit = (data: SystemItemFormType) => {
    submit({
      ...data,
      catalogueItemUID: catalogueItem?.uid,
      obsolete: data.obsolete === 'true'
    })
  }
  const { getFormModal, setOpen } = useFormModal<SystemItemFormType>({
    onSubmit,
    loading,
    schema: systemItemValidationSchema,
    renderForm: () => <SystemItemForm itemName={catalogueItem?.name} />,
    renderOutsideForm: () => (
      <div className="min-h-[300px] flex-col justify-end">
        <CatalogueTableSelect setItem={setCatalogueItem} />
      </div>
    )
  })

  return (
    <Fragment>
      {uid ? (
        <ItemDetailComponent />
      ) : (
        <PlusButton
          primary
          buttonSize="large"
          onClick={() => {
            setOpen(true)
          }}
        />
      )}
      {getFormModal()}
    </Fragment>
  )
}

export default CatalogueItemSection
