import { useSession } from 'next-auth/react'

import { useGraphQL } from '@/hooks/fetch/useGraphQL'
import { gql } from '@/types/gql'

import { useRoomCardContactsHall } from './useRoomCardContacts'

const currentUserQuery = gql(`
  query CurrentUserQuery($where: UserWhere) {
    users(where: $where) {
      uid
      employee {
        uid
      }
    }
  }
`)

/**
 * Checks if the current user can edit the operational state field.
 * Only users whose Employee is linked to the RoomCard as an "Area Manager"
 * or "Area Manager - Deputy" contact person can edit this field.
 */
export const useCanEditOperationalState = (roomCardUid?: string): boolean => {
  const session = useSession()
  const userUid = session.data?.user?.uid

  const { contactPersonsHall } = useRoomCardContactsHall(roomCardUid)

  const { data } = useGraphQL(currentUserQuery, {
    variables: {
      where: { uid: userUid }
    },
    enabled: !!userUid
  })

  const userEmployeeUid = data?.users[0]?.employee?.uid

  if (!userEmployeeUid) return false

  return (
    contactPersonsHall?.some(
      contact =>
        contact.employee.uid === userEmployeeUid &&
        (contact.role?.name === 'Area Manager' ||
          contact.role?.name === 'Area Manager - Deputy')
    ) ?? false
  )
}
