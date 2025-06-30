import type { FC } from 'react'

type Props = {
  title: string
  value?: string | null
}

export const SystemDetailParameter: FC<Props> = ({ title, value }) => {
  return (
    <div className="flex justify-between text-xs">
      <span className="font-medium text-gray-600 dark:text-gray-400">
        {title}:
      </span>
      <span
        className="text-gray-900 dark:text-gray-200 text-right max-w-[60%] truncate"
        title={value || 'N/A'}
      >
        {value ? value : 'N/A'}
      </span>
    </div>
  )
}
