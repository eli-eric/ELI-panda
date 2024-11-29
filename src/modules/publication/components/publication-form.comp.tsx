import { Input } from '@/components/form/inputs'
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
          <Input {...fields.abstract} />
        </Col>
        <Col lg={6}>
          <Input {...fields.articleTitle} />
        </Col>
        <Col lg={6}>
          <Input {...fields.keywords} />
        </Col>
        <Col lg={6}>
          <Input {...fields.longJournalTitle} />
        </Col>
        <Col lg={6}>
          <Input {...fields.pages} type="number" />
        </Col>
        <Col lg={6}>
          <Input {...fields.publicationDOI} />
        </Col>
        <Col lg={6}>
          <Input {...fields.year} />
        </Col>
      </Grid>
    </Card>
  )
}
