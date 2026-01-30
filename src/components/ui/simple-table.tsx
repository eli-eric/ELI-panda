import * as React from 'react'

import { cn } from '@/lib/utils'

/**
 * Simple table components for basic tables (not TanStack Table)
 * Use these for simple data display without sorting/filtering/pagination
 */

const TableContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={cn('border rounded-md overflow-hidden', className)} {...props} />
    ),
)
TableContainer.displayName = 'TableContainer'

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
    ({ className, ...props }, ref) => (
        <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
    ),
)
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
    <thead ref={ref} className={cn('bg-muted/50', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
    HTMLTableSectionElement,
    React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => <tbody ref={ref} className={className} {...props} />)
TableBody.displayName = 'TableBody'

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
    ({ className, ...props }, ref) => (
        <tr ref={ref} className={cn('border-b last:border-b-0', className)} {...props} />
    ),
)
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
    HTMLTableCellElement,
    React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <th ref={ref} className={cn('px-4 py-3 text-left text-sm font-medium', className)} {...props} />
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
    HTMLTableCellElement,
    React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
    <td ref={ref} className={cn('px-4 py-3', className)} {...props} />
))
TableCell.displayName = 'TableCell'

export { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow }
