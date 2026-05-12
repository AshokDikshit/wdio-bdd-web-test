import { Page, BrowserContext, Browser } from '@playwright/test';
import { IWorldOptions, World, setWorldConstructor } from '@cucumber/cucumber';
import { CommonUIUtils } from './commonUtils';
import { UIActions } from './uiActions';
import { UIAssertions } from './uiAssertions';
import { LocatorManager } from './locatorManager';

/**
 * Custom World class for Cucumber tests with Playwright
 * Provides access to browser, page, and utility classes
 */
export class CustomWorld extends World {
  public browser!: Browser;
  public context!: BrowserContext;
  public page!: Page;
  public commonUtils!: CommonUIUtils;
  public uiActions!: UIActions;
  public uiAssertions!: UIAssertions;
  public locatorManager!: LocatorManager;
  
  constructor(options: IWorldOptions) {
    super(options);
  }
  
  /**
   * Initialize the world with browser, context, and page
   */
  async init(browser: Browser) {
    this.browser = browser;
    this.context = await browser.newContext({
      viewport: { width: 1920, height: 1080 },
      ignoreHTTPSErrors: true,
    });
    this.page = await this.context.newPage();
    
    // Initialize utility classes
    this.commonUtils = new CommonUIUtils(this.page);
    this.uiActions = new UIActions(this.page, this.commonUtils);
    this.uiAssertions = new UIAssertions(this.page, this.commonUtils);
    this.locatorManager = new LocatorManager();
    
    // Set default timeouts
    this.page.setDefaultTimeout(30000);
    this.page.setDefaultNavigationTimeout(30000);
    
    // Add console listener for debugging
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Browser console error:', msg.text());
      }
    });
    
    // Add error listener
    this.page.on('pageerror', error => {
      console.log('Page error:', error.message);
    });
  }
  
  /**
   * Clean up resources
   */
  async cleanup() {
    if (this.page) {
      await this.page.close();
    }
    if (this.context) {
      await this.context.close();
    }
  }
  
  /**
   * Take screenshot with timestamp
   */
  async takeScreenshot(filename?: string): Promise<string> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotName = filename || `screenshot-${timestamp}.png`;
    const screenshotPath = `./screenshots/${screenshotName}`;
    
    await this.page.screenshot({ 
      path: screenshotPath,
      fullPage: true 
    });
    
    return screenshotName;
  }
  
  /**
   * Get current URL
   */
  getCurrentUrl(): string {
    return this.page.url();
  }
  
  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }
}

// Set the custom world constructor
setWorldConstructor(CustomWorld);