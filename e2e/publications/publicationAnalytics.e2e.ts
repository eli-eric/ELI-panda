import { ANALYTICS_YEAR } from '../fixtures/publicationAnalytics.mock'
import { expect, test } from '../fixtures/test'
import { mockNextAuthSession } from '../helpers/auth'
import { setupPublicationAnalyticsMocks } from '../helpers/publicationAnalyticsMocks'

const VIEW_ROLES = ['basics', 'publications-view']

test.describe('Publication analytics', () => {
    test('reports the figures, the overlapping credits and the unreviewed backlog', async ({
        page,
    }) => {
        await mockNextAuthSession(page, { roles: VIEW_ROLES })
        await setupPublicationAnalyticsMocks(page)
        await page.goto('/publications/analytics')

        await expect(page.getByTestId('publications-analytics')).toBeVisible()

        // The backlog is stated, not hidden behind the classified totals.
        const backlog = page.getByTestId('analytics-backlog')
        await expect(backlog).toContainText('3 of 10')
        await expect(backlog).toContainText('4 are awaiting review')

        // Department credits (6 + 3) legitimately exceed the 10 distinct
        // publications' own figures; the table says so rather than hiding it.
        const matrix = page.getByTestId('analytics-department-matrix')
        await expect(matrix).toContainText('Department 86')
        await expect(matrix).toContainText('Department 88')

        // A user paper with no confirmed call is its own bar, never folded into
        // the calls that do have links.
        await expect(page.getByText('No confirmed call')).toBeVisible()

        // The agreed fixture, rendered: 22 of 78 ranked own papers.
        await expect(page.getByText('28.21 %', { exact: false })).toBeVisible()

        // A year with no ranked papers reports that, rather than 0 %.
        await expect(page.getByText('No ranked papers').first()).toBeVisible()

        await expect(page.getByTestId('analytics-journals')).toContainText(
            'Physical Review Letters',
        )
        await expect(page.getByTestId('analytics-authors')).toContainText('Nováková Jana')
    })

    test('downloads a Word report carrying the figures on screen', async ({ page }) => {
        await mockNextAuthSession(page, { roles: VIEW_ROLES })
        await setupPublicationAnalyticsMocks(page)
        await page.goto('/publications/analytics')

        await expect(page.getByTestId('publications-analytics')).toBeVisible()

        const download = page.waitForEvent('download')
        await page.getByTestId('export-report-docx').click()
        const file = await download

        expect(file.suggestedFilename()).toBe(`publication-report-${ANALYTICS_YEAR}.docx`)
    })

    test('downloads a PDF report', async ({ page }) => {
        await mockNextAuthSession(page, { roles: VIEW_ROLES })
        await setupPublicationAnalyticsMocks(page)
        await page.goto('/publications/analytics')

        await expect(page.getByTestId('publications-analytics')).toBeVisible()

        const download = page.waitForEvent('download')
        await page.getByTestId('export-report-pdf').click()
        const file = await download

        expect(file.suggestedFilename()).toBe(`publication-report-${ANALYTICS_YEAR}.pdf`)
    })

    test('shows no figures at all when the report cannot be calculated', async ({ page }) => {
        await mockNextAuthSession(page, { roles: VIEW_ROLES })
        await setupPublicationAnalyticsMocks(page, { fail: true })
        await page.goto('/publications/analytics')

        // The query retries with backoff before giving up, so the error state
        // legitimately takes longer than the default assertion window.
        await expect(page.getByTestId('analytics-error')).toBeVisible({ timeout: 20_000 })
        // A partial report would be indistinguishable from a complete one.
        await expect(page.getByTestId('analytics-department-matrix')).toHaveCount(0)
        await expect(page.getByTestId('export-report-docx')).toHaveCount(0)
    })
})
