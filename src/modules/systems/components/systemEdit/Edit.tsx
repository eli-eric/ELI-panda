import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Dispatch, SetStateAction, useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { object, string } from 'yup'

import ErrorPage from '@/components/error/ErrorPage'
import ModalButtonsComponent from '@/components/modal/modal.buttons'
import { useEndpoint } from '@/hooks/useEndpoint'
import useSubmit from '@/hooks/useSubmit'
import { ModalButtons } from '@/types/form'

import { SystemEditFormType } from '../../types/form'
import { SystemDetailResponse } from '../../types/responses'
import EditForm from './EditForm'

const formatDataForm = (data: SystemDetailResponse): SystemEditFormType => ({
  name: data.name,
  description: data.description,
  systemCode: data.systemCode,
  systemAlias: data.systemAlias,
  systemTypeUID: data.systemType?.uid,
  locationUID: data.location?.name,
  ownerUID: data.owner?.name,
  importanceUID: data.importance?.uid,
  zoneUID: data.zone?.uid
})

const schema = object({
  name: string().required(),
  description: string(),
  systemTypeUID: string(),
  systemCode: string(),
  systemAlias: string(),
  locationUID: string(),
  ownerUID: string(),
  importanceUID: string(),
  zoneUID: string()
})
interface Props {
  data?: SystemDetailResponse
  uid?: string
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Edit = ({ data, uid, setOpen }: Props) => {
  const { data: session } = useSession()
  const formMethods = useForm<SystemEditFormType>({
    resolver: yupResolver(schema),
    defaultValues: data ? formatDataForm(data) : { ownerUID: session?.user.fullName }
  })
  const { setValue } = formMethods
  useEffect(() => {
    if (data) {
      setValue('ownerUID', data.owner?.uid)
      setValue('locationUID', data.location?.uid)
    } else {
      setValue('ownerUID', session?.user.uid)
    }
  }, [data, setValue, session])
  const router = useRouter()

  const { system } = useEndpoint({
    uid: uid as string
  })
  const { systemSubsystems } = useEndpoint({
    uid: router.query.uid as string
  })
  const { submit, loading, error } = useSubmit({
    endpoint: system,
    method: uid ? 'put' : 'post',
    mutateList: [system, systemSubsystems],
    onSuccess: () => {
      setOpen(false)
    }
  })

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

  const onSubmit = (data: SystemEditFormType) => {
    submit({ ...data, parentUid: router.query.uid })
  }

  return (
    <form onSubmit={formMethods.handleSubmit(onSubmit)}>
      <FormProvider {...formMethods}>
        <EditForm data={data} uid={uid} />
        {error && <ErrorPage />}
        <ModalButtonsComponent buttons={buttons} />
      </FormProvider>
    </form>
  )
}

export default Edit
