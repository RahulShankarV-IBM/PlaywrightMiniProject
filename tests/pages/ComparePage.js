'use strict';

/**
 * Page Object for compare.html (TC36–TC40)
 * All Playwright interactions live here — no assertions.
 */
class ComparePage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigateTo(baseUrl) {
        await this.page.goto(baseUrl + 'compare.html');
        await this.page.waitForSelector('#compare-content', { state: 'visible' });
    }

    // ── Seed helpers ──────────────────────────────────────────────────────────

    /**
     * Seed the compare list in sessionStorage and reload so renderCompare() runs.
     * @param {number[]} ids  Array of property IDs (1-based, as defined in properties.js)
     */
    async seedCompareList(ids) {
        await this.page.evaluate((list) => {
            sessionStorage.setItem('compare_list', JSON.stringify(list));
        }, ids);
        await this.page.reload();
        await this.page.waitForSelector('#compare-content', { state: 'visible' });
    }

    // ── Actions ───────────────────────────────────────────────────────────────

    /**
     * Attempt to add a property to the compare list via sessionStorage (simulates
     * the duplicate-guard logic: only add if not already present).
     * @param {number} id
     */
    async attemptAddToCompare(id) {
        await this.page.evaluate((propId) => {
            const list = JSON.parse(sessionStorage.getItem('compare_list') || '[]');
            if (!list.includes(propId)) list.push(propId);
            sessionStorage.setItem('compare_list', JSON.stringify(list));
        }, id);
        await this.page.reload();
        await this.page.waitForSelector('#compare-content', { state: 'visible' });
    }

    /** Click the Remove button for a given property column */
    async removeFirstProperty() {
        await this.page.locator('.remove-btn').first().click();
        await this.page.waitForTimeout(300);
    }

    // ── Query methods (for assertions) ────────────────────────────────────────

    /** Count rendered property columns (header cells excluding the Feature column) */
    async getPropertyColumnCount() {
        return await this.page.locator('.compare-table thead th.compare-header-cell').count();
    }

    /** True when the compare table is rendered (at least one data row exists) */
    async isCompareTableVisible() {
        return await this.page.locator('.compare-table').isVisible();
    }

    /**
     * Returns the text content of a specific row's cells.
     * Row is identified by its label text (first <td>).
     */
    async getRowCells(label) {
        const row = this.page.locator(`.compare-table tbody tr`, { hasText: label }).first();
        return await row.locator('td').allTextContents();
    }

    /** Returns all visible text from the compare table tbody */
    async getTableBodyText() {
        return await this.page.locator('.compare-table tbody').textContent();
    }

    /** Returns the current compare list from sessionStorage */
    async getCompareListFromStorage() {
        return await this.page.evaluate(() =>
            JSON.parse(sessionStorage.getItem('compare_list') || '[]')
        );
    }

    /** True if a remove button exists for a given property id */
    async removeButtonExists(id) {
        return await this.page.locator(`#btn-remove-${id}`).isVisible();
    }
}

module.exports = { ComparePage };
