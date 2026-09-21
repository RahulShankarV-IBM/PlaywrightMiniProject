import { generate } from 'multiple-cucumber-html-reporter';

generate({
    jsonDir:    'reports',
    reportPath: 'reports',
    reportName: 'PropFind – Playwright Test Report',
    pageTitle:  'PropFind Test Report',
    metadata: {
        browser: { name: 'chrome', version: 'latest' },
        device:  'GitHub Actions – ubuntu-latest',
        platform: { name: 'linux' }
    },
    customData: {
        title: 'Run Info',
        data: [
            { label: 'Project',    value: 'PropFind Playwright' },
            { label: 'Framework',  value: 'Playwright + Cucumber-JS' },
            { label: 'Reporter',   value: 'multiple-cucumber-html-reporter' }
        ]
    }
});
