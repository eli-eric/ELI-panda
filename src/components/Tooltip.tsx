type Props = {
  content?: string
  children: React.ReactNode
}
import {
  Tooltip as TP,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
export const Tooltip = ({ children, content }: Props) =>
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
