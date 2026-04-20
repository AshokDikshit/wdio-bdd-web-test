/**
 * Common Locator Management Module
 * Handles dynamic locator creation, YAML file management, and element interaction
 * for Cucumber test automation with WebDriverIO
 */

import { $, browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

/**
 * Interface for locator configuration
 */
interface LocatorConfig {
  [category: string]: {
    [locatorName: string]: string;
  };
}

/**
 * Interface for element action options
 */
interface ElementActionOptions {
  timeout?: number;
  waitForState?: 'visible' | 'clickable' | 'enabled';
  retryCount?: number;
}

/**
 * Common Locator Manager Class
 * Provides functionality for dynamic locator creation and element interaction
 */
class LocatorManager {
  private locatorFilePath: string;
  private locatorConfig: LocatorConfig;
  private defaultTimeout: number = 10000;
  private defaultRetryCount: number = 3;

  constructor() {
    this.locatorFilePath = path.join(process.cwd(), 'tests', 'locators');
    this.locatorConfig = this.loadLocatorConfig();
  }

  // ===============================
  // LOCATOR CONFIGURATION MANAGEMENT
  // ===============================

  /**
   * Load locator configuration from all YAML files in the folder
   * @returns Merged locator configuration from all YAML files
   */
  private loadLocatorConfig(): LocatorConfig {
    try {
      const mergedConfig: LocatorConfig = { common: {} };

      // Check if the locator directory exists
      if (!fs.existsSync(this.locatorFilePath)) {
        console.warn(`Locator directory does not exist: ${this.locatorFilePath}. Creating default structure.`);
        this.createDefaultLocatorFile();
        return mergedConfig;
      }

      // Read all YAML files from the directory
      const files = fs.readdirSync(this.locatorFilePath)
        .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));

      if (files.length === 0) {
        console.warn(`No YAML files found in directory: ${this.locatorFilePath}. Creating default file.`);
        this.createDefaultLocatorFile();
        return mergedConfig;
      }

      // Process each YAML file
      files.forEach(file => {
        try {
          const filePath = path.join(this.locatorFilePath, file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const config = yaml.load(fileContent) as LocatorConfig;

          if (config) {
            // Merge configurations
            Object.keys(config).forEach(category => {
              if (!mergedConfig[category]) {
                mergedConfig[category] = {};
              }
              Object.assign(mergedConfig[category], config[category]);
            });
            console.log(`Loaded locators from: ${file}`);
          }
        } catch (fileError) {
          console.warn(`Failed to load locator file ${file}: ${fileError}`);
        }
      });

      return mergedConfig;
    } catch (error) {
      console.warn(`Failed to load locator config: ${error}. Using default configuration.`);
      return { common: {} };
    }
  }

  /**
   * Save locator configuration to the main YAML file
   */
  private saveLocatorConfig(): void {
    try {
      const yamlContent = yaml.dump(this.locatorConfig, {
        indent: 2,
        lineWidth: -1,
        noRefs: true
      });

      // Ensure directory exists
      if (!fs.existsSync(this.locatorFilePath)) {
        fs.mkdirSync(this.locatorFilePath, { recursive: true });
      }

      // Save to locator.yaml file in the directory
      const mainLocatorFile = path.join(this.locatorFilePath, 'locator.yaml');
      fs.writeFileSync(mainLocatorFile, yamlContent, 'utf8');
      console.log(`Locator configuration saved to: ${mainLocatorFile}`);
    } catch (error) {
      throw new Error(`Failed to save locator config: ${error}`);
    }
  }

  /**
   * Create default locator file if it doesn't exist
   */
  private createDefaultLocatorFile(): void {
    const defaultConfig: LocatorConfig = {
      common: {
        locator1: '<locator1_value>',
        locator2: '<locator2_value>'
      }
    };

    this.locatorConfig = defaultConfig;
    this.saveLocatorConfig();
  }

  /**
   * Add a custom locator to the YAML configuration
   * @param locatorName - Name of the locator
   * @param locatorValue - CSS selector or XPath for the locator
   * @param category - Category to group the locator (default: 'common')
   */
  addCustomLocator(locatorName: string, locatorValue: string, category: string = 'common'): void {
    try {
      if (!this.locatorConfig[category]) {
        this.locatorConfig[category] = {};
      }

      this.locatorConfig[category][locatorName] = locatorValue;
      this.saveLocatorConfig();

      console.log(`Added custom locator '${locatorName}' to category '${category}': ${locatorValue}`);
    } catch (error) {
      throw new Error(`Failed to add custom locator: ${error}`);
    }
  }

  /**
   * Get locator value by name and category
   * @param locatorName - Name of the locator
   * @param category - Category of the locator (default: 'common')
   * @returns Locator value or null if not found
   */
  getSavedLocator(locatorName: string, category: string = 'common'): string | null {
    try {
      return this.locatorConfig[category]?.[locatorName] || null;
    } catch (error) {
      console.warn(`Failed to get locator '${locatorName}': ${error}`);
      return null;
    }
  }

  // ===============================
  // DYNAMIC ELEMENT LOCATION
  // ===============================

  /**
   * Create a text-based locator for elements identifiable by their text content
   * @param text - Text content to search for
   * @param elementType - Type of element (button, link, etc.)
   * @returns CSS selector string
   */
  private async createTextBasedLocator(text: string, elementType?: string): Promise<string> {
    // const escapedText = text.replace(/'/g, "\\'').replace(/"/g, '\\"');
    const escapedText = text;
    if (elementType === 'button') {
      // Generic text-based selector proven for web but seems or operator does not work incase of native
      return `//*[contains(@text,'${escapedText}')] | //*[contains(text(),'${escapedText}')] | //*[contains(@placeholder,'${escapedText}')] | //*[contains(@title,'${escapedText}')] | //*[contains(@name,'${escapedText}')] | //*[contains(@content-desc,'${escapedText}')] | //*[contains(@value,'${escapedText}')] | //*[contains(@label,'${escapedText}')] | //*[contains(@description,'${escapedText}')] | //*[contains(@data-test-id,'${escapedText}')] | //*[contains(@data-test,'${escapedText}')] | //*[contains(@data-testid,'${escapedText}')]`;
    } else {
      // Generic text-based selector proven for web but seems or operator does not work incase of native
      return `//*[contains(@text,'${escapedText}')] | //*[contains(text(),'${escapedText}')] | //*[contains(@placeholder,'${escapedText}')] | //*[contains(@title,'${escapedText}')] | //*[contains(@name,'${escapedText}')] | //*[contains(@content-desc,'${escapedText}')] | //*[contains(@value,'${escapedText}')] | //*[contains(@label,'${escapedText}')] | //*[contains(@description,'${escapedText}')] | //*[contains(@data-test-id,'${escapedText}')] | //*[contains(@data-test,'${escapedText}')] | //*[contains(@data-testid,'${escapedText}')]`;
    }
  }

  /**
   * Get element using dynamic locator strategy
   * @param identifier - Text content or locator name
   * @param elementType - Type of element (optional)
   * @param options - Additional options for element location
   * @returns WebDriverIO element
   */
  async getSelector(
    identifier: string,
    elementType?: string,
    options: ElementActionOptions = {}
  ): Promise<string> {
    const { timeout = this.defaultTimeout, waitForState = 'visible', retryCount = this.defaultRetryCount } = options;

    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        let selector: string;

        // First, try to get selector using saved locator
        const savedLocator = this.getSavedLocator(identifier, 'common');
        if (savedLocator) {
          selector = savedLocator;
          console.log(`Got saved locator '${selector}' on attempt ${attempt}`);
        } else {
          // Create dynamic text-based locator
          console.log(`Creating dynamic text-based locator for '${identifier}'`);
          const textLocator = await this.createTextBasedLocator(identifier, elementType);
          // Use XPath selector for text-based locators
          selector = textLocator;
          console.log(`Got text-based locator '${selector}' on attempt ${attempt}`);
        }
        return selector;

      } catch (error) {
        lastError = error as Error;
        console.warn(`Attempt ${attempt}/${retryCount} failed to locate element '${identifier}': ${error}`);
        if (attempt < retryCount) {
          await browser.pause(1000); // Wait 1 second before retry
        }
      }
    }

    throw new Error(`Failed to locate element '${identifier}' after ${retryCount} attempts. Last error: ${lastError?.message}`);
  }

  /**
   * Wait for element to be in specified state
   * @param element - WebDriverIO element
   * @param state - State to wait for
   * @param timeout - Maximum time to wait
   */
  async waitForElementState(
    element: ChainablePromiseElement,
    state: 'visible' | 'clickable' | 'enabled',
    timeout?: number
  ): Promise<void> {
    try {
      switch (state) {
        case 'visible':
          await element.waitForDisplayed({ timeout });
          break;
        case 'clickable':
          await element.waitForClickable({ timeout });
          break;
        case 'enabled':
          await element.waitForEnabled({ timeout });
          break;
      }
    } catch (error) {
      throw new Error(`Element failed to reach '${state}' state within ${timeout}ms: ${error}`);
    }
  }

  // ===============================
  // UTILITY METHODS
  // ===============================

  /**
   * Refresh locator configuration from file
   */
  refreshLocatorConfig(): void {
    this.locatorConfig = this.loadLocatorConfig();
    console.log('Locator configuration refreshed from file');
  }

  /**
   * Get all locators for a specific category
   * @param category - Category name
   * @returns Object containing all locators in the category
   */
  getLocatorsByCategory(category: string): { [locatorName: string]: string } {
    return this.locatorConfig[category] || {};
  }

  /**
   * Get all available categories
   * @returns Array of category names
   */
  getAvailableCategories(): string[] {
    return Object.keys(this.locatorConfig);
  }

  /**
   * Remove a locator from configuration
   * @param locatorName - Name of the locator to remove
   * @param category - Category of the locator (default: 'common')
   */
  removeLocator(locatorName: string, category: string = 'common'): void {
    try {
      if (this.locatorConfig[category]?.[locatorName]) {
        delete this.locatorConfig[category][locatorName];
        this.saveLocatorConfig();
        console.log(`Removed locator '${locatorName}' from category '${category}'`);
      } else {
        console.warn(`Locator '${locatorName}' not found in category '${category}'`);
      }
    } catch (error) {
      throw new Error(`Failed to remove locator: ${error}`);
    }
  }
}

// Export singleton instance
const locatorManager = new LocatorManager();
export default locatorManager;
export { LocatorManager, LocatorConfig, ElementActionOptions };

// Export the new Android and iOS locator functions for external use
export const createTextBasedAndroidLocator = (text: string, elementType?: string): string => {
  return (locatorManager as any).createTextBasedAndroidLocator(text, elementType);
};

export const createTextBasediOSLocator = (text: string, elementType?: string): string => {
  return (locatorManager as any).createTextBasediOSLocator(text, elementType);
};
