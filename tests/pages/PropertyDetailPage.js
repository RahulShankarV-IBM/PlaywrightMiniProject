'use strict';

/**
 * Page Object for property-detail.html
 * Covers US05, US06 (Part A – Rahul) and US09, US10, US14 (Part B – Rohit)
 * All Playwright interactions live here — zero assertions.
 */
class PropertyDetailPage {
    /**
     * @param {import('@playwright/test').Page} page
     * @param {string} baseUrl
     */
    constructor(page, baseUrl) {
        this.page    = page;
        this.baseUrl = baseUrl;

        // Page shell
        this.detailContent       = this.page.locator('#detail-content');

        // Schedule Visit modal
        this.scheduleModal       = this.page.locator('#schedule-modal');
        this.btnScheduleVisit    = this.page.locator('#btn-schedule-visit');
        this.btnCloseSchedule    = this.page.locator('#btn-close-schedule-modal');
        this.modalAlert          = this.page.locator('#modal-alert');
        this.visitDate           = this.page.locator('#visit-date');
        this.visitTime           = this.page.locator('#visit-time');
        this.visitName           = this.page.locator('#visit-name');
        this.visitPhone          = this.page.locator('#visit-phone');
        this.btnConfirmBooking   = this.page.locator('#btn-confirm-booking');

        // Contact Owner modal
        this.contactModal        = this.page.locator('#contact-modal');
        this.btnContactOwner     = this.page.locator('#btn-contact-owner');
        this.btnCloseContact     = this.page.locator('#btn-close-contact-modal');
        this.contactAlert        = this.page.locator('#contact-alert');
        this.contactMsg          = this.page.locator('#contact-msg');
        this.contactName         = this.page.locator('#contact-name');
        this.contactPhone        = this.page.locator('#contact-phone');
        this.btnSendInquiry      = this.page.locator('#btn-send-inquiry');

        // Report modal
        this.reportModal         = this.page.locator('#report-modal');
        this.reportReason        = this.page.locator('#report-reason');
        this.reportAlert         = this.page.locator('#report-alert');
        this.reportDetail        = this.page.locator('#report-detail');
        this.btnSubmitReport     = this.page.locator('#btn-submit-report');

        // Dynamic content (rendered by JS)
        this.mainImg             = this.page.locator('#main-img');
        this.favBtn              = this.page.locator('#fav-btn');
        this.virtualTour         = this.page.locator('#virtual-tour');
    }

    // ── Authentication helper ──────────────────────────────────────────────────

    /**
     * Seed a test user into localStorage/sessionStorage, then navigate to
     * the target property page — bypasses the login redirect for auth-gated
     * features (Schedule Visit, Favorites).
     */
    async loginAs(username = 'rohit_test', password = 'Test@1234') {
        await this.page.goto(this.baseUrl + 'login.html');
        await this.page.evaluate(({ username, password }) => {
            const user = {
                id: 99999,
                name: 'Rohit Test',
                email: 'rohit@example.com',
                username,
                password,
                favorites: [],
                recentlyViewed: [],
                appointments: []
            };
            localStorage.setItem('prop_users', JSON.stringify([user]));
            sessionStorage.setItem('prop_current_user', JSON.stringify(user));
        }, { username, password });
    }

    // ── Navigation ─────────────────────────────────────────────────────────────

    /** Navigate to property-detail.html?id=1 and wait for content. */
    async navigateTo(propertyId = 1) {
        await this.page.goto(`${this.baseUrl}property-detail.html?id=${propertyId}`);
        await this.detailContent.waitFor({ state: 'visible' });
    }

    /** Navigate as a logged-in user (seed session first). */
    async navigateAsLoggedInUser(propertyId = 1) {
        await this.loginAs();
        await this.page.goto(`${this.baseUrl}property-detail.html?id=${propertyId}`);
        await this.detailContent.waitFor({ state: 'visible' });
    }

    // ── Schedule Visit actions ─────────────────────────────────────────────────

    async clickScheduleVisit() {
        await this.btnScheduleVisit.click();
        await this.scheduleModal.waitFor({ state: 'visible' });
    }

    async selectVisitDate(date) {
        await this.visitDate.fill(date);
    }

    async selectVisitTimeSlot(timeSlot) {
        await this.visitTime.selectOption({ label: timeSlot });
    }

    async enterVisitorName(name) {
        await this.visitName.fill(name);
    }

    async enterVisitorPhone(phone) {
        await this.visitPhone.fill(phone);
    }

    async confirmBooking() {
        await this.btnConfirmBooking.click();
    }

    async closeScheduleModal() {
        await this.btnCloseSchedule.click();
    }

    // ── Contact Owner actions ──────────────────────────────────────────────────

    async clickContactOwner() {
        await this.btnContactOwner.click();
        await this.contactModal.waitFor({ state: 'visible' });
    }

    async enterInquiryMessage(message) {
        await this.contactMsg.fill(message);
    }

    async enterContactName(name) {
        await this.contactName.fill(name);
    }

    async enterContactPhone(phone) {
        await this.contactPhone.fill(phone);
    }

    async submitInquiry() {
        await this.btnSendInquiry.click();
    }

    // ── Report actions ─────────────────────────────────────────────────────────

    async openReportModal() {
        await this.page.locator('.report-link').click();
        await this.reportModal.waitFor({ state: 'visible' });
    }

    async selectReportReason(reason) {
        await this.reportReason.selectOption({ label: reason });
    }

    async submitReport() {
        await this.btnSubmitReport.click();
    }

    // ── Query methods ──────────────────────────────────────────────────────────

    async isDetailContentVisible() {
        return this.detailContent.isVisible();
    }

    /** Returns the inner text of the main #detail-content wrapper. */
    async getDetailContentText() {
        return this.detailContent.innerText();
    }

    /** Returns true when the owner card rendered inside the sidebar is visible. */
    async isOwnerCardVisible() {
        return this.page.locator('.owner-card').isVisible();
    }

    /** Returns the full text of the nearby-list section. */
    async getNearbyFacilitiesText() {
        return this.page.locator('.nearby-list').innerText();
    }

    /** Alias for getNearbyFacilitiesText. */
    async getNearbyListText() {
        return this.getNearbyFacilitiesText();
    }

    async isScheduleModalVisible() {
        return this.scheduleModal.isVisible();
    }

    async isScheduleModalHidden() {
        return this.page.evaluate(() => {
            const el = document.getElementById('schedule-modal');
            return el && !el.classList.contains('open');
        });
    }

    async isContactModalVisible() {
        return this.contactModal.isVisible();
    }

    async isContactOwnerButtonVisible() {
        return this.btnContactOwner.isVisible();
    }

    async getModalAlertText() {
        try {
            await this.modalAlert.waitFor({ state: 'visible', timeout: 4000 });
            return (await this.modalAlert.textContent()).trim();
        } catch { return ''; }
    }

    async getContactAlertText() {
        try {
            await this.contactAlert.waitFor({ state: 'visible', timeout: 4000 });
            return (await this.contactAlert.textContent()).trim();
        } catch { return ''; }
    }

    async getReportAlertText() {
        try {
            await this.reportAlert.waitFor({ state: 'visible', timeout: 4000 });
            return (await this.reportAlert.textContent()).trim();
        } catch { return ''; }
    }

    /** Returns true if a toast with 'success' appearance is shown (any toast). */
    async isToastVisible() {
        try {
            await this.page.locator('.toast').waitFor({ state: 'visible', timeout: 4000 });
            return true;
        } catch { return false; }
    }

    async isMainImageVisible()  { return this.mainImg.isVisible(); }
    async isVirtualTourVisible() { return this.virtualTour.isVisible(); }
    async isFavButtonVisible()  { return this.favBtn.isVisible(); }

    /** Check if the safety section is rendered (text match inside detail-content). */
    async isSafetySectionVisible() {
        return this.page.locator('#detail-content h3:has-text("Safety & Security")').isVisible();
    }

    /** Check if the amenity tags container is rendered. */
    async isAmenitiesSectionVisible() {
        return this.page.locator('.amenity-tag').first().isVisible();
    }

    /** Check if the nearby facilities section is rendered. */
    async isNearbyFacilitiesVisible() {
        return this.page.locator('.nearby-list').isVisible();
    }

    async isNearbyTypeVisible(icon) {
        return this.page.locator(`.nearby-item:has-text("${icon}")`).first().isVisible();
    }

    async isLocalityInsightsVisible() {
        return this.page.locator('.score-row').first().isVisible();
    }

    async isVerifiedBadgeVisible() {
        return this.page.locator('.badge-verified').isVisible();
    }
}

module.exports = { PropertyDetailPage };
