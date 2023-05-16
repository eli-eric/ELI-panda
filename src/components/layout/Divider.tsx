import { FormattedMessage } from 'react-intl'

import { classNames } from '@/helpers'

interface DividerProps {
  text?: string
  className?: string
  children?: React.ReactNode
}

export default function Divider({ text, className, children }: DividerProps) {
  return (
    <div className={classNames('relative', className)}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-gray-300" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white px-3 text-base font-semibold leading-6 text-gray-900">
          <FormattedMessage id={text} />
        </span>
        {children && <div className="bg-white pr-3">{children}</div>}
      </div>
    </div>
  )
}
