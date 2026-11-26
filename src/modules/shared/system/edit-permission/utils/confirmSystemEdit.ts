import type { QueryClient } from '@tanstack/react-query'
import type { IntlShape } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { confirmWithWarningModal } from '@/store/useWarningModalStore'

import type { SystemResponsible } from '../hooks/useSystemCanEdit'
import { ensureSystemCanEdit } from '../hooks/useSystemCanEdit'
import { formatResponsibleName } from '../hooks/useSystemEditPermission'
import { useSystemEditConfirmationStore } from '../store/useSystemEditConfirmationStore'

type FormatMessage = IntlShape['formatMessage']

const formatResponsibles = (responsibles: SystemResponsible[]) =>
    responsibles.map(formatResponsibleName).filter(Boolean).join(', ')

/** Sentence explaining that the user is about to act outside their responsibility. */
export const buildOutsideResponsibilityNote = (
    responsibles: SystemResponsible[],
    fm: FormatMessage,
): string => {
    const names = formatResponsibles(responsibles)
    return names
        ? fm({ id: message.systemPermission.outsideNote }, { names })
        : fm({ id: message.systemPermission.outsideNoteNoResponsibles })
}

/**
 * Returns the outside-responsibility note when the user is not responsible for the
 * system and has not confirmed it yet this session; null otherwise. For flows that
 * already show their own confirm (delete) and append the note to it.
 */
export const getOutsideResponsibilityNote = async (
    queryClient: QueryClient,
    uid: string,
    fm: FormatMessage,
): Promise<string | null> => {
    if (useSystemEditConfirmationStore.getState().isConfirmed(uid)) return null
    try {
        const { result, responsibles } = await ensureSystemCanEdit(queryClient, uid)
        return result ? null : buildOutsideResponsibilityNote(responsibles, fm)
    } catch {
        // Unverifiable responsibility never blocks: the API allows the write and
        // records the real responsibility itself.
        return null
    }
}

export const markSystemEditConfirmed = (uid: string) =>
    useSystemEditConfirmationStore.getState().confirm(uid)

/**
 * Soft lock for per-system responsibility. Editing is never blocked; a user who is
 * not responsible for the system is asked once per system per session to confirm.
 * Resolves true to proceed, false when the user declined.
 */
export const confirmSystemEdit = async (
    queryClient: QueryClient,
    uid: string,
    fm: FormatMessage,
): Promise<boolean> => {
    const note = await getOutsideResponsibilityNote(queryClient, uid, fm)
    if (!note) return true

    const confirmed = await confirmWithWarningModal(
        `${note} ${fm({ id: message.systemPermission.confirmQuestion })}`,
    )
    if (confirmed) markSystemEditConfirmed(uid)
    return confirmed
}

/** Rejection used when the user declined the soft-lock confirmation. */
export class SystemEditCancelledError extends Error {
    constructor() {
        super('System edit cancelled by user')
        this.name = 'SystemEditCancelledError'
    }
}

export const isSystemEditCancelled = (error: unknown): error is SystemEditCancelledError =>
    error instanceof SystemEditCancelledError
