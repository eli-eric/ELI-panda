import { ChevronRight, Copy, Loader2 } from 'lucide-react'
import type { FC } from 'react'
import { useState } from 'react'
import { useIntl } from 'react-intl'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckboxWithLabel } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import { message } from '@/i18n/src/messages'

import { useSystemCopy } from '../../hooks/mutations/useSystemCopy'
import { useSystemDetail } from '../../hooks/queries/useSystemDetail'

interface CopySystemDialogProps {
    sourceSystemUid: string
    destinationSystemUid: string
    onClose?: () => void
}

interface SystemInfoProps {
    label: string
    system: ReturnType<typeof useSystemDetail>['system']
    isLoading: boolean
}

const SystemInfo: FC<SystemInfoProps> = ({ label, system, isLoading }) => {
    if (isLoading) {
        return (
            <div className="space-y-1">
                <span className="text-sm font-medium text-muted-foreground">{label}</span>
                <div className="flex items-center gap-2">
                    <Loader2 className="size-4 animate-spin" />
                    <span className="text-sm text-muted-foreground">Loading...</span>
                </div>
            </div>
        )
    }

    if (!system) return null

    return (
        <div className="space-y-1">
            <span className="text-sm font-medium text-muted-foreground">{label}</span>
            <div className="space-y-1">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{system.name}</span>
                    {system.systemLevel && (
                        <Badge variant="outline" className="text-xs">
                            {system.systemLevel}
                        </Badge>
                    )}
                </div>
                {system.parentPath && system.parentPath.length > 0 && (
                    <div className="flex items-center gap-1 flex-wrap text-xs text-muted-foreground">
                        {system.parentPath.map((item, index) => (
                            <span key={item.uid} className="flex items-center gap-1">
                                {index > 0 && <ChevronRight className="size-3" />}
                                {item.name}
                            </span>
                        ))}
                        <ChevronRight className="size-3" />
                        <span className="font-medium text-foreground">{system.name}</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export const CopySystemDialog: FC<CopySystemDialogProps> = ({
    sourceSystemUid,
    destinationSystemUid,
    onClose,
}) => {
    const { formatMessage: fm } = useIntl()
    const [copyOnlyChildren, setCopyOnlyChildren] = useState(true)
    const [copyRecursive, setCopyRecursive] = useState(true)

    const { system: sourceSystem, isLoading: sourceLoading } = useSystemDetail(sourceSystemUid)
    const { system: destSystem, isLoading: destLoading } = useSystemDetail(destinationSystemUid)

    const { mutateAsync, isPending } = useSystemCopy()

    const handleSubmit = async () => {
        try {
            await mutateAsync({
                sourceSystemUid,
                destinationSystemUid,
                copyOnlySourceSystemChildren: copyOnlyChildren,
                copyRecursive,
            })
            onClose?.()
        } catch {
            // error toast handled by mutation onError
        }
    }

    return (
        <div className="space-y-4" data-testid="copy-system-dialog">
            <SystemInfo
                label={fm({ id: message.systemHierarchy.copy.source })}
                system={sourceSystem}
                isLoading={sourceLoading}
            />

            <Separator />

            <SystemInfo
                label={fm({ id: message.systemHierarchy.copy.destination })}
                system={destSystem}
                isLoading={destLoading}
            />

            <Separator />

            <div className="space-y-3">
                <CheckboxWithLabel
                    id="copy-only-children"
                    label={fm({ id: message.systemHierarchy.copy.copyOnlyChildren })}
                    checked={copyOnlyChildren}
                    onChange={setCopyOnlyChildren}
                />
                <CheckboxWithLabel
                    id="copy-recursive"
                    label={fm({ id: message.systemHierarchy.copy.copyRecursive })}
                    checked={copyRecursive}
                    onChange={setCopyRecursive}
                />
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={onClose} disabled={isPending}>
                    {fm({ id: message.systemHierarchy.copy.cancel })}
                </Button>
                <Button onClick={handleSubmit} disabled={isPending}>
                    {isPending ? (
                        <Loader2 className="size-4 animate-spin mr-2" />
                    ) : (
                        <Copy className="size-4 mr-2" />
                    )}
                    {fm({ id: message.systemHierarchy.copy.submit })}
                </Button>
            </div>
        </div>
    )
}
