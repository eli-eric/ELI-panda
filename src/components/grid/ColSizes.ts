/**
 * Column span value type for Grid system
 * Supports numeric values 1-12 or 'full' for full-width columns
 */
export type ColSizeProp = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 'full'

/**
 * Supported vertical spacing values (gap-y in Tailwind spacing scale)
 * Used for vertical gaps between grid rows
 */
export type VerticalSpacing = 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12

/**
 * Supported horizontal spacing values (gap-x in Tailwind spacing scale)
 * Used for horizontal gaps between grid columns
 */
export type HorizontalSpacing = 1 | 2 | 3 | 4 | 5 | 6 | 8

/**
 * Column span classes for default (small) breakpoint
 * Maps column span values to Tailwind col-span-* classes
 */
export const COL_SIZES = {
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
    full: 'col-span-full',
} as const satisfies Record<ColSizeProp, string>

/**
 * Column span classes for medium breakpoint (md)
 * Maps column span values to Tailwind md:col-span-* classes
 */
export const MD_COL_SIZES = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
    full: 'md:col-span-full',
} as const satisfies Record<ColSizeProp, string>

/**
 * Column span classes for large breakpoint (lg)
 * Maps column span values to Tailwind lg:col-span-* classes
 */
export const LG_COL_SIZES = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: 'lg:col-span-12',
    full: 'lg:col-span-full',
} as const satisfies Record<ColSizeProp, string>

/**
 * Vertical spacing classes for Grid component
 * Maps spacing values to predefined Tailwind gap-y classes
 * to ensure they're included in the production bundle
 */
export const VERTICAL_SPACING_CLASSES = {
    1: 'gap-y-1',
    2: 'gap-y-2',
    3: 'gap-y-3',
    4: 'gap-y-4',
    5: 'gap-y-5',
    6: 'gap-y-6',
    8: 'gap-y-8',
    10: 'gap-y-10',
    12: 'gap-y-12',
} as const satisfies Record<VerticalSpacing, string>

/**
 * Horizontal spacing classes for Grid component
 * Maps spacing values to predefined Tailwind gap-x classes
 * to ensure they're included in the production bundle
 */
export const HORIZONTAL_SPACING_CLASSES = {
    1: 'gap-x-1',
    2: 'gap-x-2',
    3: 'gap-x-3',
    4: 'gap-x-4',
    5: 'gap-x-5',
    6: 'gap-x-6',
    8: 'gap-x-8',
} as const satisfies Record<HorizontalSpacing, string>
