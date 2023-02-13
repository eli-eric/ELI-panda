interface Props {
  children: React.ReactNode
}

const Card = ({ children }: Props) => {
  return <div className={`mb-2 lg:mb-4 py-1 lg:py-2`}>{children}</div>
}

export default Card
