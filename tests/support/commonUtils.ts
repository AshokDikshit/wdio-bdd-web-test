import { Page, Locator, expect } from '@playwright/test';
import { LocatorManager } from './locatorManager';
import { TIMEOUTS, ERROR_MESSAGES } from './constants';

/**
 * Common UI utilities for Playwright
 * Migrated from WebDriverIO CommonUIUtils
 */
export class CommonUIUtils {
  private page: Page;
  private locatorManager: LocatorManager;

  constructor(page: Page) {
    this.page = page;
    this.locatorManager = new LocatorManager();
  }

  // ===============================
  // ELEMENT LOCATOR HELPERS
  // ===============================

  /**
   * Get element locator based on element name and type
   * @param elementName - Name of the element
   * @param elementType - Type of element (button, link, field, etc.)
   * @returns Playwright locator
   */
  async getElement(elementName: string, elementType?: string): Promise<Locator> {
    try {
      const selector = await this.locatorManager.getSelector(elementName, elementType);
      const locator = this.page.locator(selector);
      await locator.waitFor({ timeout: TIMEOUTS.ELEMENT_WAIT });
      return locator;
    } catch (error) {
      throw new Error(`Element '${elementName}' of type '${elementType}' not found: ${error}`);
    }
  }

  /**
   * Get element by data-testid
   * @param elementName - Name of the element
   * @param elementType - Type of element (optional)
   * @returns Playwright locator
   */
  async getElementByDataTestId(elementName: string, elementType?: string): Promise<Locator> {
    try {
      const selector = `[data-testid="${elementName}"]`;
      const locator = this.page.locator(selector);
      await locator.waitFor({ timeout: TIMEOUTS.ELEMENT_WAIT });
      return locator;
    } catch (error) {
      throw new Error(`Element '${elementName}' of type '${elementType}' not found: ${error}`);
    }
  }

  /**
   * Wait for element to be in specified state
   * @param locator - Playwright locator
   * @param state - State to wait for (visible, hidden, attached, detached)
   */
  async waitForElementState(locator: Locator, state: 'visible' | 'hidden' | 'attached' | 'detached'): Promise<void> {
    try {
      await locator.waitFor({ state, timeout: TIMEOUTS.ELEMENT_WAIT });
    } catch (error) {
      throw new Error(`Element failed to reach '${state}' state: ${error}`);
    }
  }

  // ===============================
  // ELEMENT COLLECTION HELPERS
  // ===============================

  /**
   * Get multiple elements by selector
   * @param elementName - Element name to find
   * @param elementType - Element type (optional)
   * @returns Array of Playwright locators
   */
  async getElements(elementName: string, elementType?: string): Promise<Locator[]> {
    try {
      const selector = await this.locatorManager.getSelector(elementName, elementType);
      const locators = this.page.locator(selector);
      const count = await locators.count();
      const elements: Locator[] = [];
      
      for (let i = 0; i < count; i++) {
        elements.push(locators.nth(i));
      }
      
      return elements;
    } catch (error) {
      throw new Error(`Failed to get elements with selector '${elementName}': ${error}`);
    }
  }

  /**
   * Get elements by element name pattern
   * @param elementName - Base name of elements to find
   * @param elementType - Element type (optional)
   * @returns Array of Playwright locators
   */
  async getElementsByName(elementName: string, elementType?: string): Promise<Locator[]> {
    return this.getElements(elementName, elementType);
  }

  // ===============================
  // APPLICATION TYPE DETECTION
  // ===============================

  /**
   * Check if current platform is mobile
   * @returns Boolean indicating if platform is mobile
   */
  isMobilePlatform(): boolean {
    try {
      const userAgent = this.page.evaluate(() => navigator.userAgent);
      return userAgent.then(ua => /Mobile|Android|iPhone|iPad/.test(ua));
    } catch (error) {
      return false;
    }
  }

  /**
   * Get application type (always web for Playwright)
   * @returns Application type
   */
  async getApplicationType(): Promise<'web' | 'mobile' | 'desktop'> {
    try {
      const isMobile = await this.isMobilePlatform();
      return isMobile ? 'mobile' : 'web';
    } catch (error) {
      console.warn('Failed to detect application type, defaulting to web:', error);
      return 'web';
    }
  }

  /**
   * Check if the current application is a web application
   * @returns True if web application
   */
  async isWebApplication(): Promise<boolean> {
    return (await this.getApplicationType()) === 'web';
  }

  /**
   * Check if the current application is a mobile application
   * @returns True if mobile application
   */
  async isMobileApplication(): Promise<boolean> {
    return (await this.getApplicationType()) === 'mobile';
  }

  /**
   * Get current browser context information
   * @returns Browser context information
   */
  getBrowserCapabilities(): any {
    try {
      return {
        browserName: this.page.context().browser()?.browserType().name() || 'unknown',
        viewport: this.page.viewportSize()
      };
    } catch (error) {
      throw new Error(`Failed to get browser capabilities: ${error}`);
    }
  }

  // ===============================
  // UTILITY HELPERS
  // ===============================

  /**
   * Generate a unique selector for an element
   * @param elementName - Name of the element
   * @param elementType - Type of element (optional)
   * @returns CSS selector string
   */
  generateSelector(elementName: string, elementType?: string): string {
    if (elementType) {
      switch (elementType.toLowerCase()) {
        case 'button':
          return `button[data-testid="${elementName}"], [data-testid="${elementName}"][role="button"]`;
        case 'link':
          return `a[data-testid="${elementName}"], [data-testid="${elementName}"][role="link"]`;
        case 'field':
        case 'input':
          return `input[data-testid="${elementName}"], textarea[data-testid="${elementName}"]`;
        case 'dropdown':
        case 'select':
          return `select[data-testid="${elementName}"], [data-testid="${elementName}"][role="combobox"]`;
        case 'checkbox':
          return `input[type="checkbox"][data-testid="${elementName}"]`;
        case 'radio':
          return `input[type="radio"][data-testid="${elementName}"]`;
        default:
          return `[data-testid="${elementName}"]`;
      }
    }
    return `[data-testid="${elementName}"]`;
  }

  /**
   * Wait for page to be ready
   * @param timeout - Maximum time to wait in milliseconds
   */
  async waitForPageReady(timeout: number = TIMEOUTS.PAGE_LOAD): Promise<void> {
    try {
      await this.page.waitForLoadState('domcontentloaded', { timeout });
      await this.page.waitForLoadState('networkidle', { timeout });
    } catch (error) {
      throw new Error(`Failed to wait for page ready: ${error}`);
    }
  }

  /**
   * Execute JavaScript in browser context
   * @param script - JavaScript code to execute
   * @param args - Arguments to pass to the script
   * @returns Result of script execution
   */
  async executeScript(script: string, ...args: any[]): Promise<any> {
    try {
      return await this.page.evaluate(script, ...args);
    } catch (error) {
      throw new Error(`Failed to execute script: ${error}`);
    }
  }

  /**
   * Take a screenshot with timestamp
   * @param filename - Optional custom filename
   * @returns Screenshot filename
   */
  async takeScreenshot(filename?: string): Promise<string> {
    try {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const screenshotName = filename || `screenshot-${timestamp}.png`;
      const screenshotPath = `./screenshots/${screenshotName}`;
      
      await this.page.screenshot({ 
        path: screenshotPath,
        fullPage: true 
      });
      
      return screenshotName;
    } catch (error) {
      throw new Error(`Failed to take screenshot: ${error}`);
    }
  }

  /**
   * Pause execution for specified time
   * @param milliseconds - Time to pause in milliseconds
   */
  async pause(milliseconds: number): Promise<void> {
    try {
      await this.page.waitForTimeout(milliseconds);
    } catch (error) {
      throw new Error(`Failed to pause: ${error}`);
    }
  }

  /**
   * Log message with timestamp
   * @param message - Message to log
   * @param level - Log level (info, warn, error)
   */
  log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    switch (level) {
      case 'warn':
        console.warn(logMessage);
        break;
      case 'error':
        console.error(logMessage);
        break;
      default:
        console.log(logMessage);
    }
  }

  // ===============================
  // ELEMENT ACTIONS
  // ===============================

  /**
   * Click on an element identified by text or locator name
   * @param identifier - Text content or locator name
   * @param elementType - Type of element (optional)
   */
  async clickElement(identifier: string, elementType?: string): Promise<void> {
    try {
      const element = await this.getElement(identifier, elementType);
      await element.click();
      console.log(`Successfully clicked element '${identifier}'`);
    } catch (error) {
      throw new Error(`Failed to click element '${identifier}': ${error}`);
    }
  }

  /**
   * Set text value for an input element
   * @param identifier - Text content or locator name
   * @param value - Value to set
   */
  async setElementValue(identifier: string, value: string): Promise<void> {
    try {
      const element = await this.getElement(identifier, 'input');
      await element.clear();
      await element.fill(value);
      console.log(`Successfully set value '${value}' for element '${identifier}'`);
    } catch (error) {
      throw new Error(`Failed to set value for element '${identifier}': ${error}`);
    }
  }

  /**
   * Get text content from an element
   * @param identifier - Text content or locator name
   * @param elementType - Type of element (optional)
   * @returns Text content of the element
   */
  async getElementText(identifier: string, elementType?: string): Promise<string> {
    try {
      const element = await this.getElement(identifier, elementType);
      const text = await element.textContent() || '';
      console.log(`Retrieved text '${text}' from element '${identifier}'`);
      return text;
    } catch (error) {
      throw new Error(`Failed to get text from element '${identifier}': ${error}`);
    }
  }

  /**
   * Check if element is displayed
   * @param identifier - Text content or locator name
   * @param elementType - Type of element (optional)
   * @returns Boolean indicating if element is displayed
   */
  async isElementDisplayed(identifier: string, elementType?: string): Promise<boolean> {
    try {
      const element = await this.getElement(identifier, elementType);
      const isVisible = await element.isVisible();
      console.log(`Element '${identifier}' is ${isVisible ? 'displayed' : 'not displayed'}`);
      return isVisible;
    } catch (error) {
      console.log(`Element '${identifier}' is not displayed: ${error}`);
      return false;
    }
  }
}