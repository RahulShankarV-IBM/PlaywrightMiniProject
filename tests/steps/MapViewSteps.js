'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { MapViewPage } = require('../pages/MapViewPage');
const assert = require('assert');

// ── Background ────────────────────────────────────────────────────────────────

Given('I am on the map view page', async function () {
    this.mapViewPage = new MapViewPage(this.page);
    await this.mapViewPage.navigateTo(this.baseUrl);
});

// ── TC16 / TC17 / TC18 — overlay toggle ──────────────────────────────────────

When('I toggle the property markers overlay', async function () {
    await this.mapViewPage.clickPropsOverlay();
});

// ── TC20 — facility overlays ─────────────────────────────────────────────────

When('I click the schools overlay button', async function () {
    await this.mapViewPage.clickSchoolsOverlay();
});

When('I click the hospitals overlay button', async function () {
    await this.mapViewPage.clickHospitalsOverlay();
});

When('I click the metro overlay button', async function () {
    await this.mapViewPage.clickMetroOverlay();
});

// ── TC19 — search / filter ───────────────────────────────────────────────────

When('I enter {string} in the map search field', async function (location) {
    await this.mapViewPage.enterSearchLocation(location);
});

When('I select {string} from the map purpose filter', async function (purpose) {
    await this.mapViewPage.selectPurpose(purpose);
});

When('I select {string} from the map BHK filter', async function (bhk) {
    await this.mapViewPage.selectBhk(bhk);
});

// ── Assertions ────────────────────────────────────────────────────────────────

Then('the map container should be visible', async function () {
    const visible = await this.mapViewPage.isMapVisible();
    assert.ok(visible, 'Expected the Leaflet map container (#map) to be visible');
});

Then('the property list panel should be visible', async function () {
    const visible = await this.mapViewPage.isPropListVisible();
    assert.ok(visible, 'Expected the map property list panel (#map-prop-list) to be visible');
});

Then('the map should display at least one property count', async function () {
    const visible = await this.mapViewPage.isMapCountVisible();
    assert.ok(visible, 'Expected the map count indicator (#map-count) to be visible');
    const text = await this.mapViewPage.getMapCountText();
    assert.ok(text.length > 0, 'Expected #map-count to contain text but it was blank');
});

Then('the property list panel should contain at least one listing', async function () {
    const hasListings = await this.mapViewPage.propListHasListings();
    assert.ok(hasListings, 'Expected #map-prop-list to contain at least one list-{id} item');
});

Then('the map count indicator should be visible', async function () {
    const visible = await this.mapViewPage.isMapCountVisible();
    assert.ok(visible, 'Expected the map count indicator (#map-count) to be visible after applying filters');
});
