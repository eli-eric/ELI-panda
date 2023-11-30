import { type FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'

import CheckBox from '@/components/form/CheckBox'
import { Form } from '@/components/form/Form'
import Card from '@/components/layout/Card'
import type { CodebookType } from '@/hooks/fetch/useCodebook'
import type { Role } from '@/types/gql/graphql'

import { useRoles } from '../hooks/useRoles'

type Props = {
  addRole: (role: CodebookType) => void
  removeRole: (uid: string) => void
  assignedRoles?: Role[]
}

export const UserRoles: FC<Props> = ({ addRole, removeRole, assignedRoles }) => {
  const roles = useRoles()
  const formMethods = useForm<{
    [key: string]: boolean
  }>()

  useEffect(() => {
    if (assignedRoles) {
      assignedRoles.forEach(({ code }) => {
        formMethods.setValue(code, true)
      })
    }
  }, [assignedRoles, formMethods])

  return (
    <Form {...{ formMethods }}>
      <Card>
        <div className="pb-2 font-bold">Roles</div>
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
