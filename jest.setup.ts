/// <reference types="jest" />
import '@testing-library/jest-dom'

// Suppress React Query "undefined data" warnings in tests
// This happens when testing disabled queries - it's expected behavior
// eslint-disable-next-line no-console
const originalError = console.error
beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = (...args: any[]) => {
        if (typeof args[0] === 'string' && args[0].includes('Query data cannot be undefined')) {
            return
        }
        originalError.call(console, ...args)
    }
})

afterAll(() => {
    // eslint-disable-next-line no-console
    console.error = originalError
})

// Mock window.matchMedia for components that use media queries (e.g., Embla Carousel)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
})

// Mock IntersectionObserver for components that use it (e.g., Embla Carousel)
/* eslint-disable @typescript-eslint/no-empty-function */
global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    takeRecords() {
        return []
    }
    unobserve() {}
} as any

// Mock ResizeObserver for components that use it (e.g., Embla Carousel)
global.ResizeObserver = class ResizeObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
} as any
/* eslint-enable @typescript-eslint/no-empty-function */

// Polyfill DOMRect for radix-ui context menu in jsdom
if (typeof globalThis.DOMRect === 'undefined') {
    globalThis.DOMRect = class DOMRect {
        x = 0
        y = 0
        width = 0
        height = 0
        top = 0
        right = 0
        bottom = 0
        left = 0
        constructor(x = 0, y = 0, width = 0, height = 0) {
            this.x = x
            this.y = y
            this.width = width
            this.height = height
            this.top = y
            this.right = x + width
            this.bottom = y + height
            this.left = x
        }
        toJSON() {
            return {
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                top: this.top,
                right: this.right,
                bottom: this.bottom,
                left: this.left,
            }
        }
        static fromRect(rect?: { x?: number; y?: number; width?: number; height?: number }) {
            return new DOMRect(rect?.x, rect?.y, rect?.width, rect?.height)
        }
    } as any
}
