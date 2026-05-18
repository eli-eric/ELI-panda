const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

const ESM_PACKAGES_TO_TRANSFORM = [
    'react-dnd',
    'dnd-core',
    '@react-dnd',
    'd3-force',
    'd3-dispatch',
    'd3-quadtree',
    'd3-timer',
]

const customJestConfig = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^src/(.*)$': '<rootDir>/src/$1',
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/'],
}

// next/jest appends its default transformIgnorePatterns alongside ours and Jest
// OR-joins them, so its catch-all node_modules rule silently re-ignores the ESM
// packages we listed. Resolve the next/jest config first, then fully replace
// transformIgnorePatterns with one entry expressing our intent.
module.exports = async () => {
    const baseConfig = await createJestConfig(customJestConfig)()
    return {
        ...baseConfig,
        transformIgnorePatterns: [
            '^.+\\.module\\.(css|sass|scss)$',
            `/node_modules/(?!(${ESM_PACKAGES_TO_TRANSFORM.join('|')})/).+\\.(js|mjs|cjs)$`,
        ],
    }
}
