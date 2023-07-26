import { ExclamationCircleIcon } from '@heroicons/react/24/solid'

export const ValidationIcon = () => (
  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
    <ExclamationCircleIcon
      className="h-4 w-4

 text-red-500"
      aria-hidden="true"
    />
  </div>
)
