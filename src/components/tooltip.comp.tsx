import { Transition } from '@headlessui/react'
import React, { Fragment, useState } from 'react'
import ReactTooltip, { type Offset } from 'react-tooltip'

interface TooltipComponentProps {
  children: any
  text: any
  offset?: Offset | undefined
}

const TooltipComponent = ({ children, text, offset }: TooltipComponentProps) => (
  <div>
    <div className="flex items-center ">
      <div data-for="custom-class" data-tip={text}>
        {children}
      </div>
    </div>
    <ReactTooltip id="custom-class" className="w-64" effect="solid" offset={offset} />
  </div>
)

export default TooltipComponent

interface TooltipProps {
  children: React.ReactNode
  content: string
}

export const Tooltip = ({ children, content }: TooltipProps) => {
  const [show, setShow] = useState(false)
  const handleMouseEnter = () => {
    setShow(true)
  }
  const handleMouseLeave = () => {
    setShow(false)
  }

  return (
    <div className="relative inline-block" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Transition
        show={show}
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="pointer-events-none z-50 absolute bottom-full w-64 mb-2 p-2 text-sm leading-tight text-black bg-gray-100 border border-gray-300 rounded shadow-lg">
          {content}
        </div>
      </Transition>
      {children}
    </div>
  )
}
