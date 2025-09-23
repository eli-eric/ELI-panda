import { PlusButton } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import type { ROLE } from '@/types/constants/roles'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'

import { EmployeeAddModal } from './EmployeeAddModal'

type Props = {
  setEmployee: (employee: any) => void
  name: string
  editPersmissionRole: ROLE
}

export const HeaderAddButton = ({
  setEmployee,
  name,
  editPersmissionRole
}: Props) => {
  const editPersmission = usePermission([editPersmissionRole])
  const { openModal } = useModalGlobalStore()

  const handleOpenModal = () => {
    openModal('dialog1', {
      component: EmployeeAddModal,
      props: {
        title: 'Add Employee',
        size: 'm',
        fieldArrayName: name,
        setEmployee
      }
    })
  }

  if (!editPersmission) return null

  return <PlusButton type="button" onClick={handleOpenModal} />
}
