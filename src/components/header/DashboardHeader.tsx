import { GlobalSearchTrigger } from '@/components/search/GlobalSearchTrigger'
import { SidebarTrigger } from '@/components/ui/sidebar'

interface Props {
    title?: string
    showSearch?: boolean
}

export const DashboardHeader = ({ title, showSearch = false }: Props) => {
    return (
        <div className="border-b bg-background sticky top-0 z-10">
            <div className="w-full px-4 py-2">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    {showSearch && (
                        <div className="max-w-md flex-1">
                            <GlobalSearchTrigger />
                        </div>
                    )}
                    {title && (
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                            <h1 className="text-lg sm:text-xl font-semibold truncate">{title}</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
