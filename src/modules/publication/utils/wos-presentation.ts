import { message } from '@/i18n/src/messages'

import { type PublicationWosImportValues, WOS_FIELD_LABEL_IDS } from '../types/wos-import'

/** Returns the field label id, accounting for the effective ISBN destination. */
export const getWosFieldLabelId = (
    field: string,
    isbnTarget: 'isbn' | 'proceedingsIsbn',
): string | undefined => {
    if (field === 'isbn' && isbnTarget === 'proceedingsIsbn')
        return message.publication.form.proceedingsIsbn.label
    return WOS_FIELD_LABEL_IDS[field]
}

/** Places record identity in the modal description alongside the import instructions. */
export const getWosPreviewDescription = (
    values: PublicationWosImportValues,
    doi: string,
    instructions: string,
): string =>
    [values.title, values.longJournalTitle || doi, instructions].filter(Boolean).join(' — ')
