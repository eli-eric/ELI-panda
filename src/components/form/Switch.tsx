import { Switch } from '@headlessui/react'
import { useState } from 'react'

import { classNames } from '@/helpers'

interface Props {
  enabled: boolean
  onChange?: (enabled: boolean) => void
  className?: string
}

const Toggle = ({ enabled, onChange, className }: Props) => (
  <Switch
    checked={enabled}
    onChange={onChange}
    className={classNames(
      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
      enabled ? 'bg-primary-500' : 'bg-gray-200',
      className
    )}
  >
    <span
      aria-hidden="true"
      className={classNames(
        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
        enabled ? 'translate-x-5' : 'translate-x-0'
      )}
    />
  </Switch>
)

export default Toggle

export const useToggle = (initialState = false) => {
  const [enabled, setEnabled] = useState(initialState)

  const toggle = () => setEnabled(!enabled)

  return { enabled, toggle, Toggle }
}
