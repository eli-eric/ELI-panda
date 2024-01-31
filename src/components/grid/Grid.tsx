import React from 'react'

import { classNames } from '@/utils'

import type { ColSizeProp } from './ColSizes'
import { colSizes, lgColSizes, mdColSizes } from './ColSizes'

interface GridPropsT extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string

  horizontalSpacing?: number
  verticalSpacing?: number
}

export const Grid = ({
  children,
  className,
  verticalSpacing = 4,
  horizontalSpacing = 2,
  ...restProps
}: GridPropsT): JSX.Element => (
  <div
    className={classNames(
      `grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 text-gray-900 `,
      `gap-y-${verticalSpacing}`,
      `gap-x-${horizontalSpacing}`,
      className
    )}
    {...restProps}
  >
    {children}
  </div>
)

interface ColType extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  sm?: ColSizeProp
  md?: ColSizeProp
  lg?: ColSizeProp
}

export const Col = ({ children, className, sm: col = 3, md, lg, ...restProps }: ColType): JSX.Element => (
  <div
    className={classNames(col && colSizes[col], md && mdColSizes[md], lg && lgColSizes[lg], 'flex', className)}
    {...restProps}
  >
    {children}
  </div>
)
