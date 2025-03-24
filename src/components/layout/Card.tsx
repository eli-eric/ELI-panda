import { cx } from '@/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const FormCard = ({ children, className }: CardProps) => (
  <div className={cx('mx-auto max-w-7xl', className)}>{children}</div>
)

const Card = ({ children, className }: CardProps) => (
  <div className={cx('mx-auto max-w-7xl px-4 py-4 sm:px-6 md:px-8', className)}>
    {children}
  </div>
)

export default Card
