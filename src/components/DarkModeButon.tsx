import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

const DarkModeButton = () => {
  const [dm, setDm] = useState(false)

  useEffect(() => {
    if (localStorage && localStorage.theme) {
      if (localStorage.theme === 'dark') {
        setDm(true)
        document.documentElement.classList.add('dark')
      }
    }
  }, [])

  useEffect(() => {
    const htmlElement = document.documentElement
    if (dm) {
      htmlElement.classList.add('dark')
    } else {
      htmlElement.classList.remove('dark')
    }
    localStorage.theme = dm ? 'dark' : 'light'
  }, [dm])

  const toggleTheme = () => {
    setDm(!dm)
  }

  return (
    <button
      type="button"
      className={`rounded-full bg-gray-400 p-1 text-${dm ? 'gray-900' : 'white'} shadow-sm hover:text-${
        dm ? 'white' : 'gray-900'
      } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
      onClick={toggleTheme}
    >
      {dm ? <SunIcon className="h-5 w-5" aria-hidden="true" /> : <MoonIcon className="h-5 w-5" aria-hidden="true" />}
    </button>
  )
}

export default DarkModeButton
