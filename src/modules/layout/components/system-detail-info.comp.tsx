import Link from 'next/link'
import { type FC, Fragment } from 'react'

import { Button } from '@/components/Buttons'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { Disclosure } from '@/components/ui'
import { ItemPropertiesViewer } from '@/components/ui/ItemPropertiesViewer'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ImageGallery } from '@/modules/shared/imageManager/ImageGallery'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { getColorBySystemLevel } from '@/modules/systemItem/utils'
import { PATH } from '@/types/constants/paths'
import type { SystemLevel } from '@/types/gql/graphql'

import { SystemDetailParameter } from './system-detail-parameter.comp'

type Props = {
  alias?: string
}

export const SystemDetailInfo: FC<Props> = ({ alias }) => {
  const { loading, error, systemDetail, physicalItem, catalogueItem } =
    useSystemDetail({
      alias
    })

  if (loading) {
    return <ProgressBarComponent />
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-600 dark:text-red-400">
          Failed to load system information
        </p>
      </div>
    )
  }

  const serviceItems = physicalItem?.serviceItemsConnection?.edges || []

  return (
    <div className="space-y-4">
      {/* Image Gallery */}
      {systemDetail?.uid && (
        <div className="mb-4">
          <ImageGallery
            config={{
              itemCategory: FILE_TYPE.SYSTEM,
              itemId: systemDetail.uid,
              fileCategory: 'image',
              additionalParams: catalogueItem?.uid
                ? {
                    itemCategory: FILE_TYPE.CATALOGUE,
                    itemId: catalogueItem.uid
                  }
                : undefined
            }}
            hasEditRole={false}
            allowMultipleImages={true}
            disabled={true}
          />
        </div>
      )}

      {/* System Information */}
      <Disclosure
        title="System Information"
        defaultOpen={true}
        className={`w-full border rounded-md ${getColorBySystemLevel(systemDetail?.systemLevel as SystemLevel)}`}
        buttonClassName="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-colors"
        panelClassName="px-3 py-3 space-y-2"
        transparentButton={false}
      >
        <div className="grid grid-cols-1 gap-2 text-sm">
          <SystemDetailParameter
            title="System Name"
            value={systemDetail?.name}
          />
          <SystemDetailParameter
            title="System Code"
            value={systemDetail?.systemCode}
          />
          <SystemDetailParameter
            title="System Level"
            value={systemDetail?.systemLevel}
          />
          <SystemDetailParameter
            title="Location"
            value={systemDetail?.location?.name}
          />
          <SystemDetailParameter
            title="Zone"
            value={systemDetail?.zone?.name}
          />
          <SystemDetailParameter
            title="System Type"
            value={systemDetail?.systemType?.name}
          />
          <SystemDetailParameter
            title="Responsible Person"
            value={systemDetail?.responsible?.fullName}
          />
          <SystemDetailParameter
            title="Responsible Team"
            value={systemDetail?.responsibleTeam?.name}
          />
          {systemDetail?.description && (
            <div className="pt-2">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Description:
              </p>
              <p className="text-xs text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                {systemDetail.description}
              </p>
            </div>
          )}
        </div>

        <div className="pt-2">
          <Link href={`/system/${systemDetail?.uid}`} target="_blank">
            <Button className="w-full justify-center text-sm py-2" primary>
              Open System Detail
            </Button>
          </Link>
        </div>
      </Disclosure>

      {/* Physical Item Information */}
      {physicalItem && (
        <Disclosure
          title="Physical Item"
          defaultOpen={true}
          className="w-full border rounded-md"
          buttonClassName="p-3 bg-gray-50 dark:bg-gray-700"
          panelClassName="px-3 py-3 space-y-2"
          transparentButton={false}
        >
          <div className="grid grid-cols-1 gap-2 text-sm">
            {physicalItem.eun && (
              <SystemDetailParameter title="EUN" value={physicalItem.eun} />
            )}
            {physicalItem.serialNumber && (
              <SystemDetailParameter
                title="Serial Number"
                value={physicalItem.serialNumber}
              />
            )}
            {physicalItem.itemUsage?.name && (
              <SystemDetailParameter
                title="Item Usage"
                value={physicalItem.itemUsage.name}
              />
            )}
            {physicalItem.conditionStatus?.name && (
              <SystemDetailParameter
                title="Condition Status"
                value={physicalItem.conditionStatus.name}
              />
            )}
            {physicalItem.notes && (
              <div className="pt-2">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Notes:
                </p>
                <p className="text-xs text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  {physicalItem.notes}
                </p>
              </div>
            )}
          </div>
        </Disclosure>
      )}

      {/* Catalogue Item Information */}
      {catalogueItem?.uid && (
        <Disclosure
          title="Catalogue Item"
          defaultOpen={true}
          className="w-full border rounded-md"
          buttonClassName="p-3 bg-gray-50 dark:bg-gray-700"
          panelClassName="px-3 py-3 space-y-3"
          transparentButton={false}
        >
          <div className="grid grid-cols-1 gap-2 text-sm">
            <SystemDetailParameter
              title="Catalogue Item Name"
              value={catalogueItem.name}
            />
            <SystemDetailParameter
              title="Part Number"
              value={catalogueItem.catalogueNumber}
            />
            <SystemDetailParameter
              title="Category"
              value={catalogueItem.catalogueCategory?.name}
            />
            <SystemDetailParameter
              title="Supplier"
              value={catalogueItem.supplier?.name}
            />
            {catalogueItem.description && (
              <div className="pt-2">
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Description:
                </p>
                <p className="text-xs text-gray-900 dark:text-gray-200 bg-gray-50 dark:bg-gray-700 p-2 rounded">
                  {catalogueItem.description}
                </p>
              </div>
            )}
          </div>

          <div className="pt-2">
            <Link href={`/catalogue/item/${catalogueItem.uid}`} target="_blank">
              <Button className="w-full justify-center text-sm py-2" primary>
                Open Catalogue Item Detail
              </Button>
            </Link>
          </div>
        </Disclosure>
      )}

      {/* Item Properties using ItemPropertiesViewer */}
      {catalogueItem && physicalItem && (
        <ItemPropertiesViewer
          catalogueItem={catalogueItem as any}
          serviceItems={serviceItems}
        />
      )}

      {/* Service Items */}
      {serviceItems.length > 0 && (
        <Fragment>
          {serviceItems.map(serviceEdge => {
            const serviceItem = serviceEdge.node
            const serviceItemProperties =
              serviceItem.detailsConnection?.edges || []
            const title = `${serviceItem.name}${serviceItem.isDelivered ? ' (Delivered)' : ''}`

            return (
              <Disclosure
                key={serviceItem.uid}
                title={title}
                defaultOpen={false}
                className="w-full border rounded-md"
                buttonClassName="p-3 bg-blue-50 dark:bg-blue-900/20"
                panelClassName="px-3 py-3"
                transparentButton={false}
              >
                <div className="space-y-2">
                  {serviceItem.order && (
                    <div className="text-sm space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 dark:text-gray-400">Order:</span>
                        <Link href={`/orders/${serviceItem.order.uid}`} target="_blank">
                          <span className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
                            {serviceItem.order.name}
                          </span>
                        </Link>
                      </div>
                      <SystemDetailParameter
                        title="Order Date"
                        value={
                          serviceItem.order.orderDate
                            ? new Date(
                                serviceItem.order.orderDate
                              ).toLocaleDateString()
                            : undefined
                        }
                      />
                      <SystemDetailParameter
                        title="Delivery Status"
                        value={serviceItem.isDelivered ? 'Delivered' : 'Pending'}
                      />
                    </div>
                  )}

                  {serviceItemProperties.length > 0 && (
                    <div className="pt-2">
                      <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                        Service Properties:
                      </p>
                      <div className="grid grid-cols-1 gap-1">
                        {serviceItemProperties.map(edge => {
                          const type = edge.node.type as unknown as {
                            name: string
                            uid: string
                          }
                          if (type.name === 'Range') {
                            try {
                              const value = JSON.parse(edge.value || '{}')
                              const min = value?.min ?? 'N/A'
                              const max = value?.max ?? 'N/A'
                              const stringValue = `${min} - ${max}`
                              return (
                                <div
                                  key={edge.node.uid}
                                  className="flex justify-between text-xs"
                                >
                                  <span className="text-gray-600 dark:text-gray-400">
                                    {edge.node.name}:
                                  </span>
                                  <span className="text-gray-900 dark:text-gray-200">
                                    {stringValue}{' '}
                                    {edge.node.unit?.name &&
                                      `[${edge.node.unit.name}]`}
                                  </span>
                                </div>
                              )
                            } catch (error) {
                              return (
                                <div
                                  key={edge.node.uid}
                                  className="flex justify-between text-xs"
                                >
                                  <span className="text-gray-600 dark:text-gray-400">
                                    {edge.node.name}:
                                  </span>
                                  <span className="text-gray-900 dark:text-gray-200">
                                    {edge.value || 'N/A'}{' '}
                                    {edge.node.unit?.name &&
                                      `[${edge.node.unit.name}]`}
                                  </span>
                                </div>
                              )
                            }
                          }
                          return (
                            <div
                              key={edge.node.uid}
                              className="flex justify-between text-xs"
                            >
                              <span className="text-gray-600 dark:text-gray-400">
                                {edge.node.name}:
                              </span>
                              <span className="text-gray-900 dark:text-gray-200">
                                {edge.value || 'N/A'}{' '}
                                {edge.node.unit?.name &&
                                  `[${edge.node.unit.name}]`}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Link to service detail */}
                  <div className="pt-2">
                    <Link href={`${PATH.SERVICE}/${serviceItem.uid}`} target="_blank">
                      <Button className="w-full justify-center text-sm py-2 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50">
                        View Service Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Disclosure>
            )
          })}
        </Fragment>
      )}

      {/* Parent Path Breadcrumb */}
      {systemDetail?.parentPath && systemDetail.parentPath.length > 0 && (
        <Disclosure
          title="System Hierarchy"
          defaultOpen={false}
          className="w-full border rounded-md"
          buttonClassName="p-3 bg-gray-50 dark:bg-gray-700"
          panelClassName="px-3 py-3"
          transparentButton={false}
        >
          <div className="text-xs">
            <p className="text-gray-600 dark:text-gray-400 mb-2">Path:</p>
            <div className="flex flex-wrap items-center gap-1">
              {systemDetail.parentPath.map((parent, index) => (
                <Fragment key={parent?.uid || index}>
                  <span className="text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded text-xs">
                    {parent?.name || 'Unknown'}
                  </span>
                  {index < systemDetail.parentPath!.length - 1 && (
                    <span className="text-gray-400 mx-1">→</span>
                  )}
                </Fragment>
              ))}
              <span className="text-gray-400 mx-1">→</span>
              <span className="text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-xs font-medium">
                {systemDetail.name}
              </span>
            </div>
          </div>
        </Disclosure>
      )}

      {/* Order Information */}
      {physicalItem?.order && (
        <Disclosure
          title="Order Information"
          defaultOpen={false}
          className="w-full border rounded-md"
          buttonClassName="p-3 bg-green-50 dark:bg-green-900/20"
          panelClassName="px-3 py-3"
          transparentButton={false}
        >
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Order:</span>
              <Link href={`/orders/${physicalItem.order.uid}`} target="_blank">
                <span className="text-blue-600 dark:text-blue-400 hover:underline text-xs">
                  {physicalItem.order.name}
                </span>
              </Link>
            </div>
            <SystemDetailParameter
              title="Order Date"
              value={
                physicalItem.order.orderDate
                  ? new Date(physicalItem.order.orderDate).toLocaleDateString()
                  : undefined
              }
            />
            {physicalItem.orderConnection?.edges &&
              physicalItem.orderConnection.edges.length > 0 && (
                <SystemDetailParameter
                  title="Delivery Status"
                  value={
                    physicalItem.orderConnection.edges[0]?.isDelivered
                      ? 'Delivered'
                      : 'Pending'
                  }
                />
              )}
            
            {/* Link to order detail */}
            <div className="pt-2">
              <Link href={`/orders/${physicalItem.order.uid}`} target="_blank">
                <Button className="w-full justify-center text-sm py-2 bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50">
                  View Order Details
                </Button>
              </Link>
            </div>
          </div>
        </Disclosure>
      )}

      {/* Spare Parts Coverage */}
      {systemDetail && (
        <Disclosure
          title="Spare Parts Coverage"
          defaultOpen={true}
          className="w-full border rounded-md"
          buttonClassName="p-3 bg-orange-50 dark:bg-orange-900/20"
          panelClassName="px-3 py-3"
          transparentButton={false}
        >
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Current Coverage:</span>
              <span 
                className={`font-medium ${
                  (systemDetail.sp_coverage !== null && systemDetail.sp_coverage !== undefined && systemDetail.sp_coverage < 1)
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-green-600 dark:text-green-400'
                }`}
              >
                {(systemDetail.sp_coverage !== null && systemDetail.sp_coverage !== undefined)
                  ? `${(systemDetail.sp_coverage * 100).toFixed(1)}%`
                  : 'N/A'
                }
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Required Parts:</span>
              <span className="text-gray-900 dark:text-gray-200">
                {systemDetail.minimalSpareParstCount || 0}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600 dark:text-gray-400">Available Parts:</span>
              <span className="text-gray-900 dark:text-gray-200">
                {systemDetail.sparePartsCoverageSum?.toFixed(2) || '0.00'}
              </span>
            </div>

            {(systemDetail.sp_coverage !== null && systemDetail.sp_coverage !== undefined) && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      systemDetail.sp_coverage < 1
                        ? 'bg-red-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(systemDetail.sp_coverage * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Link to spare parts management */}
            <div className="pt-2">
              <Link href={`${PATH.SYSTEM}/${systemDetail.uid}#spare-parts`} target="_blank">
                <Button className="w-full justify-center text-sm py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                  Manage Spare Parts
                </Button>
              </Link>
            </div>
          </div>
        </Disclosure>
      )}

      {/* Subsystem Parts */}
      {systemDetail?.subSystems && systemDetail.subSystems.length > 0 && (
        <Disclosure
          title={`Subsystems (${systemDetail.subSystems.length})`}
          defaultOpen={false}
          className="w-full border rounded-md"
          buttonClassName="p-3 bg-blue-50 dark:bg-blue-900/20"
          panelClassName="px-3 py-3"
          transparentButton={false}
        >
          <div className="space-y-2">
            {systemDetail.subSystems.map((subsystem) => (
              <div
                key={subsystem.uid}
                className={`p-2 rounded border ${getColorBySystemLevel(subsystem.systemLevel || undefined)}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <Link href={`${PATH.SYSTEM}/${subsystem.uid}`} target="_blank">
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                        {subsystem.name}
                      </span>
                    </Link>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {subsystem.location?.name && (
                        <span>📍 {subsystem.location.name}</span>
                      )}
                      {subsystem.physicalItem?.eun && (
                        <span className="ml-2">EUN: {subsystem.physicalItem.eun}</span>
                      )}
                    </div>
                  </div>
                  
                  {(subsystem.sp_coverage !== null && subsystem.sp_coverage !== undefined) && (
                    <div className="text-right">
                      <span 
                        className={`text-xs font-medium ${
                          subsystem.sp_coverage < 1
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-green-600 dark:text-green-400'
                        }`}
                      >
                        SP: {(subsystem.sp_coverage * 100).toFixed(1)}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
            
            {/* Link to view all subsystems */}
            <div className="pt-2">
              <Link href={`${PATH.SYSTEM}/${systemDetail.uid}#subsystems`} target="_blank">
                <Button className="w-full justify-center text-sm py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600">
                  View All Subsystems
                </Button>
              </Link>
            </div>
          </div>
        </Disclosure>
      )}
    </div>
  )
}
