import { expect, type Page } from '@playwright/test'

export const getVisibleByTestId = (page: Page, testId: string) =>
    page.getByTestId(testId).filter({ visible: true }).first()

export async function gotoSystemHierarchyPage(page: Page) {
    await page.goto('/systems/hierarchy')
    await expect(getVisibleByTestId(page, 'tree-node-sys-root')).toBeVisible()
}

export async function selectParentNode(page: Page, uid: string) {
    await getVisibleByTestId(page, `tree-node-${uid}`).click()
}

export async function searchHierarchyTree(page: Page, query: string) {
    await getVisibleByTestId(page, 'system-hierarchy-tree-search').fill(query)
}

export async function openLeafDetailFromTable(page: Page, leafName: string) {
    await getVisibleByTestId(page, 'system-hierarchy-leaves-table')
        .getByText(leafName, { exact: true })
        .click()
}
