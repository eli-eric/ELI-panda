export * from './Disclosure'
export { Table } from './table'

// Note: We are currently refactoring the table component structure.
// Table is exported from either './Table.tsx' or './table/index.ts'
// depending on which version you're using. Both exports are provided
// during the transition to ensure backward compatibility.
export type { TableProps } from './table/types'
