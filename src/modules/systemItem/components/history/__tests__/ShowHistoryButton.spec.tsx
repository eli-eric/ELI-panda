import { fireEvent, render, screen } from '@testing-library/react'
import { useRouter } from 'next/router'

import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { ShowHistoryButton } from '../ShowHistoryButton'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}))

jest.mock('@/store/useDynamicModalStore', () => ({
    useDynamicModalStore: Object.assign(jest.fn(), { getState: jest.fn() }),
}))

jest.mock('../HistoryFeeds', () => ({
    HistoryFeeds: () => null,
}))

const mockUseRouter = useRouter as jest.Mock
const mockUseDynamicModalStore = useDynamicModalStore as unknown as jest.Mock & {
    getState: jest.Mock
}

let openModal: jest.Mock

beforeEach(() => {
    jest.clearAllMocks()
    openModal = jest.fn().mockReturnValue('hist-modal-id')
    mockUseDynamicModalStore.getState.mockReturnValue({ openModal })
    mockUseRouter.mockReturnValue({ query: { uid: 'sys-7' } })
})

describe('ShowHistoryButton', () => {
    it('renders a button', () => {
        render(<ShowHistoryButton />)
        expect(screen.getByRole('button')).toBeInTheDocument()
    })

    it('click opens history dialog keyed by router.query.uid', () => {
        render(<ShowHistoryButton />)
        fireEvent.click(screen.getByRole('button'))
        const [kind, config] = openModal.mock.calls[0]
        expect(kind).toBe('dialog')
        expect(config.id).toBe('item-history-sys-7')
        expect(config.props).toEqual({ title: 'History', size: 'l' })
    })
})
