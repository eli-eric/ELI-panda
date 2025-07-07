/**
 * Shared utility functions for system create/update hooks
 * These helpers reduce code duplication and improve maintainability
 */

import { toast } from 'react-hot-toast'
import type { IntlShape } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { createMessageValues } from '@/utils/formatters'

// Helper function to get unique items by uid - used in both hooks
export const getUniqueByUid = <T extends { uid: string }>(items: T[]): T[] => {
  return [...new Map(items.map(item => [item.uid, item])).values()]
}

// Helper function to create connection objects for GraphQL - used in both hooks
export const createConnections = <T extends { uid: string }>(items: T[]) => {
  return items.length > 0
    ? {
        connect: items.map(item => ({
          where: { node: { uid: item.uid } }
        }))
      }
    : undefined
}

// Common success toast helper
export const showSuccessToast = (
  intl: IntlShape,
  messageId: string,
  values?: Record<string, any>
) => {
  toast.success(
    intl.formatMessage(
      { id: messageId },
      values ? createMessageValues(values) : undefined
    )
  )
}

// Common error toast helper
export const showErrorToast = (
  intl: IntlShape,
  messageId: string,
  values?: Record<string, any>
) => {
  toast.error(
    intl.formatMessage(
      { id: messageId },
      values ? createMessageValues(values) : undefined
    )
  )
}

// Validation helper for system forms
export const validateSystemForm = (
  systemForm: { name?: string | null },
  intl: IntlShape
): boolean => {
  if (!systemForm.name) {
    showErrorToast(
      intl,
      message.systemsPage.systemDetail.createModal.onValidationError
    )
    return false
  }
  return true
}

// Common data combination logic for operators/maintainedBy
export const combineAndDeduplicateUsers = <T extends { uid: string }>(
  formUsers: T[] | null | undefined = [],
  newUsers: T[] = []
): T[] => {
  const safeFormUsers = formUsers || []
  const allUsers = [...safeFormUsers, ...newUsers]
  return getUniqueByUid(allUsers)
}
