import { act, fireEvent, render } from '@testing-library/react'

import { PandaTableContext } from '../../../PandaTableCotrolled'
import { DefferedInput } from '../DefferedInput'

const wrap = (manualFiltering: boolean, ui: React.ReactNode) => (
    <PandaTableContext.Provider
        value={{ settings: { manualFiltering }, tableId: 't', loading: false } as any}
    >
        {ui}
    </PandaTableContext.Provider>
)

beforeEach(() => {
    jest.useFakeTimers()
})

afterEach(() => {
    jest.useRealTimers()
})

describe('DefferedInput', () => {
    it('uses initial value as input value', () => {
        const { container } = render(
            wrap(false, <DefferedInput value="hello" onChange={jest.fn()} />),
        )
        expect((container.querySelector('input') as HTMLInputElement).value).toBe('hello')
    })

    it('mirrors initialValue prop changes back to input', () => {
        const { container, rerender } = render(
            wrap(false, <DefferedInput value="a" onChange={jest.fn()} />),
        )
        rerender(wrap(false, <DefferedInput value="b" onChange={jest.fn()} />))
        expect((container.querySelector('input') as HTMLInputElement).value).toBe('b')
    })

    it('manualFiltering=false → onChange fires synchronously per keystroke', () => {
        const onChange = jest.fn()
        const { container } = render(
            wrap(false, <DefferedInput value="" onChange={onChange} />),
        )
        const input = container.querySelector('input') as HTMLInputElement
        fireEvent.change(input, { target: { value: 'x' } })
        expect(onChange).toHaveBeenCalledWith('x')
    })

    it('manualFiltering=true → onChange debounced ~500ms', () => {
        const onChange = jest.fn()
        const { container } = render(
            wrap(true, <DefferedInput value="" onChange={onChange} />),
        )
        const input = container.querySelector('input') as HTMLInputElement
        fireEvent.change(input, { target: { value: 'x' } })
        expect(onChange).not.toHaveBeenCalled()
        act(() => {
            jest.advanceTimersByTime(500)
        })
        expect(onChange).toHaveBeenCalledWith('x')
    })

    it('passes className through', () => {
        const { container } = render(
            wrap(false, <DefferedInput value="" onChange={jest.fn()} className="my-cls" />),
        )
        expect((container.querySelector('input') as HTMLInputElement).className).toContain(
            'my-cls',
        )
    })
})
