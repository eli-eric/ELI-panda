import { FormattedMessage } from 'react-intl'

interface HeadingProps {
  children?: React.ReactNode
  text?: string
  customText?: string
}

const Heading = ({ text, children, customText }: HeadingProps) => (
  <div className="mb-4 border-b border-gray-200 bg-white px-2 py-2 sm:px-3">
    <div className="-ml-2 -mt-1 flex flex-wrap h-12 items-center justify-between sm:flex-nowrap">
      <div className="ml-2 mt-1">
        <h3 className="text-lg font-medium text-gray-900">
          {customText ? customText : <FormattedMessage id={text} />}
        </h3>
      </div>
      {children && <div className="ml-2 mt-1 flex-shrink-0">{children}</div>}
    </div>
  </div>
)

export default Heading
