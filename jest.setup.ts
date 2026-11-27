/// <reference types="jest" />
import '@testing-library/jest-dom'

// Suppress known-noisy errors in tests. These are not bugs:
// - "Query data cannot be undefined": expected when disabled queries return undefined.
// - "Not implemented: navigation": jsdom limitation for anchor click navigation.
// - "@formatjs/intl Error MISSING_TRANSLATION": intentional fallback in tests using
//   raw message IDs as placeholder text.
const SUPPRESSED_ERROR_PATTERNS = [
    'Query data cannot be undefined',
    'Not implemented: navigation',
    '[@formatjs/intl Error MISSING_TRANSLATION]',
]

const isSuppressed = (msg: unknown): boolean => {
    if (typeof msg === 'string') {
        return SUPPRESSED_ERROR_PATTERNS.some(p => msg.includes(p))
    }
    // Duck-typed Error check: jsdom emits errors from a different realm,
    // so `instanceof Error` returns false. Match on `.message` instead.
    if (msg && typeof msg === 'object' && typeof (msg as { message?: unknown }).message === 'string') {
        const m = (msg as { message: string }).message
        return SUPPRESSED_ERROR_PATTERNS.some(p => m.includes(p))
    }
    return false
}

// eslint-disable-next-line no-console
const originalError = console.error
beforeAll(() => {
    // eslint-disable-next-line no-console
    console.error = (...args: any[]) => {
        if (isSuppressed(args[0])) return
        originalError.call(console, ...args)
    }
})

afterAll(() => {
    // eslint-disable-next-line no-console
    console.error = originalError
})

// Mock window.matchMedia for components that use media queries (e.g., Embla Carousel).
// This setup file runs for every suite, including the server-side ones that opt into
// `@jest-environment node`, where there is no `window` to define anything on.
if (typeof window !== 'undefined') {
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
}

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

// Polyfill crypto.randomUUID for jsdom — delegate to node:crypto for a real UUID
if (typeof globalThis.crypto !== 'undefined' && !globalThis.crypto.randomUUID) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const nodeCrypto = require('node:crypto') as { randomUUID: () => string }
    Object.defineProperty(globalThis.crypto, 'randomUUID', {
        value: () => nodeCrypto.randomUUID(),
        configurable: true,
    })
}

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
