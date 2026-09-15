/**
 * SearchResultsPage – Page Object for search-results.html
 *
 * Uses stable id= attributes from the Element ID Registry.
 * Covers: US02 (TC06–TC10), US03 (TC11–TC15)
 */
class SearchResultsPage {

    /**
     * @param {import('@playwright/test').Page} page
     * @param {string} baseUrl  – e.g. "file:///path/to/propfind-website/"
     */
    constructor(page, baseUrl) {
        this.page    = page;
        this.baseUrl = baseUrl;
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigate() {
        await this.page.goto(this.baseUrl + 'search-results.html');
        await this.page.locator('#results-grid').waitFor({ state: 'attached' });
    }

    // ── Search bar ────────────────────────────────────────────────────────────

    async enterLocation(location) {
        await this.page.locator('#search-loc').fill(location);
    }

    async selectPurpose(purpose) {
        // The <select id="search-purpose"> has option values matching the visible text
        await this.page.locator('#search-purpose').selectOption({ label: purpose });
    }

    async clickSearch() {
        await this.page.locator('#btn-search').click();
        await this.page.locator('#results-grid').waitFor({ state: 'attached' });
    }

    // ── Sidebar – budget ──────────────────────────────────────────────────────

    async enterMinBudget(value) {
        await this.page.locator('#f-min').fill(value);
    }

    async enterMaxBudget(value) {
        await this.page.locator('#f-max').fill(value);
    }

    // ── Sidebar – BHK ────────────────────────────────────────────────────────

    async clickBhkButton(bhk) {
        await this.page.locator(`#bhk-btn-${bhk}`).click();
        await this.page.locator('#results-grid').waitFor({ state: 'attached' });
    }

    async isBhkButtonActive(bhk) {
        const cls = await this.page.locator(`#bhk-btn-${bhk}`).getAttribute('class');
        return cls !== null && cls.includes('btn-primary');
    }

    // ── Sidebar – furnishing ─────────────────────────────────────────────────

    async selectFurnishing(value) {
        // Furnishing uses <input type="radio" name="furnish" value="...">
        await this.page.locator(`input[name='furnish'][value='${value}']`).click();
        await this.page.locator('#results-grid').waitFor({ state: 'attached' });
    }

    // ── Sidebar – amenities ───────────────────────────────────────────────────

    async checkAmenity(amenity) {
        const idMap = {
            'parking':          'f-parking',
            'pet friendly':     'f-pet',
            'wi-fi':            'f-wifi',
            'wifi':             'f-wifi',
            'power backup':     'f-power',
            'gated community':  'f-gated',
            'cctv':             'f-cctv',
            'verified':         'f-verified'
        };
        const id = idMap[amenity.toLowerCase()];
        if (!id) throw new Error(`Unknown amenity: ${amenity}`);
        const chk = this.page.locator(`#${id}`);
        if (!(await chk.isChecked())) await chk.check();
    }

    // ── Sidebar – property type ───────────────────────────────────────────────

    async checkPropertyType(type) {
        const idMap = {
            'apartment':          'type-chk-apartment',
            'villa':              'type-chk-villa',
            'independent house':  'type-chk-independent-house',
            'studio':             'type-chk-studio',
            'builder floor':      'type-chk-builder-floor',
            'penthouse':          'type-chk-penthouse'
        };
        const id = idMap[type.toLowerCase()];
        if (!id) throw new Error(`Unknown property type: ${type}`);
        const chk = this.page.locator(`#${id}`);
        if (!(await chk.isChecked())) await chk.check();
    }

    // ── Filter buttons ────────────────────────────────────────────────────────

    async clickApplyFilters() {
        await this.page.locator('#btn-apply-filters').click();
        await this.page.locator('#results-grid').waitFor({ state: 'attached' });
    }

    async clickClearAllFilters() {
        await this.page.locator('#btn-clear-filters').click();
        await this.page.locator('#results-grid').waitFor({ state: 'attached' });
    }

    // ── Sort ──────────────────────────────────────────────────────────────────

    async selectSortOption(value) {
        // value must match the <option value="..."> e.g. 'price-asc', 'price-desc'
        await this.page.locator('#sort-by').selectOption(value);
        await this.page.locator('#results-grid').waitFor({ state: 'attached' });
    }

    // ── Results queries ───────────────────────────────────────────────────────

    async getResultCount() {
        const text = await this.page.locator('#results-count').textContent();
        const match = (text || '').match(/\d+/);
        return match ? parseInt(match[0], 10) : 0;
    }

    async isNoResultsMessageVisible() {
        return this.page.locator('#no-results').isVisible();
    }

    async getResultCardCount() {
        return this.page.locator('#results-grid .card').count();
    }

    async getDisplayedCardPrices() {
        return this.page.locator('#results-grid .card-price').allTextContents();
    }

    async getLocationFieldValue() {
        return this.page.locator('#search-loc').inputValue();
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    /**
     * Parses a price label to a plain number for comparison.
     * Handles: "₹45,000/mo", "₹85 Lakhs", "₹2.5 Cr"
     *
     * @param {string} label
     * @returns {number}
     */
    parsePriceFromLabel(label) {
        const lower = label.trim().toLowerCase();
        if (lower.includes('cr')) {
            return parseFloat(lower.replace(/[^0-9.]/g, '')) * 10_000_000;
        } else if (lower.includes('lakh') || lower.includes('lac')) {
            return parseFloat(lower.replace(/[^0-9.]/g, '')) * 100_000;
        } else {
            return parseInt(lower.replace(/[^0-9]/g, ''), 10);
        }
    }
}

module.exports = { SearchResultsPage };
