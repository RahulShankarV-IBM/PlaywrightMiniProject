'use strict';

/**
 * Page Object for budget-planner.html (TC56–TC60)
 * All Playwright interactions live here — no assertions.
 *
 * Key element IDs (from budget-planner.html):
 *   #inp-salary       – monthly salary (number input)
 *   #inp-rent         – monthly rent   (range slider)
 *   #inp-maintenance  – maintenance    (number input)
 *   #inp-electricity  – electricity    (number input)
 *   #inp-internet     – internet       (number input)
 *   #inp-food         – food/groceries (number input)
 *   #inp-transport    – transport      (number input)
 *   #btn-calculate    – Calculate Budget button
 *   #results-panel    – output panel
 */
class BudgetPlannerPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigateTo(baseUrl) {
        await this.page.goto(baseUrl + 'budget-planner.html');
        await this.page.waitForSelector('#btn-calculate', { state: 'visible' });
    }

    // ── Input actions ─────────────────────────────────────────────────────────

    async enterSalary(amount) {
        await this.page.fill('#inp-salary', String(amount));
    }

    /**
     * The rent field is a range slider; use fill() which sets its value directly.
     * @param {number} amount
     */
    async enterRent(amount) {
        await this.page.fill('#inp-rent', String(amount));
        // Trigger oninput handlers so the displayed value and calculate() update
        await this.page.dispatchEvent('#inp-rent', 'input');
    }

    async enterMaintenance(amount) {
        await this.page.fill('#inp-maintenance', String(amount));
        await this.page.dispatchEvent('#inp-maintenance', 'input');
    }

    async enterElectricity(amount) {
        await this.page.fill('#inp-electricity', String(amount));
        await this.page.dispatchEvent('#inp-electricity', 'input');
    }

    async enterInternet(amount) {
        await this.page.fill('#inp-internet', String(amount));
        await this.page.dispatchEvent('#inp-internet', 'input');
    }

    async enterFood(amount) {
        await this.page.fill('#inp-food', String(amount));
        await this.page.dispatchEvent('#inp-food', 'input');
    }

    async enterTransport(amount) {
        await this.page.fill('#inp-transport', String(amount));
        await this.page.dispatchEvent('#inp-transport', 'input');
    }

    /** Enter a non-numeric string to trigger the validation error path.
     *  Uses evaluate() because fill() rejects non-numeric text on input[type=number].
     *  The field type is changed to 'text' and left that way so the browser does not
     *  discard the invalid value when calculate() reads el.value. */
    async enterInvalidSalary(value) {
        await this.page.evaluate((val) => {
            const el = document.getElementById('inp-salary');
            el.type = 'text';   // keep as text so invalid value is preserved
            el.value = val;
            // Do NOT switch back to 'number' — the browser would clear the value
        }, value);
    }

    // ── Submit ────────────────────────────────────────────────────────────────

    async clickCalculate() {
        await this.page.click('#btn-calculate');
        // Results panel is updated synchronously by calculate(), short wait for DOM paint
        await this.page.waitForTimeout(300);
    }

    // ── Query methods (for assertions) ────────────────────────────────────────

    async getResultsPanelText() {
        await this.page.waitForSelector('#results-panel', { state: 'visible' });
        return (await this.page.textContent('#results-panel')).trim();
    }

    async isResultsPanelVisible() {
        return await this.page.locator('#results-panel').isVisible();
    }

    /** True when the validation error alert is present inside the results panel */
    async hasValidationError() {
        return await this.page.locator('#results-panel .alert-error').isVisible();
    }
}

module.exports = { BudgetPlannerPage };
