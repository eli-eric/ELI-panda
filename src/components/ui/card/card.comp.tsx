import Link from 'next/link'

import Button from '../Buttons'

interface Props {
  children: React.ReactNode
}

const Card = ({ children }: Props) => {
  return <div className={`mb-2 lg:mb-4 py-1 lg:py-2`}>{children}</div>
}

export default Card

export const Heading = props => {
  const { children, action } = props
  const { label, href, onClick } = action ?? {}
  return (
    <div className="mb-4 border-b border-gray-200 bg-white px-2 py-2 sm:px-3">
      <div className="-ml-2 -mt-1 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-2 mt-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {children}
          </h3>
        </div>
        {label && (href || onClick) && (
          <div className="ml-2 mt-1 flex-shrink-0">
            {href ? (
              <Link href={href}>
                <Button>{label}</Button>
              </Link>
            ) : (
              <Button onClick={onClick}>{label}</Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
