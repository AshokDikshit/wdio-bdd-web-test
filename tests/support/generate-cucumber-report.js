import report from 'multiple-cucumber-html-reporter';
import fs from 'fs';
import path from 'path';

// Check if test results directory exists
const testResultsDir = './reports';
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
const generateReport = () =>{
// Generate HTML report
report.generate({
    jsonDir: testResultsDir,
    reportPath: './cucumber-html-report',
    metadata: {
        browser: {
            name: 'Chrome',
            version: 'Latest'
        },
        platform: {
            name: 'Desktop',
            version: 'MacBook'
        }
    },
    customData: {
        title: 'Web Automation Test Results',
        data: [
            { label: 'Project', value: 'WebdriverIO Cucumber Web Tests' },
            { label: 'Release', value: '1.0.0' },
            { label: 'Execution Start Time', value: new Date().toISOString() }
        ]
    }
});
}
export {generateReport};

console.log('Cucumber HTML report generated successfully in ./cucumber-html-report directory');
console.log('Open ./cucumber-html-report/index.html in your browser to view the report.');
