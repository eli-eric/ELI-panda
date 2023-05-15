import React from 'react'

import { classNames } from '@/helpers'

type ColSizeProp = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full'
interface GridPropsT extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  col?: ColSizeProp
  sm?: ColSizeProp
  md?: ColSizeProp
  lg?: ColSizeProp
  xl?: ColSizeProp
  xxl?: ColSizeProp
  horizontalSpacing?: number
  verticalSpacing?: number
}

export const Grid = ({
  children,
  className,
  col = 3,
  sm,
  md = 6,
  lg = 12,
  xl,
  xxl,
  verticalSpacing = 4,
  horizontalSpacing = 2,
  ...restProps
}: GridPropsT): JSX.Element => (
  <div
    className={classNames(
      `grid grid-cols-${col}`,
      sm && `sm:grid-cols-${sm}`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`,
      xxl && `2xl:grid-cols-${xxl}`,
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
  col?: ColSizeProp
  sm?: ColSizeProp
  md?: ColSizeProp
  lg?: ColSizeProp
  xl?: ColSizeProp
  xxl?: ColSizeProp
}

export const Col = ({ children, className, col = 3, sm, md, lg, xl, xxl, ...restProps }: ColType): JSX.Element => (
  <div
    className={classNames(
      `col-span-${col}`,
      sm && `sm:col-span-${sm}`,
      md && `md:col-span-${md}`,
      lg && `lg:col-span-${lg}`,
      xl && `xl:col-span-${xl}`,
      xxl && `2xl:col-span-${xxl}`,
      className
    )}
    {...restProps}
  >
    {children}
  </div>
)
