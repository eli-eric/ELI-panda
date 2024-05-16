import { classNames } from '@/utils'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

const Card = ({ children, className }: CardProps) => (
  <div
    className={classNames(
      'mx-auto max-w-7xl px-4 py-4 sm:px-6 md:px-8',
      className
    )}
  >
    {children}
  </div>
)

export default Card
