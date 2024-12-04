import { useRouter } from 'next/router'
import { type FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'
import { convertDate } from '@/utils/formatters'

import FileManager from '../shared/fileManager/FileManager'
import { useFiles } from '../shared/fileManager/hooks/useFiles'
import { FILE_TYPE } from '../shared/fileManager/types'
import { PublicationFormComponent } from './components/publication-form.comp'
import { useGenerateUid } from './hooks/useGenerateUid'
import { usePublicationMutation } from './hooks/usePublicationMutation'
import type { PublicationForm } from './types/form'
import type { Publication } from './types/responses'

interface Props {
  publication?: Publication
}

export const PublicationDetailContainer: FC<Props> = ({ publication }) => {
  const router = useRouter()

  const generatedUid = useGenerateUid(!publication?.uid)

  const formMethods = useForm<PublicationForm>({})

  const { setValue } = formMethods

  const { data: files } = useFiles({
    uid: publication?.uid || generatedUid,
    itemType: FILE_TYPE.PUBLICATON
  })

  useEffect(() => {
    if (generatedUid && !publication?.uid) {
      setValue('uid', generatedUid)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generatedUid])

  const { mutate } = usePublicationMutation()

  const onSubmit = formMethods.handleSubmit(data => {
    const dataToSend = {
      ...data,
      pagesTotal: Number(data.pagesTotal),
      pagesTo: Number(data.pagesTo),
      publishDate: convertDate(data.publishDate),
      pagesFrom: Number(data.pagesFrom),
      impactFactor: Number(data.impactFactor),
      issue: Number(data.issue),
      year: Number(data.year),
      state: data.state.name,
      volume: Number(data.volume),
      citationsCount: Number(data.citationsCount),
      language: data.language.name,
      pdfFileUrl: files?.[0].url || '',
      pdfFileName: files?.[0].name || '',
      quartile: 'Q1'
    }
    console.log(dataToSend)
    mutate(dataToSend, {
      onSuccess: () => {
        router.push(PATH.PUBLICATION + '/' + data.uid)
      }
    })
  })

  const onSubmitAndExit = formMethods.handleSubmit(data => {
    // mutate(
    //   {
    //     ...data,
    //     pagesTotal: Number(data.pagesTotal),
    //     pagesTo: Number(data.pagesTo),
    //     state: data.state.name,
    //     publishDate: data.publishDate || '',
    //     pagesFrom: Number(data.pagesFrom),
    //     pdfFileUrl: files?.[0].url || '',
    //     pdfFileName: files?.[0].name || ''
    //   },
    //   {
    //     onSuccess: () => {
    //       router.push(PATH.PUBLICATIONS)
    //     }
    //   }
    // )
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
        {publication ? (
          <FileManager
            allowMultiple={false}
            hasEditRole={true}
            itemType={FILE_TYPE.PUBLICATON}
            uid={publication.uid}
          />
        ) : (
          generatedUid && (
            <FileManager
              allowMultiple={false}
              hasEditRole={true}
              itemType={FILE_TYPE.PUBLICATON}
              uid={generatedUid}
            />
          )
        )}
      </Card>
    </Form>
  )
}
