const { Given, When, Then } = require('@cucumber/cucumber');
const { expect }                  = require('@playwright/test');
const { MovingAssistantPage }     = require('../pages/MovingAssistantPage');

Given('I am on the moving assistant page', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    await movingPage.navigateTo();
});

When('I click on the Legal and Rental Support tab', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    await movingPage.clickSupportTab();
});

Then('the legal support panel should be visible', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    const visible = await movingPage.isSupportPanelVisible();
    expect(visible).toBe(true);
});

Then('the rental agreement accordion should be displayed', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    const visible = await movingPage.isAcc1Visible();
    expect(visible).toBe(true);
});

When('I click on the Documents tab', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    await movingPage.clickDocumentsTab();
});

Then('the documents panel should be visible', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    const visible = await movingPage.isDocumentsPanelVisible();
    expect(visible).toBe(true);
});

Then('the rental agreement download button should be present', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    const present = await movingPage.isRentalAgreementDownloadPresent();
    expect(present).toBe(true);
});

When('I click on the Checklists tab', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    await movingPage.clickChecklistTab();
});

Then('the checklists panel should be visible', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    const visible = await movingPage.isChecklistPanelVisible();
    expect(visible).toBe(true);
});

Then('the tenant documentation checklist should be displayed', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    const visible = await movingPage.isChecklistTenantVisible();
    expect(visible).toBe(true);
});

Then('the property inspection checklist should be displayed', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    const visible = await movingPage.isChecklistPropertyVisible();
    expect(visible).toBe(true);
});

When('I click on the Moving Guidance tab', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    await movingPage.clickGuidanceTab();
});

Then('the moving guidance panel should be visible', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    const visible = await movingPage.isGuidancePanelVisible();
    expect(visible).toBe(true);
});

When('I click on the My Progress tab', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    await movingPage.clickProgressTab();
});

Then('the progress panel should be visible', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    const visible = await movingPage.isProgressPanelVisible();
    expect(visible).toBe(true);
});

Then('the overall progress percentage should be displayed', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    const pct = await movingPage.getProgressPctText();
    expect(pct).toMatch(/\d+%/);
});

Then('the progress reset button should be present', async function () {
    const movingPage = new MovingAssistantPage(this.page, this.baseUrl);
    const visible = await movingPage.isResetProgressButtonVisible();
    expect(visible).toBe(true);
});
