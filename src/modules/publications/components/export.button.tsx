import toast from 'react-hot-toast'

import { CSVButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useSubmit } from '@/hooks/fetch/useSubmit'
import useQueryManager from '@/hooks/useQueryManager'
import { makeQuery } from '@/utils/formatters'

export const ExportButton = () => {
  const { query } = useQueryManager('publications')

  const { submit } = useSubmit<Blob>({
    endpoint: '/publications/export' + makeQuery(query),
    method: 'get',
    onError: () => {
      toast.error('Failed to export CSV')
    },
    onSuccess: data => {
      const blob = new Blob([data], { type: 'text/csv' })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'publications.csv'
      a.click()
    }
  })

  return (
    <Tooltip content="Export CSV">
      <div>
        <CSVButton
          onClick={() => {
            submit()
          }}
        />
      </div>
    </Tooltip>
  )
}
