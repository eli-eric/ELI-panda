import type { FC } from 'react'
import { useMemo } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { useCategoryGroupMutations } from '../../hooks/mutations/useCategoryGroupMutations'
import type { CategoryProperty } from '../../hooks/mutations/useCategoryPropertyMutations'
import type { CatalogueCategoryPropertyGroup } from '../../types'
import { AddGroupRow } from './groups/AddGroupRow.comp'
import { GroupCard, type GroupCardData } from './groups/GroupCard.comp'

interface Props {
    categoryUid: string
    groups: CatalogueCategoryPropertyGroup[]
    canEdit: boolean
}

const toGroupCardData = (g: CatalogueCategoryPropertyGroup): GroupCardData => ({
    uid: g.uid ?? '',
    name: g.name,
    order: g.order ?? undefined,
    properties: (g.properties ?? []).map(p => ({
        uid: p.uid ?? '',
        name: p.name,
        type: p.type ? { uid: p.type.uid, name: p.type.name } : null,
        unit: p.unit ? { uid: p.unit.uid, name: p.unit.name } : null,
        defaultValue: p.defaultValue ?? null,
        listOfValues: p.listOfValues ?? null,
        order: p.order ?? undefined,
    })) as CategoryProperty[],
})

export const CategoryPropertyGroupsTab: FC<Props> = ({ categoryUid, groups, canEdit }) => {
    const { formatMessage: fm } = useIntl()
    const {
        createGroup,
        updateGroup,
        deleteGroup,
        isPending,
    } = useCategoryGroupMutations(categoryUid)

    const sortedGroups = useMemo(() => {
        return [...groups]
            .map(toGroupCardData)
            .sort((a, b) => {
                const oa = a.order ?? 0
                const ob = b.order ?? 0
                if (oa !== ob) return oa - ob
                return a.name.localeCompare(b.name)
            })
    }, [groups])

    const handleGroupMove = (index: number, direction: -1 | 1) => {
        const target = sortedGroups[index + direction]
        const current = sortedGroups[index]
        if (!target || !current) return
        // Push current past target in `direction`: newOrder = target.order ± 1
        const newOrder = (target.order ?? (index + 1 + direction) * 10) + direction
        void updateGroup(current.uid, { order: newOrder })
    }

    return (
        <div className="p-4 space-y-3 text-sm">
            {sortedGroups.length === 0 && (
                <div className="text-muted-foreground text-xs">
                    {fm({ id: message.catalogue.category.propertyGroups })}
                </div>
            )}
            {sortedGroups.map((g, i) => {
                const otherGroups = sortedGroups
                    .filter(other => other.uid !== g.uid)
                    .map(other => ({ uid: other.uid, name: other.name }))
                return (
                    <GroupCard
                        key={g.uid || `grp-${i}`}
                        categoryUid={categoryUid}
                        group={g}
                        canEdit={canEdit}
                        isGroupPending={isPending}
                        onRename={name => updateGroup(g.uid, { name })}
                        onDelete={() => deleteGroup(g.uid)}
                        onMoveUp={() => handleGroupMove(i, -1)}
                        onMoveDown={() => handleGroupMove(i, 1)}
                        canMoveUp={i > 0}
                        canMoveDown={i < sortedGroups.length - 1}
                        otherGroups={otherGroups}
                    />
                )
            })}
            {canEdit && (
                <AddGroupRow onAdd={name => createGroup({ name })} isPending={isPending} />
            )}
        </div>
    )
}
