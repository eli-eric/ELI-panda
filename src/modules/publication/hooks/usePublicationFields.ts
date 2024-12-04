import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'
import { CODEBOOK } from '@/types/constants/codebook'

// messages
const { form } = message.publication

export const usePublicationFields = () => {
  const disabled = false
  return useMakeFormFields({
    abstract: {
      name: 'abstract',
      label: form.abstract.label,
      placeholder: form.abstract.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    articleTitle: {
      name: 'articleTitle',
      label: form.articleTitle.label,
      placeholder: form.articleTitle.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    citationsCount: {
      name: 'citationsCount',
      label: form.citationsCount.label,
      placeholder: form.citationsCount.placeholder,
      disabled: disabled,
      type: 'number',
      rounded: 'rounded-md'
    },
    doi: {
      name: 'doi',
      label: form.doi.label,
      placeholder: form.doi.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    eidScopus: {
      name: 'eidScopus',
      label: form.eidScopus.label,
      placeholder: form.eidScopus.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    eissn: {
      name: 'eissn',
      label: form.eissn.label,
      placeholder: form.eissn.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    impactFactor: {
      name: 'impactFactor',
      label: form.impactFactor.label,
      placeholder: form.impactFactor.placeholder,
      disabled: disabled,
      type: 'number',
      rounded: 'rounded-md'
    },
    issn: {
      name: 'issn',
      label: form.issn.label,
      placeholder: form.issn.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    issue: {
      name: 'issue',
      label: form.issue.label,
      placeholder: form.issue.placeholder,
      disabled: disabled,
      type: 'number',
      rounded: 'rounded-md'
    },
    journalTitle: {
      name: 'journalTitle',
      label: form.longJournalTitle.label,
      placeholder: form.longJournalTitle.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    keywords: {
      name: 'keywords',
      label: form.keywords.label,
      placeholder: form.keywords.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    language: {
      name: 'language',
      label: form.language.label,
      placeholder: form.language.placeholder,
      codebook: CODEBOOK.LANGUAGE,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    oeceFord: {
      name: 'oecdFord',
      label: form.oecdFord.label,
      placeholder: form.oecdFord.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    openAccessType: {
      name: 'openAccessType',
      label: form.openAccessType.label,
      placeholder: form.openAccessType.placeholder,
      codebook: CODEBOOK.OPEN_ACCESS_TYPE,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    pagesFrom: {
      name: 'pagesFrom',
      label: form.pagesFrom.label,
      placeholder: form.pagesFrom.placeholder,
      disabled: disabled,
      type: 'number',
      rounded: 'rounded-md'
    },
    pagesTo: {
      name: 'pagesTo',
      label: form.pagesTo.label,
      placeholder: form.pagesTo.placeholder,
      disabled: disabled,
      type: 'number',
      rounded: 'rounded-md'
    },
    publicationCategory: {
      name: 'publicationCategory',
      label: form.publicationCategory.label,
      placeholder: form.publicationCategory.placeholder,
      disabled: disabled,
      codebook: CODEBOOK.PUBLICATION_CATEGORY,
      rounded: 'rounded-md'
    },
    publicationSupport: {
      name: 'publicationSupport',
      label: form.publicationSupport.label,
      placeholder: form.publicationSupport.placeholder,
      codebook: CODEBOOK.PUBLICATION_SUPPORT,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    publishDate: {
      name: 'publishDate',
      label: form.publishDate.label,
      placeholder: form.publishDate.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    quartile: {
      name: 'quartile',
      label: form.quartile.label,
      placeholder: form.quartile.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    state: {
      name: 'state',
      label: form.state.label,
      placeholder: form.state.placeholder,
      codebook: CODEBOOK.STATE,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    url: {
      name: 'url',
      label: form.webLink.label,
      placeholder: form.webLink.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    userCall: {
      name: 'userCall',
      label: form.userCall.label,
      placeholder: form.userCall.placeholder,
      codebook: CODEBOOK.USER_CALL,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    useExperiment: {
      name: 'useExperiment',
      label: form.useExperiment.label,
      placeholder: form.useExperiment.placeholder,
      codebook: CODEBOOK.USER_EXPERIMENT,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    volume: {
      name: 'volume',
      label: form.volume.label,
      placeholder: form.volume.placeholder,
      disabled: disabled,
      type: 'number',
      rounded: 'rounded-md'
    },
    wosNumber: {
      name: 'wosNumber',
      label: form.wosNumber.label,
      placeholder: form.wosNumber.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    },
    pages: {
      name: 'pagesTotal',
      label: form.pagesTotal.label,
      placeholder: form.pagesTotal.placeholder,
      disabled: disabled,
      type: 'number',
      rounded: 'rounded-md'
    },
    year: {
      name: 'year',
      label: form.year.label,
      placeholder: form.year.placeholder,
      disabled: disabled,
      rounded: 'rounded-md'
    }
  })
}
