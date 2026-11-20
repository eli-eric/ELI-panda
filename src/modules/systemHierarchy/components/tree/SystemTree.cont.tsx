import { FoldVertical, Search } from 'lucide-react'
import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { message } from '@/i18n/src/messages'

import { useSystemHierarchy } from '../../hooks/queries/useSystemHierarchy'
import { useCreateSubsystemAction } from '../../hooks/useCreateSubsystemAction'
import { useDeleteSystemAction } from '../../hooks/useDeleteSystemAction'
import { useHierarchyNavigation } from '../../hooks/useHierarchyNavigation'
import { useSystemCopyPaste } from '../../hooks/useSystemCopyPaste'
import { useHierarchyStore } from '../../store/useHierarchyStore'
import { findHierarchyPath } from '../../utils/treePath'
import { collectAllNodeUids, filterTree } from '../../utils/treeSearch'
import { SystemTreeComponent } from './SystemTree.comp'
import { TreeNodeSkeleton } from './TreeNodeSkeleton.comp'

export const SystemTreeContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { nodes, isLoading } = useSystemHierarchy()
    const { selectedParentUid, selectParent } = useHierarchyNavigation()
    const { expandedNodes, toggleNode, collapseAll, expandNodes, setExpandedNodes } =
        useHierarchyStore()
    const { copiedSystemUid, canEdit, handleCopySystem, handlePasteSystem } = useSystemCopyPaste()
    const { handleCreateSubsystem } = useCreateSubsystemAction()
    const { handleDeleteSystem } = useDeleteSystemAction()

    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const expandedBeforeSearch = useRef<string[] | null>(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(searchInput)
        }, 300)
        return () => clearTimeout(timer)
    }, [searchInput])

    const filteredNodes = useMemo(() => filterTree(nodes, search), [nodes, search])

    const handleSelect = useCallback(
        (uid: string) => {
            const path = findHierarchyPath(nodes, uid)
            if (path.length === 0) {
                selectParent(uid)
                return
            }
            const target = path[path.length - 1]
            selectParent(uid, {
                name: target.name,
                systemCode: target.systemCode,
                parentPath: path.slice(0, -1).map(n => ({ uid: n.uid, name: n.name })),
            })
        },
        [nodes, selectParent],
    )

    useEffect(() => {
        if (search && filteredNodes.length > 0) {
            if (expandedBeforeSearch.current === null) {
                expandedBeforeSearch.current = [...expandedNodes]
            }
            const allFilteredUids = collectAllNodeUids(filteredNodes)
            expandNodes(allFilteredUids)
        } else if (!search && expandedBeforeSearch.current !== null) {
            setExpandedNodes(expandedBeforeSearch.current)
            expandedBeforeSearch.current = null
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps -- preserve pre-search expansion snapshot during search session
    }, [search, filteredNodes, expandNodes, setExpandedNodes])

    return (
        <div className="flex flex-col h-full" data-testid="system-hierarchy-tree-panel">
            <div className="flex flex-col gap-2 border-b border-border px-3 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="hidden md:flex" />
                        <h2 className="text-sm font-semibold">
                            {fm({ id: message.systemHierarchy.tree.title })}
                        </h2>
                    </div>
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
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder={fm({ id: message.systemHierarchy.tree.searchPlaceholder })}
                        className="h-8 pl-8 text-sm"
                        type="search"
                        data-testid="system-hierarchy-tree-search"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-style">
                {isLoading ? (
                    <TreeNodeSkeleton />
                ) : nodes.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">
                        {fm({ id: message.systemHierarchy.tree.noSystems })}
                    </div>
                ) : filteredNodes.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">
                        {fm({ id: message.systemHierarchy.tree.noResults })}
                    </div>
                ) : (
                    <SystemTreeComponent
                        nodes={filteredNodes}
                        expandedNodes={expandedNodes}
                        selectedParentUid={selectedParentUid}
                        onToggle={toggleNode}
                        onSelect={handleSelect}
                        search={search}
                        copiedSystemUid={copiedSystemUid}
                        canEdit={canEdit}
                        onCopySystem={handleCopySystem}
                        onPasteSystem={handlePasteSystem}
                        onCreateSubsystem={handleCreateSubsystem}
                        onDeleteSystem={handleDeleteSystem}
                    />
                )}
            </div>
        </div>
    )
}
