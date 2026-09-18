'use strict';

/**
 * Page Object for login.html (TC01–TC05)
 * All Playwright interactions live here — no assertions.
 */
class LoginPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigateTo(baseUrl) {
        await this.page.goto(baseUrl + 'login.html');
        await this.page.waitForSelector('#tab-login', { state: 'visible' });
    }

    // ── Tab switching ─────────────────────────────────────────────────────────

    async switchToRegisterTab() {
        await this.page.click('#tab-register');
        await this.page.waitForSelector('#form-register', { state: 'visible' });
    }

    // ── Register actions ──────────────────────────────────────────────────────

    async enterRegisterName(name) {
        await this.page.fill('#reg-name', name);
    }

    async enterRegisterUsername(username) {
        await this.page.fill('#reg-id', username);
    }

    async enterRegisterPassword(password) {
        await this.page.fill('#reg-pwd', password);
    }

    async enterConfirmPassword(password) {
        await this.page.fill('#reg-cpwd', password);
    }

    async submitRegistrationForm() {
        await this.page.click('#btn-register');
        // On success the app redirects to index.html after 500 ms.
        // On failure it stays on login.html and shows #reg-alert.
        // Wait for whichever comes first so we don't burn the step timeout.
        await Promise.race([
            this.page.waitForURL(url => url.toString().includes('index.html'), { timeout: 4000 }),
            this.page.waitForSelector('#reg-alert:not(:empty)', { state: 'visible', timeout: 4000 })
        ]).catch(() => {});
    }

    async submitRegistrationFormEmpty() {
        await this.switchToRegisterTab();
        await this.page.click('#btn-register');
    }

    // ── Login actions ─────────────────────────────────────────────────────────

    async enterLoginUsername(username) {
        await this.page.fill('#login-id', username);
    }

    async enterLoginPassword(password) {
        await this.page.fill('#login-pwd', password);
    }

    async submitLoginForm() {
        await this.page.click('#btn-login');
        // On success the app redirects to index.html after 500 ms.
        // On failure it stays on login.html and shows #login-alert.
        // Wait for whichever comes first so we don't burn the step timeout.
        await Promise.race([
            this.page.waitForURL(url => url.toString().includes('index.html'), { timeout: 4000 }),
            this.page.waitForSelector('#login-alert:not(:empty)', { state: 'visible', timeout: 4000 })
        ]).catch(() => {});
    }

    // ── Seed user via localStorage ────────────────────────────────────────────

    async seedUser(username, password) {
        const userJson = JSON.stringify([{
            id: 99999, name: 'Test User', email: '',
            username, password,
            favorites: [], recentlyViewed: [], appointments: []
        }]);
        await this.page.evaluate((json) => localStorage.setItem('prop_users', json), userJson);
    }

    // ── Query methods ─────────────────────────────────────────────────────────

    getCurrentUrl() {
        return this.page.url();
    }

    async getLoginAlertText() {
        try {
            await this.page.waitForSelector('#login-alert', { state: 'visible', timeout: 5000 });
            return (await this.page.textContent('#login-alert')).trim();
        } catch { return ''; }
    }

    async getRegAlertText() {
        try {
            await this.page.waitForSelector('#reg-alert', { state: 'visible', timeout: 5000 });
            return (await this.page.textContent('#reg-alert')).trim();
        } catch { return ''; }
    }

    async areRequiredFieldsInvalid() {
        return await this.page.evaluate(() => {
            return ['reg-name', 'reg-id', 'reg-pwd', 'reg-cpwd'].some(id => {
                const el = document.getElementById(id);
                return el && !el.validity.valid;
            });
        });
    }
}

module.exports = { LoginPage };
