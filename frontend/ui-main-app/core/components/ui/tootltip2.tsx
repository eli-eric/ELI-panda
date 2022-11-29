import React, { useState } from 'react'
function Index({ children, text }) {
  const [tooltipStatus, setTooltipStatus] = useState(1)
  return (
    <>
      <div className="flex-col md:flex-row flex items-center md:justify-center">
        <div
          className="relative md:mt-0"
          onMouseEnter={() => setTooltipStatus(1)}
          onMouseLeave={() => setTooltipStatus(1)}
        >
          {children}
          {tooltipStatus == 1 && (
            <div className="-mt-20 w-72 absolute transition duration-150 ease-in-out left-0 ml-8 shadow-lg bg-orange-100 p-4 rounded z-50">
              <p className="text-sm font-bold text-gray-800 pb-1">Description</p>
              <p className="text-xs leading-4 text-gray-600 pb-3">{text}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
export default Index
