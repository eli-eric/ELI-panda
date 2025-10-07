import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { PATH } from '@/types/constants/paths'

import { useRoomCards } from '../roomCards/hooks/useRoomCards'
import {
  makeRoomCardsCreateData,
  useRoomCardCreate
} from './hooks/useRoomCardCreate'
import { RoomCardComponent } from './RoomCard.comp'
import { roomCardSchema } from './schemas/roomCard.schema'
import { useRoomCardStore } from './store/useRoomCardStore'
import type { RoomCardFormType } from './types/form'

export const RoomCardNewContainer = () => {
  const formMethods = useForm<RoomCardFormType>({
    resolver: zodResolver(roomCardSchema)
  })
  const { refetch } = useRoomCards()

  const router = useRouter()
  const { watch, handleSubmit } = formMethods
  const { createRoomCard } = useRoomCardCreate()
  const contactPersonsHall = watch('contactPersonsHall')
  const status = watch('status')
  const teams = watch('teams')
  const contactPersonsDept = watch('contactPersonsDept')
  const locations = watch('locations')

  const { clear } = useRoomCardStore()
  useEffect(() => () => clear(), [clear])

  const onSubmit = handleSubmit(data => {
    toast.promise(
      createRoomCard(makeRoomCardsCreateData(data), {
        onSuccess: data => {
          refetch()
          router.push(
            PATH.ROOM_CARD + '/' + data?.createRoomCards?.roomCards[0].uid
          )
        }
        // TODO
        //refetchQueries: ['RoomCards', 'RoomCard']
      }),
      {
        loading: 'Saving room card...',
        success: 'Room card was successfully updated',
        error: 'Error while saving room card'
      }
    )
  })

  const onSubmitAndExit = handleSubmit(data => {
    toast.promise(
      createRoomCard(makeRoomCardsCreateData(data), {
        onSuccess: () => {
          refetch()
          router.push(PATH.ROOM_CARDS)
        }
      }),
      {
        loading: 'Saving room card...',
        success: 'Room card was successfully updated',
        error: 'Error while saving room card'
      }
    )
  })

  return (
    <div className="relative h-screen overflow-auto">
      <RoomCardComponent
        {...{
          formMethods,
          status,
          onSubmitAndExit,
          onSubmit,
          contactPersonsHall,
          contactPersonsDept,
          teams,
          locations
        }}
      />
    </div>
  )
}
