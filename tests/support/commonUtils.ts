/**
 * Common UI Utilities Module
 * Contains shared utility functions for WebDriverIO test automation
 * Used by both uiActions and uiAssertions modules
 */

import { $, $$, browser } from '@wdio/globals';
import type { ChainablePromiseArray, ChainablePromiseElement } from 'webdriverio';
import locatorManager from './locatorManager';


/**
 * Common UI Utilities Class
 * Provides shared functionality for element location and state management
 */
class CommonUIUtils {
    
    // ===============================
    // ELEMENT LOCATOR HELPERS
    // ===============================
    
    /**
     * Get element locator based on element name and type
     * @param elementName - Name of the element
     * @param elementType - Type of element (button, link, field, etc.)
     * @returns WebDriverIO element
     */
    async getElement(elementName: string, elementType?: string): Promise<ChainablePromiseElement> {
        try {
            const selector = await locatorManager.getSelector(elementName, elementType); // Ensure locator is defined in locatorManager
            const element = $(selector as any);
            await element.waitForExist({ timeout: 10000 });
            return element;
        } catch (error) {
            throw new Error(`Element '${elementName}' of type '${elementType}' not found: ${error}`);
        }
    }

    /**
     * Get element locator based on element name and type
     * @param elementName - Name of the element
     * @param elementType - Type of element (button, link, field, etc.)
     * @returns WebDriverIO element
     */
    async getElementByDataTestId(elementName: string, elementType?: string): Promise<ChainablePromiseElement> {
        try {
            // Implement your element locator strategy here
            // This could use page object pattern, data-testid, accessibility ids, etc.
            const selector = `[data-testid="${elementName}"]`; // Example selector strategy
            const element = await $(selector);
            await element.waitForExist({ timeout: 10000 });
            return element;
        } catch (error) {
            throw new Error(`Element '${elementName}' of type '${elementType}' not found: ${error}`);
        }
    }

    /**
     * Wait for element to be in specified state
     * @param element - WebDriverIO element
     * @param state - State to wait for (visible, clickable, enabled)
     */
    async waitForElementState(element: ChainablePromiseElement, state: 'visible' | 'clickable' | 'enabled'): Promise<void> {
        try {
            switch (state) {
                case 'visible':
                    await element.waitForDisplayed({ timeout: 10000 });
                    break;
                case 'clickable':
                    await element.waitForClickable({ timeout: 10000 });
                    break;
                case 'enabled':
                    await element.waitForEnabled({ timeout: 10000 });
                    break;
            }
        } catch (error) {
            throw new Error(`Element failed to reach '${state}' state: ${error}`);
        }
    }

    // ===============================
    // ELEMENT COLLECTION HELPERS
    // ===============================
    
    /**
     * Get multiple elements by selector
     * @param selector - CSS selector to find elements
     * @returns Array of WebDriverIO elements
     */
    async getElements(elementName: string, elementType?: string): Promise<ChainablePromiseArray> {
        try {
            const selector = await locatorManager.getSelector(elementName, elementType); // Ensure locator is defined in locatorManager
            const elements = $$(selector);
            return elements;
        } catch (error) {
            throw new Error(`Failed to get elements with selector '${elementName}': ${error}`);
        }
    }

    /**
     * Get elements by element name pattern
     * @param elementName - Base name of elements to find
     * @returns Array of WebDriverIO elements
     */
    async getElementsByName(elementName: string, elementType?: string): Promise<ChainablePromiseArray> {
        try {
            const selector = await locatorManager.getSelector(elementName, elementType); // Ensure locator is defined in locatorManager
            const elements = $$(selector);
            return elements;
        } catch (error) {
            throw new Error(`Failed to get elements with name pattern '${elementName}': ${error}`);
        }
    }

    // ===============================
    // BROWSER STATE HELPERS
    // ===============================
    
    /**
     * Check if current platform is mobile
     * @returns Boolean indicating if platform is mobile
     */
    isMobilePlatform(): boolean {
        try {
            const capabilities = browser.capabilities;
            return capabilities.platformName === 'Android' || capabilities.platformName === 'iOS';
        } catch (error) {
            return false;
        }
    }

    // ===============================
    // APPLICATION TYPE DETECTION
    // ===============================

    /**
     * Dynamically determine the application type based on browser capabilities and context
     * @returns Application type: 'web', 'android', 'ios', or 'hybrid'
     */
    async getApplicationType(): Promise<'web' | 'android' | 'ios' | 'hybrid'> {
        try {
            const capabilities = browser.capabilities;
            
            // Check for mobile platform indicators
            const platformName = capabilities.platformName?.toLowerCase();
            const browserName = capabilities.browserName?.toLowerCase();
            const appPackage = (capabilities as any)['appium:appPackage'] || (capabilities as any).appPackage;
            const bundleId = (capabilities as any)['appium:bundleId'] || (capabilities as any).bundleId;
            
            // Android native app detection
            if (platformName === 'android' && appPackage) {
                return 'android';
            }
            
            // iOS native app detection
            if (platformName === 'ios' && bundleId) {
                return 'ios';
            }
            
            // Hybrid app detection (has both native capabilities and browser context)
            if ((platformName === 'android' || platformName === 'ios') && 
                (browserName === 'chrome' || browserName === 'safari')) {
                try {
                    const contexts = await browser.getContexts();
                    if (contexts && contexts.length > 1) {
                        return 'hybrid';
                    }
                } catch (contextError) {
                    // Context switching not available, likely native
                    return platformName === 'android' ? 'android' : 'ios';
                }
            }
            
            // Web application detection (default fallback)
            return 'web';
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
     * Check if the current application is a native application (Android or iOS)
     * @returns True if native application
     */
    async isNativeApplication(): Promise<boolean> {
        const appType = await this.getApplicationType();
        return appType === 'android' || appType === 'ios';
    }

    /**
     * Check if the current application is a hybrid application
     * @returns True if hybrid application
     */
    async isHybridApplication(): Promise<boolean> {
        return (await this.getApplicationType()) === 'hybrid';
    }

    /**
     * Get current browser capabilities
     * @returns Browser capabilities object
     */
    getBrowserCapabilities(): any {
        try {
            return browser.capabilities;
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
            // You can customize selector strategy based on element type
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
    async waitForPageReady(timeout: number = 30000): Promise<void> {
        try {
            await browser.waitUntil(
                async () => {
                    const readyState = await browser.execute(() => document.readyState);
                    return readyState === 'complete';
                },
                {
                    timeout,
                    timeoutMsg: `Page did not load within ${timeout / 1000} seconds`
                }
            );
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
            return await browser.execute(script, ...args);
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
            await browser.saveScreenshot(`./screenshots/${screenshotName}`);
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
            await browser.pause(milliseconds);
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
   * @param options - Additional options
   */
  async clickElement(
    identifier: string, 
    elementType?: string
  ): Promise<void> {
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
   * @param options - Additional options
   */
  async setElementValue(
    identifier: string, 
    value: string
  ): Promise<void> {
    try {
      const element = await this.getElement(identifier, 'input');
      await element.clearValue();
      await element.setValue(value);
      console.log(`Successfully set value '${value}' for element '${identifier}'`);
    } catch (error) {
      throw new Error(`Failed to set value for element '${identifier}': ${error}`);
    }
  }

  /**
   * Get text content from an element
   * @param identifier - Text content or locator name
   * @param elementType - Type of element (optional)
   * @param options - Additional options
   * @returns Text content of the element
   */
  async getElementText(
    identifier: string, 
    elementType?: string
  ): Promise<string> {
    try {
      const element = await this.getElement(identifier, elementType);
      const text = await element.getText();
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
   * @param options - Additional options
   * @returns Boolean indicating if element is displayed
   */
  async isElementDisplayed(
    identifier: string, 
    elementType?: string
  ): Promise<boolean> {
    try {
      const element = await this.getElement(identifier, elementType);
      const isDisplayed = await element.isDisplayed();
      console.log(`Element '${identifier}' is ${isDisplayed ? 'displayed' : 'not displayed'}`);
      return isDisplayed;
    } catch (error) {
      console.log(`Element '${identifier}' is not displayed: ${error}`);
      return false;
    }
  }

}

// Export singleton instance
const commonUtils = new CommonUIUtils();
export default commonUtils;
export { CommonUIUtils };