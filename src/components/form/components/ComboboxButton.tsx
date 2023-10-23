import { Combobox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

interface Props {
  onClick?: () => void
}
export const ComboboxButton = ({ onClick }: Props) => (
  <Combobox.Button
    className="absolute inset-y-0 right-0 flex items-center pr-2"
    onClick={() => {
      onClick && onClick()
    }}
  >
    <ChevronDownIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
  </Combobox.Button>
)
