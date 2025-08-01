import { useRouter } from 'next/router'

import { Button } from '@/components/Buttons'
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
    <div className="flex w-full">
      <Button
        loading={loading || pending}
        disabled={disabled}
        onClick={handleGenerate}
        className="mr-2 mt-4 flex justify-center"
      >
        Generate
      </Button>
      <Button
        disabled={disabled}
        loading={loading || pending}
        onClick={handleClear}
        className="mt-4 flex justify-center"
      >
        Release
      </Button>
    </div>
  )
}
