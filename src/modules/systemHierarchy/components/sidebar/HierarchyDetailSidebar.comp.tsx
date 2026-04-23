import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Separator } from '@/components/ui/separator'
import { useIsLargeScreen } from '@/hooks/use-large-screen'
import { message } from '@/i18n/src/messages'

import type { SystemLeaf } from '../../types'
import { RelationshipsTabContainer } from '../tabs/RelationshipsTab.cont'
import { QuickInfoSidebar } from './QuickInfoSidebar.comp'

interface HierarchyDetailSidebarProps {
    system: SystemLeaf | null
}

export const HierarchyDetailSidebar: FC<HierarchyDetailSidebarProps> = ({ system }) => {
    const { formatMessage: fm } = useIntl()
    const isLargeScreen = useIsLargeScreen()

    return (
        <div className="flex flex-col h-full overflow-y-auto scrollbar-style">
            <QuickInfoSidebar system={system} />
            {system && isLargeScreen && (
                <>
                    <Separator />
                    <section className="px-2 py-2">
                        <h2 className="text-sm font-semibold mb-2 px-1">
                            {fm({ id: message.systemHierarchy.tabs.relationships })}
                        </h2>
                        <RelationshipsTabContainer system={system} compact />
                    </section>
                </>
            )}
        </div>
    )
}
