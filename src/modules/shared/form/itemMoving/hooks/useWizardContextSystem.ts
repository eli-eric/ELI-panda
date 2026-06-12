import { useRouter } from 'next/router'

import { useSystemDetail } from '@/modules/systemHierarchy/hooks/queries/useSystemDetail'

import { useModalWizardStore } from '../store/useModalWizardStore'

/**
 * Resolves the system the wizard was opened from (move source / assign destination).
 *
 * Primary source is the snapshot passed to openItemMoveModal/openItemAssignModal —
 * synchronously available, no fetch, no race with submit. Only the legacy
 * /system/[uid] view (which passes nothing) falls back to fetching by route uid.
 */
export const useWizardContextSystem = () => {
    const { contextSystem } = useModalWizardStore()
    const router = useRouter()

    const routeUid = Array.isArray(router.query.uid) ? router.query.uid[0] : router.query.uid
    const fallbackUid = contextSystem ? null : routeUid || null
    const fetched = useSystemDetail(fallbackUid)

    if (contextSystem) {
        const physicalItem = contextSystem.physicalItem ?? null
        return {
            systemDetail: contextSystem,
            physicalItem,
            // Catalogue info lives flat on physicalItem (detail panel shape) or
            // nested under catalogueItem (leaves list shape) — normalize both.
            // The physical item name doubles as the catalogue name in the detail
            // panel shape: it is mapped from the same PhysicalItemFragment the
            // wizard's step-3 heading ("Item: <name>") rendered before this change.
            catalogueItem: physicalItem
                ? {
                      name: physicalItem.catalogueItem?.name ?? physicalItem.name ?? null,
                      catalogueNumber:
                          physicalItem.catalogueNumber ??
                          physicalItem.catalogueItem?.catalogueNumber ??
                          null,
                  }
                : null,
            isLoading: false,
        }
    }

    return {
        systemDetail: fetched.system,
        physicalItem: fetched.physicalItem,
        catalogueItem: fetched.catalogueItem,
        isLoading: fetched.isLoading,
    }
}
