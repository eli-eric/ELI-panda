/// <reference types="jest" />
import '@testing-library/jest-dom'

import { fireEvent, render, screen } from '@testing-library/react'

// Mock this if needed
import { SlideOverNavigation } from '../SlideOverNavigation'

beforeAll(() => {
  // Mock ResizeObserver to prevent errors during tests
  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn()
  }))
})

// Mock DarkModeSwitch if necessary
jest.mock('@/components/DarkModeSwitch', () => ({
  DarkModeSwitch: () => <div>Mocked DarkModeSwitch</div>
}))

describe('SlideOverNavigation', () => {
  it('renders the SlideOverNavigation when open is true', () => {
    const setOpen = jest.fn()

    render(
      <SlideOverNavigation open={true} setOpen={setOpen}>
        <div>Test Content</div>
      </SlideOverNavigation>
    )

    // Check that the content is rendered
    expect(screen.getByText('Test Content')).toBeInTheDocument()

    // Check that the DarkModeSwitch is rendered
    expect(screen.getByText('Mocked DarkModeSwitch')).toBeInTheDocument()
  })

  it('does not render the SlideOverNavigation when open is false', () => {
    const setOpen = jest.fn()

    render(
      <SlideOverNavigation open={false} setOpen={setOpen}>
        <div>Test Content</div>
      </SlideOverNavigation>
    )

    // Check that the content is not rendered
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument()
  })

  it('calls setOpen with false when the close button is clicked', () => {
    const setOpen = jest.fn()

    render(
      <SlideOverNavigation open={true} setOpen={setOpen}>
        <div>Test Content</div>
      </SlideOverNavigation>
    )

    // Click the close button
    const closeButton = screen.getByRole('button', { name: /close panel/i })
    fireEvent.click(closeButton)

    // Expect setOpen to be called with false
    expect(setOpen).toHaveBeenCalledWith(false)
  })

  it('positions the panel correctly based on panelSlide prop', () => {
    const setOpen = jest.fn()

    const { rerender } = render(
      <SlideOverNavigation open={true} setOpen={setOpen} panelSlide="left">
        <div>Test Content</div>
      </SlideOverNavigation>
    )

    // Check that the panel is positioned on the left
    let panel = screen
      .getByRole('dialog')
      .querySelector('.fixed.inset-y-0.flex.w-72')
    expect(panel).toHaveClass('left-0')

    // Rerender with panelSlide set to "right"
    rerender(
      <SlideOverNavigation open={true} setOpen={setOpen} panelSlide="right">
        <div>Test Content</div>
      </SlideOverNavigation>
    )

    // Check that the panel is positioned on the right
    panel = screen
      .getByRole('dialog')
      .querySelector('.fixed.inset-y-0.flex.w-72')
    expect(panel).toHaveClass('right-0')
  })
})
