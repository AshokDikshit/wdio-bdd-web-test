import type { Options } from '@wdio/types';

// Shared configuration for all WebDriverIO test environments
// This contains common properties used across different web browser configurations
export const sharedConfig: any = {
    // Runner Configuration
    runner: 'local',
    // tsConfigPath: './tsconfig.json', // Removed as it's not a valid WebDriverIO config option

    // Test Configuration
    logLevel: 'error',
    logLevels: {
        webdriver: 'error',
        '@wdio/local-runner': 'error'
    },

    // Retry and Timeout Configuration
    bail: 0,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    waitforTimeout: 10000,

    // Framework Configuration
    framework: 'cucumber',

    // Shared Cucumber Options
    cucumberOpts: {
        require: [
            './tests/step-definitions/**/*.ts'
        ],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
        format: [
            'json:./reports/cucumber-report.json'
        ]
    },

    // Shared Reporters Configuration
    reporters: ['spec'],

    // Output directory for test results
    outputDir: './reports',

    // Shared Hook Functions
    beforeFeature: function (uri: any, feature: any) {
        console.log('🎯 Starting feature:', feature.name);
    },

    afterFeature: function (uri: any, feature: any) {
        console.log('✅ Feature completed:', feature.name);
    },

    beforeScenario: function (world: any, context: any) {
        console.log('🧪 Starting scenario:', world.pickle.name);
    },

    afterScenario: function (world: any, result: any, context: any) {
        if (result.passed) {
            console.log('✅ Scenario passed:', world.pickle.name);
        } else {
            console.log('❌ Scenario failed:', world.pickle.name);
            // Take screenshot on failure if browser is available
            if (typeof (global as any).browser !== 'undefined' && typeof (global as any).browser.saveScreenshot === 'function') {
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const screenshotPath = `./screenshots/failed-${timestamp}.png`;
                try {
                    (global as any).browser.saveScreenshot(screenshotPath);
                    console.log('📷 Screenshot saved:', screenshotPath);
                } catch (error: any) {
                    console.log('⚠️  Could not save screenshot:', error?.message || error);
                }
            }
        }
    },

    beforeSession: function (config: any, capabilities: any, specs: any) {
        const cap = capabilities as any;
        console.log('🌐 Starting session for:', cap.browserName, cap.browserVersion || 'latest');
        if (cap.platformName) {
            console.log('💻 Platform:', cap.platformName);
        }
    },

    afterSession: function (config: any, capabilities: any, specs: any) {
        const cap = capabilities as any;
        console.log('🌐 Session ended for:', cap.browserName);
    }
};

// Utility function to merge configurations
export function mergeConfigs(baseConfig: Partial<WebdriverIO.Config>, ...configs: Partial<WebdriverIO.Config>[]): WebdriverIO.Config {
    return configs.reduce((merged, config) => {
        return {
            ...merged,
            ...config,
            // Deep merge for nested objects
            cucumberOpts: {
                ...merged.cucumberOpts,
                ...config.cucumberOpts
            },
            logLevels: {
                ...merged.logLevels,
                ...config.logLevels
            }
        };
    }, baseConfig) as WebdriverIO.Config;
}