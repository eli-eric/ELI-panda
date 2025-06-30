import type { FC } from 'react'

type Props = {
  title: string
  value?: string | null
  className?: string
  additionalInfo?: string
  unit?: string
}

export const SystemDetailParameter: FC<Props> = ({
  title,
  value,
  className,
  additionalInfo,
  unit
}) => {
  return (
    <div className="flex justify-between text-xs">
      <span className="font-medium text-gray-600 dark:text-gray-400">
        {title}:
      </span>
      <div className="text-right max-w-[60%]">
        <span
          className={`text-gray-900 dark:text-gray-200 truncate ${className || ''}`}
          title={value || 'N/A'}
        >
          {value ? value : 'N/A'} {unit && `[${unit}]`}
        </span>
        {additionalInfo && (
          <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
            {additionalInfo}
          </div>
        )}
      </div>
    </div>
  )
}
