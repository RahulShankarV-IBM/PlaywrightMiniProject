'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { PropertyDetailPage } = require('../pages/PropertyDetailPage');

// ── Navigation (shared) ───────────────────────────────────────────────────────

Given('I am on the property detail page for property {int}', async function (propertyId) {
    this.propertyDetailPage = new PropertyDetailPage(this.page, this.baseUrl);
    await this.propertyDetailPage.navigateTo(propertyId);
});

Given('I am on the property detail page', async function () {
    this.propertyDetailPage = new PropertyDetailPage(this.page, this.baseUrl);
    await this.propertyDetailPage.navigateTo(1);
});

Given('I am on the property detail page as a logged-in user', async function () {
    this.propertyDetailPage = new PropertyDetailPage(this.page, this.baseUrl);
    await this.propertyDetailPage.navigateAsLoggedInUser(1);
});

// ── TC21 – Open property details ──────────────────────────────────────────────

Then('the property detail content should be displayed', async function () {
    const visible = await this.propertyDetailPage.isDetailContentVisible();
    expect(visible).toBe(true);
});

// ── TC22 – Price, location, area, BHK ─────────────────────────────────────────

Then('the property price should be displayed', async function () {
    const priceEl = this.page.locator('.price-big');
    await expect(priceEl).toBeVisible();
});

Then('the property location should be displayed', async function () {
    const locationEl = this.page.locator('#detail-content').locator('text=📍');
    await expect(locationEl).toBeVisible();
});

Then('the property area should be displayed', async function () {
    const areaEl = this.page.locator('#detail-content').locator('text=sq.ft').first();
    await expect(areaEl).toBeVisible();
});

Then('the property BHK should be displayed', async function () {
    const bhkEl = this.page.locator('#detail-content').locator('text=BHK').first();
    await expect(bhkEl).toBeVisible();
});

// ── TC23 – Main image ─────────────────────────────────────────────────────────

Then('the main property image should be visible', async function () {
    const visible = await this.propertyDetailPage.isMainImageVisible();
    expect(visible).toBe(true);
});

// ── TC24 – Virtual tour ───────────────────────────────────────────────────────

When('I click the virtual tour section', async function () {
    await this.page.locator('#virtual-tour').click();
});

Then('the virtual tour content should be displayed', async function () {
    const visible = await this.propertyDetailPage.isVirtualTourVisible();
    expect(visible).toBe(true);
});

// ── TC25 – Contact owner button visible ───────────────────────────────────────

Then('the contact owner button should be visible', async function () {
    const visible = await this.propertyDetailPage.isContactOwnerButtonVisible();
    expect(visible).toBe(true);
});

// ── TC26 – Nearby schools and hospitals ───────────────────────────────────────

Then('the nearby facilities section should display schools', async function () {
    const visible = await this.propertyDetailPage.isNearbyTypeVisible('🏫');
    expect(visible).toBe(true);
});

Then('the nearby facilities section should display hospitals', async function () {
    const visible = await this.propertyDetailPage.isNearbyTypeVisible('🏥');
    expect(visible).toBe(true);
});

// ── TC27 – Police and fire stations ──────────────────────────────────────────

Then('the nearby facilities section should display a police station', async function () {
    const visible = await this.propertyDetailPage.isNearbyTypeVisible('👮');
    expect(visible).toBe(true);
});

Then('the nearby facilities section should display a fire station', async function () {
    const visible = await this.propertyDetailPage.isNearbyTypeVisible('🚒');
    expect(visible).toBe(true);
});

// ── TC28 – Supermarkets and metro ─────────────────────────────────────────────

Then('the nearby facilities section should display supermarkets', async function () {
    const visible = await this.propertyDetailPage.isNearbyTypeVisible('🛒');
    expect(visible).toBe(true);
});

Then('the nearby facilities section should display metro stations', async function () {
    const visible = await this.propertyDetailPage.isNearbyTypeVisible('🚇');
    expect(visible).toBe(true);
});

// ── TC29 – Locality insights ──────────────────────────────────────────────────

Then('the locality insights section should be displayed', async function () {
    const visible = await this.propertyDetailPage.isLocalityInsightsVisible();
    expect(visible).toBe(true);
});

// ── TC30 – Emergency facilities ───────────────────────────────────────────────

Then('the nearby facilities section should display emergency facilities', async function () {
    const nearbyList = this.page.locator('.nearby-list');
    await expect(nearbyList).toBeVisible();
    const text = await nearbyList.textContent();
    expect(text).toMatch(/fire station|police/i);
});

// ── TC41 – View visit dates and time slots ────────────────────────────────────

When('I click the Schedule Visit button', async function () {
    await this.propertyDetailPage.clickScheduleVisit();
});

Then('the schedule visit modal should be displayed', async function () {
    const visible = await this.propertyDetailPage.isScheduleModalVisible();
    expect(visible).toBe(true);
});

Then('the visit date and time slot fields should be visible', async function () {
    await expect(this.propertyDetailPage.visitDate).toBeVisible();
    await expect(this.propertyDetailPage.visitTime).toBeVisible();
});

// ── TC42 & TC44 – Book an available slot ──────────────────────────────────────

When('I select the visit date {string}', async function (date) {
    await this.propertyDetailPage.selectVisitDate(date);
});

When('I select the visit time slot {string}', async function (timeSlot) {
    await this.propertyDetailPage.selectVisitTimeSlot(timeSlot);
});

When('I enter visitor name {string}', async function (name) {
    await this.propertyDetailPage.enterVisitorName(name);
});

When('I enter visitor phone {string}', async function (phone) {
    await this.propertyDetailPage.enterVisitorPhone(phone);
});

When('I confirm the booking', async function () {
    await this.propertyDetailPage.confirmBooking();
});

Then('the visit booking should be confirmed successfully', async function () {
    // After successful booking the modal closes and a toast is shown
    const modalHidden = await this.propertyDetailPage.isScheduleModalHidden();
    expect(modalHidden).toBe(true);
});

// ── TC43 – Validation on empty booking ───────────────────────────────────────

When('I confirm the booking without filling any fields', async function () {
    await this.propertyDetailPage.confirmBooking();
});

Then('a booking validation error should be displayed', async function () {
    const alertText = await this.propertyDetailPage.getModalAlertText();
    expect(alertText.length).toBeGreaterThan(0);
});

// ── TC45 – Close schedule visit modal ────────────────────────────────────────

When('I close the schedule visit modal', async function () {
    await this.propertyDetailPage.closeScheduleModal();
});

Then('the schedule visit modal should be closed', async function () {
    const hidden = await this.propertyDetailPage.isScheduleModalHidden();
    expect(hidden).toBe(true);
});

// ── TC46 – Contact Owner button visible ──────────────────────────────────────

Then('the Contact Owner button should be visible', async function () {
    const visible = await this.propertyDetailPage.isContactOwnerButtonVisible();
    expect(visible).toBe(true);
});

// ── TC47 & TC49 – Send valid inquiry ─────────────────────────────────────────

When('I click the Contact Owner button', async function () {
    await this.propertyDetailPage.clickContactOwner();
});

When('I enter inquiry message {string}', async function (message) {
    await this.propertyDetailPage.enterInquiryMessage(message);
});

When('I enter contact name {string}', async function (name) {
    await this.propertyDetailPage.enterContactName(name);
});

When('I enter contact phone {string}', async function (phone) {
    await this.propertyDetailPage.enterContactPhone(phone);
});

When('I submit the inquiry', async function () {
    await this.propertyDetailPage.submitInquiry();
});

Then('the inquiry should be sent successfully', async function () {
    // Modal closes on success; contact-alert should not contain an error
    const alertText = await this.propertyDetailPage.getContactAlertText();
    expect(alertText).not.toMatch(/please|error|invalid/i);
});

// ── TC48 – Empty inquiry validation ──────────────────────────────────────────

Then('a contact validation error should be displayed', async function () {
    const alertText = await this.propertyDetailPage.getContactAlertText();
    expect(alertText.length).toBeGreaterThan(0);
});

// ── TC50 – Inquiry exceeds character limit ────────────────────────────────────

When('I enter an inquiry message exceeding 500 characters', async function () {
    // contact-msg has maxlength="500" — fill programmatically via evaluate
    // to bypass the maxlength attribute and reach the JS guard check
    const longMsg = 'A'.repeat(501);
    await this.page.evaluate((msg) => {
        const el = document.getElementById('contact-msg');
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLTextAreaElement.prototype, 'value'
        ).set;
        nativeInputValueSetter.call(el, msg);
        el.dispatchEvent(new Event('input', { bubbles: true }));
    }, longMsg);
});

// ── TC66 – Verified badge ─────────────────────────────────────────────────────

Then('the verified property badge should be displayed', async function () {
    // Property id=1 is verified; badge-verified element rendered by JS
    const visible = await this.propertyDetailPage.isVerifiedBadgeVisible();
    expect(visible).toBe(true);
});

// ── TC67 – Report suspicious listing ─────────────────────────────────────────

When('I open the report listing form', async function () {
    await this.propertyDetailPage.openReportModal();
});

When('I select report reason {string}', async function (reason) {
    await this.propertyDetailPage.selectReportReason(reason);
});

When('I submit the report', async function () {
    await this.propertyDetailPage.submitReport();
});

Then('the report should be submitted successfully', async function () {
    // Modal closes on success — report-modal no longer has class 'open'
    const isOpen = await this.page.evaluate(() =>
        document.getElementById('report-modal').classList.contains('open')
    );
    expect(isOpen).toBe(false);
});

// ── TC68 – Report without reason ─────────────────────────────────────────────

When('I submit the report without selecting a reason', async function () {
    await this.propertyDetailPage.submitReport();
});

Then('a report validation error should be displayed', async function () {
    const alertText = await this.propertyDetailPage.getReportAlertText();
    expect(alertText.length).toBeGreaterThan(0);
});

// ── TC69 – Safety information ─────────────────────────────────────────────────

Then('the property safety information section should be displayed', async function () {
    const visible = await this.propertyDetailPage.isSafetySectionVisible();
    expect(visible).toBe(true);
});

// ── TC70 – Community / amenities ─────────────────────────────────────────────

Then('the property amenities section should be displayed', async function () {
    const visible = await this.propertyDetailPage.isAmenitiesSectionVisible();
    expect(visible).toBe(true);
});
