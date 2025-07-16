import { ExternalLink } from 'lucide-react'
import Link from 'next/link'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface DetailParameterProps {
  title: string
  value?: string | null
  className?: string
  additionalInfo?: string
  unit?: string
  href?: string
  ref?: React.Ref<HTMLDivElement>
}

const DetailParameter = ({
  title,
  value,
  className,
  additionalInfo,
  unit,
  href,
  ref,
  ...props
}: DetailParameterProps) => {
  const baseClasses = cn(
    'flex justify-between text-xs px-2 py-1 rounded-md transition-all duration-200 border border-transparent group',
    href
      ? 'hover:bg-link/5 hover:border-link/20 cursor-pointer'
      : 'hover:bg-accent hover:border-border'
  )

  const content = (
    <>
      <span className="font-medium text-muted-foreground flex items-center gap-1">
        {title}:
        {href && (
          <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-link/70" />
        )}
      </span>
      <div className="text-right max-w-[60%]">
        <span
          className={cn(
            'truncate',
            href ? 'text-link group-hover:text-link/80' : 'text-foreground',
            className
          )}
          title={value || 'N/A'}
        >
          {value ? value : 'N/A'} {unit && `[${unit}]`}
        </span>
        {additionalInfo && (
          <div className="text-xs text-muted-foreground line-through">
            {additionalInfo}
          </div>
        )}
      </div>
    </>
  )

  if (href) {
    return (
      <Link href={href} target="_blank" className={baseClasses} {...props}>
        {content}
      </Link>
    )
  }

  return (
    <div className={baseClasses} ref={ref} {...props}>
      {content}
    </div>
  )
}

export { DetailParameter, type DetailParameterProps }
