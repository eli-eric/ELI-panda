import {
  Tooltip as TP,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'

type Props = {
  content?: string
  children: React.ReactNode
}

// eslint-disable-next-line react/prop-types
export const Tooltip: React.FC<Props> = ({ children, content }) =>
  content ? (
    <TP>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent>
        <p>{content}</p>
      </TooltipContent>
    </TP>
  ) : (
    children
  )
