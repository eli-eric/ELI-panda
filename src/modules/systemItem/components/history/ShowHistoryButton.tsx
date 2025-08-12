import { Clock } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { useModalGlobalStore } from '@/store/useModalGlobalStore'
import { queryFetcher } from '@/utils/fetcher'

import type { HistoryResponse } from '../../types/responses'
import { HistoryFeeds } from './HistoryFeeds'

const messages = message.common.buttons

function openHistoryModal(uid: string) {
  if (typeof window === 'undefined') return // Prevent SSR execution

  const { openModal } = useModalGlobalStore.getState()

  openModal('dialog1', {
    component: () => <HistoryModalContent uid={uid} />,
    props: {
      title: 'History',
      size: 'l' as const
    }
  })
}

const HistoryModalContent = ({ uid }: { uid: string }) => {
  const { closeModal } = useModalGlobalStore()

  const { data, error, isError } = useQuery({
    queryKey: ['history', { uid }],
    queryFn: queryFetcher<HistoryResponse[]>('history'),
    enabled: true
  })

  useEffect(() => {
    if (isError || error) {
      toast.error(error.message)
    }
  }, [isError, error])

  return (
    <div className="space-y-4">
      <HistoryFeeds history={data} />
      <div className="flex justify-end">
        <Button onClick={() => closeModal('dialog1')}>
          {messages.close}
        </Button>
      </div>
    </div>
  )
}

export const ShowHistoryButton = () => {
  const router = useRouter()
  const { uid } = router.query as { uid: string }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => openHistoryModal(uid)}
    >
      <Clock className="h-4 w-4" />
    </Button>
  )
}
