import { XMarkIcon } from '@heroicons/react/24/outline'
import type { FC } from 'react'
import { useForm } from 'react-hook-form'

import { PlusButton } from '@/components/Buttons'
import { Form } from '@/components/form/Form'
import Listbox from '@/components/form/Listbox'
import { Col, Grid } from '@/components/grid/Grid'
import Card from '@/components/layout/Card'
import { Badge } from '@/components/visuals/Badge'
import type { CodebookType } from '@/hooks/fetch/useCodebook'

import { useRoles } from '../hooks/useRoles'

type Props = {
  addRole: (role: CodebookType) => void
  removeRole: (roleIndex: number, uid: string) => void
  selectedRoles?: CodebookType[]
}

export const UserRoles: FC<Props> = ({ addRole, removeRole, selectedRoles }) => {
  const roles = useRoles()
  const formMethods = useForm()
  const role = formMethods.watch('role')
  const disctinctRoles = roles.filter(role => !selectedRoles?.find(selectedRole => selectedRole.uid === role.uid))

  return (
    <Form {...{ formMethods }}>
      <Card>
        <Grid>
          <Col md={6}>
            <Listbox
              name="role"
              customLabel="Role"
              codebookResponse={disctinctRoles.map(role => ({ uid: role.uid, name: role.name }))}
              disabled={disctinctRoles.length === 0}
            >
              <PlusButton
                primary
                buttonSize="large"
                className="ml-1 px-[10px] py-[10px] self-baseline mt-5"
                type="button"
                disabled={!role || disctinctRoles.length === 0}
                onClick={() => {
                  addRole(role)
                }}
              />
            </Listbox>
          </Col>
          <Col md={6}>
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-900">{'Assigned Roles:'}</label>
              <div className="flex-grow">
                {selectedRoles?.map((role, i) => (
                  <Badge key={role.uid}>
                    <div className="flex flex-row">
                      {role.name}
                      <XMarkIcon
                        className="ml-2 h-4 w-4 cursor-pointer hover:text-red-500"
                        onClick={() => {
                          removeRole(i, role.uid)
                        }}
                      />
                    </div>
                  </Badge>
                ))}
              </div>
            </div>
          </Col>
        </Grid>
      </Card>
    </Form>
  )
}
