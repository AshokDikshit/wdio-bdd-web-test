const report = require('multiple-cucumber-html-reporter');
const fs = require('fs');
const path = require('path');

// Check if test results directory exists
const testResultsDir = './test-results';
if (!fs.existsSync(testResultsDir)) {
    console.log('No test results found. Please run tests first.');
    process.exit(1);
}

// Check if cucumber JSON report exists
const jsonReportPath = path.join(testResultsDir, 'cucumber-report.json');
if (!fs.existsSync(jsonReportPath)) {
    console.log('No Cucumber JSON report found. Please run tests first.');
    process.exit(1);
}

// Generate HTML report
report.generate({
    jsonDir: testResultsDir,
    reportPath: './cucumber-html-report',
    metadata: {
        browser: {
            name: 'Chrome',
            version: 'Latest'
        },
        device: 'Android Emulator',
        platform: {
            name: 'Android',
            version: '15.0'
        }
    },
    customData: {
        title: 'Mobile Automation Test Results',
        data: [
            { label: 'Project', value: 'WebdriverIO Cucumber Mobile Tests' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Execution Start Time', value: new Date().toISOString() }
        ]
    }
});

console.log('Cucumber HTML report generated successfully in ./cucumber-html-report directory');
console.log('Open ./cucumber-html-report/index.html in your browser to view the report.');
