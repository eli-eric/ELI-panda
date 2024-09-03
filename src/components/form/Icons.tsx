import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

export const ValidationIcon = () => (
  <div
    data-testid="validation-icon"
    className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
  >
    <ExclamationCircleIcon className="h-4 w-4text-red-500" aria-hidden="true" />
  </div>
)

interface ChevronDownProps {
  onClick?: () => void
}
export const ChevronDown = ({ onClick }: ChevronDownProps) => (
  <ChevronDownIcon
    onClick={onClick}
    className="h-4 w-4 text-gray-500 dark:text-gray-200"
    aria-hidden="true"
  />
)
