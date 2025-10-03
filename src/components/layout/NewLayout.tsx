'use client'

import { useSession } from 'next-auth/react'
import { type FC, type PropsWithChildren } from 'react'

import { AppSidebar } from '@/components/navigation/app-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'

export const NewLayout: FC<PropsWithChildren> = ({ children }) => {
  const { data: session, status } = useSession()

  // If user is not authenticated, render without sidebar with full height and flex
  if (status === 'loading') {
    return <div className="min-h-screen flex flex-col">{children}</div>
  }

  if (!session) {
    return <div className="min-h-screen flex flex-col">{children}</div>
  }

  // Authenticated user - render with sidebar
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">{children}</SidebarInset>
    </SidebarProvider>
  )
}
