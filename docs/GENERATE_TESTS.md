# PropFind – Test Generation Guide (Playwright + Cucumber-JS)

You are helping automate QA testing for the **PropFind** website — a property listing platform built with plain HTML, CSS, and JavaScript.

## Project context

- All HTML files are in `propfind-website/` at the project root (e.g. `login.html`, `search-results.html`, `property-detail.html`, etc.)
- All interactive elements already have stable `id` attributes added for automated testing
- Dynamic elements generated inside JS template literals also follow stable ID patterns (e.g. `fav-btn-${p.id}`, `compare-chk-${p.id}`, `btn-remove-${p.id}`)
- **`docs/ELEMENT_ID_REGISTRY.md`** — pre-extracted table of every element `id` per page; use this in Step 3 to avoid re-reading HTML files for every generation run
- **`docs/Rearranged_testcases.xlsx`** — source of truth for test case definitions (TC IDs, steps, expected results, priority, classification)
- Test-related files reside cleanly in `tests/`:
  - `tests/features/*.feature` — Gherkin scenarios
  - `tests/pages/*Page.js` — Page Object classes
  - `tests/steps/*Steps.js` — Cucumber step definitions
  - `tests/support/world.js` — Centralized browser/context/baseUrl lifecycle
  - `tests/support/hooks.js` — Before/After lifecycle and failure screenshot capture

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (20 LTS or higher) |
| Browser automation | Playwright (`@playwright/test`) |
| BDD framework | Cucumber-JS (`@cucumber/cucumber`) |
| Assertions | `@playwright/test` `expect` or Node built-in `assert` |
| Reporting | Cucumber HTML Reporter (`reports/cucumber-report.html`) |

---

## Project Layout

```
.
├── cucumber.config.js             ← Cucumber-JS runner configuration
├── package.json                   ← npm scripts and dependencies
├── propfind-website/              ← HTML/CSS/JS application under test
├── docs/
│   ├── CYD.md
│   ├── ELEMENT_ID_REGISTRY.md
│   ├── GENERATE_TESTS.md
│   └── Rearranged_testcases.xlsx
└── tests/
    ├── features/                  ← Gherkin .feature files
    │   ├── Login.feature
    │   ├── MapView.feature
    │   ├── SearchResults.feature
    │   ├── PropertyDetail.feature
    │   ├── Dashboard.feature
    │   ├── Compare.feature
    │   ├── BudgetPlanner.feature
    │   ├── AddListing.feature
    │   └── MovingAssistant.feature
    ├── pages/                     ← Page Object classes (*Page.js)
    │   ├── LoginPage.js
    │   ├── MapViewPage.js
    │   ├── SearchResultsPage.js
    │   ├── PropertyDetailPage.js
    │   ├── DashboardPage.js
    │   ├── ComparePage.js
    │   ├── BudgetPlannerPage.js
    │   ├── AddListingPage.js
    │   └── MovingAssistantPage.js
    ├── steps/                     ← Cucumber step definitions (*Steps.js)
    │   ├── loginSteps.js
    │   ├── mapViewSteps.js
    │   ├── searchResultsSteps.js
    │   ├── propertyDetailSteps.js
    │   ├── dashboardSteps.js
    │   ├── compareSteps.js
    │   ├── budgetPlannerSteps.js
    │   ├── addListingSteps.js
    │   └── movingAssistantSteps.js
    └── support/
        ├── world.js               ← PropFindWorld (single browser/context/page setup)
        └── hooks.js               ← Before/After hooks & screenshot on failure
```

---

## File placement rules — read before generating any file

Every test file generated must be placed inside `tests/`:

| File type | Subdirectory | Full path pattern |
|---|---|---|
| Feature file | `tests/features/` | `tests/features/<PageName>.feature` |
| Page Object | `tests/pages/` | `tests/pages/<PageName>Page.js` |
| Step definitions | `tests/steps/` | `tests/steps/<PageName>Steps.js` |
| World (setup) | `tests/support/` | `tests/support/world.js` *(write once, do not regenerate per page)* |
| Hooks | `tests/support/` | `tests/support/hooks.js` *(write once, do not regenerate per page)* |

---

## Established conventions

### Page Objects (`tests/pages/<PageName>Page.js`)
- Constructor receives `page` and `baseUrl`:
  ```js
  class <PageName>Page {
      constructor(page, baseUrl) {
          this.page = page;
          this.baseUrl = baseUrl;
          this.element = this.page.locator('#element-id');
      }
  }
  ```
- **Locators:** Use `#id` selectors first from `docs/ELEMENT_ID_REGISTRY.md`. Fall back to CSS classes or `locator('text=...')`. Never use XPath.
- **Auto-waiting:** Never add manual timeouts or sleeps (`setTimeout`) — Playwright auto-waits on every action (`click`, `fill`, `selectOption`).
- **No assertions:** Page objects must contain **zero** `assert` or `expect` calls.
- **Method shape:** One `async` method per user action. Query methods return primitive values (`string`, `number`, `boolean`) or arrays.
- **Navigation:**
  ```js
  async navigateTo() {
      await this.page.goto(this.baseUrl + '<page>.html');
      await this.page.locator('#landmark-id').waitFor();
  }
  ```
- **Dropdown selections:** Use `await locator.selectOption({ label: 'Visible Label' })` or `await locator.selectOption('value')`.

### Step Definitions (`tests/steps/<PageName>Steps.js`)
- Import Cucumber step functions: `const { Given, When, Then, And } = require('@cucumber/cucumber');`
- Import Playwright `expect` or Node `assert`: `const { expect } = require('@playwright/test');`
- Use regular `function()` syntax (not arrow functions `() => {}`) so Cucumber binds `this` to the `PropFindWorld` instance.
- Access `this.page` and `this.baseUrl` to instantiate Page Objects:
  ```js
  Given('I am on the login page', async function () {
      const loginPage = new LoginPage(this.page, this.baseUrl);
      await loginPage.navigateTo();
  });
  ```
- All assertions belong inside step definitions, using `expect` or `assert`.
- Step matching text must match the Gherkin scenarios verbatim.

---

## Auth-protected pages

Before generating for any page, check if the HTML file requires authentication (`Auth.requireLogin()`).
Pages like `dashboard.html`, `property-detail.html`, and `compare.html` require a logged-in user.

For these pages, add a `loginAs(username, password)` method to the Page Object:
```js
async loginAs(username = 'valid_user', password = 'Valid@123') {
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

    await this.page.goto(this.baseUrl + '<target-page>.html');
    await this.page.locator('#landmark-id').waitFor();
}
```

---

## Page → file mapping

| User Story | HTML File | Feature File | Page Object | Step Definitions |
|---|---|---|---|---|
| US01 | `login.html` | `tests/features/Login.feature` | `tests/pages/LoginPage.js` | `tests/steps/loginSteps.js` |
| US02, US03 | `search-results.html` | `tests/features/SearchResults.feature` | `tests/pages/SearchResultsPage.js` | `tests/steps/searchResultsSteps.js` |
| US04 | `map-view.html` | `tests/features/MapView.feature` | `tests/pages/MapViewPage.js` | `tests/steps/mapViewSteps.js` |
| US05, US06, US09, US10, US14 | `property-detail.html` | `tests/features/PropertyDetail.feature` | `tests/pages/PropertyDetailPage.js` | `tests/steps/propertyDetailSteps.js` |
| US07, US11 | `dashboard.html` | `tests/features/Dashboard.feature` | `tests/pages/DashboardPage.js` | `tests/steps/dashboardSteps.js` |
| US08 | `compare.html` | `tests/features/Compare.feature` | `tests/pages/ComparePage.js` | `tests/steps/compareSteps.js` |
| US12 | `budget-planner.html` | `tests/features/BudgetPlanner.feature` | `tests/pages/BudgetPlannerPage.js` | `tests/steps/budgetPlannerSteps.js` |
| US13 | `add-listing.html` | `tests/features/AddListing.feature` | `tests/pages/AddListingPage.js` | `tests/steps/addListingSteps.js` |
| US15 | `moving-assistant.html` | `tests/features/MovingAssistant.feature` | `tests/pages/MovingAssistantPage.js` | `tests/steps/movingAssistantSteps.js` |

---

## Generation Steps

### Step 1 — Read test cases
Read `docs/Rearranged_testcases.xlsx` for the target User Story / TC IDs to extract:
- Scenario title, Steps, Expected Results, Classification, Priority.

### Step 2 — Collect element IDs
Open `docs/ELEMENT_ID_REGISTRY.md` to get the element IDs for the target page.

### Step 3 — Generate Feature File
- **Location:** `tests/features/<PageName>.feature`
- Include tags: `@TCXX @USXX @Classification @Priority`
- Step definitions use clear user-facing UI actions.

### Step 4 — Generate Page Object
- **Location:** `tests/pages/<PageName>Page.js`
- Export class `<PageName>Page`.
- Define locators with `this.page.locator('#id')`.
- Expose async action and query methods.

### Step 5 — Generate Step Definitions
- **Location:** `tests/steps/<PageName>Steps.js`
- Wire Cucumber steps to `<PageName>Page` methods using `this.page` and `this.baseUrl`.
- Perform assertions with Playwright `expect` or Node `assert`.

---

## Step 6 — Self-review before output

Verify:
- [ ] Every `#id` selector exists in `docs/ELEMENT_ID_REGISTRY.md`.
- [ ] No manual sleeps (`setTimeout` / `Thread.sleep`) — Playwright auto-waits.
- [ ] Zero assertions in Page Object methods; all assertions in Step Definitions.
- [ ] Step definitions use regular `function()` (not arrow functions) to preserve `this` context.
- [ ] File paths follow the clean `tests/` structure (`tests/features/`, `tests/pages/`, `tests/steps/`, `tests/support/`).
- [ ] Tests run smoothly using `npx cucumber-js`.
