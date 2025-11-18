import React from 'react'

import { cn } from '@/lib/utils'

import type {
  ColSizeProp,
  HorizontalSpacing,
  VerticalSpacing
} from './ColSizes'
import {
  COL_SIZES,
  HORIZONTAL_SPACING_CLASSES,
  LG_COL_SIZES,
  MD_COL_SIZES,
  VERTICAL_SPACING_CLASSES
} from './ColSizes'

interface GridPropsT extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string

  /**
   * Horizontal spacing between columns (gap-x)
   * @default 2
   */
  horizontalSpacing?: HorizontalSpacing
  /**
   * Vertical spacing between rows (gap-y)
   * @default 4
   */
  verticalSpacing?: VerticalSpacing
}

/**
 * Grid component with responsive column layout
 * - 3 columns on mobile
 * - 6 columns on medium screens (md)
 * - 12 columns on large screens (lg)
 *
 * @example
 * ```tsx
 * <Grid verticalSpacing={4} horizontalSpacing={2}>
 *   <Col sm={3} md={6} lg={12}>Content</Col>
 * </Grid>
 * ```
 */
export const Grid: React.FC<GridPropsT> = ({
  children,
  className,
  verticalSpacing = 4,
  horizontalSpacing = 2,
  ...restProps
}) => {
  // Fallback to default if unsupported value provided
  const vSpacingClass =
    VERTICAL_SPACING_CLASSES[verticalSpacing] || VERTICAL_SPACING_CLASSES[4]
  const hSpacingClass =
    HORIZONTAL_SPACING_CLASSES[horizontalSpacing] ||
    HORIZONTAL_SPACING_CLASSES[2]

  return (
    <div
      className={cn(
        'grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12',
        vSpacingClass,
        hSpacingClass,
        className
      )}
      {...restProps}
    >
      {children}
    </div>
  )
}

interface ColType extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  /**
   * Column span on small screens (default breakpoint)
   * Maps to col-span-{value} classes
   * @default 3
   */
  sm?: ColSizeProp
  /**
   * Column span on medium screens (md breakpoint)
   * Maps to md:col-span-{value} classes
   */
  md?: ColSizeProp
  /**
   * Column span on large screens (lg breakpoint)
   * Maps to lg:col-span-{value} classes
   */
  lg?: ColSizeProp
}

/**
 * Column component for use within Grid
 * Provides responsive column spanning with flex display by default
 *
 * @example
 * ```tsx
 * <Grid>
 *   <Col sm={3} md={6} lg={4}>
 *     <div>Content</div>
 *   </Col>
 * </Grid>
 * ```
 */
export const Col: React.FC<ColType> = ({
  children,
  className,
  sm: col = 3,
  md,
  lg,
  ...restProps
}) => (
  <div
    className={cn(
      col && COL_SIZES[col],
      md && MD_COL_SIZES[md],
      lg && LG_COL_SIZES[lg],
      'flex',
      className
    )}
    {...restProps}
  >
    {children}
  </div>
)
