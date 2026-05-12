/**
 * Environment configuration for Playwright BDD tests
 * Centralizes environment variable handling
 */

export interface TestEnvironment {
  baseUrl: string;
  browser: 'chromium' | 'firefox' | 'webkit';
  headless: boolean;
  viewport: {
    width: number;
    height: number;
  };
  timeout: {
    action: number;
    navigation: number;
    test: number;
  };
  retries: number;
  workers: number;
  screenshots: boolean;
  videos: boolean;
  traces: boolean;
}

/**
 * Get test environment configuration
 */
export function getTestEnvironment(): TestEnvironment {
  return {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    browser: (process.env.BROWSER as any) || 'chromium',
    headless: process.env.HEADLESS !== 'false',
    viewport: {
      width: parseInt(process.env.VIEWPORT_WIDTH || '1920'),
      height: parseInt(process.env.VIEWPORT_HEIGHT || '1080')
    },
    timeout: {
      action: parseInt(process.env.ACTION_TIMEOUT || '10000'),
      navigation: parseInt(process.env.NAVIGATION_TIMEOUT || '30000'),
      test: parseInt(process.env.TEST_TIMEOUT || '60000')
    },
    retries: parseInt(process.env.RETRIES || '0'),
    workers: parseInt(process.env.WORKERS || '1'),
    screenshots: process.env.SCREENSHOTS !== 'false',
    videos: process.env.VIDEOS === 'true',
    traces: process.env.TRACES === 'true'
  };
}

/**
 * Environment-specific configurations
 */
export const environments = {
  development: {
    baseUrl: 'https://www.saucedemo.com',
    headless: false,
    retries: 0
  },
  staging: {
    baseUrl: 'https://staging.saucedemo.com',
    headless: true,
    retries: 1
  },
  production: {
    baseUrl: 'https://www.saucedemo.com',
    headless: true,
    retries: 2
  }
};

/**
 * Get configuration for specific environment
 */
export function getEnvironmentConfig(env: keyof typeof environments) {
  return environments[env] || environments.development;
}