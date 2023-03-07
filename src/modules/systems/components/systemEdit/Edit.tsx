import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'

import ModalButtonsComponent from '@/components/modal/modal.buttons'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'
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
  name: string().required(),
  description: string(),
  systemTypeUID: string(),
  systemCode: string(),
  systemAlias: string(),
  locationUID: string(),
  ownerUID: string(),
  importanceUID: string(),
  zoneUID: string(),
  criticalityClassUID: string()
})

const Edit = ({ data, uid, setOpen }: Props) => {
  const formMethods = useForm<SystemEditFormType>({
    resolver: yupResolver(schema),
    defaultValues: data
  })
  const router = useRouter()

  const { system } = useEndpoint({
    uid: uid as string
  })
  const { systemSubsystems } = useEndpoint({
    uid: router.query.uid as string
  })
  const { submit, loading, error, response } = useSubmit({
    endpoint: system,
    method: uid ? 'put' : 'post',
    mutateList: [system, systemSubsystems]
  })

  useEffect(() => {
    if (response) if (!error) setOpen(false)
  }, [response, setOpen, error])

  const buttons: ModalButtons = {
    goNext: {
      type: 'submit',
      loading: loading,
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

  const onSubmit = async (data: SystemEditFormType) => {
    await submit({ ...data, parentUid: router.query.uid })

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
