interface Props {
  children: React.ReactNode
}

const Card = ({ children }: Props) => {
  return <div className={`mb-2 lg:mb-4 py-1 lg:py-2`}>{children}</div>
}

export default Card

interface HeadingProps {
  heading: string
  action?: {
    label: string
    href: string
  }
}

export const Heading = (props: HeadingProps) => {
  const { heading, action } = props
  const { label, href } = action ?? {}
  return (
    <div className="border-b border-gray-200 bg-white px-2 py-2 sm:px-3">
      <div className="-ml-2 -mt-1 flex flex-wrap items-center justify-between sm:flex-nowrap">
        <div className="ml-2 mt-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">{heading}</h3>
        </div>
        {label && href && (
          <div className="ml-2 mt-1 flex-shrink-0">
            <a
              href={href}
              className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="truncate">{label}</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
