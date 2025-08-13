import { Eraser, Wand2 } from 'lucide-react'
import { useRouter } from 'next/router'

import { Button } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import { useSystemCodeClear } from '@/modules/systemItem/hooks/useSystemCodeClear'
import { useSystemCodeGenerate } from '@/modules/systemItem/hooks/useSystemCodeGenerate'

export const SystemCodeButton = () => {
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
        uid: uid
      },
      update: {
        systemCode: null
      }
    })
  }

  return (
    <div className="flex items-center gap-2">
      <Tooltip content="Generate system code">
        <Button
          size="icon"
          aria-label="Generate system code"
          loading={loading || pending}
          disabled={disabled}
          onClick={handleGenerate}
          className="flex items-center size-[26px]"
        >
          <Wand2 className="h-3.5 w-3.5" />
        </Button>
      </Tooltip>
      <Tooltip content="Release system code">
        <Button
          size="icon"
          variant="outline"
          aria-label="Release system code"
          disabled={disabled || !uid}
          loading={loading || pending}
          onClick={handleClear}
          className="flex items-center size-[26px] border text-red-600 hover:text-red-700 hover:border-red-600"
        >
          <Eraser className="h-3.5 w-3.5" />
        </Button>
      </Tooltip>
    </div>
  )
}
