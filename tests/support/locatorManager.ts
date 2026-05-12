import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

/**
 * Locator Manager for Playwright
 * Migrated from WebDriverIO locator management system
 */
export class LocatorManager {
  private locators: Map<string, any> = new Map();
  private locatorFiles: string[] = [];

  constructor() {
    this.loadLocators();
  }

  /**
   * Load locators from YAML files
   */
  private loadLocators(): void {
    try {
      const locatorsDir = './tests/locators';
      
      if (fs.existsSync(locatorsDir)) {
        const files = fs.readdirSync(locatorsDir)
          .filter(file => file.endsWith('.yaml') || file.endsWith('.yml'));
        
        files.forEach(file => {
          const filePath = path.join(locatorsDir, file);
          const content = fs.readFileSync(filePath, 'utf8');
          const locatorData = yaml.load(content) as any;
          
          if (locatorData) {
            Object.keys(locatorData).forEach(category => {
              this.locators.set(category, locatorData[category]);
            });
            this.locatorFiles.push(file);
          }
        });
        
        console.log(`Loaded locators from ${files.length} files:`, files);
      } else {
        console.warn('Locators directory not found, using dynamic locators only');
      }
    } catch (error) {
      console.warn('Failed to load locators:', error);
    }
  }

  /**
   * Get selector for an element
   * @param elementName - Name of the element
   * @param elementType - Type of element (optional)
   * @returns CSS selector or XPath
   */
  async getSelector(elementName: string, elementType?: string): Promise<string> {
    // First try to find in saved locators
    const savedLocator = this.getSavedLocator(elementName);
    if (savedLocator) {
      return savedLocator;
    }

    // Generate dynamic locator based on text
    return this.generateDynamicLocator(elementName, elementType);
  }

  /**
   * Get saved locator from YAML files
   * @param elementName - Name of the element
   * @returns Locator string or null
   */
  private getSavedLocator(elementName: string): string | null {
    for (const [category, locatorGroup] of this.locators) {
      if (locatorGroup && typeof locatorGroup === 'object') {
        // Check direct match
        if (locatorGroup[elementName]) {
          return locatorGroup[elementName];
        }
        
        // Check case-insensitive match
        const keys = Object.keys(locatorGroup);
        const matchingKey = keys.find(key => 
          key.toLowerCase() === elementName.toLowerCase()
        );
        
        if (matchingKey) {
          return locatorGroup[matchingKey];
        }
      }
    }
    return null;
  }

  /**
   * Generate dynamic locator based on text and element type
   * @param text - Text to search for
   * @param elementType - Type of element
   * @returns XPath or CSS selector
   */
  private generateDynamicLocator(text: string, elementType?: string): string {
    // Text-based dynamic locators with multiple fallback strategies
    const textSelectors = [
      // Exact text match
      `//*[text()='${text}']`,
      // Contains text
      `//*[contains(text(),'${text}')]`,
      // Placeholder attribute
      `//*[contains(@placeholder,'${text}')]`,
      // Title attribute
      `//*[contains(@title,'${text}')]`,
      // Name attribute
      `//*[contains(@name,'${text}')]`,
      // Data-testid attribute
      `//*[contains(@data-testid,'${text}')]`,
      // Value attribute
      `//*[contains(@value,'${text}')]`,
      // Label text
      `//label[contains(text(),'${text}')]//following::*[1]`,
      // Aria-label
      `//*[contains(@aria-label,'${text}')]`
    ];

    // Element type specific selectors
    if (elementType) {
      switch (elementType.toLowerCase()) {
        case 'button':
          return `//button[contains(text(),'${text}')] | //input[@type='button' and contains(@value,'${text}')] | //*[@role='button' and contains(text(),'${text}')]`;
        
        case 'link':
          return `//a[contains(text(),'${text}')] | //*[@role='link' and contains(text(),'${text}')]`;
        
        case 'field':
        case 'input':
        case 'textbox':
          return `//input[contains(@placeholder,'${text}')] | //input[contains(@name,'${text}')] | //textarea[contains(@placeholder,'${text}')] | //label[contains(text(),'${text}')]//following::input[1]`;
        
        case 'dropdown':
        case 'select':
          return `//select[contains(@name,'${text}')] | //label[contains(text(),'${text}')]//following::select[1] | //*[@role='combobox' and contains(@aria-label,'${text}')]`;
        
        case 'checkbox':
          return `//input[@type='checkbox' and contains(@name,'${text}')] | //label[contains(text(),'${text}')]//input[@type='checkbox']`;
        
        case 'radio':
        case 'radio button':
          return `//input[@type='radio' and contains(@name,'${text}')] | //label[contains(text(),'${text}')]//input[@type='radio']`;
        
        case 'element':
        case 'section':
        default:
          return textSelectors.join(' | ');
      }
    }

    // Default: combine all text-based selectors
    return textSelectors.join(' | ');
  }

  /**
   * Add custom locator
   * @param name - Locator name
   * @param selector - Selector string
   * @param category - Category name
   */
  addCustomLocator(name: string, selector: string, category: string = 'custom'): void {
    if (!this.locators.has(category)) {
      this.locators.set(category, {});
    }
    
    const categoryLocators = this.locators.get(category);
    if (categoryLocators) {
      categoryLocators[name] = selector;
    }
    
    console.log(`Added custom locator: ${category}.${name} = ${selector}`);
  }

  /**
   * Get locators by category
   * @param category - Category name
   * @returns Locators object
   */
  getLocatorsByCategory(category: string): any {
    return this.locators.get(category) || {};
  }

  /**
   * Get all available categories
   * @returns Array of category names
   */
  getAvailableCategories(): string[] {
    return Array.from(this.locators.keys());
  }

  /**
   * Get all locators
   * @returns Map of all locators
   */
  getAllLocators(): Map<string, any> {
    return this.locators;
  }

  /**
   * Check if locator exists
   * @param elementName - Element name
   * @param category - Category name (optional)
   * @returns Boolean
   */
  hasLocator(elementName: string, category?: string): boolean {
    if (category) {
      const categoryLocators = this.locators.get(category);
      return categoryLocators && categoryLocators[elementName] !== undefined;
    }
    
    // Check all categories
    for (const [, locatorGroup] of this.locators) {
      if (locatorGroup && locatorGroup[elementName]) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Reload locators from files
   */
  reloadLocators(): void {
    this.locators.clear();
    this.locatorFiles = [];
    this.loadLocators();
  }

  /**
   * Get loaded locator files
   * @returns Array of loaded file names
   */
  getLoadedFiles(): string[] {
    return [...this.locatorFiles];
  }
}