'use strict';

/**
 * Page Object for map-view.html (TC16–TC20)
 * All Playwright interactions live here — no assertions.
 */
class MapViewPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
    }

    // ── Navigation ────────────────────────────────────────────────────────────

    async navigateTo(baseUrl) {
        await this.page.goto(baseUrl + 'map-view.html');
        await this.page.waitForSelector('#map', { state: 'visible' });
    }

    // ── Overlay toggle actions ────────────────────────────────────────────────

    async clickPropsOverlay() {
        await this.page.click('#btn-props');
    }

    async clickSchoolsOverlay() {
        await this.page.click('#btn-schools');
    }

    async clickHospitalsOverlay() {
        await this.page.click('#btn-hospitals');
    }

    async clickMetroOverlay() {
        await this.page.click('#btn-metro');
    }

    // ── Search / filter actions ───────────────────────────────────────────────

    async enterSearchLocation(location) {
        await this.page.fill('#map-search-input', location);
        // filterMapList() is triggered by oninput — short wait for DOM update
        await this.page.waitForTimeout(400);
    }

    async selectPurpose(purpose) {
        await this.page.selectOption('#map-purpose', { label: purpose });
        await this.page.waitForTimeout(400);
    }

    async selectBhk(bhk) {
        // BHK select uses numeric values (1, 2, 3, 4) but labels like "1 BHK"
        await this.page.selectOption('#map-bhk', { label: bhk });
        await this.page.waitForTimeout(400);
    }

    // ── Query methods (for assertions) ────────────────────────────────────────

    async isMapVisible() {
        return await this.page.locator('#map').isVisible();
    }

    async isPropListVisible() {
        return await this.page.locator('#map-prop-list').isVisible();
    }

    async isMapCountVisible() {
        return await this.page.locator('#map-count').isVisible();
    }

    async getMapCountText() {
        await this.page.waitForSelector('#map-count', { state: 'visible' });
        return (await this.page.textContent('#map-count')).trim();
    }

    async propListHasListings() {
        const items = await this.page.locator('#map-prop-list [id^="list-"]').count();
        return items > 0;
    }
}

module.exports = { MapViewPage };
