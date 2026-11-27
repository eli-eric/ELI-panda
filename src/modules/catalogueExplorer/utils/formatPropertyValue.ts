import type { CatalogueItemDetail } from '@/modules/catalogueItem/types/responses'
import { PROPERTY_TYPE } from '@/types/catalogue/constants'

export interface FormatPropertyLabels {
    yes: string
    no: string
    emDash: string
}

export const parseRange = (raw: unknown): { from: string; to: string } => {
    if (typeof raw !== 'string' || raw === '') return { from: '', to: '' }
    try {
        const parsed = JSON.parse(raw) as { from?: string; to?: string }
        return { from: parsed.from ?? '', to: parsed.to ?? '' }
    } catch {
        return { from: '', to: '' }
    }
}

const isEmpty = (v: unknown): boolean => v === null || v === undefined || v === ''

export const formatPropertyValue = (
    detail: CatalogueItemDetail,
    labels: FormatPropertyLabels,
): string => {
    const { yes, no, emDash } = labels
    const typeUid = detail.property.type?.uid
    const value = detail.value

    if (typeUid === PROPERTY_TYPE.RANGE) {
        const { from, to } = parseRange(value)
        if (!from && !to) return emDash
        return `${from || emDash} – ${to || emDash}`
    }

    if (isEmpty(value)) return emDash

    if (typeUid === PROPERTY_TYPE.BOOLEAN) {
        return value === 'true' || value === true ? yes : no
    }

    return String(value)
}
