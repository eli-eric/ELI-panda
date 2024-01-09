import { useRouter } from 'next/router'

import { QRReaderButton } from '@/components/Buttons'
import { useModal } from '@/hooks/useModal'
import { QrReaderContainer } from '@/modules/shared/qrReader/qr-reader.cont'
import { SearchBarButtonsComponent } from '@/modules/shared/table/SearchBar'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

import { useSystems } from '../hooks/useSystems'
import { systemsRefresh } from '../utils'

export const SearchBarButtons = () => {
  const { mutate: systemsMutate } = useSystems('systems')
  const setOpenReader = useModal(<QrReaderContainer />)
  const router = useRouter()

  const handleRefresh = () => {
    systemsMutate(systemsRefresh, { revalidate: false })
  }
  const handleAdd = () => {
    router.push(PATH.SYSTEM)
  }

  return (
    <SearchBarButtonsComponent handleAdd={handleAdd} handleRefresh={handleRefresh} editRole={ROLE.SYSTEM_EDIT}>
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
