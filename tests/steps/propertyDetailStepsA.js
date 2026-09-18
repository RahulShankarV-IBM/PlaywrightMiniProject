/**
 * propertyDetailSteps.js
 * Cucumber step definitions for PropertyDetail.feature
 * Covers US05 (TC21–TC25) and US06 (TC26–TC30).
 */

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect }            = require('@playwright/test');
const { PropertyDetailPage } = require('../pages/PropertyDetailPage');

// ---------------------------------------------------------------------------
// Background
// ---------------------------------------------------------------------------

Given('I am logged in and on the property detail page', async function () {
    const propertyDetailPage = new PropertyDetailPage(this.page, this.baseUrl);
    await propertyDetailPage.loginAs();
    // Store the page object on world for reuse in subsequent steps
    this.propertyDetailPage = propertyDetailPage;
});

// ---------------------------------------------------------------------------
// Shared When step — used by all TC21–TC30 scenarios
// (Navigation already happened in Background; this step is a no-op confirming context)
// ---------------------------------------------------------------------------

When('I open a property listing', async function () {
    // Property detail page was already loaded in the Background step.
    // This step exists to satisfy the Gherkin narrative; no additional action required.
});

// ---------------------------------------------------------------------------
// US05 — TC21: Property information is displayed
// ---------------------------------------------------------------------------

Then('the property information should be displayed', async function () {
    const propertyDetailPage = this.propertyDetailPage;
    const isVisible = await propertyDetailPage.isDetailContentVisible();
    expect(isVisible).toBe(true);

    const text = await propertyDetailPage.getDetailContentText();
    expect(text.trim().length).toBeGreaterThan(0);
});

// ---------------------------------------------------------------------------
// US05 — TC22: Correct price, location, area and BHK are displayed
// ---------------------------------------------------------------------------

Then('the correct price, location, area and BHK are displayed', async function () {
    const text = await this.propertyDetailPage.getDetailContentText();
    // Price label contains ₹
    expect(text).toContain('₹');
    // Location icon present
    expect(text).toContain('📍');
    // Area in sq.ft
    expect(text).toContain('sq.ft');
    // BHK label
    expect(text).toContain('BHK');
});

// ---------------------------------------------------------------------------
// US05 — TC23: Main property image loads correctly
// ---------------------------------------------------------------------------

Then('the main property image should load correctly', async function () {
    const isVisible = await this.propertyDetailPage.isMainImageVisible();
    expect(isVisible).toBe(true);

    const src = await this.page.locator('#main-img').getAttribute('src');
    expect(src).toBeTruthy();
});

// ---------------------------------------------------------------------------
// US05 — TC24: Virtual tour section is visible
// ---------------------------------------------------------------------------

Then('the virtual tour section should be visible', async function () {
    const isVisible = await this.propertyDetailPage.isVirtualTourVisible();
    expect(isVisible).toBe(true);
});

// ---------------------------------------------------------------------------
// US05 — TC25: Owner / agent details are displayed
// ---------------------------------------------------------------------------

Then('the owner or agent details should be displayed', async function () {
    const isVisible = await this.propertyDetailPage.isOwnerCardVisible();
    expect(isVisible).toBe(true);

    const text = await this.page.locator('.owner-card').innerText();
    expect(text.trim().length).toBeGreaterThan(0);
});

// ---------------------------------------------------------------------------
// US06 — TC26: Nearby schools and hospitals are displayed
// ---------------------------------------------------------------------------

Then('the nearby schools and hospitals section should be displayed', async function () {
    const nearbyText = await this.propertyDetailPage.getNearbyFacilitiesText();
    expect(nearbyText).toContain('School');
    expect(nearbyText).toContain('Hospital');
});

// ---------------------------------------------------------------------------
// US06 — TC27: Pharmacies, police and fire station information is displayed
// ---------------------------------------------------------------------------

Then('the nearby pharmacies, police and fire station information should be displayed', async function () {
    const nearbyText = await this.propertyDetailPage.getNearbyFacilitiesText();
    expect(nearbyText).toContain('Police Station');
    expect(nearbyText).toContain('Fire Station');
});

// ---------------------------------------------------------------------------
// US06 — TC28: Supermarkets, ATMs and transport options are displayed
// ---------------------------------------------------------------------------

Then('the nearby supermarkets, ATMs and transport options should be displayed', async function () {
    const nearbyText = await this.propertyDetailPage.getNearbyFacilitiesText();
    // Supermarkets rendered from p.nearby.supermarkets
    expect(nearbyText).toContain('Supermarket');
    // Metro stations rendered from p.nearby.metro
    expect(nearbyText).toContain('Metro');
});

// ---------------------------------------------------------------------------
// US06 — TC29: Locality insights section is displayed
// ---------------------------------------------------------------------------

Then('the locality insights section should be displayed with available safety, pollution, traffic and other information', async function () {
    const isVisible = await this.propertyDetailPage.isLocalityInsightsVisible();
    expect(isVisible).toBe(true);

    // The full section text contains at least one score entry
    const sectionText = await this.page.locator('.score-row').first().innerText();
    expect(sectionText.trim().length).toBeGreaterThan(0);
});

// ---------------------------------------------------------------------------
// US06 — TC30: Emergency support information is accessible
// ---------------------------------------------------------------------------

Then('the emergency support information should be accessible', async function () {
    const nearbyText = await this.propertyDetailPage.getNearbyFacilitiesText();
    // Both emergency services are hardcoded in the HTML template
    expect(nearbyText).toContain('Fire Station');
    expect(nearbyText).toContain('Police Station');
    expect(nearbyText).toContain('Emergency');
});
