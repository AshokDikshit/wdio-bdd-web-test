import type { Options } from '@wdio/types';
import { sharedConfig, mergeConfigs } from './wdio.shared.conf';

// Headless Web Configuration for WebDriverIO
// Optimized for CI/CD environments and faster execution
export const config: WebdriverIO.Config = mergeConfigs(sharedConfig, {
    // Specs patterns
    specs: [
        './tests/features/**/*.feature'
    ],

    // Exclude patterns
    exclude: [
        // 'path/to/excluded/files'
    ],

    // Maximum instances to run in parallel (higher for headless)
    maxInstances: 8,

    // Capabilities for headless web testing
    capabilities: [
        // Chrome Headless
        {
            browserName: 'chrome',
            browserVersion: 'stable',
            'goog:chromeOptions': {
                args: [
                    '--headless=new',
                    '--no-sandbox',
                    '--disable-dev-shm-usage',
                    '--disable-web-security',
                    '--disable-features=VizDisplayCompositor',
                    '--disable-gpu',
                    '--disable-extensions',
                    '--disable-plugins',
                    '--disable-images',
                    '--disable-background-timer-throttling',
                    '--disable-backgrounding-occluded-windows',
                    '--disable-renderer-backgrounding',
                    '--window-size=1920,1080',
                    '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                ]
            },
            acceptInsecureCerts: true
        },
        // Firefox Headless
        {
            browserName: 'firefox',
            browserVersion: 'stable',
            'moz:firefoxOptions': {
                args: [
                    '--headless',
                    '--width=1920',
                    '--height=1080'
                ],
                prefs: {
                    'security.tls.insecure_fallback_hosts': 'localhost',
                    'security.tls.insecure_fallback_hosts_use_subdomain': true,
                    'media.navigator.streams.fake': true,
                    'media.navigator.permission.disabled': true
                }
            },
            acceptInsecureCerts: true
        }
    ],

    // Set a base URL for convenient URL navigation
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',

    // Services for headless web testing
    services: [
        'chromedriver',
        'geckodriver'
    ],

    // Headless specific hooks
    onPrepare: function (config, capabilities) {
        console.log('🚀 Starting Headless Web Testing...');
        console.log('🌐 Running in headless mode for faster execution');
        
        // Create necessary directories
        const fs = require('fs');
        const dirs = ['./reports', './screenshots', './logs'];
        dirs.forEach(dir => {
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }
        });
    },

    onComplete: function (exitCode, config, capabilities, results) {
        console.log('✅ Headless Web Testing completed with exit code:', exitCode);
        
        // Generate HTML report
        const reporter = require('./tests/support/generate-cucumber-report.js');
        if (typeof reporter.generateReport === 'function') {
            reporter.generateReport();
        }
    },

    before: function (capabilities, specs) {
        // Set browser window size for consistent testing
        browser.setWindowSize(1920, 1080);
        
        // Set timeouts optimized for headless execution
        browser.setTimeout({
            'implicit': 3000,
            'pageLoad': 20000,
            'script': 20000
        });
    },

    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            // Take screenshot on test failure
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const screenshotPath = `./screenshots/failed-headless-${timestamp}.png`;
            browser.saveScreenshot(screenshotPath);
            console.log('📷 Screenshot saved for failed test:', screenshotPath);
        }
    }
});