'use strict';

/**
 * Page Object for dashboard.html (TC31–TC35, TC51–TC55)
 * All Playwright interactions live here — no assertions.
 */
class DashboardPage {
    /**
     * @param {import('@playwright/test').Page} page
     * @param {string} baseUrl
     */
    constructor(page, baseUrl) {
        this.page    = page;
        this.baseUrl = baseUrl;

        // Sidebar nav
        this.navFavorites       = this.page.locator('#nav-favorites');
        this.navRecent          = this.page.locator('#nav-recent');
        this.navRecommendations = this.page.locator('#nav-recommendations');
        this.navPreferences     = this.page.locator('#nav-preferences');

        // Panels
        this.panelFavorites  = this.page.locator('#panel-favorites');
        this.panelRecent     = this.page.locator('#panel-recent');
        this.panelRecoGrid   = this.page.locator('#reco-grid');
        this.panelPrefs      = this.page.locator('#panel-preferences');
        this.favsList        = this.page.locator('#favs-list');
        this.recentList      = this.page.locator('#recent-list');

        // Preferences form
        this.prefCity          = this.page.locator('#pref-city');
        this.prefPurpose       = this.page.locator('#pref-purpose');
        this.prefBhk           = this.page.locator('#pref-bhk');
        this.prefBudget        = this.page.locator('#pref-budget');
        this.prefNl            = this.page.locator('#pref-nl');
        this.alertsToggle      = this.page.locator('#alerts-toggle');
        this.alertStatusLbl    = this.page.locator('#alert-status-lbl');
        this.btnSavePrefs      = this.page.locator('#btn-save-preferences');
        this.prefSavedAlert    = this.page.locator('#pref-saved-alert');
        this.prefRecoGrid      = this.page.locator('#pref-reco-grid');
    }

    // ── Authentication helper ──────────────────────────────────────────────────

    /**
     * Seeds a test user into localStorage/sessionStorage, then navigates to
     * dashboard.html — bypasses Auth.requireLogin() redirect.
     * @param {object} [overrides]  Optional property overrides for the user object.
     */
    async loginAs(overrides = {}) {
        await this.page.goto(this.baseUrl + 'login.html');
        await this.page.evaluate((opts) => {
            const user = Object.assign({
                id: 99999,
                name: 'Test User',
                email: 'test@example.com',
                username: 'test_user',
                password: 'Test@1234',
                favorites: [],
                recentlyViewed: [],
                appointments: []
            }, opts);
            localStorage.setItem('prop_users', JSON.stringify([user]));
            sessionStorage.setItem('prop_current_user', JSON.stringify(user));
        }, overrides);
    }

    // ── Navigation ─────────────────────────────────────────────────────────────

    async navigateTo() {
        await this.page.goto(this.baseUrl + 'dashboard.html');
        await this.navFavorites.waitFor({ state: 'visible' });
    }

    async navigateToFavorites() {
        await this.navFavorites.click();
        await this.panelFavorites.waitFor({ state: 'visible' });
    }

    async navigateToRecentlyViewed() {
        await this.navRecent.click();
        await this.panelRecent.waitFor({ state: 'visible' });
    }

    async navigateToRecommendations() {
        await this.navRecommendations.click();
        await this.panelRecoGrid.waitFor({ state: 'visible' });
    }

    async navigateToPreferences() {
        await this.navPreferences.click();
        await this.panelPrefs.waitFor({ state: 'visible' });
    }

    // ── Favorites actions ──────────────────────────────────────────────────────

    /** Remove the favourite card for a given property id. */
    async removeFavorite(id) {
        await this.page.locator(`#btn-remove-fav-${id}`).click();
    }

    // ── Preferences actions ────────────────────────────────────────────────────

    async selectPreferredCity(city) {
        await this.prefCity.selectOption({ label: city });
    }

    async selectPreferredPurpose(purpose) {
        await this.prefPurpose.selectOption({ label: purpose });
    }

    async selectPreferredBhk(bhk) {
        await this.prefBhk.selectOption(bhk);
    }

    async enterMaxBudget(budget) {
        await this.prefBudget.fill(String(budget));
    }

    async enterNaturalLanguagePreference(text) {
        await this.prefNl.fill(text);
    }

    async clickSavePreferences() {
        await this.btnSavePrefs.click();
    }

    async togglePropertyAlerts() {
        // #alerts-toggle is opacity:0 / zero-size — click the visible track instead
        await this.page.locator('#toggle-track').click();
    }

    // ── Query methods ──────────────────────────────────────────────────────────

    async getFavsListText() {
        return this.favsList.innerText();
    }

    async getFavCardCount() {
        // Favorites render as .mini-card elements inside #favs-list
        return this.page.locator('#favs-list .mini-card').count();
    }

    async isFavCardPresent(id) {
        return this.page.locator(`#btn-remove-fav-${id}`).isVisible();
    }

    async getRecentListText() {
        return this.recentList.innerText();
    }

    async getRecentCardCount() {
        // Recently viewed render as .mini-card elements inside #recent-list
        return this.page.locator('#recent-list .mini-card').count();
    }

    async getFirstRecentCardTitle() {
        return this.page.locator('#recent-list .mini-card').first().textContent();
    }

    async isRecoGridVisible() {
        return this.panelRecoGrid.isVisible();
    }

    async getRecoCardCount() {
        // Recommendations render as .card elements inside #reco-grid
        return this.panelRecoGrid.locator('.card').count();
    }

    async isPrefSavedAlertVisible() {
        try {
            await this.prefSavedAlert.waitFor({ state: 'visible', timeout: 4000 });
            return true;
        } catch { return false; }
    }

    async getAlertStatusLabel() {
        return (await this.alertStatusLbl.textContent()).trim();
    }

    async isPrefRecoGridVisible() {
        return this.prefRecoGrid.isVisible();
    }
}

module.exports = { DashboardPage };
