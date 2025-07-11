import { Disclosure as HeadlessDisclosure } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/24/outline'
import type { ReactNode } from 'react'
import { useState } from 'react'
import { isMobile } from 'react-device-detect'

import { cn } from '@/lib/utils'

interface DisclosureProps {
  /**
   * The title to display on the disclosure button
   */
  title: string
  /**
   * The content to display when the disclosure is open
   */
  children: ReactNode
  /**
   * Whether the disclosure should be open by default
   * @default !isMobile
   */
  defaultOpen?: boolean
  /**
   * Optional callback when the disclosure state changes
   */
  onChange?: (open: boolean) => void
  /**
   * Additional CSS classes for the disclosure container
   */
  className?: string
  /**
   * Additional CSS classes for the button
   */
  buttonClassName?: string
  /**
   * Additional CSS classes for the panel
   */
  panelClassName?: string
  /**
   * Whether the button should have a transparent background
   * @default false
   */
  transparentButton?: boolean
}

/**
 * Universal disclosure component that maintains its own open state
 */
export const Disclosure = ({
  title,
  children,
  defaultOpen = !isMobile,
  onChange,
  className = '',
  buttonClassName = '',
  panelClassName = '',
  transparentButton = false
}: DisclosureProps) => {
  const [, setIsOpen] = useState(defaultOpen)

  const handleToggle = (newState: boolean) => {
    setIsOpen(newState)
    onChange?.(newState)
  }

  const defaultButtonClasses = transparentButton
    ? ' hover:text-primary-600 text-sm flex items-center justify-between w-full py-[2px] px-4 shadow-sm text-gray-500 bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent'
    : ' hover:text-primary-600 dark:hover:bg-slate-600 text-sm flex items-center justify-between w-full py-[2px] px-4 shadow-sm text-gray-500 bg-white dark:bg-gray-800 hover:bg-gray-100'

  return (
    <HeadlessDisclosure defaultOpen={defaultOpen}>
      {({ open }) => (
        <div className={cn(`flex flex-col ${className}`)}>
          <HeadlessDisclosure.Button
            className={cn(defaultButtonClasses, buttonClassName)}
            onClick={() => {
              handleToggle(!open)
            }}
          >
            <span>{title || (open ? 'Hide' : 'Show')}</span>
            {open ? (
              <XMarkIcon className="block h-4 w-4" aria-hidden="true" />
            ) : (
              <ChevronDownIcon className="block h-4 w-4" aria-hidden="true" />
            )}
          </HeadlessDisclosure.Button>
          <HeadlessDisclosure.Panel className={`${panelClassName}`}>
            {children}
          </HeadlessDisclosure.Panel>
        </div>
      )}
    </HeadlessDisclosure>
  )
}
