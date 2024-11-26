import type { FC } from 'react'

type Props = {
  title: string
  value?: string | null
}

export const SystemDetailParameter: FC<Props> = ({ title, value }) => {
  return (
    <div className="flex justify-between text-gray-700 dark:text-gray-200">
      <p>{title + ':'}</p>
      <p>{value ? value : 'N/A'}</p>
    </div>
  )
}
