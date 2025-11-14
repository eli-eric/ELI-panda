import type { DialogSize } from '@/components/ui/dialog'
import { useDynamicModalStore } from '@/store/useDynamicModalStore'

// Utility functions for opening modals with specific sizes
export const openModal = (
  component: React.ComponentType<any>,
  props: Record<string, any> = {},
  options: {
    size?: DialogSize
    title?: string
    description?: string
    id?: string
  } = {}
) => {
  if (typeof window === 'undefined') return // Prevent SSR execution

  const { openModal } = useDynamicModalStore.getState()
  const { size = 'l', title, description, id } = options

  const modalId = openModal('dialog', {
    id: id || 'modal-helper-dialog',
    component,
    props: {
      ...props,
      title,
      description,
      size
    },
    onClose: undefined
  })

  return modalId
}

// Convenience functions for different sizes
export const openSmallModal = (
  component: React.ComponentType<any>,
  props: Record<string, any> = {},
  options: Omit<Parameters<typeof openModal>[2], 'size'> = {}
) => openModal(component, props, { ...options, size: 'm' })

export const openLargeModal = (
  component: React.ComponentType<any>,
  props: Record<string, any> = {},
  options: Omit<Parameters<typeof openModal>[2], 'size'> = {}
) => openModal(component, props, { ...options, size: 'l' })

export const openExtraLargeModal = (
  component: React.ComponentType<any>,
  props: Record<string, any> = {},
  options: Omit<Parameters<typeof openModal>[2], 'size'> = {}
) => openModal(component, props, { ...options, size: 'xl' })
