import { useRouter } from 'next/router'
import { useId } from 'react'

import { Button } from '@/components/Buttons'

const HeaderComponent = () => {
  const router = useRouter()
  useId()
  return (
    <div className="sticky  top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b">
      <div className="flex mx-auto max-w-7xl px-4 sm:px-6 md:px-8 flex-1 justify-between px-4">
        <div className="flex items-center mr-2">
          <Button className="mr-1" type="submit">
            Cancel
          </Button>
          <Button primary>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent
