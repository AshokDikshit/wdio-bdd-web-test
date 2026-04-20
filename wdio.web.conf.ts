import { browser } from '@wdio/globals';
import { sharedConfig, mergeConfigs } from './wdio.shared.conf.js';
import fs from 'fs';

// Web Configuration for WebDriverIO
// Supports multiple browsers: Chrome, Firefox, Edge, Safari
export const config = mergeConfigs(sharedConfig, {
    // Specs patterns
    specs: [
        './tests/features/**/*.feature'
    ],

    // Exclude patterns
    exclude: [
        // 'path/to/excluded/files'
    ],

    // Maximum instances to run in parallel
    maxInstances: 1,

    // Capabilities for web testing
    // Chrome only configuration for test:chrome script
    capabilities: [
        // Chrome
        {
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: [
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor',
                    '--window-size=1920,1080'
                ]
            },
            acceptInsecureCerts: true
        }
    ],

    // Set a base URL for convenient URL navigation
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',

    // // Services for web testing
    // services: [
    //     'chromedriver'
    // ],

    // Web specific hooks
    onPrepare: function (config, capabilities) {
        console.log('🚀 Starting Web Testing...');
        console.log('🌐 Capabilities:', JSON.stringify(capabilities, null, 2));
        
        // Create necessary directories
        const dirs = ['./reports', './screenshots', './logs'];
        dirs.forEach((dir) => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    },

    onComplete: async function (exitCode, config, capabilities, results) {
        console.log('✅ Web Testing completed with exit code:', exitCode);
        
        // Generate HTML report
        try {
            const reporter = await import('./tests/support/generate-cucumber-report.js');
            if (typeof reporter.generateReport === 'function') {
                await reporter.generateReport();
            }
        } catch (error) {
            console.log('⚠️  Could not generate report:', error);
        }
    },

    before: function (capabilities, specs) {
        // Set browser window size for consistent testing
        browser.setWindowSize(1920, 1080);
        
        // Set implicit wait timeout
        browser.setTimeout({
            'implicit': 5000,
            'pageLoad': 30000,
            'script': 30000
        });
    },

    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            // Take screenshot on test failure
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotPath = `./screenshots/failed-test-${timestamp}.png`;
            browser.saveScreenshot(screenshotPath);
            console.log('📷 Screenshot saved for failed test:', screenshotPath);
        }
    }
});