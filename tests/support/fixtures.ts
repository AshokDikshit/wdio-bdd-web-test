import { test as base, Page, BrowserContext } from '@playwright/test';
import { CommonUIUtils } from './commonUtils';
import { UIActions } from './uiActions';
import { UIAssertions } from './uiAssertions';
import { LocatorManager } from './locatorManager';

/**
 * Extended test fixtures for Playwright BDD
 * Provides common utilities and page objects for tests
 */
export interface TestFixtures {
  page: Page;
  context: BrowserContext;
  commonUtils: CommonUIUtils;
  uiActions: UIActions;
  uiAssertions: UIAssertions;
  locatorManager: LocatorManager;
}

/**
 * Extended test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
  // Common utilities fixture
  commonUtils: async ({ page }, use) => {
    const commonUtils = new CommonUIUtils(page);
    await use(commonUtils);
  },
  
  // UI actions fixture
  uiActions: async ({ page, commonUtils }, use) => {
    const uiActions = new UIActions(page, commonUtils);
    await use(uiActions);
  },
  
  // UI assertions fixture
  uiAssertions: async ({ page, commonUtils }, use) => {
    const uiAssertions = new UIAssertions(page, commonUtils);
    await use(uiAssertions);
  },
  
  // Locator manager fixture
  locatorManager: async ({ page }, use) => {
    const locatorManager = new LocatorManager();
    await use(locatorManager);
  },
  
  // Enhanced page fixture with common setup
  page: async ({ page }, use) => {
    // Set default viewport
    await page.setViewportSize({ width: 1920, height: 1080 });
    
    // Set default timeouts
    page.setDefaultTimeout(30000);
    page.setDefaultNavigationTimeout(30000);
    
    // Add console listener for debugging
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Browser console error:', msg.text());
      }
    });
    
    // Add error listener
    page.on('pageerror', error => {
      console.log('Page error:', error.message);
    });
    
    await use(page);
  },
});

export { expect } from '@playwright/test';