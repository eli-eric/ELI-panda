import { PlusButton } from '@/components/Buttons'
import usePermission from '@/hooks/usePermission'
import { ROLE } from '@/types/constants/roles'

import { useContactHallModal } from './hooks/useContactHallModal'

export const ContactHallButton = () => {
  const canEdit = usePermission([ROLE.ROOM_CARD_EDIT])
  const openContactHallModal = useContactHallModal()

  if (!canEdit) return null

<<<<<<< HEAD
  return <PlusButton type="button" onClick={openContactHallModal} />
=======
  return (
    <HeaderButtonModalComponent
      formMethods={formMethods}
      onSubmit={onSubmit}
      disableSubmit={!(employee && employeeUid)}
    >
      <Combobox {...fields.role} codebookResponse={data?.contactPersonRoles} />
      <Combobox
        {...fields.employee}
        onSelect={v => setEmployeeUid(v ? v.uid : null)}
      />
    </HeaderButtonModalComponent>
  )
>>>>>>> 6a94fc68 (feat: refactor form modal components; migrate to new FormModal structure and remove legacy useFormModal hook)
}
