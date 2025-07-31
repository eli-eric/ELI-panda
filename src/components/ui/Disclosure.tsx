import { ChevronDown, X } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'

interface DisclosureProps {
  /**
   * The title to display on the disclosure button
   */
  title: string
  /**
   * The content to display when the disclosure is open
   */
  children: ReactNode
  /**
   * Whether the disclosure should be open by default
   * @default !isMobile
   */
  defaultOpen?: boolean
  /**
   * Optional callback when the disclosure state changes
   */
  onChange?: (open: boolean) => void
  /**
   * Additional CSS classes for the disclosure container
   */
  className?: string
  /**
   * Additional CSS classes for the button
   */
  buttonClassName?: string
  /**
   * Additional CSS classes for the panel
   */
  panelClassName?: string
  /**
   * Whether the button should have a transparent background
   * @default false
   */
  transparentButton?: boolean
}

/**
 * Universal disclosure component built with shadcn/ui Collapsible
 */
export const Disclosure = ({
  title,
  children,
  defaultOpen = !isMobile,
  onChange,
  className = '',
  buttonClassName = '',
  panelClassName = '',
  transparentButton = false
}: DisclosureProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    // Small delay to ensure DOM changes are complete before notifying parent
    setTimeout(() => {
      onChange?.(open)
    }, 100)
  }

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={handleOpenChange}
      className={cn('flex flex-col', className)}
    >
      <CollapsibleTrigger
        className={cn(
          'flex items-center justify-between w-full py-1 px-4 text-sm transition-colors',
          'border rounded-md cursor-pointer',
          transparentButton
            ? 'hover:text-primary text-muted-foreground bg-transparent hover:bg-transparent border-transparent'
            : 'hover:text-primary text-muted-foreground bg-background hover:bg-accent border-border',
          buttonClassName
        )}
      >
        <span>{title || (isOpen ? 'Hide' : 'Show')}</span>
        {isOpen ? (
          <X className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </CollapsibleTrigger>
      <CollapsibleContent className={cn(panelClassName)}>
        {children}
      </CollapsibleContent>
    </Collapsible>
  )
}
