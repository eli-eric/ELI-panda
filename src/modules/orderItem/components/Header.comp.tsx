import { useRouter } from 'next/router'
import { useId } from 'react'

import { Button } from '@/components/Buttons'
import { PATH } from '@/types/constants/paths'

interface Props {
  loading?: boolean
}

const HeaderComponent = ({ loading }: Props) => {
  const router = useRouter()
  useId()
  return (
    <div className="sticky  top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b">
      <div className="flex mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex-1 justify-between">
        <div className="flex items-center mr-2">
          <Button
            className="mr-1"
            type="button"
            onClick={() => {
              router.push(PATH.ORDERS)
            }}
          >
            Cancel
          </Button>
          <Button primary loading={loading}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent
