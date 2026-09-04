import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'
import { ROLE } from '@/types/constants/roles'

import { MEDIA_TYPE_CODE } from '../types/constants'
import { useMediaTypeStore } from './useMediaTypeStore'

// messages
const { form } = message.publication

export const usePublicationFields = () => {
    const disabled = !useAccessControl(ROLE.PUBLICATIONS_EDIT)()
    const { mediaType } = useMediaTypeStore()

    const isPeerReviewed = mediaType === MEDIA_TYPE_CODE.PeerReviewedArticle

    return useMakeFormFields({
        code: {
            label: form.code.label,
            name: 'code',
            rounded: 'rounded-md',
            disabled,
        },
        mediaTypeCb: {
            label: form.mediaTypeCb.label,
            name: 'mediaTypeCb',
            rounded: 'rounded-md',
            disabled,
            codebook: CODEBOOK.MEDIA_TYPE,
        },
        eliPublication: {
            label: form.eliPublication.label,
            name: 'eliPublication',
            rounded: 'rounded-md',
            disabled,
            placeholder: form.eliPublication.placeholder,
        },
        experimentalSystemCb: {
            label: form.experimentalSystemCb.label,
            name: 'experimentalSystemCb',
            rounded: 'rounded-md',
            disabled,
            codebook: CODEBOOK.EXPERIMENTAL_SYSTEM,
        },
        userCall: {
            label: form.userCall.label,
            placeholder: form.userCall.placeholder,
            name: 'userCall',
            rounded: 'rounded-md',
            disabled,
            codebook: CODEBOOK.USER_CALL,
        },
        userExperimentCb: {
            label: form.userExperimentCb.label,
            name: 'userExperimentCb',
            rounded: 'rounded-md',
            disabled,
            codebook: CODEBOOK.USER_EXPERIMENT,
        },
        doi: {
            label: isPeerReviewed ? form.doi.label : form.doi.labelOptional,
            name: 'doi',
            rounded: 'rounded-md',
            disabled,
        },
        webLink: {
            name: 'webLink',
            label: form.webLink.label,
            rounded: 'rounded-md',
            disabled: true,
        },
        openAccessType: {
            label: form.openAccessType.label,
            name: 'openAccessType',
            rounded: 'rounded-md',
            disabled,
            codebook: CODEBOOK.OPEN_ACCESS_TYPE,
        },
        title: {
            label: form.title.label,
            name: 'title',
            rounded: 'rounded-md',
            disabled,
        },
        allAuthors: {
            label: form.allAuthors.label,
            name: 'allAuthors',
            rounded: 'rounded-md',
            disabled,
        },
        allAuthorsCount: {
            label: form.allAuthorsCount.label,
            name: 'allAuthorsCount',
            rounded: 'rounded-md',
            type: 'number',
            disabled,
        },
        eliAuthorsCount: {
            label: form.eliAuthorsCount.label,
            rounded: 'rounded-md',
            name: 'eliAuthorsCount',
            type: 'number',
            disabled: true,
        },
        longJournalTitle: {
            label: form.longJournalTitle.label,
            rounded: 'rounded-md',
            name: 'longJournalTitle',
            disabled,
        },
        shortJournalTitle: {
            label: form.shortJournalTitle.label,
            rounded: 'rounded-md',
            name: 'shortJournalTitle',
            disabled,
        },
        volume: {
            label: isPeerReviewed ? form.volume.label : form.volume.labelOptional,
            rounded: 'rounded-md',
            name: 'volume',
            type: 'number',
            disabled,
        },
        issue: {
            label: form.issue.label,
            rounded: 'rounded-md',
            name: 'issue',
            type: 'number',
            disabled,
        },
        pages: {
            label: form.pages.label,
            rounded: 'rounded-md',
            name: 'pages',
            disabled,
        },
        pagesCount: {
            label: form.pagesCount.label,
            rounded: 'rounded-md',
            name: 'pagesCount',
            type: 'number',
            disabled,
        },
        citeAs: {
            label: form.citeAs.label,
            rounded: 'rounded-md',
            name: 'citeAs',
            disabled,
        },

        impactFactor: {
            label: form.impactFactor.label,
            rounded: 'rounded-md',
            name: 'impactFactor',
            type: 'number',
            disabled,
        },
        quartilBasis: {
            label: form.quartilBasis.label,
            rounded: 'rounded-md',
            name: 'quartilBasis',
            disabled,
        },
        quartil: {
            label: form.quartil.label,
            placeholder: form.quartil.placeholder,
            rounded: 'rounded-md',
            name: 'quartil',
            disabled,
        },
        yearOfPublication: {
            label: form.yearOfPublication.label,
            placeholder: form.yearOfPublication.placeholder,
            rounded: 'rounded-md',
            name: 'yearOfPublication',
            type: 'number',
            disabled,
        },
        dateOfPublication: {
            label: form.dateOfPublication.label,
            rounded: 'rounded-md',
            name: 'dateOfPublication',
            disabled,
        },
        abstract: {
            label: form.abstract.label,
            rounded: 'rounded-md',
            name: 'abstract',
            disabled,
        },
        keywords: {
            label: form.keywords.label,
            rounded: 'rounded-md',
            name: 'keywords',
            disabled,
        },
        oecdFord: {
            label: isPeerReviewed ? form.oecdFord.label : form.oecdFord.labelOptional,
            rounded: 'rounded-md',
            name: 'oecdFord',
            disabled,
        },
        grantCb: {
            label: form.grantCb.label,
            name: 'grantCb',
            rounded: 'rounded-md',
            disabled,
            codebook: CODEBOOK.GRANT,
        },
        otherGrants: {
            label: form.otherGrants.label,
            rounded: 'rounded-md',
            name: 'otherGrants',
            disabled,
        },
        wosNumber: {
            label: form.wosNumber.label,
            rounded: 'rounded-md',
            name: 'wosNumber',
            disabled,
        },
        issn: {
            label: form.issn.label,
            rounded: 'rounded-md',
            name: 'issn',
            disabled,
        },
        eissn: {
            label: form.eissn.label,
            rounded: 'rounded-md',
            name: 'eissn',
            disabled,
        },
        eidScopus: {
            label: form.eidScopus.label,
            rounded: 'rounded-md',
            name: 'eidScopus',
            disabled,
        },
        publishingCountry: {
            label: form.publishingCountry.label,
            placeholder: form.publishingCountry.placeholder,
            rounded: 'rounded-md',
            name: 'publishingCountry',
            codebook: CODEBOOK.COUNTRY,
            disabled,
        },
        language: {
            label: form.language.label,
            rounded: 'rounded-md',
            name: 'language',
            disabled,
            codebook: CODEBOOK.LANGUAGE,
        },
        note: {
            label: form.note.label,
            rounded: 'rounded-md',
            name: 'note',
            disabled,
        },
        // C or D
        publisher: {
            label: form.publisher.label,
            name: 'publisher',
            rounded: 'rounded-md',
            disabled,
        },
        publishPlace: {
            label: form.publishPlace.label,
            name: 'publishPlace',
            rounded: 'rounded-md',
            disabled,
        },
        publishFormatCb: {
            label: form.publishFormatCb.label,
            name: 'publishFormatCb',
            rounded: 'rounded-md',
            disabled,
            codebook: CODEBOOK.PUBLISH_FORMAT,
        },
        // C only
        isbn: {
            label: form.isbn.label,
            name: 'isbn',
            rounded: 'rounded-md',
            disabled,
        },
        bookTitle: {
            label: form.bookTitle.label,
            name: 'bookTitle',
            rounded: 'rounded-md',
            disabled,
        },
        bookPagesCount: {
            label: form.bookPagesCount.label,
            name: 'bookPagesCount',
            rounded: 'rounded-md',
            type: 'number',
            disabled,
        },
        editionVolume: {
            label: form.editionVolume.label,
            name: 'editionVolume',
            rounded: 'rounded-md',
            disabled,
        },
        // D only
        proceedingsIsbn: {
            label: form.proceedingsIsbn.label,
            name: 'proceedingsIsbn',
            rounded: 'rounded-md',
            disabled,
        },
        conferenceDate: {
            label: form.conferenceDate.label,
            name: 'conferenceDate',
            rounded: 'rounded-md',
            disabled,
        },
        conferencePlace: {
            label: form.conferencePlace.label,
            name: 'conferencePlace',
            rounded: 'rounded-md',
            disabled,
        },
        conferenceScopeCb: {
            label: form.conferenceScopeCb.label,
            name: 'conferenceScopeCb',
            rounded: 'rounded-md',
            disabled,
            codebook: CODEBOOK.CONFERENCE_SCOPE,
        },
    })
}
