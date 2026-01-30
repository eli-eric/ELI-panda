import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'

import { Button } from '@/components/Buttons'
import { message } from '@/i18n/src/messages'
import { useSystemCodeClear } from '@/modules/systemItem/hooks/useSystemCodeClear'
import { useSystemCodeGenerate } from '@/modules/systemItem/hooks/useSystemCodeGenerate'

export const SystemCodeButton = () => {
    const { formatMessage: fm } = useIntl()
    const { loading, getSystemCode, disabled } = useSystemCodeGenerate()
    const { clearSystemCode, loading: pending } = useSystemCodeClear()
    const router = useRouter()
    const uid = router.query.uid as string | undefined

    const handleGenerate = () => {
        getSystemCode()
    }

    const handleClear = () => {
        if (!uid) return
        clearSystemCode({
            where: {
                uid: uid,
            },
            update: {
                systemCode: null,
            },
        })
    }

    return (
        <div className="flex w-full">
            <Button
                loading={loading || pending}
                disabled={disabled}
                onClick={handleGenerate}
                className="mr-2 mt-4 flex justify-center"
            >
                {fm({ id: message.common.systemItem.generate })}
            </Button>
            <Button
                disabled={disabled}
                loading={loading || pending}
                onClick={handleClear}
                className="mt-4 flex justify-center"
            >
                {fm({ id: message.common.systemItem.release })}
            </Button>
        </div>
    )
}
