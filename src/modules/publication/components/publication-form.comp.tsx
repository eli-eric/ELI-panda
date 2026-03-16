import { useEffect } from 'react'
import { useFormContext, useWatch } from 'react-hook-form'

import Combobox from '@/components/form/Combobox'
import { Input, TextArea } from '@/components/form/inputs'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'
import { Separator } from '@/components/ui/separator'

import { useMediaTypeStore } from '../hooks/useMediaTypeStore'
import { usePublicationFields } from '../hooks/usePublicationFields'
import {
    isMediaTypeC,
    isMediaTypeCOrD,
    isMediaTypeD,
    isPeerReviewedMediaType,
    MEDIA_TYPE_CODE,
} from '../types/constants'
import { DepartmentsComponent } from './departments.comp'
import { EliAuthorsSelectComponent } from './eli-authors-select.comp'
import { GrantsSelectComponent } from './grants-select.comp'
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
    const {
        control,
        trigger,
        formState: { submitCount },
    } = useFormContext()
    const mediaTypeCb = useWatch({ control, name: 'mediaTypeCb' })
    const { setMediaType } = useMediaTypeStore()

    useEffect(() => {
        const code = isPeerReviewedMediaType(mediaTypeCb)
            ? MEDIA_TYPE_CODE.PeerReviewedArticle
            : MEDIA_TYPE_CODE.OtherArticle
        setMediaType(code)
        if (submitCount > 0) {
            trigger(['doi', 'volume', 'oecdFord'])
        }
    }, [mediaTypeCb, setMediaType, trigger, submitCount])

    const fields = usePublicationFields()
    const { mediaTypeUid } = useMediaTypeStore()
    const showCOrD = isMediaTypeCOrD(mediaTypeUid)
    const showCOnly = isMediaTypeC(mediaTypeUid)
    const showDOnly = isMediaTypeD(mediaTypeUid)

    return (
        <Card className="py-6">
            <Grid>
                <Col lg={12}>
                    <Input {...fields.title} />
                </Col>
                <Col lg={4}>
                    <Listbox {...fields.mediaTypeCb} />
                </Col>
                <Col lg={4}>
                    <Listbox {...fields.eliPublication} customOptions={['YES', 'NO']} />
                </Col>
                <Col lg={4}>
                    <Input {...fields.code} />
                </Col>
                <Col lg={1}>
                    <Listbox {...fields.userCall} allowEmptyOption />
                </Col>
                <Col lg={5}>
                    <Combobox {...fields.userExperimentCb} />
                </Col>
                <Col lg={6}>
                    <Combobox {...fields.experimentalSystemCb} />
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
                    <TextArea {...fields.allAuthors} />
                </Col>
                <Col lg={12}>
                    <Input {...fields.allAuthorsCount} />
                </Col>
                <Separator className="my-4 col-span-full" />
                <Col lg={12}>
                    <EliAuthorsSelectComponent />
                </Col>
                <Separator className="my-4 col-span-full" />
                <Col lg={12}>
                    <DepartmentsComponent />
                </Col>
                <Separator className="my-4 col-span-full" />
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
                    <Listbox {...fields.quartil} customOptions={['Q1', 'Q2', 'Q3', 'Q4']} />
                </Col>
                <Col lg={2}>
                    <Listbox
                        {...fields.yearOfPublication}
                        customOptions={['2023', '2024', '2025', '2026']}
                    />
                </Col>
                <Col lg={4}>
                    <Input {...fields.dateOfPublication} />
                </Col>
                <Col lg={12}>
                    <TextArea {...fields.abstract} />
                </Col>
                <Col lg={12}>
                    <TextArea {...fields.keywords} />
                </Col>
                <Col lg={12}>
                    <TextArea {...fields.otherGrants} />
                </Col>
                <Separator className="my-4 col-span-full" />
                <Col lg={12}>
                    <GrantsSelectComponent />
                </Col>
                <Separator className="my-4 col-span-full" />
                <Col lg={4}>
                    <Input {...fields.oecdFord} />
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
                {showCOrD && (
                    <>
                        <Separator className="my-4 col-span-full" />
                        <Col lg={4}>
                            <Input {...fields.publisher} />
                        </Col>
                        <Col lg={4}>
                            <Input {...fields.publishPlace} />
                        </Col>
                        <Col lg={4}>
                            <Listbox {...fields.publishFormatCb} />
                        </Col>
                    </>
                )}
                {showCOnly && (
                    <>
                        <Col lg={3}>
                            <Input {...fields.isbn} />
                        </Col>
                        <Col lg={5}>
                            <Input {...fields.bookTitle} />
                        </Col>
                        <Col lg={2}>
                            <Input {...fields.bookPagesCount} />
                        </Col>
                        <Col lg={2}>
                            <Input {...fields.editionVolume} />
                        </Col>
                    </>
                )}
                {showDOnly && (
                    <>
                        <Col lg={3}>
                            <Input {...fields.proceedingsIsbn} />
                        </Col>
                        <Col lg={3}>
                            <Input {...fields.conferenceDate} />
                        </Col>
                        <Col lg={3}>
                            <Input {...fields.conferencePlace} />
                        </Col>
                        <Col lg={3}>
                            <Listbox {...fields.conferenceScopeCb} />
                        </Col>
                    </>
                )}
                <Col lg={6}>
                    <Combobox {...fields.publishingCountry} />
                </Col>
                <Col lg={6}>
                    <Input {...fields.language} defaultValue={'English'} disabled={true} />
                </Col>
                <Col lg={12}>
                    <TextArea {...fields.note} />
                </Col>
            </Grid>
        </Card>
    )
}
