import { message } from '@/i18n/src/messages'

import type { QualityBand } from '../types/executive-summary'

const { bands } = message.publicationsAnalytics

/**
 * Band names happen to be camelCase on the wire already, so this map exists for
 * symmetry with the other wire-to-message lookups rather than to fix a spelling.
 */
export const BAND_LABEL_IDS: Record<QualityBand, string> = {
    q10Percent: bands.q10Percent,
    q10To25: bands.q10To25,
    q1Unsplit: bands.q1Unsplit,
    q2: bands.q2,
    q3: bands.q3,
    q4: bands.q4,
    proceedings: bands.proceedings,
    bookChapters: bands.bookChapters,
    other: bands.other,
    unranked: bands.unranked,
    unknown: bands.unknown,
}
