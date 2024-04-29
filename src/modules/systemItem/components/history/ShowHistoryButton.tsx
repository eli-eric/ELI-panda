import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import axiosInstance from '@/core/axios/axiosInstance'
import { BASE_URL } from '@/types/constants/common'
import { ClockIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { HistoryFeeds } from './HistoryFeeds'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query'

export type History = {
  uid: string
  changedAt: string
  changedBy: string
  historyType: 'GENERAL' | 'ITEM' | 'MOVE'
  action: string
  detail: {
    systemUid: string
    systemName: string
    direction: 'IN' | 'OUT'
  }
}

const fetchHistory = props => {
  const { queryKey } = props
  return axiosInstance
    .get(BASE_URL + `/system/${queryKey[1]}/history`)
    .then(res => res.data)
}

export const ShowHistoryButton = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { uid } = router.query as { uid: string }

  const { data } = useQuery<History[]>({
    queryKey: ['history', uid],
    queryFn: fetchHistory,
    enabled: open
  })

  return (
    <Fragment>
      <Button
        className=""
        buttonSize="large"
        type="button"
        onClick={() => setOpen(!open)}
      >
        <ClockIcon className="w-5 h-5" />
      </Button>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        buttons={{
          goNext: {
            text: 'close',
            onClick: () => setOpen(false)
          }
        }}
      >
        <HistoryFeeds history={data} />
      </ModalComponent>
    </Fragment>
  )
}
