import { PlaywrightTestConfig } from '@playwright/test';

/**
 * Shared configuration for all Playwright test environments
 * Contains common properties used across different browser configurations
 * Migrated from WebDriverIO shared configuration
 */
export const sharedConfig: Partial<PlaywrightTestConfig> = {
  /* Global test timeout */
  timeout: 60000,
  
  /* Global expect timeout */
  expect: {
    timeout: 10000
  },
  
  /* Shared test settings */
  use: {
    /* Base URL for tests */
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    
    /* Global action timeout */
    actionTimeout: 10000,
    
    /* Global navigation timeout */
    navigationTimeout: 30000,
    
    /* Ignore HTTPS errors */
    ignoreHTTPSErrors: true,
    
    /* Capture screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* Record video on failure */
    video: 'retain-on-failure',
    
    /* Collect trace when retrying the failed test */
    trace: 'on-first-retry',
  },
  
  /* Shared reporter configuration */
  reporter: [
    ['html'],
    ['json', { outputFile: 'reports/test-results.json' }],
    ['junit', { outputFile: 'reports/junit-results.xml' }],
    ['list']
  ],
  
  /* Output directory for test artifacts */
  outputDir: 'test-results/',
  
  /* Retry configuration */
  retries: process.env.CI ? 2 : 0,
  
  /* Worker configuration */
  workers: process.env.CI ? 1 : undefined,
  
  /* Parallel execution */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only */
  forbidOnly: !!process.env.CI,
};

/**
 * Utility function to merge configurations
 * @param baseConfig Base configuration
 * @param configs Additional configurations to merge
 * @returns Merged configuration
 */
export function mergeConfigs(
  baseConfig: Partial<PlaywrightTestConfig>,
  ...configs: Partial<PlaywrightTestConfig>[]
): PlaywrightTestConfig {
  return configs.reduce((merged, config) => {
    return {
      ...merged,
      ...config,
      // Deep merge for nested objects
      use: {
        ...merged.use,
        ...config.use,
      },
      expect: {
        ...merged.expect,
        ...config.expect,
      },
      reporter: config.reporter || merged.reporter,
      projects: config.projects || merged.projects,
    };
  }, baseConfig) as PlaywrightTestConfig;
}

/**
 * Common browser launch options
 */
export const commonLaunchOptions = {
  chrome: {
    args: [
      '--no-sandbox',
      '--disable-dev-shm-usage',
      '--disable-web-security',
      '--disable-features=VizDisplayCompositor',
      '--window-size=1920,1080'
    ]
  },
  
  chromeHeadless: {
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
      '--window-size=1920,1080'
    ]
  },
  
  firefox: {
    firefoxUserPrefs: {
      'security.tls.insecure_fallback_hosts': 'localhost',
      'security.tls.insecure_fallback_hosts_use_subdomain': true,
      'media.navigator.streams.fake': true,
      'media.navigator.permission.disabled': true
    }
  }
};

/**
 * Common viewport sizes
 */
export const viewports = {
  desktop: { width: 1920, height: 1080 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 }
};