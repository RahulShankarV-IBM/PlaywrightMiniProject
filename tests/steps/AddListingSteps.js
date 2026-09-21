const { Given, When, Then } = require('@cucumber/cucumber');
const { expect }            = require('@playwright/test');
const { AddListingPage }    = require('../pages/AddListingPage');

Given('I am on the add listing page', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    await addListingPage.navigateTo();
});

When('I fill in the basic listing details with valid information', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    await addListingPage.fillBasicInfo();
});

When('I fill in the location and property details', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    await addListingPage.fillLocationDetails();
});

When('I select amenities for the listing', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    await addListingPage.selectAmenities();
});

When('I enter owner information and accept the terms', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    await addListingPage.fillOwnerInfo();
});

When('I submit the listing form', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    await addListingPage.submitListing();
});

Then('the listing success modal should be displayed', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    const visible = await addListingPage.isSuccessModalVisible();
    expect(visible).toBe(true);
});

When('I submit the listing form without filling mandatory fields', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    await addListingPage.submitWithoutFilling();
});

Then('a listing validation alert should be displayed', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    const visible = await addListingPage.isListingAlertVisible();
    expect(visible).toBe(true);
});

When('I upload a valid photo to the listing', async function () {
    const path = require('path');
    // Use any small PNG that ships with Playwright's test fixtures
    const sampleFile = path.resolve(__dirname, '../../propfind-website/css/style.css'); // placeholder; swap for an actual image if needed
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    await addListingPage.photoInput.setInputFiles(sampleFile);
});

Then('the photo preview should be displayed', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    await addListingPage.photoPreview.waitFor({ state: 'visible' });
    const content = await addListingPage.photoPreview.innerHTML();
    expect(content.trim().length).toBeGreaterThan(0);
});

When('I update the listing title to {string}', async function (newTitle) {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    await addListingPage.updateTitle(newTitle);
});

Then('the live preview title should reflect {string}', async function (expectedTitle) {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    const title = await addListingPage.getPreviewTitle();
    expect(title).toContain(expectedTitle);
});

When('I clear the listing title field', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    await addListingPage.clearTitle();
});

Then('the live preview title should be empty', async function () {
    const addListingPage = new AddListingPage(this.page, this.baseUrl);
    const title = await addListingPage.getPreviewTitle();
    expect(title.trim()).toBe('');
});
