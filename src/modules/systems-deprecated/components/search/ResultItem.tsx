import { useRouter } from 'next/router'
import useSWR from 'swr'

import TableRowComponent from '@/components/table/TableRow.comp'
import { TableRowItem } from '@/components/table/TableRowItem.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import { PATH } from '@/types/constants/paths'

import type { SystemDetailResponse } from '../../types/responses'

interface Props {
  item: SystemDetailResponse
  index: number
}

const ResultItem = ({ item, index }: Props) => {
  const router = useRouter()
  const { systemImage } = useEndpoint({ uid: item.uid })
  const { data: image } = useSWR(systemImage)
  const onClickHandler = uid => {
    router.push({ pathname: PATH.SYSTEMS + '/' + uid, query: { q: router.query.q } })
  }
  return (
    <TableRowComponent key={item.uid + index} index={index} onClick={() => onClickHandler(item.uid)}>
      <TableRowItem text={item.name} image={image} />
      <TableRowItem text={item.description} isInfoTooltip={true} />
      <TableRowItem text={item.systemCode} />
      <TableRowItem text={item.systemType?.name} />
      <TableRowItem text={item.systemAlias} />
      <TableRowItem text={item.location?.name} />
      <TableRowItem text={item.owner?.name} />
      <TableRowItem text={item.importance?.name} />
      <TableRowItem text={item.zone?.name} />
    </TableRowComponent>
  )
}

export default ResultItem
