import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { RadioSelect } from '@/components/form/radio-select.comp'
import Card from '@/components/layout/Card'
import { useAccessControl } from '@/hooks/useAccessControl'
import { DepartmentsComponent } from '@/modules/publication/components/departments.comp'
import { PublishingCountryListbox } from '@/modules/publication/components/publishing-country.listbox'
import { WebLinkField } from '@/modules/publication/components/web-link.field'
import { useMediaTypeStore } from '@/modules/publication/hooks/useMediaTypeStore'
import { usePublicationFields } from '@/modules/publication/hooks/usePublicationFields'
import type { MEDIA_TYPE_CODE } from '@/modules/publication/types/constants'
import { mediaTypeOptions } from '@/modules/publication/types/constants'
import { ROLE } from '@/types/constants/roles'

export type Publication = {
  abstract: string
  articleTitle: string
  keywords: string
  longJournalTitle: string
  pages: number
  publicationDOI: string
  year: string
}

export const PublicationFreeFormComponent = () => {
  const fields = usePublicationFields()
  const { setMediaType } = useMediaTypeStore()
  const disabled = !useAccessControl(ROLE.PUBLICATIONS_EDIT)()

  const handleChangeMediaType = (mediaType: string) => {
    setMediaType(mediaType as MEDIA_TYPE_CODE)
  }

  return (
    <Card className="py-6">
      <RadioSelect
        disabled={disabled}
        name={'mediaType'}
        options={mediaTypeOptions}
        defaultValue={mediaTypeOptions[0].value}
        onChange={handleChangeMediaType}
      />
      <Input {...fields.code} />
      <Listbox {...fields.userCall} />
      <Input {...fields.userExperiment} />
      <Input {...fields.experimentalSystem} />
      <Input {...fields.doi} />
      <WebLinkField />
      <Listbox {...fields.openAccessType} />
      <Input {...fields.title} />
      <TextArea {...fields.allAuthors} />
      <Input {...fields.allAuthorsCount} />
      <TextArea {...fields.eliAuthors} />
      <DepartmentsComponent />
      <Input {...fields.longJournalTitle} />
      <Input {...fields.shortJournalTitle} />
      <Input {...fields.volume} />
      <Input {...fields.issue} />
      <Input {...fields.pages} />
      <Input {...fields.pagesCount} />
      <TextArea {...fields.citeAs} />
      <Input {...fields.impactFactor} />
      <Input {...fields.quartilBasis} />
      <Listbox {...fields.quartil} customOptions={['Q1', 'Q2', 'Q3', 'Q4']} />
      <Listbox
        {...fields.yearOfPublication}
        customOptions={['2023', '2024', '2025', '2026']}
      />
      <Input {...fields.dateOfPublication} />
      <TextArea {...fields.abstract} />
      <TextArea {...fields.keywords} />
      <Input {...fields.oecdFord} />
      <Input {...fields.grant} />
      <Input {...fields.wosNumber} />
      <Input {...fields.issn} />
      <Input {...fields.eissn} />
      <Input {...fields.eidScopus} />
      <PublishingCountryListbox />
      <Input {...fields.language} defaultValue={'English'} disabled={true} />
      <TextArea {...fields.note} />
    </Card>
  )
}
