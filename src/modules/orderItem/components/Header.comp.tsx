import { useRouter } from 'next/router'

import { Button } from '@/components/Buttons'

const HeaderComponent = () => {
  const router = useRouter()
  return (
    <div id="search-bar" className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b">
      <div className="flex flex-1 justify-between px-4">
        <div className="flex items-center mr-2">
          <Button className="mr-1">Cancel</Button>
          <Button primary>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default HeaderComponent
