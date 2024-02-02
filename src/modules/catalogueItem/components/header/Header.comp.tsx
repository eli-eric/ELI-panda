import { useRouter } from 'next/router'

import { BackButton, Button } from '@/components/Buttons'
import Card from '@/components/layout/Card'
import { message } from '@/i18n/src/messages'
const messages = message.common.buttons

const ItemHeader = ({ disabledEdit, loading }: { disabledEdit: boolean; loading: boolean }) => {
  const router = useRouter()

  const goBackHandler = () => {
    router.back()
  }

  return (
    <div className="sticky  top-0 z-20 flex h-16 flex-shrink-0 bg-white dark:bg-gray-800 border-b">
      <Card className="flex flex-1 justify-between">
        <div className="flex items-center mr-2">
          <BackButton className="mr-1" type="button" buttonSize="large" onClick={goBackHandler} />
          {!disabledEdit && <Button primary buttonSize="large" loading={loading} type="submit" text={messages.save} />}
        </div>
      </Card>
    </div>
  )
}

export default ItemHeader
