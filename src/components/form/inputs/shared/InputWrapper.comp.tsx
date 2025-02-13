import { cx } from '@/utils'

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
    className={cx(
      'block w-full appearance-none placeholder-gray-400  focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm',
      className
    )}
  >
    {children}
  </div>
)
