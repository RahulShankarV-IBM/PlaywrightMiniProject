# PropFind – Playwright + Cucumber-JS Test Automation Suite

Automated BDD test suite for the **PropFind** property listing web platform, built with **Playwright** and **Cucumber-JS** in JavaScript.

---

## 🏗️ Architecture & Project Structure

```
.
├── .github/workflows/             ← GitHub Actions CI pipeline
├── cucumber.config.js             ← Cucumber-JS runner configuration
├── package.json                   ← Dependencies & scripts
├── propfind-website/              ← Web application under test (HTML/CSS/JS)
├── docs/                          ← Architecture guides & element registries
│   ├── CYD.md
│   ├── ELEMENT_ID_REGISTRY.md
│   ├── GENERATE_TESTS.md
│   └── Rearranged_testcases.xlsx
└── tests/
    ├── features/                  ← Gherkin .feature specifications
    ├── pages/                     ← Page Object Model classes (*Page.js)
    ├── steps/                     ← Cucumber step definitions (*Steps.js)
    └── support/                   ← Browser lifecycle & hooks
        ├── world.js               ← PropFindWorld (Playwright browser & page setup)
        └── hooks.js               ← Before/After hooks & screenshot on failure
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20 LTS or higher
- **npm**: v10 or higher

### Installation

1. Clone repository:
   ```bash
   git clone <repository-url>
   cd "Playwright Project"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Install Playwright browser binaries (Chromium):
   ```bash
   npx playwright install chromium
   ```

---

## 🧪 Running Tests

### Run all tests
```bash
npm test
```

### Run tests by tag
```bash
# Specific test case
npm run test:tag -- --tags "@TC01"

# Specific user story
npm run test:tag -- --tags "@US01"

# Specific priority or classification
npm run test:tag -- --tags "@High"
npm run test:tag -- --tags "@Functional"
```

### View Test Reports
After running the tests, open the generated HTML report:
```bash
# Windows
start reports/cucumber-report.html

# macOS
open reports/cucumber-report.html

# Linux
xdg-open reports/cucumber-report.html
```

---

## 🌿 Git Workflow & Best Practices

To maintain a clean and linear commit history across the team, follow this workflow when creating branches, updating with rebase, and merging.

### 1. Create a Feature Branch
Always branch off the latest `main` branch:
```bash
# Ensure local main is up to date
git checkout main
git pull origin main

# Create and switch to your feature branch
git checkout -b feature/US01-login-automation
```

### 2. Commit Your Work
Make atomic, well-described commits:
```bash
git add tests/
git commit -m "feat(login): implement LoginPage and loginSteps for US01"
```

### 3. Keep Branch Updated with Rebase (Before Pushing / Merging)
Rebasing replays your commits on top of the latest `main`, preventing unnecessary merge commits and keeping history linear:
```bash
# Fetch latest changes from remote
git fetch origin

# Rebase your current branch on top of main
git rebase origin/main
```

> **If conflicts occur during rebase:**
> 1. Git will pause and indicate conflicted files.
> 2. Open and resolve the conflicts in the affected files.
> 3. Stage the resolved files: `git add <resolved-file>`
> 4. Continue rebase: `git rebase --continue`
> *(Never use `git commit` during a rebase conflict resolution. To cancel if stuck: `git rebase --abort`)*

### 4. Push Your Branch to GitHub
```bash
# First push of the feature branch
git push -u origin feature/US01-login-automation

# If you rebased after an earlier push, force-push safely with lease:
git push --force-with-lease origin feature/US01-login-automation
```

### 5. Merging Strategies (Pull Requests)
- Open a Pull Request on GitHub from `feature/<name>` into `main`.
- Wait for GitHub Actions CI validation to pass.
- Recommended PR merge strategy on GitHub: **Squash and merge** or **Rebase and merge** to maintain a clean history.

### 6. Local Branch Cleanup
After your PR is merged to `main`:
```bash
git checkout main
git pull origin main
git branch -d feature/US01-login-automation
```

---

## 📋 Pre-Push Checklist

Before pushing commits or opening a PR, ensure:
- [ ] Dependencies and browser binaries installed (`npm install`, `npx playwright install chromium`)
- [ ] Dry-run or test execution passes (`npm test`)
- [ ] No temporary files or reports committed
- [ ] Branch is rebased cleanly on latest `main` (`git fetch origin && git rebase origin/main`)
