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
      disabled
    },
    experimentalSystem: {
      label: form.experimentalSystem.label,
      name: 'experimentalSystem',
      rounded: 'rounded-md',
      disabled
    },
    userCall: {
      label: form.userCall.label,
      placeholder: form.userCall.placeholder,
      name: 'userCall',
      rounded: 'rounded-md',
      disabled,
      codebook: CODEBOOK.USER_CALL
    },
    userExperiment: {
      label: form.userExperiment.label,
      rounded: 'rounded-md',
      name: 'userExperiment',
      disabled,
      codebook: CODEBOOK.USER_EXPERIMENT
    },
    doi: {
      label: isPeerReviewed ? form.doi.label : form.doi.labelOptional,
      name: 'doi',
      rounded: 'rounded-md',
      disabled
    },
    webLink: {
      name: 'webLink',
      label: form.webLink.label,
      rounded: 'rounded-md',
      disabled: true
    },
    openAccessType: {
      label: form.openAccessType.label,
      name: 'openAccessType',
      rounded: 'rounded-md',
      disabled,
      codebook: CODEBOOK.OPEN_ACCESS_TYPE
    },
    title: {
      label: form.title.label,
      name: 'title',
      rounded: 'rounded-md',
      disabled
    },
    allAuthors: {
      label: form.allAuthors.label,
      name: 'allAuthors',
      rounded: 'rounded-md',
      disabled
    },
    allAuthorsCount: {
      label: form.allAuthorsCount.label,
      name: 'allAuthorsCount',
      rounded: 'rounded-md',
      type: 'number',
      disabled
    },
    eliAuthors: {
      label: form.eliAuthors.label,
      rounded: 'rounded-md',
      name: 'eliAuthors',
      disabled
    },
    eliAuthorsCount: {
      label: form.eliAuthorsCount.label,
      rounded: 'rounded-md',
      name: 'eliAuthorsCount',
      type: 'number',
      disabled: true
    },
    longJournalTitle: {
      label: form.longJournalTitle.label,
      rounded: 'rounded-md',
      name: 'longJournalTitle',
      disabled
    },
    shortJournalTitle: {
      label: form.shortJournalTitle.label,
      rounded: 'rounded-md',
      name: 'shortJournalTitle',
      disabled
    },
    volume: {
      label: isPeerReviewed ? form.volume.label : form.volume.labelOptional,
      rounded: 'rounded-md',
      name: 'volume',
      type: 'number',
      disabled
    },
    issue: {
      label: form.issue.label,
      rounded: 'rounded-md',
      name: 'issue',
      type: 'number',
      disabled
    },
    pages: {
      label: form.pages.label,
      rounded: 'rounded-md',
      name: 'pages',
      disabled
    },
    pagesCount: {
      label: form.pagesCount.label,
      rounded: 'rounded-md',
      name: 'pagesCount',
      type: 'number',
      disabled
    },
    citeAs: {
      label: form.citeAs.label,
      rounded: 'rounded-md',
      name: 'citeAs',
      disabled
    },

    impactFactor: {
      label: form.impactFactor.label,
      rounded: 'rounded-md',
      name: 'impactFactor',
      disabled
    },
    quartilBasis: {
      label: form.quartilBasis.label,
      rounded: 'rounded-md',
      name: 'quartilBasis',
      disabled
    },
    quartil: {
      label: form.quartil.label,
      placeholder: form.quartil.placeholder,
      rounded: 'rounded-md',
      name: 'quartil',
      disabled
    },
    yearOfPublication: {
      label: form.yearOfPublication.label,
      rounded: 'rounded-md',
      name: 'yearOfPublication',
      type: 'number',
      disabled
    },
    dateOfPublication: {
      label: form.dateOfPublication.label,
      rounded: 'rounded-md',
      name: 'dateOfPublication',
      disabled
    },
    abstract: {
      label: form.abstract.label,
      rounded: 'rounded-md',
      name: 'abstract',
      disabled
    },
    keywords: {
      label: form.keywords.label,
      rounded: 'rounded-md',
      name: 'keywords',
      disabled
    },
    oecdFord: {
      label: isPeerReviewed ? form.oecdFord.label : form.oecdFord.labelOptional,
      rounded: 'rounded-md',
      name: 'oecdFord',
      disabled
    },
    grant: {
      rounded: 'rounded-md',
      label: form.grant.label,
      name: 'grant',
      disabled
    },
    wosNumber: {
      label: form.wosNumber.label,
      rounded: 'rounded-md',
      name: 'wosNumber',
      disabled
    },
    issn: {
      label: form.issn.label,
      rounded: 'rounded-md',
      name: 'issn',
      disabled
    },
    eissn: {
      label: form.eissn.label,
      rounded: 'rounded-md',
      name: 'eissn',
      disabled
    },
    eidScopus: {
      label: form.eidScopus.label,
      rounded: 'rounded-md',
      name: 'eidScopus',
      disabled
    },
    publishingCountry: {
      label: form.publishingCountry.label,
      placeholder: form.publishingCountry.placeholder,
      rounded: 'rounded-md',
      name: 'publishingCountry',
      disabled
    },
    language: {
      label: form.language.label,
      rounded: 'rounded-md',
      name: 'language',
      disabled,
      codebook: CODEBOOK.LANGUAGE
    },
    note: {
      label: form.note.label,
      rounded: 'rounded-md',
      name: 'note',
      disabled
    }
  })
}
