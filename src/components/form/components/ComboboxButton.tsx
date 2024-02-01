import { Combobox } from '@headlessui/react'

import { ChevronDown } from '../Icons'

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
    <ChevronDown />
  </Combobox.Button>
)
