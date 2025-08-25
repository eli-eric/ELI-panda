import { Form } from '@/components/form/Form'
import { HeaderWithButtons } from '@/components/header/HeaderWithButtons'
import Card from '@/components/layout/Card'
import { ROLE } from '@/types/constants/roles'
import type { GetRolesQuery } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

import { UserForm } from './form/User.form'
import { UserRoles } from './UserRoles'

interface Props {
  formMethods: any
  onSubmit: (data: any, selectedRoles?: GetRolesQuery['roles']) => void
  addRole: (role: CodebookType) => void
  removeRole: (uid: string) => void
  assignedRoles?: GetRolesQuery['roles']
  title: string
  roles: GetRolesQuery['roles']
  loading?: boolean
  selectedRoles?: GetRolesQuery['roles']
}

export const UserComponent = ({
  formMethods,
  onSubmit,
  addRole,
  removeRole,
  assignedRoles,
  title,
  roles,
  loading = false,
  selectedRoles
}: Props) => (
  <div>
    <Form
      {...{
        formMethods,
        enableLeaveWarning: true
      }}
    >
      <HeaderWithButtons
        title={title}
        loading={loading}
        onSubmit={() => {
          formMethods.handleSubmit((data: any) => onSubmit(data, selectedRoles))()
        }}
        editRole={ROLE.ADMIN}
        isFormInvalid={!formMethods.formState.isValid}
      />
      <div className="p-4">
        <Card>
          <UserForm />
        </Card>
      </div>
    </Form>
    <div className="p-4">
      <UserRoles
        key={`roles-${assignedRoles?.map(r => r.uid).join('-')}`}
        addRole={addRole}
        removeRole={removeRole}
        assignedRoles={assignedRoles}
        roles={roles}
      />
    </div>
  </div>
)
