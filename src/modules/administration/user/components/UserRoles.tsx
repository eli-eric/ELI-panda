import { type FC } from 'react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
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
  return (
    <Card>
      <div className="pb-2 font-bold dark:text-gray-200">Roles</div>
      <ul className="" role="list">
        {roles?.map(role => {
          const isAssigned = assignedRoles?.some(assignedRole => assignedRole.uid === role.uid)
          return (
            <li key={role.uid} className="py-1">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`role-${role.uid}`}
                  checked={isAssigned}
                  onCheckedChange={(checked) => {
                    checked ? addRole(role) : removeRole(role.uid)
                  }}
                />
                <Label 
                  htmlFor={`role-${role.uid}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {role.name}
                </Label>
              </div>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}
