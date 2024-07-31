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
        primary
        loading={loading || pending}
        disabled={disabled}
        onClick={handleGenerate}
        className="sm:mt-5 mr-2 mt-6 w-full flex justify-center"
      >
        Generate
      </Button>
      <Button
        primary
        disabled={disabled}
        loading={loading || pending}
        onClick={handleClear}
        className="sm:mt-5 mt-6 w-full flex justify-center"
      >
        Release
      </Button>
    </div>
  )
}
