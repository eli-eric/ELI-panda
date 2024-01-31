import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

import { useDarkModeStore } from '@/store/useDarkModeStore'

const DarkModeButton = () => {
  const dms = useDarkModeStore()
  dms.setStoredTheme()

  return (
    <button
      type="button"
      className={`rounded-full bg-gray-400 p-1 text-${dms.isDark ? 'gray-900' : 'white'} shadow-sm hover:text-${
        dms.isDark ? 'white' : 'gray-900'
      } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      onClick={dms.toggleDarkMode}
    >
      {dms.isDark ? (
        <SunIcon className="h-5 w-5" aria-hidden="true" />
      ) : (
        <MoonIcon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  )
}

export default DarkModeButton
