import { Upload } from 'lucide-react'
import { type FC, useRef } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { Tooltip } from '@/components/Tooltip'
import { Button } from '@/components/ui/button'
import { useAccessControl } from '@/hooks/useAccessControl'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'

import { useZoneImport } from '../hooks/useZoneImport'

interface Props {
    onSuccess?: () => void
}

export const ZoneImportButton: FC<Props> = ({ onSuccess }) => {
    const { formatMessage: fm } = useIntl()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const { mutateAsync, isPending } = useZoneImport()
    const canEdit = useAccessControl(ROLE.ZONES_EDIT)()
    const labels = message.zonesPage.import

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        toast.promise(
            mutateAsync(file).then(result => {
                onSuccess?.()

                if (result.errors && result.errors.length > 0) {
                    result.errors.forEach(err => toast.error(err))
                }

                return result
            }),
            {
                loading: fm({ id: labels.importing }),
                success: data =>
                    fm({ id: labels.success }, { created: data.created, skipped: data.skipped }),
                error: fm({ id: labels.error }),
            },
        )

        // Reset input so the same file can be re-imported
        if (fileInputRef.current) {
            fileInputRef.current.value = ''
        }
    }

    if (!canEdit) return null

    return (
        <>
            <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleFileChange}
            />
            <Tooltip content={fm({ id: labels.button })}>
                <div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isPending}
                        className="cursor-pointer"
                    >
                        <Upload className="size-4" />
                    </Button>
                </div>
            </Tooltip>
        </>
    )
}
