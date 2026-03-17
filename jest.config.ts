const nextJest = require('next/jest')

const createJestConfig = nextJest({
    dir: './',
})

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
    transformIgnorePatterns: ['/node_modules/(?!react-dnd|dnd-core|@react-dnd|d3-force|d3-dispatch|d3-quadtree|d3-timer).+\\.js$'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/e2e/'],
}

module.exports = createJestConfig(customJestConfig)
