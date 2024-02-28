import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

import { useDarkModeStore } from '@/store/useDarkModeStore'
import { classNames } from '@/utils'

const DarkModeButton = ({ className }: { className?: string }) => {
  const { isDark, toggleDarkMode } = useDarkModeStore()

  const [clientSide, setClientSide] = useState(false)

  useEffect(() => {
    // This will be executed only on the client side
    setClientSide(true)
  }, [])

  // Display nothing or a loader until useEffect runs
  if (!clientSide) return null

  return (
    <button
      type="button"
      className={classNames(
        'rounded-full p-1 shadow-sm',
        isDark ? 'text-gray-900 hover:text-white bg-gray-400' : 'text-white hover:text-gray-900 bg-gray-400',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        className
      )}
      onClick={toggleDarkMode}
    >
      {isDark ? (
        <SunIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}

export default DarkModeButton
