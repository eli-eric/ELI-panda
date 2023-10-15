import { gql, useMutation } from '@apollo/client'

import type { RoomCard } from '@/types/gql/graphql'

const CREATE_ROOM_CARD = gql`
  mutation CreateRoomCards($input: [RoomCardCreateInput!]!) {
    createRoomCards(input: $input) {
      roomCards {
        uid
      }
    }
  }
`

export const formatRoomCardData = (formData?: RoomCard) => ({
  input: [
    {
      ...formData,
      location: {
        connect: {
          where: {
            node: {
              uid: formData?.location.uid
            }
          }
        }
      },
      contactPersonsHall: {
        create: formData?.contactPersonsHall.map(contactPerson => ({
          node: {
            employee: {
              connect: {
                overwrite: true,
                where: {
                  node: {
                    uid: contactPerson.employee.uid
                  }
                }
              }
            },
            role: {
              connect: {
                where: { node: { uid: contactPerson.role?.uid } }
              }
            }
          }
        }))
      },
      contactPersonsDept: {
        connect: formData?.contactPersonsDept.map(contactPerson => ({
          where: {
            node: {
              uid: contactPerson.uid
            }
          }
        }))
      },
      teams: {
        connect: formData?.teams.map(team => ({
          where: {
            node: {
              uid: team.uid
            }
          }
        }))
      }
    }
  ]
})

export const useRoomCardCreate = (formData?: RoomCard) => {
  const [createRoomCard, { data }] = useMutation(CREATE_ROOM_CARD, {
    variables: formatRoomCardData(formData)
  })

  return { createRoomCard }
}
