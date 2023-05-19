import { useRouter } from 'next/router'

import { BackButton, Button } from '@/components/Buttons'
import Card from '@/components/layout/Card'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'

import useOrderDetail from '../hooks/useOrderDetail'

interface Props {
  loading?: boolean
}
const messages = message.common.buttons

const HeaderComponent = ({ loading }: Props) => {
  const router = useRouter()
  const { disabledEdit } = useOrderDetail()

  return (
    <div className="sticky  top-0 z-20 flex h-16 flex-shrink-0 bg-white border-b">
      <Card className="flex flex-1 justify-between">
        <div className="flex items-center mr-2">
          <BackButton
            className="mr-1"
            type="button"
            buttonSize="large"
            onClick={() => {
              router.push(PATH.ORDERS)
            }}
          />
          {!disabledEdit && <Button primary buttonSize="large" loading={loading} type="submit" text={messages.save} />}
        </div>
      </Card>
    </div>
  )
}

export default HeaderComponent
