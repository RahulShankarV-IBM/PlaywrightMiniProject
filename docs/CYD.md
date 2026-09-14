# PropFind – Playwright Project Architecture Guide (CYD)

> **CYD = Configure Your Design.**
> Tag this file when starting the new Playwright project to give the AI all the context it needs to scaffold the correct architecture from scratch.
> Usage: `@docs/CYD.md`

---

## What you are building

A **brand-new, standalone Node.js project** that re-implements the same PropFind test suite using **Playwright + Cucumber-JS**, written in JavaScript. It lives in a **separate folder** from this Java/Selenium project — do not modify any file in `SeleniumMiniProject/`.

The website under test (`propfind-website/`) is identical. Copy it into the new project root unchanged.

---

## Source of truth for test cases

All test case definitions, element IDs, and team assignments from this project carry over directly:

| Reference file (this project) | What it provides for the new project |
|---|---|
| `docs/Rearranged_testcases.xlsx` | TC IDs, steps, expected results, priority, classification |
| `docs/ELEMENT_ID_REGISTRY.md` | Every stable `id` attribute on every page — same IDs, same HTML |
| `docs/TEAM_ASSIGNMENTS.md` | Who owns which TC IDs |
| `src/test/resources/features/*.feature` | Gherkin scenarios — copy verbatim, zero changes needed |

---

## Target tech stack

| Layer | Choice | Version |
|---|---|---|
| Runtime | Node.js | 20 LTS or higher |
| Browser automation | Playwright | latest stable (`@playwright/test`) |
| BDD framework | Cucumber-JS | latest stable (`@cucumber/cucumber`) |
| Assertion library | Node.js built-in `assert` or `@playwright/test` `expect` | — |
| Reporter | `cucumber-html-reporter` or Playwright's built-in HTML reporter | latest stable |
| Package manager | npm | bundled with Node.js |

---

## Project folder structure

Scaffold exactly this layout. Do not invent extra folders.

```
PropFindPlaywright/
│
├── package.json                   ← npm dependencies + scripts
├── cucumber.config.js             ← Cucumber-JS config (paths, require glue, tags)
│
├── propfind-website/              ← the HTML app under test (copied from SeleniumMiniProject)
│   ├── index.html
│   ├── login.html
│   ├── search-results.html
│   ├── map-view.html
│   ├── property-detail.html
│   ├── dashboard.html
│   ├── compare.html
│   ├── budget-planner.html
│   ├── add-listing.html
│   ├── moving-assistant.html
│   ├── css/style.css
│   └── js/properties.js
│
├── features/                      ← Gherkin .feature files (copied verbatim from SeleniumMiniProject)
│   ├── Login.feature
│   ├── MapView.feature
│   ├── SearchResults.feature
│   ├── PropertyDetail.feature
│   ├── Dashboard.feature
│   ├── Compare.feature
│   ├── BudgetPlanner.feature
│   ├── AddListing.feature
│   └── MovingAssistant.feature
│
├── pages/                         ← Page Object classes (one JS file per page)
│   ├── LoginPage.js
│   ├── MapViewPage.js
│   ├── SearchResultsPage.js
│   ├── PropertyDetailPage.js
│   ├── DashboardPage.js
│   ├── ComparePage.js
│   ├── BudgetPlannerPage.js
│   ├── AddListingPage.js
│   └── MovingAssistantPage.js
│
├── steps/                         ← Cucumber step definition files (one JS file per page)
│   ├── loginSteps.js
│   ├── mapViewSteps.js
│   ├── searchResultsSteps.js
│   ├── propertyDetailSteps.js
│   ├── dashboardSteps.js
│   ├── compareSteps.js
│   ├── budgetPlannerSteps.js
│   ├── addListingSteps.js
│   └── movingAssistantSteps.js
│
└── support/
    ├── world.js                   ← browser + page setup per scenario (replaces DriverFactory + all context/ classes)
    └── hooks.js                   ← Before/After hooks, screenshot on failure (replaces all hooks/ classes)
```

---

## `support/world.js` — the single browser setup file

This file **replaces all seven Java context classes** (`LoginTestContext`, `DashboardTestContext`, etc.) and `DriverFactory`. Write it once; every step file uses `this.page` and `this.baseUrl` automatically.

```js
// support/world.js
const { setWorldConstructor, Before, After } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');
const path = require('path');

class PropFindWorld {
    async openBrowser() {
        const headless = !!process.env.CI;
        this.browser = await chromium.launch({ headless });
        this.context = await this.browser.newContext();
        this.page    = await this.context.newPage();
        this.baseUrl = 'file://' + path.resolve(__dirname, '../propfind-website') + '/';
    }

    async closeBrowser() {
        if (this.browser) await this.browser.close();
    }
}

setWorldConstructor(PropFindWorld);
```

`Before` and `After` hooks in `support/hooks.js` call `this.openBrowser()` and `this.closeBrowser()` so every scenario gets a fresh, isolated browser context.

---

## `support/hooks.js` — lifecycle and screenshot on failure

This file **replaces all seven Java hooks classes** (`LoginHooks`, `DashboardHooks`, etc.).

```js
// support/hooks.js
const { Before, After } = require('@cucumber/cucumber');

Before(async function () {
    await this.openBrowser();
});

After(async function (scenario) {
    if (scenario.result.status === 'FAILED') {
        const screenshot = await this.page.screenshot();
        await this.attach(screenshot, 'image/png');
    }
    await this.closeBrowser();
});
```

---

## Page Object conventions

Each file in `pages/` must follow these rules exactly — no exceptions.

| Rule | Detail |
|---|---|
| Constructor | `constructor(page) { this.page = page; }` — receives Playwright `Page`, stores it |
| Locator constants | Defined as class fields using `this.page.locator('#id')` — not stored as strings |
| Locator strategy | `#id` selectors first (all elements have stable IDs per `ELEMENT_ID_REGISTRY.md`); fall back to `.css-class` then `text=` — never XPath |
| Waiting | Do **not** add manual waits — Playwright auto-waits on every action. Use `await locator.waitFor()` only when asserting visibility before an action |
| No assertions | Page Objects contain **zero** `assert` or `expect` calls — those belong in step files only |
| Method shape | One `async` method per user action; query methods return a primitive (`string`, `number`, `boolean`) or array |
| `navigateTo()` | Every Page Object has `async navigateTo() { await this.page.goto(this.baseUrl + 'page.html'); }` — receives `baseUrl` in the constructor |
| Auth-protected pages | Use `async loginAs(username, password)` that seeds `localStorage` and `sessionStorage` via `page.evaluate()` — same shape as the Java version but using Playwright's evaluate API |

---

## Step definition conventions

Each file in `steps/` must follow these rules.

| Rule | Detail |
|---|---|
| Imports | `const { Given, When, Then, And } = require('@cucumber/cucumber');` |
| `this` access | All steps are regular `function()` (not arrow functions) so `this` refers to the World object |
| Page Object usage | Instantiate once per step file: `const page = new LoginPage(this.page, this.baseUrl);` inside `Before`, or construct in each step using `this.page` / `this.baseUrl` |
| Assertions | Use Node's `assert` module or Playwright's `expect` — never inside page methods |
| Step text | Must be **identical** to the step text in the `.feature` files — copy the exact string, do not rephrase |

---

## `cucumber.config.js` — replaces `test.xml` and all runners

```js
// cucumber.config.js
module.exports = {
    default: {
        require: ['support/**/*.js', 'steps/**/*.js'],
        paths:   ['features/**/*.feature'],
        format:  ['progress-bar', 'html:reports/cucumber-report.html'],
        parallel: 0
    }
};
```

Run all tests:
```bash
npx cucumber-js
```

Run a single tag:
```bash
npx cucumber-js --tags "@TC01"
```

Run a full user story:
```bash
npx cucumber-js --tags "@US02"
```

Run by priority:
```bash
npx cucumber-js --tags "@High"
```

---

## `package.json` — required dependencies

```json
{
  "name": "propfind-playwright",
  "version": "1.0.0",
  "scripts": {
    "test": "npx cucumber-js",
    "test:tag": "npx cucumber-js --tags"
  },
  "devDependencies": {
    "@cucumber/cucumber": "^11.0.0",
    "@playwright/test": "^1.49.0"
  }
}
```

After `npm install`, also run:
```bash
npx playwright install chromium
```

This downloads the Chromium binary Playwright needs — equivalent to Selenium Manager downloading ChromeDriver.

---

## Key migration mappings (Java → JS)

| Java (SeleniumMiniProject) | JS (PropFindPlaywright) | Notes |
|---|---|---|
| `DriverFactory.createChromeDriver()` | `chromium.launch()` in `world.js` | Headless auto-set via `CI` env var |
| `WebDriverWait` + `ExpectedConditions` | Removed entirely | Playwright auto-waits on every action |
| `By.id("foo")` | `this.page.locator('#foo')` | Same ID values from `ELEMENT_ID_REGISTRY.md` |
| `element.sendKeys("text")` | `await locator.fill('text')` | `fill` clears then types |
| `element.click()` | `await locator.click()` | — |
| `new Select(el).selectByVisibleText("x")` | `await locator.selectOption({ label: 'x' })` | — |
| `JavascriptExecutor.executeScript(...)` | `await this.page.evaluate(script)` | Used for localStorage seeding |
| `jsClick(element)` (opacity:0 workaround) | `await locator.click({ force: true })` | Playwright handles hidden elements natively |
| `TakesScreenshot.getScreenshotAs(BYTES)` | `await this.page.screenshot()` | Returns `Buffer` directly |
| `driver.getCurrentUrl()` | `this.page.url()` | — |
| `wait.until(urlContains("index.html"))` | `await this.page.waitForURL('**/index.html')` | Cleaner for `setTimeout` redirects |
| `LoginTestContext`, `DashboardTestContext`, etc. | `world.js` (one file) | PicoContainer DI replaced by Cucumber World |
| `LoginHooks`, `DashboardHooks`, etc. | `hooks.js` (one file) | — |
| `LoginTest.java` (runner) | Removed — `cucumber.config.js` handles routing | — |
| `ExtentReportListener.java` | `html:reports/cucumber-report.html` in config | Built-in Cucumber HTML reporter |
| `BaseTestClass.java` | Removed — `world.js` covers all base logic | — |

---

## localStorage seeding pattern (auth-protected pages)

Several pages call `Auth.requireLogin()` and redirect to `login.html` when no session exists: `dashboard.html`, `property-detail.html`, `compare.html`. For these, every Page Object must include a `loginAs()` method:

```js
async loginAs(username, password) {
    // Navigate to any page first to set the origin for storage APIs
    await this.page.goto(this.baseUrl + 'login.html');

    await this.page.evaluate(({ username, password }) => {
        const user = {
            id: 99999, name: 'Test User', email: '',
            username, password,
            favorites: [], recentlyViewed: [], appointments: []
        };
        localStorage.setItem('prop_users', JSON.stringify([user]));
        sessionStorage.setItem('prop_current_user', JSON.stringify(user));
    }, { username, password });

    await this.page.goto(this.baseUrl + 'dashboard.html'); // replace with the target page
    await this.page.locator('#nav-favorites').waitFor();    // wait for a reliable landmark
}
```

Call `loginAs()` from the `Before` hook (or the first `Given` step) for any scenario that targets a protected page.

---

## What carries over verbatim

These files require **zero changes** when moving to the new project:

- All `.feature` files — copy from `src/test/resources/features/` as-is
- `propfind-website/` — copy the entire folder as-is
- `docs/ELEMENT_ID_REGISTRY.md` — same element IDs, same HTML

The Gherkin step text and tag names (`@TC01`, `@US01`, `@High`, etc.) are identical between both projects.

---

## What the AI should generate per page

When generating files for a page, produce exactly three artefacts:

1. **`features/<PageName>.feature`** — only if the file does not already exist; otherwise append new scenarios
2. **`pages/<PageName>Page.js`** — full Page Object following the conventions above
3. **`steps/<PageName>Steps.js`** — step definitions wired to the Page Object via `this.page` and `this.baseUrl`

Do **not** generate or modify `support/world.js`, `support/hooks.js`, or `cucumber.config.js` during per-page generation — those are scaffold-time files written once.
