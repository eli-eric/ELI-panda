import { useRouter } from 'next/router'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import { ROLE } from '@/types/constants/roles'

import FileManager from '../shared/fileManager/FileManager'
import { FILE_TYPE } from '../shared/fileManager/types'
import { PublicationFormComponent } from './components/publication-form.comp'
import { usePublicationMutation } from './hooks/usePublicationMutation'
import type { PublicationForm } from './types/form'
import type { Publication } from './types/responses'
import { formatFormData, formatPublication } from './utils/formatters'

interface Props {
  publication?: Publication
}

export const PublicationDetailContainer: FC<Props> = ({ publication }) => {
  const router = useRouter()

  const defaultValues = publication
    ? formatPublication(publication)
    : ({
        authorsDepartments: [{ department: null, authorsCount: '' }]
      } as unknown as PublicationForm)

  const formMethods = useForm<PublicationForm>({
    defaultValues: publication ? formatPublication(publication) : defaultValues
  })

  const { mutate } = usePublicationMutation()

  const onSubmit = formMethods.handleSubmit(data => {
    console.log('submit', formatFormData(data))
  })

  const onSubmitAndExit = formMethods.handleSubmit(data => {
    console.log('submit and save', formatFormData(data))
  })

  return (
    <Form
      formMethods={formMethods}
      className="bg-neutral-50 dark:bg-neutral-800"
    >
      <HeaderWithButtons
        editRole={ROLE.BASICS}
        onSubmit={onSubmit}
        onSubmitAndExit={onSubmitAndExit}
      />
      <PublicationFormComponent />
      <Card>
        {publication && (
          <FileManager
            allowMultiple={false}
            hasEditRole={true}
            itemType={FILE_TYPE.PUBLICATON}
            uid={publication.uid as string}
          />
        )}{' '}
      </Card>
    </Form>
  )
}
