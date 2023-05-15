import React from 'react'

import { classNames } from '@/helpers'

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
      `grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12`,
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

const colSizes: Record<ColSizeProp, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
  5: 'col-span-5',
  6: 'col-span-6',
  7: 'col-span-7',
  8: 'col-span-8',
  9: 'col-span-9',
  10: 'col-span-10',
  11: 'col-span-11',
  12: 'col-span-12',
  full: 'col-span-full'
}

interface ColType extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  sm?: ColSizeProp
  md?: ColSizeProp
  lg?: ColSizeProp
  xl?: ColSizeProp
  xxl?: ColSizeProp
}

export const Col = ({ children, className, sm: col = 3, md, lg, xl, xxl, ...restProps }: ColType): JSX.Element => (
  <div
    className={classNames(
      colSizes[col],
      md && `md:${colSizes[md]}`,
      lg && `lg:${colSizes[lg]}`,
      xl && `xl:${colSizes[xl]}`,
      xxl && `xxl:${colSizes[xxl]}`,
      className
    )}
    {...restProps}
  >
    {children}
  </div>
)
