'use strict';

const { Given, When, Then } = require('@cucumber/cucumber');
const { BudgetPlannerPage } = require('../pages/BudgetPlannerPage');
const assert = require('assert');

// ── Background ────────────────────────────────────────────────────────────────

Given('I am on the budget planner page', async function () {
    this.budgetPage = new BudgetPlannerPage(this.page);
    await this.budgetPage.navigateTo(this.baseUrl);
});

// ── Input actions ─────────────────────────────────────────────────────────────

When('I enter a monthly salary of {int}', async function (amount) {
    await this.budgetPage.enterSalary(amount);
});

When('I enter a monthly rent of {int}', async function (amount) {
    await this.budgetPage.enterRent(amount);
});

When('I enter maintenance charges of {int}', async function (amount) {
    await this.budgetPage.enterMaintenance(amount);
});

When('I enter electricity charges of {int}', async function (amount) {
    await this.budgetPage.enterElectricity(amount);
});

When('I enter internet charges of {int}', async function (amount) {
    await this.budgetPage.enterInternet(amount);
});

When('I enter food and grocery expenses of {int}', async function (amount) {
    await this.budgetPage.enterFood(amount);
});

When('I enter transport expenses of {int}', async function (amount) {
    await this.budgetPage.enterTransport(amount);
});

When('I enter an invalid non-numeric value in the salary field', async function () {
    await this.budgetPage.enterInvalidSalary('abc');
});

// ── Submit ────────────────────────────────────────────────────────────────────

When('I click the calculate budget button', async function () {
    await this.budgetPage.clickCalculate();
});

// ── Assertions ────────────────────────────────────────────────────────────────

// TC56 – Calculate total living cost
Then('the results panel should display the total monthly expenses', async function () {
    const text = await this.budgetPage.getResultsPanelText();
    assert.ok(text.includes('Monthly Total Expenses'),
        'Expected results panel to show "Monthly Total Expenses"');
});

// TC57 – Calculate affordability
Then('the results panel should display rent affordability information', async function () {
    const text = await this.budgetPage.getResultsPanelText();
    assert.ok(text.includes('Rent Affordability'),
        'Expected results panel to show "Rent Affordability"');
});

// TC58 – Calculate affordable rent range and savings
Then('the results panel should display estimated monthly savings', async function () {
    const text = await this.budgetPage.getResultsPanelText();
    assert.ok(text.includes('Monthly Savings'),
        'Expected results panel to show "Monthly Savings"');
});

Then('the results panel should display the recommended affordable rent', async function () {
    const text = await this.budgetPage.getResultsPanelText();
    assert.ok(text.includes('30% rule') || text.includes('Ideal max rent'),
        'Expected results panel to show affordable rent recommendation (30% rule)');
});

// TC59 – Validate invalid financial values
Then('the results panel should display a validation error message', async function () {
    const hasError = await this.budgetPage.hasValidationError();
    assert.ok(hasError,
        'Expected a validation error alert to be displayed in the results panel');
});

// TC60 – View cost summary / monthly cost breakdown
Then('the results panel should display the monthly cost breakdown summary', async function () {
    const text = await this.budgetPage.getResultsPanelText();
    assert.ok(text.includes('Monthly Cost Breakdown'),
        'Expected results panel to show "Monthly Cost Breakdown"');
});
