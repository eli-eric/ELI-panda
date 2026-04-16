/**
 * Test utilities for module tests across the app.
 *
 * ## `require()` + `eslint-disable` pattern in specs
 *
 * Many new spec files import the system under test via:
 *
 *     jest.mock('some/dep', () => ...)
 *     // eslint-disable-next-line @typescript-eslint/no-require-imports
 *     const { SUT } = require('../path/to/sut')
 *
 * This deliberately delays loading the module until AFTER `jest.mock` factories
 * are registered. Jest hoists `jest.mock` calls to the top of the file, but with
 * ES `import` statements the imported module is also resolved eagerly — which can
 * cause mocks to fire too late if the file being tested reads a mocked dependency
 * at module evaluation time. `require` inside the spec body defers the load,
 * ensuring the mocks are in place when the SUT is first evaluated.
 *
 * If the SUT has no module-level side effects that touch mocked deps, a regular
 * `import` is fine. Use the `require` form only when needed.
 */
export { FormWrapper } from './components/FormWrapper'
export {
    makeCatalogueDetail,
    makeCatalogueItem,
    makeCategoryProperty,
    makeCodebook,
} from './factories/catalogue'
export { makeOrder, makeOrderLine, makeServiceLine } from './factories/orderItem'
export {
    mockDynamicModalStore,
    mockNextRouter,
    mockReactIntlShorthand,
    mockSonner,
    mockUsePermission,
} from './mocks/common'
export { AllProvidersWrapper } from './wrappers/AllProvidersWrapper'
export {
    createTestQueryClient,
    QueryClientWrapper,
} from './wrappers/QueryClientWrapper'
export {
    renderHookWithProviders,
    renderHookWithQuery,
    renderWithProviders,
} from './wrappers/renderWithProviders'
