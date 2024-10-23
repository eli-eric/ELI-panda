import type { FC } from 'react'

import ModalComponent from '@/components/overlays/modal/modal.comp'

import { ItemMoveForm } from './item-move.form'

type Props = {
  show: boolean
  setShow: (show: boolean) => void
}

export const ItemMoveModal: FC<Props> = ({ show, setShow }) => {
  return (
    <ModalComponent open={show} setOpen={setShow}>
      <ItemMoveForm />
    </ModalComponent>
  )
}
