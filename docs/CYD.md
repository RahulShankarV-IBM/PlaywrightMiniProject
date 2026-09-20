# PropFind – Playwright Project Architecture Guide (CYD)

> **CYD = Configure Your Design.**
> Tag this file when starting work on this project to give the AI all the context it needs to understand the architecture, conventions, and current state before generating or modifying any test file.
> Usage: `@docs/CYD.md`

---

## What this project is

A Node.js test automation suite for the **PropFind** property listing web platform. It uses **Playwright** for browser automation and **Cucumber-JS** for BDD-style test execution. All tests run against a static HTML/CSS/JS application (`propfind-website/`) served via the `file://` protocol.

---

## Source of truth documents

| File | Purpose |
|---|---|
| `docs/Rearranged_testcases.xlsx` | TC IDs, steps, expected results, priority, classification |
| `docs/ELEMENT_ID_REGISTRY.md` | Every stable `id` attribute on every page |
| `docs/TEAM_ASSIGNMENTS.md` | Who owns which TC IDs |
| `docs/GENERATE_TESTS.md` | Step-by-step guide for generating feature files, page objects, and step definitions |

---

## Tech stack

| Layer | Choice | Version |
|---|---|---|
| Runtime | Node.js | 22 LTS or higher |
| Browser automation | Playwright | `@playwright/test` — latest stable |
| BDD framework | Cucumber-JS | `@cucumber/cucumber` — latest stable |
| Assertion library | Node.js built-in `assert` or `@playwright/test` `expect` | — |
| Reporter | `multiple-cucumber-html-reporter` | latest stable |
| Package manager | npm | bundled with Node.js |

---

## Project folder structure

```
.
├── .github/
│   └── workflows/
│       └── Continuous Testing.yaml   <- CI pipeline (test + Pages deploy)
│
├── cucumber.js                        <- Cucumber-JS config (paths, require globs, formatters)
├── generate-report.mjs                <- Post-run script: JSON -> multiple-cucumber-html-reporter
├── package.json                       <- npm dependencies + scripts
│
├── propfind-website/                  <- Static HTML app under test
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
├── docs/
│   ├── CYD.md
│   ├── ELEMENT_ID_REGISTRY.md
│   ├── GENERATE_TESTS.md
│   ├── TEAM_ASSIGNMENTS.md
│   └── Rearranged_testcases.xlsx
│
├── tests/
│   ├── features/                      <- Gherkin .feature files
│   │   ├── Login.feature
│   │   ├── SearchResults.feature
│   │   ├── MapView.feature
│   │   ├── PropertyDetail.feature
│   │   ├── Dashboard.feature
│   │   ├── Compare.feature
│   │   ├── BudgetPlanner.feature
│   │   ├── AddListing.feature
│   │   └── MovingAssistant.feature
│   │
│   ├── pages/                         <- Page Object classes (one file per page)
│   │   ├── LoginPage.js
│   │   ├── SearchResultsPage.js
│   │   ├── MapViewPage.js
│   │   ├── PropertyDetailPage.js
│   │   ├── DashboardPage.js
│   │   ├── ComparePage.js
│   │   ├── BudgetPlannerPage.js
│   │   ├── AddListingPage.js
│   │   └── MovingAssistantPage.js
│   │
│   ├── steps/                         <- Cucumber step definition files (one file per page)
│   │   ├── LoginSteps.js
│   │   ├── SearchResultsSteps.js
│   │   ├── MapViewSteps.js
│   │   ├── propertyDetailSteps.js
│   │   ├── dashboardSteps.js
│   │   ├── CompareSteps.js
│   │   ├── BudgetPlannerSteps.js
│   │   ├── AddListingSteps.js
│   │   └── MovingAssistantSteps.js
│   │
│   └── support/
│       ├── world.js                   <- Browser + page setup per scenario
│       └── hooks.js                  <- Before/After hooks, screenshot on failure
│
└── reports/                           <- Generated at runtime, not committed
    ├── cucumber-report.json           <- Cucumber JSON formatter output (input to reporter)
    ├── cucumber-report.html           <- Cucumber built-in HTML (kept for local quick view)
    └── index.html                     <- multiple-cucumber-html-reporter output (deployed to Pages)
```

---

## cucumber.js — runner configuration

```js
module.exports = {
    default: {
        paths:   ['tests/features/**/*.feature'],
        require: ['tests/support/**/*.js', 'tests/steps/**/*.js'],
        format:  [
            'progress-bar',
            'json:reports/cucumber-report.json',
            'html:reports/cucumber-report.html'
        ],
        parallel: 0
    }
};
```

Run all tests:
```bash
npm test
```

Run a single tag:
```bash
npx cucumber-js --tags "@TC01"
```

Run by user story:
```bash
npx cucumber-js --tags "@US02"
```

Run by priority:
```bash
npx cucumber-js --tags "@High"
```

---

## generate-report.mjs — HTML report generation

After `npm test`, run this script to produce the rich HTML report:

```bash
node generate-report.mjs
```

The script reads `reports/cucumber-report.json` and writes `reports/index.html` using `multiple-cucumber-html-reporter`. It is an ES module (`.mjs`) because the reporter package is ESM-only.

```js
import { generate } from 'multiple-cucumber-html-reporter';

generate({
    jsonDir:    'reports',
    reportPath: 'reports',
    reportName: 'PropFind – Playwright Test Report',
    pageTitle:  'PropFind Test Report',
    metadata: {
        browser:  { name: 'chrome', version: 'latest' },
        device:   'GitHub Actions – ubuntu-latest',
        platform: { name: 'linux' }
    },
    customData: {
        title: 'Run Info',
        data: [
            { label: 'Project',   value: 'PropFind Playwright' },
            { label: 'Framework', value: 'Playwright + Cucumber-JS' },
            { label: 'Reporter',  value: 'multiple-cucumber-html-reporter' }
        ]
    }
});
```

---

## tests/support/world.js — single browser setup file

Written once. Every step file accesses `this.page` and `this.baseUrl` automatically via the Cucumber World.

```js
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
        this.page    = null;
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
```

`Before` and `After` hooks in `tests/support/hooks.js` call `this.openBrowser()` and `this.closeBrowser()` so every scenario gets a fresh, isolated browser context.

---

## tests/support/hooks.js — lifecycle and screenshot on failure

Written once. Takes a screenshot and attaches it to the Cucumber report on any failed scenario.

```js
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
```

---

## Page Object conventions

Each file in `tests/pages/` must follow these rules exactly.

| Rule | Detail |
|---|---|
| Constructor | `constructor(page, baseUrl)` — both parameters stored as `this.page` and `this.baseUrl` |
| Locator constants | Defined in the constructor as `this.element = this.page.locator('#id')` |
| Locator strategy | `#id` selectors first (all elements have stable IDs per `ELEMENT_ID_REGISTRY.md`); fall back to `.css-class` then `text=` — never XPath |
| Waiting | Do not add manual waits (`waitForTimeout`). Use `await locator.waitFor()` only when asserting visibility before an action |
| No assertions | Page Objects contain zero `assert` or `expect` calls — those belong in step files only |
| Method shape | One `async` method per user action; query methods return a primitive (`string`, `number`, `boolean`) or array |
| `navigateTo()` | Every Page Object has `async navigateTo()` that calls `this.page.goto(this.baseUrl + 'page.html')` and waits for a reliable landmark element |
| Auth-protected pages | Include `async loginAs(...)` that seeds `localStorage` and `sessionStorage` via `page.evaluate()` before navigating to the protected page |

---

## Step definition conventions

Each file in `tests/steps/` must follow these rules.

| Rule | Detail |
|---|---|
| Imports | `const { Given, When, Then } = require('@cucumber/cucumber');` |
| `this` access | All steps use regular `function()` syntax — never arrow functions — so `this` refers to the World |
| Page Object usage | Instantiate inside the Background / first Given step using `this.page` and `this.baseUrl`; store on `this` for reuse across steps in the same scenario |
| Assertions | Use Node `assert` or Playwright `expect` — never inside page methods |
| Step text | Must be identical to the step text in the `.feature` file — copy the exact string |

---

## Auth-protected pages

Three pages call `Auth.requireLogin()` and redirect to `login.html` when no session exists: `dashboard.html`, `property-detail.html`, `compare.html`.

For these pages every Page Object includes a `loginAs()` method that seeds storage and navigates directly:

```js
async loginAs(username = 'test_user', password = 'Test@1234') {
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
}
```

Call `loginAs()` before `navigateTo()` in the Background step for any scenario targeting a protected page.

---

## Page → file mapping

| User Story | HTML File | Feature File | Page Object | Step Definitions |
|---|---|---|---|---|
| US01 | `login.html` | `tests/features/Login.feature` | `tests/pages/LoginPage.js` | `tests/steps/LoginSteps.js` |
| US02, US03 | `search-results.html` | `tests/features/SearchResults.feature` | `tests/pages/SearchResultsPage.js` | `tests/steps/SearchResultsSteps.js` |
| US04 | `map-view.html` | `tests/features/MapView.feature` | `tests/pages/MapViewPage.js` | `tests/steps/MapViewSteps.js` |
| US05, US06, US09, US10, US14 | `property-detail.html` | `tests/features/PropertyDetail.feature` | `tests/pages/PropertyDetailPage.js` | `tests/steps/propertyDetailSteps.js` |
| US07, US11 | `dashboard.html` | `tests/features/Dashboard.feature` | `tests/pages/DashboardPage.js` | `tests/steps/dashboardSteps.js` |
| US08 | `compare.html` | `tests/features/Compare.feature` | `tests/pages/ComparePage.js` | `tests/steps/CompareSteps.js` |
| US12 | `budget-planner.html` | `tests/features/BudgetPlanner.feature` | `tests/pages/BudgetPlannerPage.js` | `tests/steps/BudgetPlannerSteps.js` |
| US13 | `add-listing.html` | `tests/features/AddListing.feature` | `tests/pages/AddListingPage.js` | `tests/steps/AddListingSteps.js` |
| US15 | `moving-assistant.html` | `tests/features/MovingAssistant.feature` | `tests/pages/MovingAssistantPage.js` | `tests/steps/MovingAssistantSteps.js` |

---

## CI pipeline — .github/workflows/Continuous Testing.yaml

The workflow runs on every push to `main` and on manual dispatch. It uses a single job (`test-and-publish-report`) that tests, generates the report, and deploys to GitHub Pages — all steps run with `if: always()` after the test step so the report is published whether tests pass or fail.

```
push to main
    |
    v
Checkout + Setup Node 22 + npm ci
    |
    v
npx playwright install chromium --with-deps
    |
    v
npm test  (continue-on-error: true)
    |
    v
node generate-report.mjs  (if: always)
    |
    v
Copy reports/ -> report-site/  (if: always)
    |
    v
Configure Pages + Upload artifact + Deploy  (if: always)
    |
    v
GitHub Pages URL (shown on job summary)
```

---

## What the AI should generate per page

When generating files for a page, produce exactly three artefacts:

1. `tests/features/<PageName>.feature` — only if the file does not already exist; otherwise append new scenarios
2. `tests/pages/<PageName>Page.js` — full Page Object following the conventions above
3. `tests/steps/<PageName>Steps.js` — step definitions wired to the Page Object via `this.page` and `this.baseUrl`

Do not generate or modify `tests/support/world.js`, `tests/support/hooks.js`, `cucumber.js`, or `generate-report.mjs` during per-page generation — those are scaffold-time files written once.

---

## What carries over verbatim when onboarding a new team member

These files require zero changes:

- All `.feature` files — already in `tests/features/`
- `propfind-website/` — the static app under test
- `docs/ELEMENT_ID_REGISTRY.md` — same element IDs, same HTML
