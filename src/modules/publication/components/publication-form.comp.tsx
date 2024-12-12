import Combobox from '@/components/form/Combobox'
import { Input, InputDate, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'

import { usePublicationFields } from '../hooks/usePublicationFields'
import { DepartmentsComponent } from './departments.comp'
import { MediaTypeRadio } from './media-type.radio'

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

  return (
    <Card className="py-6">
      <Grid>
        <Col lg={3}>
          <MediaTypeRadio
            name={'mediaType'}
            options={[
              {
                label: 'Peer-Reviewd Article',
                value: 'Peer-Reviewd Article',
                disabled: false
              },
              { label: 'Other Article', value: 'Other Article', disabled: true }
            ]}
            defaultValue={'Peer-Reviewd Article'}
          />
        </Col>
        <Col lg={9}>
          <Input {...fields.code} />
        </Col>
        <Col lg={4}>
          <Listbox {...fields.userCall} />
        </Col>
        <Col lg={4}>
          <Listbox {...fields.userExperiment} />
        </Col>
        <Col lg={4}>
          <Input {...fields.experimentalSystem} />
        </Col>
        <Col lg={4}>
          <Input {...fields.doi} />
        </Col>
        <Col lg={4}>
          <Input {...fields.webLink} />
        </Col>
        <Col lg={4}>
          <Listbox {...fields.openAccessType} />
        </Col>
        <Col lg={12}>
          <Input {...fields.title} />
        </Col>
        <Col lg={6}>
          <TextArea {...fields.allAuthors} />
        </Col>
        <Col lg={6}>
          <TextArea {...fields.eliAuthors} />
        </Col>
        <Col lg={6}>
          <Input {...fields.allAuthorsCount} />
        </Col>
        <Col lg={6}>
          <Input {...fields.eliAuthorsCount} />
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
          <Input {...fields.quartil} />
        </Col>
        <Col lg={2}>
          <Input {...fields.yearOfPublication} />
        </Col>
        <Col lg={4}>
          <InputDate {...fields.dateOfPublication} />
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
          <Input {...fields.language} defaultValue={'en'} disabled={true} />
        </Col>
        <Col lg={12}>
          <TextArea {...fields.note} />
        </Col>
      </Grid>
    </Card>
  )
}
