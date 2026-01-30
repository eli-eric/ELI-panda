import type { CodebookType } from '@/types/responses/codebook'

import { SelectableServiceLineDetails } from '../details/selectable-service-line.details'

type Props = {
    serviceType?: CodebookType
}

export const ServiceLineStep2Details = ({ serviceType }: Props) => {
    return <SelectableServiceLineDetails serviceType={serviceType} />
}
