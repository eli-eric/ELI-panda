import { useQuery } from '@tanstack/react-query'
import { type FC, useState } from 'react'
import { useIntl } from 'react-intl'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'
import { message } from '@/i18n/src/messages'
import type { CodebookType } from '@/types/responses/codebook'
import { queryFetcher } from '@/utils/fetcher'

import { AddGroupButton } from './components/AddGroupButton'
import { AddSystemTypeButton } from './components/AddSystemTypeButton'
import { SystemTypeGroup } from './components/SystemTypeGroup'
import { SystemTypeItem } from './components/SystemTypeItem'
import type { SystemTypesResponse } from './types'

export const SystemTypeEditContainer: FC = () => {
    const { formatMessage: fm } = useIntl()
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null)

    const {
        data: systemTypeGroups,
        refetch: refetchGroups,
        isLoading: isLoadingGroups,
    } = useQuery({
        queryKey: ['system-type-groups'],
        queryFn: queryFetcher<CodebookType[]>(`systemTypeGroups`),
    })
    const {
        data: systemTypes = [],
        refetch: refetchSystemTypes,
        isLoading: isLoadingTypes,
    } = useQuery({
        queryKey: ['system-types', { uid: selectedGroup }],
        queryFn: queryFetcher<SystemTypesResponse[]>(`systemTypeGroupTypes`),
        enabled: !!selectedGroup,
    })

    return (
        <div className="container mx-auto max-w-7xl w-full px-4 py-4 sm:px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Groups Section */}
                <Card className="overflow-hidden w-full md:w-[560px] min-w-[340px] max-w-[640px] flex flex-col max-h-[calc(100vh-8rem)]">
                    <CardHeader className="flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <CardTitle className="text-lg font-semibold">
                                    {fm({ id: message.common.systemTypeEdit.systemTypeGroups })}
                                </CardTitle>
                                <CardDescription>
                                    {fm({ id: message.common.systemTypeEdit.manageGroups })}
                                </CardDescription>
                            </div>
                            <AddGroupButton refetch={refetchGroups} />
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 min-h-0">
                        <ScrollArea className="h-full">
                            {isLoadingGroups ? (
                                <div className="space-y-1 w-full">
                                    {Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="p-3">
                                            <Skeleton className="h-5 w-full" />
                                        </div>
                                    ))}
                                </div>
                            ) : !systemTypeGroups?.length ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    {fm({ id: message.common.systemTypeEdit.noGroupsFound })}
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {systemTypeGroups.map(item => (
                                        <SystemTypeGroup
                                            key={item.uid}
                                            systemTypeGroup={item}
                                            selectedGroup={selectedGroup}
                                            setSelectedGroup={setSelectedGroup}
                                            refetch={refetchGroups}
                                        />
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* System Types Section */}
                <Card className="overflow-hidden w-full md:w-[560px] min-w-[340px] max-w-[640px] flex flex-col max-h-[calc(100vh-8rem)]">
                    <CardHeader className="flex-shrink-0">
                        <div className="flex items-center justify-between">
                            <div className="min-w-0 flex-1">
                                <CardTitle className="text-lg font-semibold">
                                    {fm({ id: message.common.systemTypeEdit.systemTypes })}
                                </CardTitle>
                                <CardDescription>
                                    {selectedGroup
                                        ? 'Manage system types in the selected group'
                                        : 'Select a group to view and manage system types'}
                                </CardDescription>
                            </div>
                            <AddSystemTypeButton
                                selectedGroup={selectedGroup}
                                refetch={refetchSystemTypes}
                            />
                        </div>
                    </CardHeader>
                    <CardContent className="pt-0 flex-1 min-h-0">
                        <ScrollArea className="h-full">
                            {!selectedGroup ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    {fm({ id: message.common.systemTypeEdit.selectGroup })}
                                </div>
                            ) : isLoadingTypes ? (
                                <div className="space-y-1">
                                    {Array.from({ length: 3 }).map((_, i) => (
                                        <div key={i} className="p-3 w-full">
                                            <Skeleton className="h-5 w-3/4 mb-2" />
                                            <Skeleton className="h-4 w-1/2" />
                                        </div>
                                    ))}
                                </div>
                            ) : !systemTypes?.length ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    {fm({ id: message.common.systemTypeEdit.noSystemTypes })}
                                </div>
                            ) : (
                                <div className="space-y-1">
                                    {systemTypes.map(item => (
                                        <SystemTypeItem
                                            groupUid={selectedGroup!}
                                            key={item.uid}
                                            systemType={item}
                                            refetch={refetchSystemTypes}
                                        />
                                    ))}
                                </div>
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default SystemTypeEditContainer
