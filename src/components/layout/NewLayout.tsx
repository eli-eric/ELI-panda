'use client'

import { type FC, type PropsWithChildren } from 'react'

import { AppSidebar } from '@/components/navigation/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export const NewLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="flex flex-col overflow-x-hidden overflow-y-auto">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
