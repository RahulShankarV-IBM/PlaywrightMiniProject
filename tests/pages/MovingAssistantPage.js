class MovingAssistantPage {
    constructor(page, baseUrl) {
        this.page    = page;
        this.baseUrl = baseUrl;

        // Tab navigation
        this.tabBtnSupport   = this.page.locator('#tab-btn-support');
        this.tabBtnDocuments = this.page.locator('#tab-btn-documents');
        this.tabBtnChecklist = this.page.locator('#tab-btn-checklist');
        this.tabBtnGuidance  = this.page.locator('#tab-btn-guidance');
        this.tabBtnProgress  = this.page.locator('#tab-btn-progress');

        // Tab panels
        this.tabSupport   = this.page.locator('#tab-support');
        this.tabDocuments = this.page.locator('#tab-documents');
        this.tabChecklist = this.page.locator('#tab-checklist');
        this.tabGuidance  = this.page.locator('#tab-guidance');
        this.tabProgress  = this.page.locator('#tab-progress');

        // Legal support accordions
        this.acc1 = this.page.locator('#acc1');

        // Documents panel
        this.docAlert            = this.page.locator('#doc-alert');
        this.btnDlRentalAgreement = this.page.locator('#btn-dl-rental-agreement');

        // Checklist panel
        this.checklistTenant   = this.page.locator('#checklist-tenant');
        this.checklistProperty = this.page.locator('#checklist-property');
        this.checklistMovein   = this.page.locator('#checklist-movein');

        // Progress panel
        this.progPct          = this.page.locator('#prog-pct');
        this.progFill         = this.page.locator('#prog-fill');
        this.progLabel        = this.page.locator('#prog-label');
        this.btnResetProgress = this.page.locator('#btn-reset-progress');
    }

    async navigateTo() {
        await this.page.goto(this.baseUrl + 'moving-assistant.html');
        await this.page.locator('#tabs-bar').waitFor();
    }

    async clickSupportTab() {
        await this.tabBtnSupport.click();
    }

    async clickDocumentsTab() {
        await this.tabBtnDocuments.click();
    }

    async clickChecklistTab() {
        await this.tabBtnChecklist.click();
    }

    async clickGuidanceTab() {
        await this.tabBtnGuidance.click();
    }

    async clickProgressTab() {
        await this.tabBtnProgress.click();
    }

    async isSupportPanelVisible() {
        return await this.tabSupport.isVisible();
    }

    async isDocumentsPanelVisible() {
        return await this.tabDocuments.isVisible();
    }

    async isChecklistPanelVisible() {
        return await this.tabChecklist.isVisible();
    }

    async isGuidancePanelVisible() {
        return await this.tabGuidance.isVisible();
    }

    async isProgressPanelVisible() {
        return await this.tabProgress.isVisible();
    }

    async isAcc1Visible() {
        return await this.acc1.isVisible();
    }

    async isRentalAgreementDownloadPresent() {
        return await this.btnDlRentalAgreement.isVisible();
    }

    async isChecklistTenantVisible() {
        return await this.checklistTenant.isVisible();
    }

    async isChecklistPropertyVisible() {
        return await this.checklistProperty.isVisible();
    }

    async getProgressPctText() {
        return await this.progPct.textContent();
    }

    async isResetProgressButtonVisible() {
        return await this.btnResetProgress.isVisible();
    }
}

module.exports = { MovingAssistantPage };
