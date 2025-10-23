import {
  Tooltip as TP,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

type Props = {
  content?: string
  children: React.ReactNode
  className?: string
  maxWidth?: string
}

// eslint-disable-next-line react/prop-types
export const Tooltip: React.FC<Props> = ({
  children,
  content,
  className,
  maxWidth = 'max-w-xs'
}) =>
  content ? (
    <TP disableHoverableContent>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className={`${maxWidth} ${className || ''}`}>
        <p className="whitespace-normal break-words">{content}</p>
      </TooltipContent>
    </TP>
  ) : (
    children
  )
