# E2E Testing Guide (Playwright)

## Overview

This project uses deterministic E2E tests with mocked network responses.
The goal is stable and fast tests without dependency on external API state.

## Reusable Mocking Mechanism

### 1) Common app-level mocks

- File: `e2e/helpers/app.ts`
- Purpose: Registers shared mocks used by all tests (NextAuth session by default).

### 2) Generic network mocking helper

- File: `e2e/helpers/network.ts`
- Purpose: Reusable router for:
    - REST endpoints (`restHandlers`)
    - GraphQL operations (`graphQLHandlers`)

GraphQL is dispatched by operation name (`query Foo` / `mutation Bar`) so each test module can define only operations it needs.

### 3) Module-specific mock setup

- File example: `e2e/helpers/systemHierarchyMocks.ts`
- Purpose: Uses `setupNetworkMocks(...)` and maps module endpoints + GraphQL operations to fixture data.

### 4) Fixture data

- File example: `e2e/fixtures/systemHierarchy.mock.ts`
- Purpose: Single source of deterministic test data for the module.

## How to Add New Module Tests

1. Add fixture data in `e2e/fixtures/<module>.mock.ts`.
2. Create `<module>Mocks.ts` in `e2e/helpers/` and register REST + GraphQL handlers.
3. Reuse shared page fixture from `e2e/fixtures/test.ts`.
4. Keep tests in `e2e/<module>/` and use `*.e2e.ts` naming.

## Auth and Roles Mocking

- File: `e2e/helpers/auth.ts`
- Function: `mockNextAuthSession(page, { roles })`
- Default roles include: `basics`, `systems-view`, `system-edit`.
- Override roles per test when needed.

## Useful Commands

- `yarn e2e` - run E2E tests
- `yarn e2e:headed` - run with visible browser
- `yarn e2e:ui` - run in Playwright UI mode
- `yarn e2e:report` - open HTML report
- `yarn e2e:install` - install Chromium for Playwright
