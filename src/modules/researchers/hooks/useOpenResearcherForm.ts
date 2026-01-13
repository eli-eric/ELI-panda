import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ResearcherFormContainer } from '../form/researcher-form.cont'

interface UseOpenResearcherFormOptions {
  onSuccess?: () => void
}

/**
 * Hook to open the researcher creation sheet.
 *
 * @example
 * ```tsx
 * const { openResearcherForm } = useOpenResearcherForm({ onSuccess: refetch })
 *
 * <Button onClick={openResearcherForm}>Create Researcher</Button>
 * ```
 */
export const useOpenResearcherForm = (
  options?: UseOpenResearcherFormOptions
) => {
  const { openModal } = useDynamicModalStore()

  const openResearcherForm = () => {
    openModal('sheet', {
      id: 'researcher-create',
      component: ResearcherFormContainer,
      props: {
        title: 'Create Researcher',
        onSuccess: options?.onSuccess
      }
    })
  }

  return { openResearcherForm }
}
