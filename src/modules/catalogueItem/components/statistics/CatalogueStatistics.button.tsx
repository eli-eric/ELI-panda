import { BarChart3 } from 'lucide-react'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { CatalogueStatisticsContainer } from './CatalogueStatistics.cont'

export const ModalStatisticsButtonLarge = () => {
  const openModal = useModalGlobalStore(state => state.openModal)

  return (
    <Tooltip content="View Statistics">
      <Button
        variant="outline"
        size="sm"
        onClick={() =>
          openModal('dialog1', {
            component: CatalogueStatisticsContainer,
            props: {
              variant: 'modal',
              size: 'xl',
              title: 'Physical Items Statistics',
              catalogueItemUid: undefined // For global statistics
            }
          })
        }
      >
        <BarChart3 className="h-4 w-4" />
      </Button>
    </Tooltip>
  )
}
