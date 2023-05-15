interface CardProps {
  children?: React.ReactNode
}

const Card = ({ children }: CardProps) => <div className="co mx-auto max-w-7xl px-4 sm:px-6 md:px-8">{children}</div>

export default Card
