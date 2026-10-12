import type { Page } from '@playwright/test'

import { PUBLICATION_DOI, PUBLICATION_DOI_URL_INPUT } from '../fixtures/publicationDoi.mock'
import { expect, test } from '../fixtures/test'
import { mockNextAuthSession } from '../helpers/auth'
import { setupPublicationDoiNetworkMocks } from '../helpers/publicationDoiMocks'

const PUBLICATION_ROLES = ['basics', 'publications-view', 'publications-edit']

const researcherRadio = (page: Page, name: string) => page.getByRole('radio', { name, exact: true })
const fieldRow = (page: Page, field: string) => page.getByTestId(`wos-field-row-${field}`)
const authorRow = (page: Page, index: number) => page.getByTestId(`wos-import-author-${index}`)

test.describe('Publication Web of Science import', () => {
    test.beforeEach(async ({ page }) => {
        await mockNextAuthSession(page, { roles: PUBLICATION_ROLES })
        await setupPublicationDoiNetworkMocks(page)
        await page.goto('/publication')
        await expect(page.getByRole('heading', { name: 'NEW PUBLICATION' })).toBeVisible()
    })

    test('reviews values before applying them and does not save the publication', async ({
        page,
    }) => {
        const persistenceRequests: string[] = []
        page.on('request', request => {
            const pathname = new URL(request.url()).pathname
            if (
                /\/publication(?:\/[^/]+)?$/u.test(pathname) &&
                ['POST', 'PUT'].includes(request.method())
            ) {
                persistenceRequests.push(`${request.method()} ${pathname}`)
            }
        })

        const title = page.getByTestId('title')
        const doi = page.getByTestId('doi')
        await title.fill('Title entered by the librarian')
        await doi.fill(PUBLICATION_DOI_URL_INPUT)

        const lookupRequestPromise = page.waitForRequest(
            request =>
                /\/publications\/wos\/lookup/u.test(request.url()) && request.method() === 'GET',
        )
        await page.getByTestId('wos-import-button').click()
        const lookupRequest = await lookupRequestPromise

        // The DOI travels as a query parameter on a GET (ELIPANDA-412 / #438):
        // a cacheable read behind the publications-view role.
        expect(new URL(lookupRequest.url()).searchParams.get('doi')).toBe(PUBLICATION_DOI)

        const dialog = page.getByTestId('wos-import-dialog')
        await expect(dialog).toBeVisible()

        // Overwrites are offered, never pre-checked; empty destinations are.
        await expect(fieldRow(page, 'title').getByRole('checkbox')).not.toBeChecked()
        await expect(fieldRow(page, 'longJournalTitle').getByRole('checkbox')).toBeChecked()
        // Scope to the radio role: each author's radiogroup is aria-labelled
        // "…matching <displayName>", which substring-matches a candidate of the same name.
        await expect(researcherRadio(page, 'Lovelace, Ada')).toBeChecked()
        await expect(
            authorRow(page, 1).getByRole('radio', { name: 'Hopper, Grace' }),
        ).not.toBeChecked()

        await researcherRadio(page, 'Hopper, Grace').click()
        await dialog.getByRole('button', { name: /^Import \d+ fields$/u }).click()

        await expect(dialog).not.toBeVisible()
        // The unchecked overwrite keeps the librarian's title; empties fill.
        await expect(title).toHaveValue('Title entered by the librarian')
        await expect(doi).toHaveValue(PUBLICATION_DOI_URL_INPUT)
        await expect(page.getByRole('textbox', { name: /All Authors list/i })).toHaveValue(
            'Ada Lovelace; Hopper, Grace; Duplicate Person',
        )
        await expect(page.getByTestId('longJournalTitle')).toHaveValue(
            'Journal of Deterministic Tests',
        )
        await expect(page.getByText('Lovelace, Ada', { exact: true })).toBeVisible()
        await expect(page.getByText('Hopper, Grace', { exact: true })).toBeVisible()
        await expect(page.getByRole('combobox').filter({ hasText: '2022' })).toBeVisible()
        expect(persistenceRequests).toEqual([])
    })

    test('refuses to import a DOI another publication already holds', async ({ page }) => {
        // Same wire, but PANDA says the DOI belongs to a different record.
        await page.route('**/publications/wos/lookup*', route =>
            route.fulfill({
                json: {
                    status: 'already-exists',
                    doi: PUBLICATION_DOI,
                    existingPublication: {
                        uid: 'publication-someone-elses',
                        code: 'PANDA-42',
                        title: 'Metadata title returned by Web of Science',
                    },
                    values: {},
                    authors: [],
                    missingImportableFields: [],
                    unavailableFields: [],
                    warnings: [],
                },
            }),
        )

        await page.getByTestId('doi').fill(PUBLICATION_DOI_URL_INPUT)
        await page.getByTestId('wos-import-button').click()

        const dialog = page.getByTestId('wos-import-dialog')
        await expect(dialog).toBeVisible()
        await expect(page.getByTestId('wos-import-existing')).toBeVisible()
        await expect(dialog.getByRole('button', { name: /^Import \d+ fields$/u })).toBeDisabled()
    })
})
