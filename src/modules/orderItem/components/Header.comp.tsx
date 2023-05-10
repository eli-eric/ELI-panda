import { useRouter } from 'next/router'

import { BackButton, Button } from '@/components/Buttons'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'

interface Props {
  loading?: boolean
  disabledEdit?: boolean
}
const messages = message.common.buttons

const HeaderComponent = ({ loading, disabledEdit }: Props) => {
  const router = useRouter()
  return (
    <div className="sticky  top-0 z-30 flex h-16 flex-shrink-0 bg-white border-b">
      <div className="flex mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex-1 justify-between">
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
      </div>
    </div>
  )
}

export default HeaderComponent
