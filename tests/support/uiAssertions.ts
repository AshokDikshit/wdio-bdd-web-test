import { Page, Locator, expect } from '@playwright/test';
import { CommonUIUtils } from './commonUtils';
import { TIMEOUTS } from './constants';

/**
 * UI Assertions for Playwright
 * Migrated from WebDriverIO UI Assertions
 */
export class UIAssertions {
  private page: Page;
  private commonUtils: CommonUIUtils;

  constructor(page: Page, commonUtils: CommonUIUtils) {
    this.page = page;
    this.commonUtils = commonUtils;
  }

  // ===============================
  // ELEMENT VISIBILITY ASSERTIONS
  // ===============================

  async verifyElementVisible(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} is visible`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' is not visible: ${error}`);
    }
  }

  async verifyElementNotVisible(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).not.toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} is not visible`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' is visible when it should not be: ${error}`);
    }
  }

  async verifyElementHidden(elementName: string, elementType?: string): Promise<void> {
    await this.verifyElementNotVisible(elementName, elementType);
  }

  async verifyElementExists(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toBeAttached({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} exists`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' does not exist: ${error}`);
    }
  }

  async verifyElementNotExists(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).not.toBeAttached({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} does not exist`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' exists when it should not: ${error}`);
    }
  }

  // ===============================
  // ELEMENT STATE ASSERTIONS
  // ===============================

  async verifyElementEnabled(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toBeEnabled({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} is enabled`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' is not enabled: ${error}`);
    }
  }

  async verifyElementDisabled(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toBeDisabled({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} is disabled`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' is not disabled: ${error}`);
    }
  }

  async verifyElementClickable(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toBeVisible({ timeout: TIMEOUTS.ELEMENT_WAIT });
      await expect(element).toBeEnabled({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} is clickable`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' is not clickable: ${error}`);
    }
  }

  async verifyElementNotClickable(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      const isVisible = await element.isVisible();
      const isEnabled = await element.isEnabled();
      
      if (isVisible && isEnabled) {
        throw new Error(`Element '${elementName}' is clickable when it should not be`);
      }
      
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} is not clickable`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' clickability check failed: ${error}`);
    }
  }

  // ===============================
  // TEXT CONTENT ASSERTIONS
  // ===============================

  async verifyElementText(elementName: string, expectedText: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toHaveText(expectedText, { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} has text: "${expectedText}"`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' does not have expected text '${expectedText}': ${error}`);
    }
  }

  async verifyElementContainsText(elementName: string, expectedText: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toContainText(expectedText, { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} contains text: "${expectedText}"`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' does not contain expected text '${expectedText}': ${error}`);
    }
  }

  async verifyElementNotContainsText(elementName: string, unexpectedText: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).not.toContainText(unexpectedText, { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} does not contain text: "${unexpectedText}"`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' contains unexpected text '${unexpectedText}': ${error}`);
    }
  }

  async verifyElementTextMatches(elementName: string, pattern: string | RegExp, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;
      await expect(element).toHaveText(regex, { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} text matches pattern: ${pattern}`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' text does not match pattern '${pattern}': ${error}`);
    }
  }

  // ===============================
  // INPUT VALUE ASSERTIONS
  // ===============================

  async verifyInputValue(elementName: string, expectedValue: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType || 'input');
      await expect(element).toHaveValue(expectedValue, { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} input has value: "${expectedValue}"`);
    } catch (error) {
      throw new Error(`❌ Input '${elementName}' does not have expected value '${expectedValue}': ${error}`);
    }
  }

  async verifyInputEmpty(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType || 'input');
      await expect(element).toHaveValue('', { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} input is empty`);
    } catch (error) {
      throw new Error(`❌ Input '${elementName}' is not empty: ${error}`);
    }
  }

  async verifyInputNotEmpty(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType || 'input');
      await expect(element).not.toHaveValue('', { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} input is not empty`);
    } catch (error) {
      throw new Error(`❌ Input '${elementName}' is empty when it should not be: ${error}`);
    }
  }

  // ===============================
  // ATTRIBUTE ASSERTIONS
  // ===============================

  async verifyElementAttribute(elementName: string, attributeName: string, expectedValue: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toHaveAttribute(attributeName, expectedValue, { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} has attribute ${attributeName}: "${expectedValue}"`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' does not have expected attribute '${attributeName}' with value '${expectedValue}': ${error}`);
    }
  }

  async verifyElementHasAttribute(elementName: string, attributeName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      const attributeValue = await element.getAttribute(attributeName);
      
      if (attributeValue === null) {
        throw new Error(`Attribute '${attributeName}' does not exist`);
      }
      
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} has attribute: ${attributeName}`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' does not have attribute '${attributeName}': ${error}`);
    }
  }

  async verifyElementNotHasAttribute(elementName: string, attributeName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      const attributeValue = await element.getAttribute(attributeName);
      
      if (attributeValue !== null) {
        throw new Error(`Attribute '${attributeName}' exists when it should not`);
      }
      
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} does not have attribute: ${attributeName}`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' has unexpected attribute '${attributeName}': ${error}`);
    }
  }

  // ===============================
  // CSS ASSERTIONS
  // ===============================

  async verifyElementCSS(elementName: string, cssProperty: string, expectedValue: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toHaveCSS(cssProperty, expectedValue, { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} has CSS ${cssProperty}: "${expectedValue}"`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' does not have expected CSS property '${cssProperty}' with value '${expectedValue}': ${error}`);
    }
  }

  async verifyElementClass(elementName: string, className: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toHaveClass(new RegExp(className), { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} has class: ${className}`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' does not have expected class '${className}': ${error}`);
    }
  }

  async verifyElementNotHasClass(elementName: string, className: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).not.toHaveClass(new RegExp(className), { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} does not have class: ${className}`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' has unexpected class '${className}': ${error}`);
    }
  }

  // ===============================
  // CHECKBOX AND RADIO ASSERTIONS
  // ===============================

  async verifyCheckboxChecked(elementName: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, 'checkbox');
      await expect(element).toBeChecked({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} checkbox is checked`);
    } catch (error) {
      throw new Error(`❌ Checkbox '${elementName}' is not checked: ${error}`);
    }
  }

  async verifyCheckboxUnchecked(elementName: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, 'checkbox');
      await expect(element).not.toBeChecked({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} checkbox is unchecked`);
    } catch (error) {
      throw new Error(`❌ Checkbox '${elementName}' is checked when it should be unchecked: ${error}`);
    }
  }

  async verifyRadioSelected(elementName: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, 'radio');
      await expect(element).toBeChecked({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} radio button is selected`);
    } catch (error) {
      throw new Error(`❌ Radio button '${elementName}' is not selected: ${error}`);
    }
  }

  async verifyRadioNotSelected(elementName: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, 'radio');
      await expect(element).not.toBeChecked({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} radio button is not selected`);
    } catch (error) {
      throw new Error(`❌ Radio button '${elementName}' is selected when it should not be: ${error}`);
    }
  }

  // ===============================
  // DROPDOWN ASSERTIONS
  // ===============================

  async verifyDropdownValue(elementName: string, expectedValue: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, 'dropdown');
      await expect(element).toHaveValue(expectedValue, { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} dropdown has value: "${expectedValue}"`);
    } catch (error) {
      throw new Error(`❌ Dropdown '${elementName}' does not have expected value '${expectedValue}': ${error}`);
    }
  }

  async verifyDropdownText(elementName: string, expectedText: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, 'dropdown');
      const selectedOption = element.locator('option:checked');
      await expect(selectedOption).toHaveText(expectedText, { timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} dropdown has selected text: "${expectedText}"`);
    } catch (error) {
      throw new Error(`❌ Dropdown '${elementName}' does not have expected selected text '${expectedText}': ${error}`);
    }
  }

  // ===============================
  // PAGE ASSERTIONS
  // ===============================

  async verifyPageTitle(expectedTitle: string): Promise<void> {
    try {
      await expect(this.page).toHaveTitle(expectedTitle, { timeout: TIMEOUTS.PAGE_LOAD });
      console.log(`✅ Verified page title: "${expectedTitle}"`);
    } catch (error) {
      throw new Error(`❌ Page does not have expected title '${expectedTitle}': ${error}`);
    }
  }

  async verifyPageTitleContains(expectedText: string): Promise<void> {
    try {
      await expect(this.page).toHaveTitle(new RegExp(expectedText), { timeout: TIMEOUTS.PAGE_LOAD });
      console.log(`✅ Verified page title contains: "${expectedText}"`);
    } catch (error) {
      throw new Error(`❌ Page title does not contain expected text '${expectedText}': ${error}`);
    }
  }

  async verifyCurrentUrl(expectedUrl: string): Promise<void> {
    try {
      await expect(this.page).toHaveURL(expectedUrl, { timeout: TIMEOUTS.PAGE_LOAD });
      console.log(`✅ Verified current URL: "${expectedUrl}"`);
    } catch (error) {
      throw new Error(`❌ Current URL does not match expected URL '${expectedUrl}': ${error}`);
    }
  }

  async verifyUrlContains(expectedText: string): Promise<void> {
    try {
      await expect(this.page).toHaveURL(new RegExp(expectedText), { timeout: TIMEOUTS.PAGE_LOAD });
      console.log(`✅ Verified URL contains: "${expectedText}"`);
    } catch (error) {
      throw new Error(`❌ URL does not contain expected text '${expectedText}': ${error}`);
    }
  }

  async verifyUrlNotContains(unexpectedText: string): Promise<void> {
    try {
      const currentUrl = this.page.url();
      if (currentUrl.includes(unexpectedText)) {
        throw new Error(`URL contains unexpected text '${unexpectedText}'`);
      }
      console.log(`✅ Verified URL does not contain: "${unexpectedText}"`);
    } catch (error) {
      throw new Error(`❌ URL contains unexpected text '${unexpectedText}': ${error}`);
    }
  }

  // ===============================
  // COUNT ASSERTIONS
  // ===============================

  async verifyElementCount(elementName: string, expectedCount: number, elementType?: string): Promise<void> {
    try {
      const elements = await this.commonUtils.getElements(elementName, elementType);
      expect(elements.length).toBe(expectedCount);
      console.log(`✅ Verified ${elementName} ${elementType || 'elements'} count: ${expectedCount}`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' count does not match expected count ${expectedCount}: ${error}`);
    }
  }

  async verifyElementCountGreaterThan(elementName: string, minCount: number, elementType?: string): Promise<void> {
    try {
      const elements = await this.commonUtils.getElements(elementName, elementType);
      expect(elements.length).toBeGreaterThan(minCount);
      console.log(`✅ Verified ${elementName} ${elementType || 'elements'} count (${elements.length}) is greater than ${minCount}`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' count is not greater than ${minCount}: ${error}`);
    }
  }

  async verifyElementCountLessThan(elementName: string, maxCount: number, elementType?: string): Promise<void> {
    try {
      const elements = await this.commonUtils.getElements(elementName, elementType);
      expect(elements.length).toBeLessThan(maxCount);
      console.log(`✅ Verified ${elementName} ${elementType || 'elements'} count (${elements.length}) is less than ${maxCount}`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' count is not less than ${maxCount}: ${error}`);
    }
  }

  // ===============================
  // ALERT ASSERTIONS
  // ===============================

  async verifyAlertText(expectedText: string): Promise<void> {
    try {
      this.page.on('dialog', async dialog => {
        expect(dialog.message()).toBe(expectedText);
        await dialog.accept();
        console.log(`✅ Verified alert text: "${expectedText}"`);
      });
    } catch (error) {
      throw new Error(`❌ Alert does not have expected text '${expectedText}': ${error}`);
    }
  }

  async verifyAlertPresent(): Promise<void> {
    try {
      let alertPresent = false;
      
      this.page.on('dialog', async dialog => {
        alertPresent = true;
        await dialog.accept();
      });
      
      // Wait a bit to see if alert appears
      await this.page.waitForTimeout(1000);
      
      if (!alertPresent) {
        throw new Error('No alert is present');
      }
      
      console.log('✅ Verified alert is present');
    } catch (error) {
      throw new Error(`❌ Alert is not present: ${error}`);
    }
  }

  // ===============================
  // CUSTOM ASSERTIONS
  // ===============================

  async verifyElementInViewport(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toBeInViewport({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} is in viewport`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' is not in viewport: ${error}`);
    }
  }

  async verifyElementNotInViewport(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).not.toBeInViewport({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} is not in viewport`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' is in viewport when it should not be: ${error}`);
    }
  }

  async verifyElementFocused(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toBeFocused({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} is focused`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' is not focused: ${error}`);
    }
  }

  async verifyElementNotFocused(elementName: string, elementType?: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).not.toBeFocused({ timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`✅ Verified ${elementName} ${elementType || 'element'} is not focused`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' is focused when it should not be: ${error}`);
    }
  }

  // ===============================
  // UTILITY METHODS
  // ===============================

  /**
   * Wait for element to have specific text
   * @param elementName - Element name
   * @param expectedText - Expected text
   * @param elementType - Element type
   * @param timeout - Timeout in milliseconds
   */
  async waitForElementText(elementName: string, expectedText: string, elementType?: string, timeout: number = TIMEOUTS.ELEMENT_WAIT): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toHaveText(expectedText, { timeout });
      console.log(`✅ Element ${elementName} now has expected text: "${expectedText}"`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' did not get expected text '${expectedText}' within ${timeout}ms: ${error}`);
    }
  }

  /**
   * Wait for element to contain specific text
   * @param elementName - Element name
   * @param expectedText - Expected text
   * @param elementType - Element type
   * @param timeout - Timeout in milliseconds
   */
  async waitForElementToContainText(elementName: string, expectedText: string, elementType?: string, timeout: number = TIMEOUTS.ELEMENT_WAIT): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await expect(element).toContainText(expectedText, { timeout });
      console.log(`✅ Element ${elementName} now contains expected text: "${expectedText}"`);
    } catch (error) {
      throw new Error(`❌ Element '${elementName}' did not contain expected text '${expectedText}' within ${timeout}ms: ${error}`);
    }
  }

  /**
   * Soft assertion - doesn't throw error but logs result
   * @param elementName - Element name
   * @param expectedText - Expected text
   * @param elementType - Element type
   */
  async softAssertElementText(elementName: string, expectedText: string, elementType?: string): Promise<boolean> {
    try {
      await this.verifyElementText(elementName, expectedText, elementType);
      return true;
    } catch (error) {
      console.warn(`⚠️ Soft assertion failed: ${error}`);
      return false;
    }
  }

  /**
   * Assert multiple conditions
   * @param assertions - Array of assertion functions
   */
  async assertAll(assertions: Array<() => Promise<void>>): Promise<void> {
    const errors: string[] = [];
    
    for (const assertion of assertions) {
      try {
        await assertion();
      } catch (error) {
        errors.push(error instanceof Error ? error.message : String(error));
      }
    }
    
    if (errors.length > 0) {
      throw new Error(`Multiple assertion failures:\n${errors.join('\n')}`);
    }
    
    console.log(`✅ All ${assertions.length} assertions passed`);
  }
}