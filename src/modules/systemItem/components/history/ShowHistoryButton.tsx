import { ClockIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/Buttons'
import ModalComponent from '@/components/overlays/modal/modal.comp'
import { message } from '@/i18n/src/messages'
import { queryFetcher } from '@/utils/fetcher'

import type { HistoryResponse } from '../../types/responses'
import { HistoryFeeds } from './HistoryFeeds'

const messages = message.common.buttons

export const ShowHistoryButton = () => {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { uid } = router.query as { uid: string }

  const { data, error, isError } = useQuery({
    queryKey: ['history', { uid }],
    queryFn: queryFetcher<HistoryResponse[]>('history'),
    enabled: open
  })

  useEffect(() => {
    if (isError || error) {
      toast.error(error.message)
    }
  }, [isError, error])

  return (
    <Fragment>
      <Button buttonSize="large" type="button" onClick={() => setOpen(!open)}>
        <ClockIcon className="w-4 h-4" />
      </Button>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        buttons={{
          goNext: {
            text: messages.close,
            onClick: () => setOpen(false)
          }
        }}
      >
        <HistoryFeeds history={data} />
      </ModalComponent>
    </Fragment>
  )
}
