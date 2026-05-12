import { IConfiguration } from '@cucumber/cucumber';

/**
 * Cucumber Configuration for Playwright BDD
 * Migrated from WebDriverIO Cucumber configuration
 */
const config: IConfiguration = {
  // Feature files location
  paths: ['tests/features/**/*.feature'],
  
  // Step definitions location
  require: [
    'tests/step-definitions/**/*.ts',
    'tests/support/**/*.ts'
  ],
  
  // Require modules
  requireModule: ['ts-node/register'],
  
  // Format options
  format: [
    'json:reports/cucumber-report.json',
    'html:reports/cucumber-report.html',
    '@cucumber/pretty-formatter'
  ],
  
  // Parallel execution
  parallel: 1,
  
  // Retry configuration
  retry: 0,
  
  // Timeout for step definitions (in milliseconds)
  timeout: 60000,
  
  // Dry run mode
  dryRun: false,
  
  // Fail fast on first failure
  failFast: false,
  
  // Strict mode - fail if there are undefined steps
  strict: true,
  
  // Tag expression for filtering scenarios
  tags: process.env.CUCUMBER_TAGS || '',
  
  // World parameters
  worldParameters: {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    browser: process.env.BROWSER || 'chromium',
    headless: process.env.HEADLESS === 'true',
    viewport: {
      width: parseInt(process.env.VIEWPORT_WIDTH || '1920'),
      height: parseInt(process.env.VIEWPORT_HEIGHT || '1080')
    }
  },
  
  // Publish results
  publish: false,
  
  // Snippets interface
  snippetInterface: 'async-await',
  
  // Snippets syntax
  snippetSyntax: 'typescript'
};

export default config;