const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const path = require('path');

class PropFindWorld {
    constructor({ attach, log, parameters }) {
        this.attach = attach;
        this.log = log;
        this.parameters = parameters;
        this.browser = null;
        this.context = null;
        this.page = null;
        this.baseUrl = '';
    }

    async openBrowser() {
        const headless = !!process.env.CI;
        this.browser = await chromium.launch({ headless });
        this.context = await this.browser.newContext();
        this.page    = await this.context.newPage();
        this.baseUrl = 'file://' + path.resolve(__dirname, '../../propfind-website') + '/';
    }

    async closeBrowser() {
        if (this.context) await this.context.close();
        if (this.browser) await this.browser.close();
    }
}

setWorldConstructor(PropFindWorld);

module.exports = { PropFindWorld };
