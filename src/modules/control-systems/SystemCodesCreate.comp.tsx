import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

import { SystemCodesForm } from './components/create/SystemCodesForm'
import type { SystemCodesFormValues } from './components/create/SystemCodesForm.schema'
import { SystemCodesPreviewTable } from './components/create/SystemCodesPreviewTable'
import type { SystemCodeResult } from './types'

const FORM_WIDTH = 380

interface Props {
  previewData: SystemCodeResult[]
  createdData: SystemCodeResult[]
  isPreviewLoading: boolean
  isPending: boolean
  onPreview: (values: SystemCodesFormValues) => void
  onSubmit: (values: SystemCodesFormValues) => void
}

export const SystemCodesCreateComponent = ({
  previewData,
  createdData,
  isPreviewLoading,
  isPending,
  onPreview,
  onSubmit
}: Props) => {
  const { formatMessage: fm } = useIntl()

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Form pane */}
      <div
        style={{ width: FORM_WIDTH }}
        className="flex-shrink-0 border-r border-border p-6"
      >
        <h2 className="mb-6 text-lg font-semibold">
          {fm({ id: message.controlSystems.pages.create })}
        </h2>
        <SystemCodesForm
          onPreview={onPreview}
          onSubmit={onSubmit}
          isPending={isPending}
        />
      </div>

      {/* Table pane */}
      <div className="flex-1 overflow-auto p-6">
        <SystemCodesPreviewTable
          previewData={previewData}
          createdData={createdData}
          isLoading={isPreviewLoading}
        />
      </div>
    </div>
  )
}
