import { useRouter } from 'next/router'

import { QRReaderButton } from '@/components/Buttons'
import { useModal } from '@/hooks/useModal'
import { QrReaderContainer } from '@/modules/shared/qrReader/qr-reader.cont'
import { SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useOrders } from '../hooks/useOrders'

export const HeaderButtons = () => {
  const { mutate } = useOrders()
  const router = useRouter()
  const handleRefresh = () => {
    mutate()
  }
  const handleAdd = () => {
    router.push(PATH.ORDER)
  }
  const setOpenReader = useModal(<QrReaderContainer />)

  return (
    <SearchBarButtonsComponent handleAdd={handleAdd} handleRefresh={handleRefresh} editRole={ROLE.ORDERS_EDIT}>
      <QRReaderButton
        className="mr-1"
        buttonSize="large"
        onClick={() => {
          setOpenReader()()
        }}
      />
    </SearchBarButtonsComponent>
  )
}
