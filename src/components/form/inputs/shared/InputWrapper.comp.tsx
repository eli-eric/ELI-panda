import { cn } from '@/lib/utils'

export const InputWrapper = ({
  hidden,
  className,
  children
}: {
  hidden?: boolean
  className?: string
  children: React.ReactNode
}) => (
  <div
    hidden={hidden}
    className={cn(
      'block w-full appearance-none placeholder-gray-400  focus:border-orange-500 focus:outline-none focus:ring-orange-500 sm:text-sm',
      className
    )}
  >
    {children}
  </div>
)
