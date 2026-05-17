import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { CodebookInlineEdit } from '../CodebookInlineEdit'

describe('CodebookInlineEdit', () => {
    it('renders value as a button initially (not editing)', () => {
        render(<CodebookInlineEdit value="My Value" onSave={jest.fn()} />)
        const btn = screen.getByRole('button')
        expect(btn).toHaveTextContent('My Value')
    })

    it('clicking the value enters edit mode', () => {
        render(<CodebookInlineEdit value="X" onSave={jest.fn()} />)
        fireEvent.click(screen.getByRole('button'))
        expect(screen.getByRole('textbox')).toBeInTheDocument()
    })

    it('Save button disabled when editValue is empty', () => {
        render(<CodebookInlineEdit value="X" onSave={jest.fn()} />)
        fireEvent.click(screen.getByRole('button', { name: 'X' }))
        fireEvent.change(screen.getByRole('textbox'), { target: { value: '   ' } })
        // First button: Save (green); second button: Cancel
        const saveBtn = screen.getAllByRole('button')[0]
        expect(saveBtn).toBeDisabled()
    })

    it('Enter key triggers save with trimmed value', async () => {
        const onSave = jest.fn().mockResolvedValue(undefined)
        render(<CodebookInlineEdit value="Old" onSave={onSave} />)
        fireEvent.click(screen.getByRole('button', { name: 'Old' }))
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: '  New  ' } })
        fireEvent.keyDown(input, { key: 'Enter' })
        await waitFor(() => expect(onSave).toHaveBeenCalledWith('New'))
    })

    it('Escape key cancels edit + restores value', () => {
        render(<CodebookInlineEdit value="Old" onSave={jest.fn()} />)
        fireEvent.click(screen.getByRole('button', { name: 'Old' }))
        const input = screen.getByRole('textbox')
        fireEvent.change(input, { target: { value: 'changed' } })
        fireEvent.keyDown(input, { key: 'Escape' })
        // back to view mode showing original value
        expect(screen.getByRole('button', { name: 'Old' })).toBeInTheDocument()
    })

    it('save no-op when value unchanged (exits edit without onSave)', async () => {
        const onSave = jest.fn()
        render(<CodebookInlineEdit value="Same" onSave={onSave} />)
        fireEvent.click(screen.getByRole('button', { name: 'Same' }))
        const input = screen.getByRole('textbox')
        fireEvent.keyDown(input, { key: 'Enter' })
        // value unchanged -> still no onSave, back to view
        expect(onSave).not.toHaveBeenCalled()
        expect(screen.getByRole('button', { name: 'Same' })).toBeInTheDocument()
    })

    it('input disabled when isPending=true', () => {
        render(<CodebookInlineEdit value="X" onSave={jest.fn()} isPending />)
        fireEvent.click(screen.getByRole('button', { name: 'X' }))
        expect(screen.getByRole('textbox')).toBeDisabled()
    })

    it('external value change syncs editValue', async () => {
        const { rerender } = render(<CodebookInlineEdit value="A" onSave={jest.fn()} />)
        rerender(<CodebookInlineEdit value="B" onSave={jest.fn()} />)
        expect(screen.getByRole('button', { name: 'B' })).toBeInTheDocument()
    })
})
