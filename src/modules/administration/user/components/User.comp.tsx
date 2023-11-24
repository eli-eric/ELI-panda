import { Form } from '@/components/form/Form'
import Card from '@/components/layout/Card'
import { PageHead } from '@/components/layout/PageHead'
import { PageHeaderButtons } from '@/components/layout/PageHead.buttons'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { UserForm } from './form/User.form'
import { UserRoles } from './UserRoles'

interface Props {
  formMethods: any
  onSubmit: (data: any) => void
  addRole: (role: CodebookType) => void
  removeRole: (roleIndex: number, uid: string) => void
  selectedRoles?: CodebookType[]
  title: string
}

export const UserComponent = ({ formMethods, onSubmit, addRole, removeRole, selectedRoles, title }: Props) => (
  <div>
    <Form
      {...{
        formMethods,
        enableLeaveWarning: true
      }}
    >
      <PageHead>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <PageHeaderButtons
          {...{
            onSubmit: () => {
              formMethods.handleSubmit(onSubmit)()
            },
            role: ROLE.ADMIN,
            exitTo: PATH.ADMIN_USERS
          }}
        />
      </PageHead>
      <Card>
        <UserForm />
      </Card>
    </Form>
    <UserRoles addRole={addRole} removeRole={removeRole} selectedRoles={selectedRoles} />
  </div>
)
