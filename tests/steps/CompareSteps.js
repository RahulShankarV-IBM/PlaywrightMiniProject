'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { ComparePage } = require('../pages/ComparePage');
const assert = require('assert');

// ── Background ────────────────────────────────────────────────────────────────

Given('I am on the compare page with properties in the compare list', async function () {
    this.comparePage = new ComparePage(this.page);
    // Navigate first so sessionStorage belongs to the correct origin
    await this.comparePage.navigateTo(this.baseUrl);
    // Default: seed two properties so the table renders
    await this.comparePage.seedCompareList([1, 2]);
});

// ── Pre-conditions ────────────────────────────────────────────────────────────

Given('the compare list contains three properties', async function () {
    await this.comparePage.seedCompareList([1, 2, 3]);
});

Given('the compare list contains two properties', async function () {
    await this.comparePage.seedCompareList([1, 2]);
});

Given('the compare list contains one property with id {int}', async function (id) {
    await this.comparePage.seedCompareList([id]);
});

// ── Actions ───────────────────────────────────────────────────────────────────

When('I attempt to add the same property with id {int} to the compare list again', async function (id) {
    await this.comparePage.attemptAddToCompare(id);
});

When('I remove the first property from the comparison', async function () {
    await this.comparePage.removeFirstProperty();
});

// ── Assertions ────────────────────────────────────────────────────────────────

// TC36 – Compare three properties
Then('three property columns should be displayed side by side', async function () {
    const count = await this.comparePage.getPropertyColumnCount();
    assert.strictEqual(count, 3,
        `Expected 3 property columns in the comparison table but found ${count}`);
});

// TC37 – Compare property details (price, BHK, location, amenities)
Then('the comparison table should display price, BHK, location and amenities for each property', async function () {
    const tableText = await this.comparePage.getTableBodyText();
    assert.ok(tableText.includes('Price'),
        'Expected comparison table to contain a Price row');
    assert.ok(tableText.includes('BHK'),
        'Expected comparison table to contain a BHK row');
    assert.ok(tableText.includes('Location'),
        'Expected comparison table to contain a Location row');
    assert.ok(tableText.includes('Amenities'),
        'Expected comparison table to contain an Amenities row');
});

// TC38 – Compare nearby and locality information
Then('the comparison table should display nearby school, hospital and metro station information', async function () {
    const tableText = await this.comparePage.getTableBodyText();
    assert.ok(tableText.includes('Nearby School'),
        'Expected comparison table to contain a Nearby School row');
    assert.ok(tableText.includes('Nearby Hospital'),
        'Expected comparison table to contain a Nearby Hospital row');
    assert.ok(tableText.includes('Metro Station'),
        'Expected comparison table to contain a Metro Station row');
});

// TC39 – Prevent duplicate property in compare list
Then('the compare list should still contain only one entry for that property', async function () {
    const list = await this.comparePage.getCompareListFromStorage();
    const id = list[0];
    const occurrences = list.filter(x => x === id).length;
    assert.strictEqual(occurrences, 1,
        `Expected property ${id} to appear only once in the compare list but found ${occurrences}`);
});

// TC40 – Remove a property from comparison
Then('the removed property column should no longer be displayed', async function () {
    // Removing from a 2-property list leaves <2 properties, so the table is
    // replaced by the "select at least 2" empty state.  Either way, the removed
    // property's remove-button must no longer be present.
    const stillVisible = await this.comparePage.removeButtonExists(1);
    assert.ok(!stillVisible,
        'Expected the removed property\'s column (btn-remove-1) to no longer be visible');
});
