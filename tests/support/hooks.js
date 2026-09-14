const { Before, After } = require('@cucumber/cucumber');

Before(async function () {
    await this.openBrowser();
});

After(async function (scenario) {
    if (scenario.result && scenario.result.status === 'FAILED' && this.page) {
        const screenshot = await this.page.screenshot();
        await this.attach(screenshot, 'image/png');
    }
    await this.closeBrowser();
});
