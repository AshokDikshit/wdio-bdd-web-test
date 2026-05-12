import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';

const testDir = defineBddConfig({
  importTestFrom: 'tests/support/fixtures.ts',
  paths: ['tests/features'],
  require: ['tests/step-definitions/**/*.ts'],
});

/**
 * Playwright Headless Configuration for BDD Testing
 * Optimized for CI/CD environments and faster execution
 * Migrated from WebDriverIO headless configuration
 */
export default defineConfig({
  testDir,
  
  /* Run tests in files in parallel - higher for headless */
  fullyParallel: true,
  
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  
  /* More workers for headless execution */
  workers: process.env.CI ? 8 : 4,
  
  /* Reporter to use */
  reporter: [
    ['html'],
    ['json', { outputFile: 'reports/headless-test-results.json' }],
    ['junit', { outputFile: 'reports/headless-junit-results.xml' }],
    ['list']
  ],
  
  /* Shared settings optimized for headless execution */
  use: {
    /* Base URL */
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    
    /* Trace collection - minimal for headless */
    trace: 'on-first-retry',
    
    /* Screenshot on failure */
    screenshot: 'only-on-failure',
    
    /* No video recording for headless to save resources */
    video: 'off',
    
    /* Faster timeouts for headless */
    actionTimeout: 8000,
    navigationTimeout: 20000,
    
    /* Headless mode */
    headless: true,
  },
  
  /* Headless browser configurations */
  projects: [
    {
      name: 'chromium-headless',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          headless: true,
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
            '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
          ]
        }
      },
    },
    
    {
      name: 'firefox-headless',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          headless: true,
          firefoxUserPrefs: {
            'security.tls.insecure_fallback_hosts': 'localhost',
            'security.tls.insecure_fallback_hosts_use_subdomain': true,
            'media.navigator.streams.fake': true,
            'media.navigator.permission.disabled': true
          }
        }
      },
    },
  ],
  
  /* Output directory for test artifacts */
  outputDir: 'test-results-headless/',
  
  /* Global setup and teardown */
  globalSetup: require.resolve('./tests/support/global-setup.ts'),
  globalTeardown: require.resolve('./tests/support/global-teardown.ts'),
  
  /* Faster timeouts for headless */
  timeout: 45000,
  
  /* Expect timeout */
  expect: {
    timeout: 8000
  },
  
  /* Maximum failures */
  maxFailures: process.env.CI ? 10 : undefined,
});