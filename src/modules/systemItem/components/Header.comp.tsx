import { useRouter } from 'next/router'

import { BackButton, Button } from '@/components/Buttons'
import Card from '@/components/layout/Card'
import usePermission from '@/hooks/usePermission'
import { message } from '@/i18n/src/messages'
import { PATH } from '@/types/constants/paths'
import { ROLE } from '@/types/constants/roles'

interface Props {
  loading?: boolean
  onSubmit?: () => void
}

const messages = message.common.buttons

const HeaderComponent = ({ loading, onSubmit }: Props) => {
  const router = useRouter()
  const hasEditRole = usePermission([ROLE.SYSTEM_EDIT])

  return (
    <div className="sticky  top-0 z-20 flex h-16 flex-shrink-0 bg-white dark:bg-gray-900 border-b">
      <Card className="flex flex-1 justify-between">
        <div className="flex items-center mr-2">
          <BackButton
            className="mr-1"
            type="button"
            buttonSize="large"
            onClick={() => {
              router.push(PATH.SYSTEMS)
            }}
          />
          {hasEditRole && (
            <Button
              primary
              buttonSize="large"
              onClick={onSubmit}
              loading={loading}
              type="button"
              text={messages.save}
            />
          )}
        </div>
      </Card>
    </div>
  )
}

export default HeaderComponent
