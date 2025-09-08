import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

import { Form } from '@/components/form/Form'
import { schema } from '@/modules/systemItem/components/form/SystemForm.schema'
import { useSuspenseSystemDetail } from '@/modules/systemItem/hooks/useSuspenseSystemDetail'

import { PhysicalItemSection } from './sections/physical-item.sections'
import { SystemDetailSection } from './sections/system-detail.section'

export const SystemEditForm = ({ uid }: { uid: string }) => {
  const { systemDetail } = useSuspenseSystemDetail({ uid: uid })

  const {
    sparePartsConnection, // eslint-disable-line @typescript-eslint/no-unused-vars
    sparePartsCoverageSum, // eslint-disable-line @typescript-eslint/no-unused-vars
    sparePartsFor, // eslint-disable-line @typescript-eslint/no-unused-vars
    subSystems, // eslint-disable-line @typescript-eslint/no-unused-vars
    __typename, // eslint-disable-line @typescript-eslint/no-unused-vars
    ...rest
  } = systemDetail || {}

  const formMethods = useForm<any>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      ...rest,
      responsible:
        systemDetail?.responsible && systemDetail?.responsible?.fullName
          ? {
              uid: systemDetail?.responsible?.uid,
              name: systemDetail?.responsible?.fullName
            }
          : undefined,
      zone: systemDetail?.zone
        ? {
            uid: systemDetail?.zone?.uid,
            name: systemDetail?.zone?.name as string
          }
        : undefined,
      location: systemDetail?.location
        ? {
            uid: systemDetail?.location?.uid,
            name:
              systemDetail?.location?.name +
              ' (' +
              systemDetail?.location?.code +
              ')',
            code: systemDetail?.location?.code
          }
        : undefined,
      // For new systems, always set a default system level
      systemLevel: rest.systemLevel
    }
  })

  return (
    <Form formMethods={formMethods}>
      <SystemDetailSection />
      <PhysicalItemSection />
    </Form>
  )
}
