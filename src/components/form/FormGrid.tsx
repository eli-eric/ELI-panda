import React from 'react'

import { classNames } from '@/helpers'

type FormGridPropsT = {
  children: React.ReactNode
  className?: string
}

export const FormGrid = ({ children, className, ...restProps }: FormGridPropsT) => (
  <div
    className={classNames('grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-x-2 gap-y-4', className)}
    {...restProps}
  >
    {children}
  </div>
)
