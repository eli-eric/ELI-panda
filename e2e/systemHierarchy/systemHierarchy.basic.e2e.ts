import { expect, test } from '../fixtures/test'
import {
    getVisibleByTestId,
    gotoSystemHierarchyPage,
    openLeafDetailFromTable,
    searchHierarchyTree,
    selectParentNode,
} from '../helpers/systemHierarchyPage'
import { setupSystemHierarchyNetworkMocks } from '../helpers/systemHierarchyMocks'
import { expectQueryParam } from '../helpers/url'

test.describe('System hierarchy module', () => {
    test.beforeEach(async ({ page }) => {
        await setupSystemHierarchyNetworkMocks(page)
        await gotoSystemHierarchyPage(page)
    })

    // Verifies that selecting a parent node loads leaves with deterministic mocked data.
    test('loads leaves after selecting parent node', async ({ page }) => {
        await selectParentNode(page, 'sys-root')

        await expectQueryParam(page, 'parent', 'sys-root')
        await expect(getVisibleByTestId(page, 'system-hierarchy-leaves-panel')).toBeVisible()
        await expect(
            getVisibleByTestId(page, 'system-hierarchy-leaves-table').getByText('Cooling Pump A', {
                exact: true,
            }),
        ).toBeVisible()
        await expect(
            getVisibleByTestId(page, 'system-hierarchy-leaves-table').getByText(
                'Pressure Sensor B',
                {
                    exact: true,
                },
            ),
        ).toBeVisible()
    })

    // Verifies that tree search narrows results and keeps only matching nodes visible.
    test('filters hierarchy tree using search input', async ({ page }) => {
        await searchHierarchyTree(page, 'Vacuum')

        await expect(getVisibleByTestId(page, 'tree-node-sys-vacuum')).toBeVisible()
        await expect(
            page.getByTestId('tree-node-sys-cooling').filter({ visible: true }),
        ).toHaveCount(0)
    })

    // Verifies detail navigation flow: opening a leaf detail and returning back to leaves list.
    test('opens leaf detail and navigates back to leaves', async ({ page }) => {
        await selectParentNode(page, 'sys-root')
        await openLeafDetailFromTable(page, 'Cooling Pump A')

        await expectQueryParam(page, 'leaf', 'leaf-cooling-pump-a')
        await expect(getVisibleByTestId(page, 'system-hierarchy-detail-header')).toBeVisible()
        await expect(
            page.getByText('Cooling Pump A', { exact: true }).filter({ visible: true }).first(),
        ).toBeVisible()

        await getVisibleByTestId(page, 'system-hierarchy-back-to-leaves').click()

        await expectQueryParam(page, 'leaf', null)
        await expect(getVisibleByTestId(page, 'system-hierarchy-leaves-panel')).toBeVisible()
    })

    // Verifies tab switching in detail view and URL synchronization for the selected tab.
    test('switches detail tabs and updates tab query param', async ({ page }) => {
        await selectParentNode(page, 'sys-root')
        await openLeafDetailFromTable(page, 'Cooling Pump A')

        await getVisibleByTestId(page, 'system-hierarchy-tab-history').click()

        await expectQueryParam(page, 'tab', 'history')
        await expect(
            page.getByText('QA Engineer', { exact: true }).filter({ visible: true }).first(),
        ).toBeVisible()
    })
})
