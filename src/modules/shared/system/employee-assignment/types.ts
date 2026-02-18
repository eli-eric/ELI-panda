export interface EmployeeAssignment {
    uid: string
    fullName?: string | null
    name?: string | null
    phone1?: string | null
    phone2?: string | null
}

export type EmployeeAssignmentType = 'operators' | 'maintainedBy'
