import type { FC } from 'react'

import Card from '@/components/layout/Card'

interface Props {
  uid?: string
}

export const ServiceTypeContainer: FC<Props> = ({ uid }) => {
  return <Card>SERVICE DETAILS {uid}</Card>
}
