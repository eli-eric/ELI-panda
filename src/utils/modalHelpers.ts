import type { DialogSize } from '@/components/ui/dialog'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

// Utility functions for opening modals with specific sizes
export const openModal = (
  component: React.ComponentType<any>,
  props: Record<string, any> = {},
  options: {
    size?: DialogSize
    title?: string
    description?: string
    slot?: 'dialog1' | 'dialog2'
  } = {}
) => {
  if (typeof window === 'undefined') return // Prevent SSR execution
  
  const { openModal } = useModalGlobalStore.getState()
  const { size = 'l', title, description, slot = 'dialog1' } = options

  openModal(slot, {
    component,
    props: {
      ...props,
      title,
      description,
      size
    },
    onClose: undefined
  })
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
