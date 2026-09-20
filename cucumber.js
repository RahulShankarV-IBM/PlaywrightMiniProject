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
