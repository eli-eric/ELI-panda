import { useMakeFormFields } from '@/hooks/form/useMakeFormFields'
import { message } from '@/i18n/src/messages'

// messages
const { form } = message.publication

export const usePublicationFields = () => {
  const disbaled = false
  return useMakeFormFields({
    abstract: {
      name: 'abstract',
      label: form.abstract.label,
      placeholder: form.abstract.placeholder,
      disabled: disbaled,
      rounded: 'rounded-md'
    },
    articleTitle: {
      name: 'articleTitle',
      label: form.articleTitle.label,
      placeholder: form.articleTitle.placeholder,
      disabled: disbaled,
      rounded: 'rounded-md'
    },
    keywords: {
      name: 'keywords',
      label: form.keywords.label,
      placeholder: form.keywords.placeholder,
      disabled: disbaled,
      rounded: 'rounded-md'
    },
    longJournalTitle: {
      name: 'longJournalTitle',
      label: form.longJournalTitle.label,
      placeholder: form.longJournalTitle.placeholder,
      disabled: disbaled,
      rounded: 'rounded-md'
    },
    pages: {
      name: 'pages',
      label: form.pages.label,
      placeholder: form.pages.placeholder,
      disabled: disbaled,
      type: 'number',
      rounded: 'rounded-md'
    },
    pdfFile: {
      name: 'pdfFile',
      label: form.pdfFile.label,
      placeholder: form.pdfFile.placeholder,
      disabled: disbaled,
      rounded: 'rounded-md'
    },
    publicationDOI: {
      name: 'publicationDOI',
      label: form.publicationDOI.label,
      placeholder: form.publicationDOI.placeholder,
      disabled: disbaled,
      rounded: 'rounded-md'
    },
    year: {
      name: 'year',
      label: form.year.label,
      placeholder: form.year.placeholder,
      disabled: disbaled,
      rounded: 'rounded-md'
    }
  })
}
