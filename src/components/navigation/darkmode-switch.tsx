'use client'

import { Moon, Sun } from 'lucide-react'
import { startTransition, useEffect, useState } from 'react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { useDarkModeStore } from '@/store/useDarkModeStore'

export function DarkModeSwitch() {
  const { isDark, toggleDarkMode } = useDarkModeStore()
  const [clientSide, setClientSide] = useState(false)

  useEffect(() => {
    // This will be executed only on the client side
    startTransition(() => setClientSide(true))
  }, [])

  // Display nothing until useEffect runs
  if (!clientSide) return null

  return (
    <DropdownMenuItem onClick={toggleDarkMode}>
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {isDark ? 'Light Mode' : 'Dark Mode'}
    </DropdownMenuItem>
  )
}
