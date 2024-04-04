import { Button } from '@/components/Buttons'
import { useSystemCodeClear } from '@/modules/systemItem/hooks/useSystemCodeClear'
import { useSystemCodeGenerate } from '@/modules/systemItem/hooks/useSystemCodeGenerate'

export const SystemCodeButton = () => {
  const { loading, getSystemCode, disabled } = useSystemCodeGenerate()
  const { clearSystemCode } = useSystemCodeClear()

  const handleGenerate = () => {
    getSystemCode()
  }

  const handleClear = () => {
    clearSystemCode()
  }

  return (
    <div className="flex">
      <Button
        primary
        loading={loading}
        disabled={disabled}
        onClick={handleGenerate}
        className="sm:mt-5 mr-2 mt-6 w-full flex justify-center"
      >
        Generate
      </Button>
      <Button primary loading={loading} onClick={handleClear} className="sm:mt-5 mt-6 w-full flex justify-center">
        Release
      </Button>
    </div>
  )
}
