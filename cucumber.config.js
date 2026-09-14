module.exports = {
    default: {
        paths:   ['tests/features/**/*.feature'],
        require: ['tests/support/**/*.js', 'tests/steps/**/*.js'],
        format:  ['progress-bar', 'html:reports/cucumber-report.html'],
        parallel: 0
    }
};
