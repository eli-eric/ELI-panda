import { render, screen } from '@testing-library/react'

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableHeader,
    TableRow,
} from '../simple-table'

describe('ui/simple-table', () => {
    it('renders a full simple table tree', () => {
        render(
            <TableContainer data-testid="container">
                <Table data-testid="table">
                    <TableHeader data-testid="header">
                        <TableRow>
                            <TableHead>Col A</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody data-testid="body">
                        <TableRow>
                            <TableCell>Cell A</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>,
        )
        expect(screen.getByTestId('container').tagName).toBe('DIV')
        expect(screen.getByTestId('table').tagName).toBe('TABLE')
        expect(screen.getByTestId('header').tagName).toBe('THEAD')
        expect(screen.getByTestId('body').tagName).toBe('TBODY')
        expect(screen.getByText('Col A').tagName).toBe('TH')
        expect(screen.getByText('Cell A').tagName).toBe('TD')
    })

    it('Container applies border + rounded classes', () => {
        const { container } = render(<TableContainer />)
        expect(container.firstChild).toHaveClass('border', 'rounded-md')
    })

    it('Table applies w-full + text-sm', () => {
        const { container } = render(<Table />)
        expect(container.firstChild).toHaveClass('w-full', 'text-sm')
    })

    it('TableRow has border-b utility', () => {
        const { container } = render(
            <table>
                <tbody>
                    <TableRow />
                </tbody>
            </table>,
        )
        expect(container.querySelector('tr')).toHaveClass('border-b')
    })

    it('component classNames append over defaults', () => {
        const { container } = render(<Table className="extra" />)
        expect(container.firstChild).toHaveClass('extra')
    })
})
