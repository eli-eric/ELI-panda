// Mock the constants module so we can flip PROCESS_ENV per test
jest.mock('@/types/constants/common', () => ({
    ENV: { DEV: 'dev', TEST: 'test', LOCAL: 'localhost', PRODUCTION: 'production' },
    PROCESS_ENV: 'dev', // initial value, overridden via jest.resetModules + jest.doMock
}))

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { ENV } = require('@/types/constants/common')

type EnvModule = typeof import('../utils')

const loadWithEnv = (envValue?: string): EnvModule => {
    jest.resetModules()
    jest.doMock('@/types/constants/common', () => ({
        ENV,
        PROCESS_ENV: envValue,
    }))
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('../utils')
}

describe('environment predicates', () => {
    it.each([
        ['production', 'isProductionEnvironment'],
        ['dev', 'isDevelopmentEnvironment'],
        ['test', 'isTestEnvironment'],
        ['localhost', 'isLocalEnvironment'],
    ] as const)('only %s passes %s', (envValue, predicate) => {
        const mod = loadWithEnv(envValue)
        expect(mod[predicate as keyof EnvModule]()).toBe(true)
    })

    it('shouldShowEnvironmentWarning false in production', () => {
        const mod = loadWithEnv('production')
        expect(mod.shouldShowEnvironmentWarning()).toBe(false)
    })

    it('shouldShowEnvironmentWarning false on localhost', () => {
        const mod = loadWithEnv('localhost')
        expect(mod.shouldShowEnvironmentWarning()).toBe(false)
    })

    it('shouldShowEnvironmentWarning true in dev/test on client', () => {
        const devMod = loadWithEnv('dev')
        expect(devMod.shouldShowEnvironmentWarning()).toBe(true)
        const testMod = loadWithEnv('test')
        expect(testMod.shouldShowEnvironmentWarning()).toBe(true)
    })
})

describe('getEnvironmentColor / getEnvironmentDisplayName', () => {
    it('dev returns amber theme + DEVELOPMENT name', () => {
        const mod = loadWithEnv('dev')
        const color = mod.getEnvironmentColor()
        expect(color.name).toBe('DEVELOPMENT')
        expect(color.text).toContain('amber')
        expect(mod.getEnvironmentDisplayName()).toBe('DEVELOPMENT')
    })

    it('test returns amber theme + TESTING name', () => {
        const mod = loadWithEnv('test')
        expect(mod.getEnvironmentColor().name).toBe('TESTING')
    })

    it('production returns empty theme + PRODUCTION name', () => {
        const mod = loadWithEnv('production')
        const color = mod.getEnvironmentColor()
        expect(color).toEqual({
            bg: '',
            border: '',
            text: '',
            modalBg: '',
            name: 'PRODUCTION',
        })
    })
})

describe('getSwaggerApiDocsUrl', () => {
    it.each([
        ['dev', 'api-dev'],
        ['test', 'api-test'],
        ['production', 'panda.eli-beams.eu'],
    ])('routes %s -> %s', (envValue, fragment) => {
        const mod = loadWithEnv(envValue)
        expect(mod.getSwaggerApiDocsUrl()).toContain(fragment)
    })
})
