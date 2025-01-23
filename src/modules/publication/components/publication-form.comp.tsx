import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { RadioSelect } from '@/components/form/radio-select.comp'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'
import { useAccessControl } from '@/hooks/useAccessControl'
import { ROLE } from '@/types/constants/roles'

import { useMediaTypeStore } from '../hooks/useMediaTypeStore'
import { usePublicationFields } from '../hooks/usePublicationFields'
import type { MEDIA_TYPE_CODE } from '../types/constants'
import { mediaTypeOptions } from '../types/constants'
import { DepartmentsComponent } from './departments.comp'
import { WebLinkField } from './web-link.field'

export type Publication = {
  abstract: string
  articleTitle: string
  keywords: string
  longJournalTitle: string
  pages: number
  publicationDOI: string
  year: string
}

export const PublicationFormComponent = () => {
  const fields = usePublicationFields()
  const { setMediaType } = useMediaTypeStore()
  const disabled = !useAccessControl(ROLE.PUBLICATIONS_EDIT)()

  const handleChangeMediaType = (mediaType: string) => {
    setMediaType(mediaType as MEDIA_TYPE_CODE)
  }

  return (
    <Card className="py-6">
      <Grid>
        <Col lg={3}>
          <RadioSelect
            disabled={disabled}
            name={'mediaType'}
            options={mediaTypeOptions}
            defaultValue={mediaTypeOptions[0].value}
            onChange={handleChangeMediaType}
          />
        </Col>
        <Col lg={9}>
          <Input {...fields.code} />
        </Col>
        <Col lg={4}>
          <Listbox {...fields.userCall} />
        </Col>
        <Col lg={4}>
          <Input {...fields.userExperiment} />
        </Col>
        <Col lg={4}>
          <Input {...fields.experimentalSystem} />
        </Col>
        <Col lg={4}>
          <Input {...fields.doi} />
        </Col>
        <Col lg={4}>
          <WebLinkField />
        </Col>
        <Col lg={4}>
          <Listbox {...fields.openAccessType} />
        </Col>
        <Col lg={12}>
          <Input {...fields.title} />
        </Col>
        <Col lg={12}>
          <TextArea {...fields.allAuthors} />
        </Col>
        <Col lg={12}>
          <Input {...fields.allAuthorsCount} />
        </Col>
        <Col lg={12}>
          <TextArea {...fields.eliAuthors} />
        </Col>
        <Col lg={12}>
          <DepartmentsComponent />
        </Col>
        <Col lg={6}>
          <Input {...fields.longJournalTitle} />
        </Col>
        <Col lg={6}>
          <Input {...fields.shortJournalTitle} />
        </Col>
        <Col lg={3}>
          <Input {...fields.volume} />
        </Col>
        <Col lg={3}>
          <Input {...fields.issue} />
        </Col>
        <Col lg={3}>
          <Input {...fields.pages} />
        </Col>
        <Col lg={3}>
          <Input {...fields.pagesCount} />
        </Col>
        <Col lg={12}>
          <TextArea {...fields.citeAs} />
        </Col>
        <Col lg={2}>
          <Input {...fields.impactFactor} />
        </Col>
        <Col lg={2}>
          <Input {...fields.quartilBasis} />
        </Col>
        <Col lg={2}>
          <Listbox
            {...fields.quartil}
            customOptions={['Q1', 'Q2', 'Q3', 'Q4']}
          />
        </Col>
        <Col lg={2}>
          <Listbox
            {...fields.yearOfPublication}
            customOptions={['2023', '2024', '2025']}
          />
        </Col>
        <Col lg={4}>
          <Input {...fields.dateOfPublication} />
        </Col>
        <Col lg={6}>
          <TextArea {...fields.abstract} />
        </Col>
        <Col lg={6}>
          <TextArea {...fields.keywords} />
        </Col>
        <Col lg={6}>
          <Input {...fields.oecdFord} />
        </Col>
        <Col lg={6}>
          <Input {...fields.grant} />
        </Col>
        <Col lg={2}>
          <Input {...fields.wosNumber} />
        </Col>
        <Col lg={2}>
          <Input {...fields.issn} />
        </Col>
        <Col lg={2}>
          <Input {...fields.eissn} />
        </Col>
        <Col lg={2}>
          <Input {...fields.eidScopus} />
        </Col>
        <Col lg={4}>
          <Combobox {...fields.publishingCountry} hasClientFilter={true} />
        </Col>
        <Col lg={12}>
          <Input
            {...fields.language}
            defaultValue={'English'}
            disabled={true}
          />
        </Col>
        <Col lg={12}>
          <TextArea {...fields.note} />
        </Col>
      </Grid>
    </Card>
  )
}
