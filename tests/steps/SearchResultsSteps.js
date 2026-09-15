const { Given, When, Then } = require('@cucumber/cucumber');
const { expect }            = require('@playwright/test');
const { SearchResultsPage } = require('../pages/SearchResultsPage');

// ── Background ────────────────────────────────────────────────────────────────

Given('I am on the Search Results page', async function () {
    this.srPage = new SearchResultsPage(this.page, this.baseUrl);
    await this.srPage.navigate();
});

// ── Shared step – TC15 baseline capture ───────────────────────────────────────

Given('I note the current result count as the baseline', async function () {
    this.baseline = await this.srPage.getResultCount();
});

// ── Search bar steps ──────────────────────────────────────────────────────────

When('I type {string} in the location search field', async function (location) {
    await this.srPage.enterLocation(location);
});

When('I select {string} from the purpose dropdown', async function (purpose) {
    await this.srPage.selectPurpose(purpose);
});

When('I click the Search button', async function () {
    await this.srPage.clickSearch();
});

// ── Budget steps ──────────────────────────────────────────────────────────────

When('I enter {string} in the minimum budget field', async function (value) {
    await this.srPage.enterMinBudget(value);
});

When('I enter {string} in the maximum budget field', async function (value) {
    await this.srPage.enterMaxBudget(value);
});

// ── BHK steps ─────────────────────────────────────────────────────────────────

When('I click the {string} BHK filter button', async function (bhk) {
    await this.srPage.clickBhkButton(bhk);
});

// ── Furnishing step ───────────────────────────────────────────────────────────

When('I select the {string} furnishing option', async function (value) {
    await this.srPage.selectFurnishing(value);
});

// ── Amenity step ──────────────────────────────────────────────────────────────

When('I check the {string} amenity checkbox', async function (amenity) {
    await this.srPage.checkAmenity(amenity);
});

// ── Property type step ────────────────────────────────────────────────────────

When('I check the {string} property type checkbox', async function (type) {
    await this.srPage.checkPropertyType(type);
});

// ── Filter button steps ───────────────────────────────────────────────────────

When('I click the Apply Filters button', async function () {
    await this.srPage.clickApplyFilters();
});

When('I click the Clear All button', async function () {
    await this.srPage.clickClearAllFilters();
});

// ── Sort steps ────────────────────────────────────────────────────────────────

When('I select sort option {string}', async function (value) {
    // value matches the <option value="..."> attribute: 'price-asc', 'price-desc', etc.
    await this.srPage.selectSortOption(value);
});

// ── Assertion steps ───────────────────────────────────────────────────────────

// TC06, TC07, TC11, TC12, TC13 – generic "results shown" check
Then('properties are displayed in the results grid', async function () {
    const count = await this.srPage.getResultCount();
    expect(count, 'Expected at least one result in the grid.').toBeGreaterThan(0);
});

// TC08 – budget range
Then('all displayed properties have a price between {int} and {int}', async function (min, max) {
    const prices = await this.srPage.getDisplayedCardPrices();
    expect(prices.length, 'TC08: No properties displayed after applying budget range.').toBeGreaterThan(0);
    for (const label of prices) {
        const price = this.srPage.parsePriceFromLabel(label);
        expect(price, `TC08: Price ${price} is below minimum ${min}.`).toBeGreaterThanOrEqual(min);
        expect(price, `TC08: Price ${price} is above maximum ${max}.`).toBeLessThanOrEqual(max);
    }
});

// TC09 – no results
Then('the no-results message is displayed', async function () {
    const visible = await this.srPage.isNoResultsMessageVisible();
    expect(visible, 'TC09: No-results message was not displayed.').toBe(true);
});

Then('the results grid is empty', async function () {
    const count = await this.srPage.getResultCardCount();
    expect(count, 'TC09: Expected 0 cards but found some.').toBe(0);
});

// TC10 – sort ascending
Then('the first result price is less than or equal to the second result price', async function () {
    const prices = await this.srPage.getDisplayedCardPrices();
    if (prices.length >= 2) {
        const first  = this.srPage.parsePriceFromLabel(prices[0]);
        const second = this.srPage.parsePriceFromLabel(prices[1]);
        expect(first, 'TC10: "Price: Low to High" sort is incorrect.').toBeLessThanOrEqual(second);
    }
});

// TC10 – sort descending
Then('the first result price is greater than or equal to the second result price', async function () {
    const prices = await this.srPage.getDisplayedCardPrices();
    if (prices.length >= 2) {
        const first  = this.srPage.parsePriceFromLabel(prices[0]);
        const second = this.srPage.parsePriceFromLabel(prices[1]);
        expect(first, 'TC10: "Price: High to Low" sort is incorrect.').toBeGreaterThanOrEqual(second);
    }
});

// TC12 – BHK button active
Then('the {string} BHK button is marked active', async function (bhk) {
    const active = await this.srPage.isBhkButtonActive(bhk);
    expect(active, `TC12: BHK "${bhk}" button was not marked active after click.`).toBe(true);
});

// TC14 – multi-filter non-negative count
Then('the result count is zero or more', async function () {
    const count = await this.srPage.getResultCount();
    expect(count, 'TC14: Result count was negative or page errored.').toBeGreaterThanOrEqual(0);
});

// TC15 – baseline count matches after clear
Then('the result count matches the baseline', async function () {
    const count = await this.srPage.getResultCount();
    expect(count, 'TC15: After Clear All, result count does not match baseline.').toBe(this.baseline);
});

// TC15 – BHK button no longer active
Then('the {string} BHK button is not active', async function (bhk) {
    const active = await this.srPage.isBhkButtonActive(bhk);
    expect(active, `TC15: BHK "${bhk}" button is still active after Clear All.`).toBe(false);
});

// TC15 – location field empty
Then('the location field is empty', async function () {
    const value = await this.srPage.getLocationFieldValue();
    expect(value, 'TC15: Location field was not cleared.').toBe('');
});
