import { ArrowLeft } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { HeaderWrapper } from './HeaderWrapper'

interface Props {
  title?: string
  backLabel?: string
  onBack?: () => void
}

export const SimpleHeader = ({ title, backLabel = 'Back', onBack }: Props) => {
  return (
    <HeaderWrapper>
      <Button
        variant="outline"
        size="sm"
        onClick={onBack}
        className="flex items-center gap-1.5"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>{backLabel}</span>
      </Button>
      {title && (
        <h1 className="text-lg sm:text-xl font-semibold truncate">{title}</h1>
      )}
    </HeaderWrapper>
  )
}
