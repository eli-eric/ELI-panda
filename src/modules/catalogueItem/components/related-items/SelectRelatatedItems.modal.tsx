import type { FC } from 'react'

import ModalComponent from '@/components/overlays/modal/modal.comp'
import CatalogueTableSelect from '@/modules/shared/catalogue/table/CatalogueTableSelect'
import { usePandaTable } from '@/modules/shared/table/pandaTable/hooks/usePandaTable'
import type { ModalButtons } from '@/types/form'

interface Props {
  open: boolean
  setOpen: (open: boolean) => void
}

export const SelectRelatatedItemsModal: FC<Props> = ({ open, setOpen }) => {
  const buttons: ModalButtons = {
    goBack: {
      text: 'Cancel',
      onClick: () => setOpen(false)
    },
    goNext: {
      text: 'Save',
      onClick: () => {}
    }
  }

  const table = usePandaTable({
    columns: [],
    tableId: 'relatedItems'
  })

  return (
    <ModalComponent {...{ open, setOpen, buttons }}>
      <CatalogueTableSelect setItem={() => {}} />
    </ModalComponent>
  )
}
