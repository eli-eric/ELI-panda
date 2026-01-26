import { SidebarTrigger } from '@/components/ui/sidebar'

interface Props {
  children?: React.ReactNode
}

export const HeaderWrapper = ({ children }: Props) => (
  <div className="border-b bg-background sticky top-0 z-10">
    <div className="w-full px-4 py-2">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        {children}
      </div>
    </div>
  </div>
)
