import { Switch } from '@headlessui/react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline'
import type { FC } from 'react'
import { startTransition, useEffect, useState } from 'react'

import { cn } from '@/lib/utils'
import { useDarkModeStore } from '@/store/useDarkModeStore'

interface Props {
  className?: string
}
export const DarkModeSwitch: FC<Props> = ({ className }) => {
  const { isDark, toggleDarkMode } = useDarkModeStore()

  const [clientSide, setClientSide] = useState(false)

  useEffect(() => {
    // This will be executed only on the client side
    startTransition(() => setClientSide(true))
  }, [])

  // Display nothing or a loader until useEffect runs
  if (!clientSide) return null
  return (
    <Switch
      checked={isDark}
      onChange={() => toggleDarkMode()}
      className={cn(
        isDark ? 'bg-gray-500' : 'bg-gray-200',
        'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
        className
      )}
    >
      <span
        className={cn(
          isDark ? 'translate-x-5 bg-gray-700' : 'translate-x-0 bg-white',
          'pointer-events-none relative inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out'
        )}
      >
        <span
          className={cn(
            isDark
              ? 'opacity-0 duration-100 ease-out'
              : 'opacity-100 duration-200 ease-in',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <SunIcon className="h-3 w-3 text-gray-600" aria-hidden="true" />
        </span>
        <span
          className={cn(
            isDark
              ? 'opacity-100 duration-200 ease-in'
              : 'opacity-0 duration-100 ease-out',
            'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
          )}
          aria-hidden="true"
        >
          <MoonIcon className="h-3 w-3 text-gray-200" aria-hidden="true" />
        </span>
      </span>
      <span
        className={cn(
          isDark
            ? 'opacity-0 duration-100 ease-out'
            : 'opacity-100 duration-200 ease-in',
          'absolute right-0 pr-1 inset-y-0 flex items-center justify-center transition-opacity'
        )}
        aria-hidden="true"
      >
        <MoonIcon className="h-3 w-3 text-gray-600" aria-hidden="true" />
      </span>
      <span
        className={cn(
          isDark
            ? 'opacity-100 duration-200 ease-in'
            : 'opacity-0 duration-100 ease-out',
          'absolute left-0 pl-1 inset-y-0 flex items-center justify-center transition-opacity'
        )}
        aria-hidden="true"
      >
        <SunIcon className="h-3 w-3 text-gray-200" aria-hidden="true" />
      </span>
    </Switch>
  )
}
