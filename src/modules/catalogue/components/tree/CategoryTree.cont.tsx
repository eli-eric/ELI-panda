import { FoldVertical, Search } from 'lucide-react'
import type { FC } from 'react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { message } from '@/i18n/src/messages'

import { useCatalogueCategoryTree } from '../../hooks/queries/useCatalogueCategoryTree'
import { useCatalogueNavigation } from '../../hooks/useCatalogueNavigation'
import { useCategoryContextActions } from '../../hooks/useCategoryContextActions'
import { useCatalogueTreeStore } from '../../store/useCatalogueTreeStore'
import type { CatalogueCategoryTreeNode } from '../../types'
import { collectAllNodeUids, filterTree } from '../../utils/treeSearch'
import { CategoryTreeComponent } from './CategoryTree.comp'
import { CategoryTreeNodeSkeleton } from './CategoryTreeNodeSkeleton.comp'

export const CategoryTreeContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const { tree: nodes, isLoading } = useCatalogueCategoryTree()
    const { selectedCategoryUid, selectCategory } = useCatalogueNavigation()
    const { expandedNodes, toggleNode, collapseAll, expandNodes, setExpandedNodes } =
        useCatalogueTreeStore()
    const {
        canEditCategory,
        canEditItem,
        copiedCategoryUid,
        handleCreateSubCategory,
        handleCreateItem,
        handleEditCategory,
        handleCopyCategory,
        handlePasteCategory,
        handleDeleteCategory,
    } = useCategoryContextActions()

    const [searchInput, setSearchInput] = useState('')
    const [search, setSearch] = useState('')
    const expandedBeforeSearch = useRef<string[] | null>(null)

    useEffect(() => {
        const t = setTimeout(() => setSearch(searchInput), 300)
        return () => clearTimeout(t)
    }, [searchInput])

    const filteredNodes = useMemo(() => filterTree(nodes, search), [nodes, search])

    const nodesByUid = useMemo(() => {
        const map = new Map<string, CatalogueCategoryTreeNode>()
        const traverse = (list: CatalogueCategoryTreeNode[]) => {
            for (const n of list) {
                map.set(n.uid, n)
                if (n.children.length > 0) traverse(n.children)
            }
        }
        traverse(nodes)
        return map
    }, [nodes])

    const handleSelectCategory = useCallback(
        (uid: string) => {
            const node = nodesByUid.get(uid)
            if (node) {
                selectCategory({ uid: node.uid, name: node.name, code: node.code })
            } else {
                selectCategory(uid)
            }
        },
        [nodesByUid, selectCategory],
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search, filteredNodes, expandNodes, setExpandedNodes])

    return (
        <div className="flex flex-col h-full" data-testid="catalogue-tree-panel">
            <div className="flex flex-col gap-2 border-b border-border px-3 py-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="hidden md:flex" />
                        <h2 className="text-sm font-semibold">
                            {fm({ id: message.catalogue.tree.title })}
                        </h2>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={collapseAll}
                        className="h-7 px-2 text-xs"
                        title={fm({ id: message.catalogue.tree.collapseAll })}
                    >
                        <FoldVertical className="size-3.5" />
                    </Button>
                </div>
                <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        value={searchInput}
                        onChange={e => setSearchInput(e.target.value)}
                        placeholder={fm({ id: message.catalogue.tree.searchPlaceholder })}
                        className="h-8 pl-8 text-sm"
                        type="search"
                        data-testid="catalogue-tree-search"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto scrollbar-style">
                {isLoading ? (
                    <CategoryTreeNodeSkeleton />
                ) : nodes.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">
                        {fm({ id: message.catalogue.tree.noCategories })}
                    </div>
                ) : filteredNodes.length === 0 ? (
                    <div className="p-4 text-sm text-muted-foreground text-center">
                        {fm({ id: message.catalogue.tree.noResults })}
                    </div>
                ) : (
                    <CategoryTreeComponent
                        nodes={filteredNodes}
                        expandedNodes={expandedNodes}
                        selectedCategoryUid={selectedCategoryUid}
                        onToggle={toggleNode}
                        onSelect={handleSelectCategory}
                        search={search}
                        canEditCategory={canEditCategory}
                        canEditItem={canEditItem}
                        copiedCategoryUid={copiedCategoryUid}
                        onCreateSubCategory={canEditCategory ? handleCreateSubCategory : undefined}
                        onCreateItem={
                            canEditItem ? (uid: string) => handleCreateItem(uid) : undefined
                        }
                        onEditCategory={canEditCategory ? handleEditCategory : undefined}
                        onCopyCategory={canEditCategory ? handleCopyCategory : undefined}
                        onPasteCategory={canEditCategory ? handlePasteCategory : undefined}
                        onDeleteCategory={canEditCategory ? handleDeleteCategory : undefined}
                    />
                )}
            </div>
        </div>
    )
}
