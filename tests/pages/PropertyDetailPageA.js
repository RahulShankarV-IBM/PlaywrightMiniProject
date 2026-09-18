/**
 * PropertyDetailPage
 * Page Object for property-detail.html — covers US05 (TC21–TC25) and US06 (TC26–TC30).
 *
 * Auth note: property-detail.html calls Auth.requireLogin() — a loginAs() helper is
 * provided to seed localStorage/sessionStorage before navigating to the page.
 */
class PropertyDetailPage {
    constructor(page, baseUrl) {
        this.page    = page;
        this.baseUrl = baseUrl;

        // Page shell — rendered by JS once ?id= is resolved
        this.detailContent = this.page.locator('#detail-content');

        // Hero / gallery
        this.mainImg     = this.page.locator('#main-img');
        this.mainImgWrap = this.page.locator('#main-img-wrap');

        // Virtual tour section (rendered into detail-content by JS)
        this.virtualTour = this.page.locator('#virtual-tour');

        // Sidebar action buttons
        this.btnScheduleVisit = this.page.locator('#btn-schedule-visit');
        this.btnContactOwner  = this.page.locator('#btn-contact-owner');
    }

    // -------------------------------------------------------------------------
    // Navigation helpers
    // -------------------------------------------------------------------------

    /**
     * Seed a test user into localStorage/sessionStorage so that auth-gated
     * sections load, then navigate to the property detail page.
     * Uses property id=1 by default (guaranteed to exist in the bundled data).
     */
    async loginAs(username = 'valid_user', password = 'Valid@123', propId = 1) {
        await this.page.goto(this.baseUrl + 'login.html');
        await this.page.evaluate(({ username, password }) => {
            const user = {
                id: 99999,
                name: 'Test User',
                email: 'test@example.com',
                username,
                password,
                favorites: [],
                recentlyViewed: [],
                appointments: []
            };
            localStorage.setItem('prop_users', JSON.stringify([user]));
            sessionStorage.setItem('prop_current_user', JSON.stringify(user));
        }, { username, password });

        await this.page.goto(this.baseUrl + `property-detail.html?id=${propId}`);
        await this.detailContent.waitFor();
    }

    // -------------------------------------------------------------------------
    // US05 — Property details
    // -------------------------------------------------------------------------

    /** Returns true when the main detail wrapper has rendered content. */
    async isDetailContentVisible() {
        return this.detailContent.isVisible();
    }

    /** Returns the text of the main #detail-content wrapper. */
    async getDetailContentText() {
        return this.detailContent.innerText();
    }

    /** Returns true when the main property image is visible. */
    async isMainImageVisible() {
        return this.mainImg.isVisible();
    }

    /** Returns true when the virtual tour section is visible. */
    async isVirtualTourVisible() {
        return this.virtualTour.isVisible();
    }

    /**
     * Returns true when an owner/agent card is rendered inside #detail-content.
     * The owner card is identified by the class "owner-card" inserted by JS.
     */
    async isOwnerCardVisible() {
        return this.page.locator('.owner-card').isVisible();
    }

    // -------------------------------------------------------------------------
    // US06 — Nearby facilities & locality insights
    // -------------------------------------------------------------------------

    /**
     * The nearby facilities block is the div rendered after "📍 Nearby Facilities"
     * heading. Identified via its container class "nearby-list".
     */
    async getNearbyListText() {
        return this.page.locator('.nearby-list').innerText();
    }

    /**
     * The locality insights block is rendered after "🌆 Locality Insights".
     * Identified via "score-row" items.
     */
    async isLocalityInsightsVisible() {
        return this.page.locator('.score-row').first().isVisible();
    }

    /** Returns the full text of the nearby-list section. */
    async getNearbyFacilitiesText() {
        return this.page.locator('.nearby-list').innerText();
    }
}

module.exports = { PropertyDetailPage };
