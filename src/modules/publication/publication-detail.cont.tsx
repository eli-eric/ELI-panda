import { yupResolver } from '@hookform/resolvers/yup'
import { useRouter } from 'next/router'
import { type FC } from 'react'
import { useForm } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'

import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import FileManager from '../shared/fileManager/FileManager'
import { FILE_TYPE } from '../shared/fileManager/types'
import { PublicationFormComponent } from './components/publication-form.comp'
import {
  validationSchemeOther,
  validationSchemePeerReviewed
} from './form/scheme'
import { useMediaTypeStore } from './hooks/useMediaTypeStore'
import { usePublicationMutation } from './hooks/usePublicationMutation'
import { MEDIA_TYPE_CODE } from './types/constants'
import type { PublicationForm } from './types/form'
import type { Publication } from './types/responses'
import { formatFormData, formatPublication } from './utils/formatters'

const messages = message.publication

interface Props {
  publication?: Publication
}

export const PublicationDetailContainer: FC<Props> = ({ publication }) => {
  const router = useRouter()

  const { mediaType } = useMediaTypeStore()

  const defaultValues = publication
    ? formatPublication(publication)
    : ({
        authorsDepartments: [{ department: null, authorsCount: '' }]
      } as unknown as PublicationForm)

  const formMethods = useForm<any>({
    defaultValues: publication ? formatPublication(publication) : defaultValues,
    resolver: yupResolver(
      mediaType === MEDIA_TYPE_CODE.PeerReviewedArticle
        ? validationSchemePeerReviewed
        : validationSchemeOther
    )
  })

  const { mutate } = usePublicationMutation()

  const onSubmit = formMethods.handleSubmit(data => {
    const formattedData = formatFormData(data)
    mutate(formattedData, {
      onSuccess: ({ data }) => {
        router.push(PATH.PUBLICATION + '/' + data.uid)
      }
    })
  })

  const onSubmitAndExit = formMethods.handleSubmit(data => {
    mutate(formatFormData(data), {
      onSuccess: () => {
        router.push(PATH.PUBLICATIONS)
      }
    })
  })

  return (
    <Form
      formMethods={formMethods}
      className="h-screen overflow-auto"
      enableLeaveWarning={true}
    >
      <HeaderWithButtons
        editRole={ROLE.BASICS}
        onSubmit={onSubmit}
        onSubmitAndExit={onSubmitAndExit}
        customElement={
          <h1 className="text-xl font-bold">
            {publication ? 'EDIT PUBLICATION' : 'NEW PUBLICATION'}
          </h1>
        }
      />
      <PublicationFormComponent />
      <Card>
        <FileManager
          customTitle="Publication PDF file"
          allowMultiple={false}
          hasEditRole={publication ? true : false}
          itemType={FILE_TYPE.PUBLICATION}
          uid={publication?.uid as string}
        />
        {!publication && (
          <h1 className="text-sm text-gray-600 pl-3">
            <FormattedMessage id={messages.pdfFileMessage} />
          </h1>
        )}
      </Card>
    </Form>
  )
}
