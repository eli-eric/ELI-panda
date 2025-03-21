import { FormattedMessage } from 'react-intl'

import { cx } from '@/utils'

interface HeadingProps {
  children?: React.ReactNode
  text?: string
  customText?: string
  className?: string
  textColor?: string
  titleNode?: React.ReactNode
  showBorder?: boolean
}

export const Heading = ({
  text,
  children,
  customText,
  className,
  textColor = 'text-gray-900 dark:text-gray-200',
  titleNode,
  showBorder = true
}: HeadingProps) => (
  <div
    className={cx(
      'border-gray-200 px-2 py-2 sm:px-3',
      showBorder ? 'border-b mb-4' : '',
      className
    )}
  >
    <div className="-ml-2 -mt-1 flex h-12 items-center justify-between">
      <div className="ml-2 mt-1 flex items-center w-full">
        <h3 className={cx('text-lg font-medium', textColor)}>
          {customText ? customText : <FormattedMessage id={text} />}
        </h3>
        {titleNode}
      </div>
      {children && <div className="ml-2 mt-1 flex-shrink-0">{children}</div>}
    </div>
  </div>
)
