import { type FC } from 'react'
import { useForm } from 'react-hook-form'

import CheckBox from '@/components/form/CheckBox'
import { Form } from '@/components/form/Form'
import Card from '@/components/layout/Card'
import type { GetRolesQuery } from '@/types/gql/graphql'
import type { CodebookType } from '@/types/responses/codebook'

type Props = {
  addRole: (role: CodebookType) => void
  removeRole: (uid: string) => void
  assignedRoles?: GetRolesQuery['roles']
  roles: GetRolesQuery['roles']
}

export const UserRoles: FC<Props> = ({
  addRole,
  removeRole,
  assignedRoles,
  roles
}) => {
  const formMethods = useForm<{
    [key: string]: boolean
  }>({
    defaultValues:
      assignedRoles &&
      assignedRoles?.reduce((acc, { code }) => {
        acc[code] = true
        return acc
      }, {})
  })

  return (
    <Form {...{ formMethods }}>
      <Card>
        <div className="pb-2 font-bold dark:text-gray-200">Roles</div>
        <ul className="" role="list">
          {roles?.map(role => (
            <li key={role.uid} className="py-1">
              <CheckBox
                key={role.uid}
                name={role.code}
                label={role.name}
                onChange={e => {
                  e.target.checked ? addRole(role) : removeRole(role.uid)
                }}
                rounded="rounded-md"
              />
            </li>
          ))}
        </ul>
      </Card>
    </Form>
  )
}
