import { render, screen } from '@testing-library/react'

import { renderWithProviders } from '@/testutils/wrappers/renderWithProviders'

import { DepartmentListbox } from '../department.listbox'

jest.mock('@/components/form/Listbox', () => ({
    __esModule: true,
    default: (props: any) => (
        <div
            data-testid="listbox"
            data-name={props.name}
            data-disabled={String(!!props.disabled)}
            data-codebook={props.codebook}
            data-placeholder={props.placeholder}
            data-label={props.label}
            data-classname={props.className}
        />
    ),
}))

describe('DepartmentListbox', () => {
    it('forwards name + disabled + codebook + classNames', () => {
        renderWithProviders(<DepartmentListbox name="dept" disabled={false} />)
        const lb = screen.getByTestId('listbox')
        expect(lb.dataset.name).toBe('dept')
        expect(lb.dataset.disabled).toBe('false')
        // codebook value is the enum string for DEPARTMENT
        expect(lb.dataset.codebook).toBeDefined()
        // col-span-6 fixed
        expect(lb.dataset.classname).toBe('col-span-6')
    })

    it('disabled flag passes through', () => {
        renderWithProviders(<DepartmentListbox name="dept" disabled={true} />)
        expect(screen.getByTestId('listbox').dataset.disabled).toBe('true')
    })
})
