import { useQuery } from '@tanstack/react-query'
import { type FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import { ROLE } from '@/types/constants/roles'
import { queryFetcher } from '@/utils/fetcher'

import FileManager from '../shared/fileManager/FileManager'
import { FILE_TYPE } from '../shared/fileManager/types'
import { PublicationFormComponent } from './components/publication-form.comp'
import { usePublicationMutation } from './hooks/usePublicationMutation'
import type { PublicationForm } from './types/form'
import type { Publication } from './types/responses'

interface Props {
  publication?: Publication
}

export const PublicationDetailContainer: FC<Props> = ({ publication }) => {
  const { data } = useQuery({
    queryKey: ['uuidGenerate'],
    queryFn: queryFetcher<string>('generateUUID'),
    enabled: !publication?.uid,
    refetchOnMount: true
  })

  const formMethods = useForm<PublicationForm>({
    defaultValues: publication
  })

  const { setValue } = formMethods

  useEffect(() => {
    if (data && !publication?.uid) {
      setValue('uid', data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const { mutate } = usePublicationMutation()

  const onSubmit = formMethods.handleSubmit(data => {
    mutate({ ...data, pages: parseInt(String(data.pages)) })
  })

  const onSubmitAndExit = formMethods.handleSubmit(data => {
    mutate(data)
  })

  return (
    <Form formMethods={formMethods}>
      <HeaderWithButtons
        editRole={ROLE.BASICS}
        onSubmit={onSubmit}
        onSubmitAndExit={onSubmitAndExit}
      />
      <PublicationFormComponent />
      <Card>
        {publication ? (
          <FileManager
            hasEditRole={true}
            itemType={FILE_TYPE.PUBLICATON}
            uid={publication.uid}
          />
        ) : (
          data && (
            <FileManager
              hasEditRole={true}
              itemType={FILE_TYPE.PUBLICATON}
              uid={data}
            />
          )
        )}
      </Card>
    </Form>
  )
}
