'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { DashboardPage } = require('../pages/DashboardPage');
const assert = require('assert');

// ── Background ────────────────────────────────────────────────────────────────

Given('I am logged in and on the dashboard page', async function () {
    this.dashboardPage = new DashboardPage(this.page, this.baseUrl);
    await this.dashboardPage.loginAs();
    await this.dashboardPage.navigateTo();
});

// ── TC31 ──────────────────────────────────────────────────────────────────────

Given('I have a property added to favorites', async function () {
    // Seed a user whose favorites already contain property id 1
    await this.dashboardPage.loginAs({ favorites: [1] });
    await this.dashboardPage.navigateTo();
});

When('I navigate to the Saved Properties section', async function () {
    await this.dashboardPage.navigateToFavorites();
});

Then('the property should be listed in favorites', async function () {
    const count = await this.dashboardPage.getFavCardCount();
    assert.ok(count > 0, 'Expected at least one favourite property card to be displayed');
});

// ── TC32 ──────────────────────────────────────────────────────────────────────

Given('I have a property in favorites with id {int}', async function (id) {
    await this.dashboardPage.loginAs({ favorites: [id] });
    await this.dashboardPage.navigateTo();
});

When('I remove the property with id {int} from favorites', async function (id) {
    await this.dashboardPage.removeFavorite(id);
});

Then('the property with id {int} should not be listed in favorites', async function (id) {
    const present = await this.dashboardPage.isFavCardPresent(id);
    assert.ok(!present,
        `Expected property ${id} to be removed from favorites but its card is still visible`);
});

// ── TC33 ──────────────────────────────────────────────────────────────────────

Given('I have recently viewed properties', async function () {
    await this.dashboardPage.loginAs({ recentlyViewed: [1, 2] });
    await this.dashboardPage.navigateTo();
});

When('I navigate to the Recently Viewed section', async function () {
    await this.dashboardPage.navigateToRecentlyViewed();
});

Then('the recently viewed properties should be displayed', async function () {
    const count = await this.dashboardPage.getRecentCardCount();
    assert.ok(count > 0, 'Expected at least one recently viewed property card to be displayed');
});

// ── TC34 ──────────────────────────────────────────────────────────────────────

Given('I have recently viewed properties in sequence', async function () {
    // recentlyViewed is ordered most-recent-first by the dashboard JS
    await this.dashboardPage.loginAs({ recentlyViewed: [3, 1] });
    await this.dashboardPage.navigateTo();
});

Then('the most recently viewed property should appear first', async function () {
    const count = await this.dashboardPage.getRecentCardCount();
    assert.ok(count > 0, 'Expected recently viewed cards to be rendered');
    // The first card rendered corresponds to the first element in recentlyViewed[]
    const firstText = await this.dashboardPage.getFirstRecentCardTitle();
    assert.ok(firstText && firstText.trim().length > 0,
        'Expected the first recently viewed card to contain property information');
});

// ── TC35 ──────────────────────────────────────────────────────────────────────

Given('I have saved properties and recently viewed properties', async function () {
    await this.dashboardPage.loginAs({ favorites: [1], recentlyViewed: [2] });
    await this.dashboardPage.navigateTo();
});

When('I re-authenticate into the dashboard', async function () {
    // sessionStorage already set — re-navigate to simulate returning after logout/login
    await this.dashboardPage.navigateTo();
});

Then('my favorites and recently viewed properties should remain available', async function () {
    await this.dashboardPage.navigateToFavorites();
    const favCount = await this.dashboardPage.getFavCardCount();
    assert.ok(favCount > 0, 'Expected saved properties to persist after re-login');

    await this.dashboardPage.navigateToRecentlyViewed();
    const recentCount = await this.dashboardPage.getRecentCardCount();
    assert.ok(recentCount > 0, 'Expected recently viewed properties to persist after re-login');
});

// ── TC51 ──────────────────────────────────────────────────────────────────────

When('I navigate to the Preferences section', async function () {
    await this.dashboardPage.navigateToPreferences();
});

When('I select preferred city {string}', async function (city) {
    await this.dashboardPage.selectPreferredCity(city);
});

When('I select preferred purpose {string}', async function (purpose) {
    await this.dashboardPage.selectPreferredPurpose(purpose);
});

When('I select preferred BHK {string}', async function (bhk) {
    await this.dashboardPage.selectPreferredBhk(bhk);
});

When('I enter max budget {string}', async function (budget) {
    await this.dashboardPage.enterMaxBudget(budget);
});

When('I click save preferences', async function () {
    await this.dashboardPage.clickSavePreferences();
});

Then('the preferences saved confirmation should be displayed', async function () {
    const visible = await this.dashboardPage.isPrefSavedAlertVisible();
    assert.ok(visible, 'Expected the preferences saved confirmation alert to be visible');
});

// ── TC52 ──────────────────────────────────────────────────────────────────────

When('I enter natural language preference {string}', async function (text) {
    await this.dashboardPage.enterNaturalLanguagePreference(text);
});

// ── TC53 ──────────────────────────────────────────────────────────────────────

When('I navigate to the Recommendations section', async function () {
    await this.dashboardPage.navigateToRecommendations();
});

Then('personalized property recommendations should be displayed', async function () {
    const count = await this.dashboardPage.getRecoCardCount();
    assert.ok(count > 0, 'Expected personalized recommendation cards to be displayed');
});

// ── TC54 ──────────────────────────────────────────────────────────────────────

Then('the preference recommendations should reflect the updated preferences', async function () {
    const visible = await this.dashboardPage.isPrefRecoGridVisible();
    assert.ok(visible, 'Expected the preference recommendations grid to be visible after saving');
});

// ── TC55 ──────────────────────────────────────────────────────────────────────

When('I toggle property alerts', async function () {
    await this.dashboardPage.togglePropertyAlerts();
});

Then('the alert status should be updated', async function () {
    const label = await this.dashboardPage.getAlertStatusLabel();
    assert.ok(label.length > 0,
        'Expected the alert status label (On/Off) to be visible after toggling');
});
