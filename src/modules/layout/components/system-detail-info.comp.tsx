import Link from 'next/link'
import type { FC } from 'react'

import { Button } from '@/components/Buttons'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'

import { SystemDetailParameter } from './system-detail-parameter.comp'

type Props = {
  alias?: string
}
export const SystemDetailInfo: FC<Props> = ({ alias }) => {
  const { loading, error, systemDetail, catalogueItem } = useSystemDetail(alias)

  if (loading) {
    return <ProgressBarComponent />
  }

  if (error) {
    return <p>Error</p>
  }

  return (
    <div>
      <SystemDetailParameter title="System Name" value={systemDetail?.name} />
      <SystemDetailParameter
        title="System Code"
        value={systemDetail?.systemCode}
      />
      <SystemDetailParameter
        title="Location"
        value={systemDetail?.location?.name}
      />
      <SystemDetailParameter
        title="System Type"
        value={systemDetail?.systemType?.name}
      />
      <Link href={`/system/${systemDetail?.uid}`} target="_blank">
        <Button className="w-full mb-4 mt-4 justify-center" primary>
          Open System Detail
        </Button>
      </Link>
      {catalogueItem?.uid && (
        <div>
          <h1 className="mt-4 mb-4 border-b text-base font-semibold leading-6 text-gray-900 dark:text-gray-200">
            Catalogue Item
          </h1>
          <SystemDetailParameter
            title="Catalogue Item Name"
            value={catalogueItem?.name}
          />
          <SystemDetailParameter
            title="Part Number"
            value={catalogueItem?.catalogueNumber}
          />
          <SystemDetailParameter
            title="Catalogue category"
            value={catalogueItem?.catalogueCategory.name}
          />
          <Link href={`/catalogue/item/${catalogueItem?.uid}`} target="_blank">
            <Button className="w-full mt-4 mb-4 justify-center" primary>
              Open Catalogue Item Detail
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
