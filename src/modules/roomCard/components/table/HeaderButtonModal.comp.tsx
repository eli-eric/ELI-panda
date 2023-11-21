import type { FC, PropsWithChildren } from 'react'
import { Fragment } from 'react'
import type { UseFormReturn } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'
import { FormModal } from '@/hooks/form/useFormModal'

interface Props {
  formMethods: UseFormReturn<any, any>
  onSubmit: (data: any) => void
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  isModalOpen: boolean
}

export const HeaderButtonModalComponent: FC<PropsWithChildren<Props>> = ({
  children,
  formMethods,
  onSubmit,
  isModalOpen,
  setIsModalOpen
}) => (
  <Fragment>
    <PlusButton
      primary
      onClick={() => {
        setIsModalOpen(true)
      }}
    />
    <FormModal formMethods={formMethods} open={isModalOpen} setOpen={setIsModalOpen} onSubmit={onSubmit}>
      <div className="flex space-x-3">{children}</div>
    </FormModal>
  </Fragment>
)
