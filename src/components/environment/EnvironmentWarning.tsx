'use client'

import { AlertTriangle } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { message } from '@/i18n/src/messages'
import {
    getEnvironmentColor,
    getEnvironmentDisplayName,
    shouldShowEnvironmentWarning,
} from '@/lib/environment/utils'
import { useEnvironmentWarningStore } from '@/store/useEnvironmentWarningStore'

export const EnvironmentWarning = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)
    const { hasConfirmedEnvironment, confirmEnvironment } = useEnvironmentWarningStore()
    const { formatMessage: fm } = useIntl()

    const envColor = getEnvironmentColor()
    const envName = getEnvironmentDisplayName()

    // Ensure component is mounted on client side
    useEffect(() => {
        setIsMounted(true)
    }, [])

    useEffect(() => {
        const shouldShow = shouldShowEnvironmentWarning()

        // Only show on client side, not in production/localhost, and if not confirmed
        if (isMounted && shouldShow && !hasConfirmedEnvironment) {
            // Small delay to ensure proper rendering
            const timer = setTimeout(() => {
                setIsOpen(true)
            }, 100)

            return () => clearTimeout(timer)
        }
    }, [hasConfirmedEnvironment, isMounted])

    const handleConfirm = () => {
        confirmEnvironment()
        setIsOpen(false)
    }

    if (!isMounted || !shouldShowEnvironmentWarning()) {
        return null
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent
                size="m"
                className="gap-0 p-0 border-0"
                onInteractOutside={e => e.preventDefault()}
                onEscapeKeyDown={e => e.preventDefault()}
                showCloseButton={false}
            >
                <DialogHeader className="sr-only">
                    <DialogTitle>{fm({ id: message.common.environmentWarning.title })}</DialogTitle>
                    <DialogDescription>
                        {fm(
                            { id: message.common.environmentWarning.subtitle },
                            { environment: envName },
                        )}
                    </DialogDescription>
                </DialogHeader>

                <Card className="border-0 shadow-none">
                    <CardHeader className="text-center pb-4">
                        <div className="flex items-center justify-center mb-4">
                            <div
                                className={`p-4 rounded-full ${envColor.bg} ${envColor.border} border-2`}
                            >
                                <AlertTriangle
                                    className={`h-12 w-12 ${envColor.text}`}
                                    strokeWidth={2.5}
                                />
                            </div>
                        </div>
                        <CardTitle className="text-2xl">
                            <span className={envColor.text}>
                                {fm({ id: message.common.environmentWarning.title })}
                            </span>
                        </CardTitle>
                        <CardDescription className="text-base mt-2">
                            {fm(
                                { id: message.common.environmentWarning.subtitle },
                                { environment: envName },
                            )}
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <div className={`rounded-lg p-4 ${envColor.modalBg} space-y-3`}>
                            <p className="text-sm font-medium">
                                {fm({ id: message.common.environmentWarning.disclaimerTitle })}
                            </p>
                            <ul className="text-sm space-y-2 list-disc list-inside">
                                <li>
                                    {fm({
                                        id: message.common.environmentWarning.disclaimerPoints
                                            .dataNotPersistent,
                                    })}
                                </li>
                                <li>
                                    {fm({
                                        id: message.common.environmentWarning.disclaimerPoints
                                            .noProductionImpact,
                                    })}
                                </li>
                                <li>
                                    {fm({
                                        id: message.common.environmentWarning.disclaimerPoints
                                            .canBeReset,
                                    })}
                                </li>
                                <li>
                                    {fm({
                                        id: message.common.environmentWarning.disclaimerPoints
                                            .limitedPerformance,
                                    })}
                                </li>
                            </ul>
                        </div>
                    </CardContent>

                    <CardFooter>
                        <Button onClick={handleConfirm} className="w-full" size="lg">
                            {fm({ id: message.common.environmentWarning.confirmButton })}
                        </Button>
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    )
}
