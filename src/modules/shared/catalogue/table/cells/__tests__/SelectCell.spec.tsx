import { fireEvent, render, screen } from '@testing-library/react'

import { SelectCell } from '../SelectCell'

const cell = (uid: string, setItem: jest.Mock, selectedItem?: { uid: string }) =>
    ({
        row: { original: { uid, name: `n-${uid}` } } as any,
        setItem,
        selectedItem,
    }) as any

describe('SelectCell', () => {
    it('radio unchecked when selectedItem differs', () => {
        const setItem = jest.fn()
        render(<SelectCell {...cell('a', setItem, { uid: 'b' })} />)
        expect((screen.getByRole('radio') as HTMLInputElement).checked).toBe(false)
    })

    it('radio checked when selectedItem matches uid', () => {
        const setItem = jest.fn()
        render(<SelectCell {...cell('a', setItem, { uid: 'a' })} />)
        expect((screen.getByRole('radio') as HTMLInputElement).checked).toBe(true)
    })

    it('change invokes setItem with row.original', () => {
        const setItem = jest.fn()
        render(<SelectCell {...cell('a', setItem)} />)
        fireEvent.click(screen.getByRole('radio'))
        expect(setItem).toHaveBeenCalledWith({ uid: 'a', name: 'n-a' })
    })

    it('radio id uses side-{uid} pattern', () => {
        render(<SelectCell {...cell('xyz', jest.fn())} />)
        expect(screen.getByRole('radio').getAttribute('id')).toBe('side-xyz')
    })
})
