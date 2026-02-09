import { FoldVertical } from 'lucide-react'
import type { FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'

import { useSystemHierarchy } from '../../hooks/queries/useSystemHierarchy'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { useHierarchyStore } from '../../store/useHierarchyStore'
import { SystemTreeComponent } from './SystemTree.comp'
import { TreeNodeSkeleton } from './TreeNodeSkeleton.comp'

export const SystemTreeContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { nodes, isLoading } = useSystemHierarchy()
    const { selectedParentUid, selectParent } = useHierarchyNavigation()
    const { expandedNodes, toggleNode, collapseAll } = useHierarchyStore()

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between border-b border-border px-3 py-2">
                <h2 className="text-sm font-semibold">
                    {fm({ id: message.systemHierarchy.tree.title })}
                </h2>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={collapseAll}
                    className="h-7 px-2 text-xs"
                    title={fm({ id: message.systemHierarchy.tree.collapseAll })}
                >
                    <FoldVertical className="size-3.5" />
                </Button>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-style">
                {isLoading ? (
                    <TreeNodeSkeleton />
                ) : nodes.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">
                        {fm({ id: message.systemHierarchy.tree.noSystems })}
                    </div>
                ) : (
                    <SystemTreeComponent
                        nodes={nodes}
                        expandedNodes={expandedNodes}
                        selectedParentUid={selectedParentUid}
                        onToggle={toggleNode}
                        onSelect={selectParent}
                    />
                )}
            </div>
        </div>
    )
}
