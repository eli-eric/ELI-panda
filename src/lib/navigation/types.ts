import type { LucideIcon } from 'lucide-react'

import type { ROLE } from '@/types/constants/roles'

export interface NavigationItem {
  title: string
  url: string
  role: ROLE
  icon?: LucideIcon
  items?: NavigationSubItem[]
}

export interface NavigationSubItem {
  title: string
  url: string
  role: ROLE
}
