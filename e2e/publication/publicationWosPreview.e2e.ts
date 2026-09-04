import type { Page } from '@playwright/test'

import { PUBLICATION_DOI, PUBLICATION_DOI_URL_INPUT } from '../fixtures/publicationDoi.mock'
import { expect, test } from '../fixtures/test'
import { mockNextAuthSession } from '../helpers/auth'
import { setupPublicationDoiNetworkMocks } from '../helpers/publicationDoiMocks'

const PUBLICATION_ROLES = ['basics', 'publications-view', 'publications-edit']

const researcherRadio = (page: Page, name: string) => page.getByRole('radio', { name, exact: true })

test.describe('Publication Web of Science preview', () => {
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

        const previewRequestPromise = page.waitForRequest(request =>
            /\/publications\/wos-preview(?:\?|$)/u.test(request.url()),
        )
        await page.getByRole('button', { name: 'Fetch from Web of Science' }).click()
        const previewRequest = await previewRequestPromise

        const requestUrl = new URL(previewRequest.url())
        expect(requestUrl.searchParams.get('doi')).toBe(PUBLICATION_DOI)
        await expect(
            page.getByRole('heading', { name: 'Web of Science import preview' }),
        ).toBeVisible()
        await expect(page.getByText('Title entered by the librarian')).toBeVisible()
        await expect(page.getByLabel('Import Title* (R06)')).not.toBeChecked()
        await expect(page.getByLabel('Import Long Journal Title (R16)*')).toBeChecked()
        // Scope to the radio role: each author's radiogroup is aria-labelled
        // "…matching <displayName>", which substring-matches a candidate of the same name.
        await expect(researcherRadio(page, 'Lovelace, Ada')).toBeChecked()
        await expect(researcherRadio(page, 'Hopper, Grace')).not.toBeChecked()

        await researcherRadio(page, 'Hopper, Grace').click()
        await page.getByRole('button', { name: 'Apply selected fields' }).click()

        await expect(
            page.getByRole('heading', { name: 'Web of Science import preview' }),
        ).not.toBeVisible()
        await expect(doi).toHaveValue(PUBLICATION_DOI_URL_INPUT)
        await expect(title).toHaveValue('Title entered by the librarian')
        await expect(page.getByRole('textbox', { name: /All Authors list/i })).toHaveValue(
            'Ada Lovelace; Hopper, Grace; Duplicate Person',
        )
        await expect(page.getByTestId('longJournalTitle')).toHaveValue(
            'Journal of Deterministic Tests',
        )
        await expect(page.getByText('Lovelace, Ada', { exact: true })).toBeVisible()
        await expect(page.getByText('Hopper, Grace', { exact: true })).toBeVisible()
        expect(persistenceRequests).toEqual([])
    })
})
