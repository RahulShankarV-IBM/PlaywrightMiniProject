'use strict';

const { Given, When, And, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/LoginPage');
const assert = require('assert');

// ── Background ────────────────────────────────────────────────────────────────

Given('I am on the login page', async function () {
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.navigateTo(this.baseUrl);
});

// ── Setup (pre-conditions) ────────────────────────────────────────────────────

Given('a user already exists with username {string} and password {string}', async function (username, password) {
    await this.loginPage.seedUser(username, password);
});

// ── Tab navigation ────────────────────────────────────────────────────────────

When('I switch to the Register tab', async function () {
    await this.loginPage.switchToRegisterTab();
});

// ── Register actions ──────────────────────────────────────────────────────────

When('I enter full name {string}', async function (name) {
    await this.loginPage.enterRegisterName(name);
});

When('I enter registration username {string}', async function (username) {
    await this.loginPage.enterRegisterUsername(username);
});

When('I enter registration password {string}', async function (password) {
    await this.loginPage.enterRegisterPassword(password);
});

When('I enter confirm password {string}', async function (password) {
    await this.loginPage.enterConfirmPassword(password);
});

When('I submit the registration form', async function () {
    await this.loginPage.submitRegistrationForm();
});

When('I submit the registration form without filling any fields', async function () {
    await this.loginPage.submitRegistrationFormEmpty();
});

// ── Login actions ─────────────────────────────────────────────────────────────

When('I enter login username {string}', async function (username) {
    await this.loginPage.enterLoginUsername(username);
});

When('I enter login password {string}', async function (password) {
    await this.loginPage.enterLoginPassword(password);
});

When('I submit the login form', async function () {
    await this.loginPage.submitLoginForm();
});

// ── Assertions ────────────────────────────────────────────────────────────────

Then('the account should be created successfully', async function () {
    const url = this.loginPage.getCurrentUrl();
    assert.ok(url.includes('index.html'),
        `Expected redirect to index.html after successful registration but got: ${url}`);
});

Then('registration validation messages should be displayed', async function () {
    const invalid = await this.loginPage.areRequiredFieldsInvalid();
    assert.ok(invalid,
        'Expected HTML5 validation to flag empty required fields on the register form');
});

Then('a duplicate account error should be displayed', async function () {
    const text = await this.loginPage.getRegAlertText();
    assert.ok(text.length > 0,
        'Expected a duplicate-account error alert to be visible');
    assert.ok(text.toLowerCase().includes('already exists'),
        `Expected alert to mention 'already exists' but got: ${text}`);
});

Then('the user should be logged in successfully', async function () {
    const url = this.loginPage.getCurrentUrl();
    assert.ok(url.includes('index.html'),
        `Expected redirect to index.html after successful login but got: ${url}`);
});

Then('a login error message should be displayed', async function () {
    const text = await this.loginPage.getLoginAlertText();
    assert.ok(text.length > 0,
        'Expected a login error alert to be visible');
    assert.ok(text.toLowerCase().includes('invalid'),
        `Expected alert to mention 'invalid' but got: ${text}`);
});
