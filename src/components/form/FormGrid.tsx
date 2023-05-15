import cx from 'classnames'
import React from 'react'

import { classNames } from '@/helpers'

interface FormGridPropsT extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  horizontalSpacing?: number
  verticalSpacing?: number
}

export const FormGrid = ({
  children,
  className,
  verticalSpacing = 4,
  horizontalSpacing = 2,
  ...restProps
}: FormGridPropsT): JSX.Element => (
  <div
    className={classNames(
      'grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12',
      `gap-y-${verticalSpacing}`,
      `gap-x-${horizontalSpacing}`,
      className
    )}
    {...restProps}
  >
    {children}
  </div>
)
type ColSizeProp = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full'

interface ColType extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  col?: ColSizeProp
  sm?: ColSizeProp
  md?: ColSizeProp
  lg?: ColSizeProp
  xl?: ColSizeProp
  xxl?: ColSizeProp
}

export const Col = ({ children, col = 3, sm, md, lg, xl, xxl, ...rest }: ColType): JSX.Element => (
  <div
    className={cx(
      `col-span-${col}`,
      sm && `sm:col-span-${sm}`,
      md && `md:col-span-${md}`,
      lg && `lg:col-span-${lg}`,
      xl && `xl:col-span-${xl}`,
      xxl && `xxl:col-span-${xxl}`,
      { ...rest }
    )}
  >
    {children}
  </div>
)
