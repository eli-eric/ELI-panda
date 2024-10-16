import { useRouter } from 'next/router'
import React from 'react'

import { SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useOrders } from '../hooks/useOrders'
import { OrderFilterButton } from './filters/OrderFilterButton.cont'

export const HeaderButtons = () => {
  const { mutate } = useOrders()
  const router = useRouter()
  const handleRefresh = () => {
    mutate()
  }
  const handleAdd = () => {
    router.push(PATH.ORDER)
  }

  return (
    <SearchBarButtonsComponent
      handleAdd={handleAdd}
      handleRefresh={handleRefresh}
      editRole={ROLE.ORDERS_EDIT}
    >
      <OrderFilterButton />
    </SearchBarButtonsComponent>
  )
}
