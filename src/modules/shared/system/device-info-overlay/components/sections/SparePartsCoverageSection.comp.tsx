import { ExternalLink } from 'lucide-react'
import { type FC } from 'react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { Disclosure } from '@/components/ui'
import { Badge } from '@/components/ui/badge'
import { isFeatureEnabled } from '@/config/featureFlags'
import { message } from '@/i18n/src/messages'
import { formatCoverage, isUnderCovered } from '@/modules/shared/system/coverage'
import { useSystemStore } from '@/modules/shared/system/device-info-overlay/store/useShowDeviceStore'
import { IconCell } from '@/modules/systems/components/table/cells/IconCell'
import type { ITEM_USAGE } from '@/modules/systems/types/constants'

import { useSpareDialog } from '../../../use-spare/useSpareDialog'
import { SystemDetailParameter } from '../system-detail-parameter.comp'

interface SparePartsCoverageSectionProps {
    systemDetail: any
    withDirtyProtection?: <T extends any[]>(callback: (...args: T) => void) => (...args: T) => void
    onSpareAssigned?: () => void
}

export const SparePartsCoverageSection: FC<SparePartsCoverageSectionProps> = ({
    systemDetail,
    withDirtyProtection,
    onSpareAssigned,
}) => {
    const { formatMessage: fm } = useIntl()
    const { setUID } = useSystemStore()
    const openUseSpare = useSpareDialog()

    const handleSystemRedirect = (uid: string) => {
        if (withDirtyProtection) {
            withDirtyProtection(() => setUID(uid))()
        } else {
            setUID(uid)
        }
    }

    const handleUseSpare = (spareItemUid: string, systemUid: string, spareSystemUid: string) => {
        return () => {
            openUseSpare({ systemUid, spareItemUid, spareSystemUid, onSuccess: onSpareAssigned })
        }
    }

    if (!systemDetail) return null

    return (
        <Disclosure
            title={fm({ id: message.common.systemOverlay.spareParts })}
            defaultOpen={true}
            className="w-full border rounded-md overflow-hidden shadow-md"
            buttonClassName="bg-orange-50 dark:bg-orange-900/20"
            panelClassName="px-3 py-3 space-y-2"
            transparentButton={false}
        >
            <div className="grid grid-cols-1 gap-2 text-sm">
                {systemDetail.sp_coverage !== null && systemDetail.sp_coverage !== undefined && (
                    <SystemDetailParameter
                        title="Current Coverage"
                        value={formatCoverage(systemDetail.sp_coverage) ?? 'N/A'}
                        className={
                            isUnderCovered(systemDetail)
                                ? 'text-red-600 dark:text-red-400 font-medium'
                                : 'text-green-600 dark:text-green-400 font-medium'
                        }
                    />
                )}
            </div>

            {/* Spare Parts Section */}
            {systemDetail?.sparePartsConnection?.edges &&
                systemDetail.sparePartsConnection.edges.length > 0 && (
                    <div className="space-y-1">
                        <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                            {fm({ id: message.common.systemOverlay.spareParts })}
                        </h4>
                        {systemDetail.sparePartsConnection.edges.map((edge: any, index: number) => {
                            const { node } = edge
                            const { physicalItem, name, uid: spareSystemUid } = node

                            return (
                                <button
                                    key={index}
                                    onClick={() => handleSystemRedirect(spareSystemUid)}
                                    className="flex justify-between text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 border border-transparent cursor-pointer group w-full"
                                >
                                    <div className="flex items-center space-x-2 flex-1 min-w-0">
                                        <Badge className="text-[10px] bg-orange-100 dark:bg-orange-600 text-orange-800 dark:text-orange-100">
                                            {String(Number(edge.coverage).toFixed(2))}
                                        </Badge>
                                        <div className="w-4 h-4 shrink-0">
                                            <IconCell
                                                itemUsageUid={
                                                    physicalItem?.itemUsage?.uid as ITEM_USAGE
                                                }
                                            />
                                        </div>
                                        <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                            <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors truncate">
                                                {name}
                                            </span>
                                            <ExternalLink className="h-3 w-3 ml-2 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-500 dark:text-blue-400 shrink-0" />
                                            {physicalItem?.eun && (
                                                <Badge className="text-[10px] bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-blue-100 shrink-0">
                                                    {physicalItem.eun}
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-1">
                                        <Tooltip
                                            content={
                                                isFeatureEnabled('enableSparePartsAssignment')
                                                    ? 'Use this spare part'
                                                    : 'Spare parts assignment is disabled'
                                            }
                                        >
                                            <Button
                                                onClick={handleUseSpare(
                                                    physicalItem?.uid || '',
                                                    systemDetail.uid,
                                                    spareSystemUid,
                                                )}
                                                className="text-[9px] px-1.5 py-0.5 h-5"
                                                size="sm"
                                                disabled={
                                                    !isFeatureEnabled('enableSparePartsAssignment')
                                                }
                                            >
                                                {fm({ id: message.common.spareAssignment.useSpare })}
                                            </Button>
                                        </Tooltip>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}

            {/* Designated Spare Part For Section */}
            {systemDetail?.sparePartsFor && systemDetail.sparePartsFor.length > 0 && (
                <div className="space-y-1">
                    <h4 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {fm({ id: message.common.systemOverlay.designatedSparePart })}
                    </h4>
                    {systemDetail.sparePartsFor.map((system: any, index: number) => {
                        const { physicalItem, name, uid } = system

                        return (
                            <button
                                key={index}
                                onClick={() => handleSystemRedirect(uid)}
                                className="flex justify-between text-xs px-2 py-1 rounded-md transition-all duration-200 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700 border border-transparent cursor-pointer group w-full"
                            >
                                <div className="flex items-center space-x-2 flex-1 min-w-0">
                                    <div className="w-4 h-4 shrink-0">
                                        <IconCell
                                            itemUsageUid={
                                                physicalItem?.itemUsage?.uid as ITEM_USAGE
                                            }
                                        />
                                    </div>
                                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                                        <span className="font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors truncate">
                                            {name}
                                        </span>
                                        {physicalItem?.eun && (
                                            <Badge className="text-[10px] bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-blue-100 shrink-0">
                                                {physicalItem.eun}
                                            </Badge>
                                        )}
                                    </div>
                                    <ExternalLink className="h-3 w-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-blue-500 dark:text-blue-400 shrink-0" />
                                </div>
                            </button>
                        )
                    })}
                </div>
            )}
        </Disclosure>
    )
}
