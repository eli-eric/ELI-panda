import { useDynamicModalStore } from '@/store/useDynamicModalStore'

import { openExtraLargeModal, openLargeModal, openModal, openSmallModal } from '../modalHelpers'

jest.mock('@/store/useDynamicModalStore', () => ({
  useDynamicModalStore: {
    getState: jest.fn(),
  },
}))

const mockOpenModal = jest.fn().mockReturnValue('modal-id-1')
const mockGetState = useDynamicModalStore.getState as jest.Mock

beforeEach(() => {
  jest.clearAllMocks()
  mockGetState.mockReturnValue({ openModal: mockOpenModal })
})

const DummyComponent = () => null

describe('openModal', () => {
  it('calls store openModal with dialog type', () => {
    openModal(DummyComponent)
    expect(mockOpenModal).toHaveBeenCalledWith(
      'dialog',
      expect.objectContaining({
        component: DummyComponent,
        id: 'modal-helper-dialog',
      }),
    )
  })

  it('passes props and options', () => {
    openModal(DummyComponent, { foo: 'bar' }, { title: 'Test', size: 'xl' })
    expect(mockOpenModal).toHaveBeenCalledWith(
      'dialog',
      expect.objectContaining({
        props: expect.objectContaining({
          foo: 'bar',
          title: 'Test',
          size: 'xl',
        }),
      }),
    )
  })

  it('uses custom id when provided', () => {
    openModal(DummyComponent, {}, { id: 'custom-id' })
    expect(mockOpenModal).toHaveBeenCalledWith(
      'dialog',
      expect.objectContaining({ id: 'custom-id' }),
    )
  })

  it('returns modal id', () => {
    const id = openModal(DummyComponent)
    expect(id).toBe('modal-id-1')
  })
})

describe('openSmallModal', () => {
  it('opens with size m', () => {
    openSmallModal(DummyComponent)
    expect(mockOpenModal).toHaveBeenCalledWith(
      'dialog',
      expect.objectContaining({
        props: expect.objectContaining({ size: 'm' }),
      }),
    )
  })
})

describe('openLargeModal', () => {
  it('opens with size l', () => {
    openLargeModal(DummyComponent)
    expect(mockOpenModal).toHaveBeenCalledWith(
      'dialog',
      expect.objectContaining({
        props: expect.objectContaining({ size: 'l' }),
      }),
    )
  })
})

describe('openExtraLargeModal', () => {
  it('opens with size xl', () => {
    openExtraLargeModal(DummyComponent)
    expect(mockOpenModal).toHaveBeenCalledWith(
      'dialog',
      expect.objectContaining({
        props: expect.objectContaining({ size: 'xl' }),
      }),
    )
  })
})
