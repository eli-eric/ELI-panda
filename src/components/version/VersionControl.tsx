import { Calendar, Code, Settings, Wrench } from 'lucide-react'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { versionsData } from '@/config/versions'
import { message } from '@/i18n/src/messages'

const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
        case 'ui components':
        case 'user experience':
            return <Code className="h-4 w-4" />
        case 'features':
            return <Settings className="h-4 w-4" />
        case 'bug fixes':
            return <Wrench className="h-4 w-4" />
        case 'architecture':
            return <Settings className="h-4 w-4" />
        default:
            return <Code className="h-4 w-4" />
    }
}

const getVersionBadgeVariant = (type: string) => {
    switch (type) {
        case 'major':
            return 'destructive'
        case 'minor':
            return 'default'
        case 'patch':
            return 'secondary'
        default:
            return 'outline'
    }
}

export const VersionControl = () => {
    const { formatMessage: fm } = useIntl()
    const [expandedVersions, setExpandedVersions] = useState<string[]>([
        versionsData.releases[0]?.version,
    ])

    const toggleVersion = (version: string) => {
        setExpandedVersions(prev =>
            prev.includes(version) ? prev.filter(v => v !== version) : [...prev, version],
        )
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                            <Calendar className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                            <span className="truncate">
                                {fm({ id: message.common.ui.versionHistory })}
                            </span>
                        </CardTitle>
                        <CardDescription className="text-xs sm:text-sm mt-1">
                            {fm({ id: message.common.ui.versionHistoryDescription })}
                        </CardDescription>
                    </div>
                    <Badge
                        variant="outline"
                        className="text-xs sm:text-sm font-mono self-start sm:self-center flex-shrink-0"
                    >
                        {fm({ id: message.common.ui.versionPrefix })}
                        {versionsData.currentVersion}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {versionsData.releases.map(release => (
                    <Collapsible
                        key={release.version}
                        open={expandedVersions.includes(release.version)}
                        onOpenChange={() => toggleVersion(release.version)}
                    >
                        <CollapsibleTrigger asChild>
                            <div className="w-full">
                                <Card className="w-full cursor-pointer hover:bg-accent/5 transition-colors">
                                    <CardHeader className="pb-3 px-3 sm:px-6">
                                        <div className="flex flex-col gap-2 sm:gap-3">
                                            <div className="flex items-start gap-2 sm:gap-3 min-w-0">
                                                <Badge
                                                    variant={getVersionBadgeVariant(release.type)}
                                                    className="font-mono text-xs flex-shrink-0 mt-0.5"
                                                >
                                                    {fm({ id: message.common.ui.versionPrefix })}
                                                    {release.version}
                                                </Badge>
                                                <div className="text-left min-w-0 flex-1">
                                                    <div className="font-semibold text-sm sm:text-base break-words">
                                                        {release.title}
                                                    </div>
                                                    <div className="text-xs sm:text-sm text-muted-foreground mt-1 break-words">
                                                        {release.description}
                                                    </div>
                                                </div>
                                                <div className="text-xs sm:text-sm text-muted-foreground flex-shrink-0">
                                                    {release.date}
                                                </div>
                                            </div>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-2">
                            <div className="pl-2 sm:pl-4 pr-2 space-y-3">
                                {release.changes.map((change, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center gap-2 font-medium text-xs sm:text-sm">
                                            <span className="flex-shrink-0">
                                                {getCategoryIcon(change.category)}
                                            </span>
                                            <span className="truncate">{change.category}</span>
                                        </div>
                                        <ul className="space-y-1 pl-4 sm:pl-6">
                                            {change.items.map((item, itemIndex) => (
                                                <li
                                                    key={itemIndex}
                                                    className="text-xs sm:text-sm text-muted-foreground flex items-start gap-2"
                                                >
                                                    <span className="w-1 h-1 bg-muted-foreground rounded-full mt-1.5 sm:mt-2 flex-shrink-0" />
                                                    <span className="break-words">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                ))}
            </CardContent>
        </Card>
    )
}
