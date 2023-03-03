import { Dispatch, SetStateAction } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'

import ModalButtonsComponent from '@/components/modal/modal.buttons'
import { ModalButtons } from '@/types/form'

import { SystemEditFormType } from '../../types/form'
import { SystemDetailResponse } from '../../types/responses'
import EditForm from './EditForm'

interface Props {
  data?: SystemDetailResponse
  uid?: string
  setOpen: Dispatch<SetStateAction<boolean>>
}

const schema = object({
  name: string().min(5).required(),
  description: string(),
  importanceCode: string(),
  zoneCode: string().required(),
  systemTypeUID: string(),
  systemAlias: string().max(12).required(),
  locationCode: string().required()
})

const Edit = ({ data, uid, setOpen }: Props) => {
  const formMethods = useForm<SystemEditFormType>({
    defaultValues: data
  })

  const buttons: ModalButtons = {
    goNext: {
      type: 'submit',
      text: 'Save'
    },
    goBack: {
      type: 'button',
      text: 'Cancel',
      onClick: () => {
        setOpen(false)
      }
    }
  }

  const onSubmit = (data: SystemEditFormType) => {
    console.log(data)
    setOpen(false)
  }

  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        <EditForm data={data} uid={uid} />
        <ModalButtonsComponent buttons={buttons} />
      </FormProvider>
    </form>
  )
}

export default Edit
