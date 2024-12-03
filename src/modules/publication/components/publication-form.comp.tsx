import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'

import { usePublicationFields } from '../hooks/usePublicationFields'

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
        <Col lg={6}>
          <Input {...fields.doi} />
        </Col>
        <Col lg={6}>
          <Input {...fields.articleTitle} />
        </Col>
        <Col lg={12}>
          <Input {...fields.journalTitle} />
        </Col>
        <Col lg={3}>
          <Listbox {...fields.state} />
        </Col>
        <Col lg={3}>
          <Listbox {...fields.publicationCategory} />
        </Col>
        <Col lg={3}>
          <Listbox {...fields.openAccessType} />
        </Col>
        <Col lg={3}>
          <Listbox {...fields.publicationSupport} />
        </Col>
        <Col lg={3}>
          <Listbox {...fields.userCall} />
        </Col>
        <Col lg={3}>
          <Listbox {...fields.useExperiment} />
        </Col>
        <Col lg={3}>
          <Combobox {...fields.language} />
        </Col>
        <Col lg={3}>
          <Input {...fields.year} type="number" />
        </Col>
        <Col lg={12}>
          <Input {...fields.url} />
        </Col>
        <Col lg={12}>
          <Input {...fields.keywords} />
        </Col>
        <Col lg={3}>
          <Input {...fields.issn} />
        </Col>
        <Col lg={3}>
          <Input {...fields.eissn} />
        </Col>
        <Col lg={3}>
          <Input {...fields.eidScopus} />
        </Col>
        <Col lg={3}>
          <Input {...fields.oeceFord} />
        </Col>
        <Col lg={3}>
          <Input {...fields.wosNumber} />
        </Col>
        <Col lg={3}>
          <Input {...fields.volume} type="number" />
        </Col>
        <Col lg={3}>
          <Input {...fields.issue} type="number" />
        </Col>
        <Col lg={3}>
          <Input {...fields.pages} type="number" />
        </Col>
        <Col lg={3}>
          <Input {...fields.pagesFrom} />
        </Col>
        <Col lg={3}>
          <Input {...fields.pagesTo} />
        </Col>
        <Col lg={3}>
          <Combobox {...fields.quartile} />
        </Col>
        <Col lg={3}>
          <Input {...fields.impactFactor} type="number" />
        </Col>
        <Col lg={12}>
          <Input {...fields.citationsCount} />
        </Col>
        <Col lg={12}>
          <TextArea {...fields.abstract} rows={6} />
        </Col>
      </Grid>
    </Card>
  )
}
