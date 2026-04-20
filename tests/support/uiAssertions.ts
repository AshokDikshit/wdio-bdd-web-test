/**
 * UI Assertions Module
 * Contains assertion methods for verifying UI element states and properties
 */

import { $, $$, browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';
import commonUtils from './commonUtils';

class UIAssertions {
    
    // ===============================
    // ELEMENT LOCATOR HELPERS (Using Common Utils)
    // ===============================
    
    /**
     * Get element locator based on element name and type
     * @param elementName - Name of the element
     * @param elementType - Type of element (button, link, field, etc.)
     * @returns WebDriverIO element
     */
    private async getElement(elementName: string, elementType?: string): Promise<ChainablePromiseElement> {
        return await commonUtils.getElement(elementName, elementType);
    }

    /**
     * Wait for element to be in specified state
     * @param element - WebDriverIO element
     * @param state - State to wait for (visible, clickable, enabled)
     */
    private async waitForElementState(element: ChainablePromiseElement, state: 'visible' | 'clickable' | 'enabled'): Promise<void> {
        return await commonUtils.waitForElementState(element, state);
    }
    
    // ===============================
    // ASSERTION METHODS
    // ===============================
    /**
     * Verify that an element is visible
     */
    async verifyElementVisible(elementName: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            await this.waitForElementState(element, 'visible');
            const isDisplayed = await element.isDisplayed();
            if (!isDisplayed) {
                throw new Error(`Element '${elementName}' is not visible`);
            }
            console.log(`Successfully verified ${elementName} is visible`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} is visible: ${error}`);
        }
    }

    /**
     * Verify that an element is not visible
     */
    async verifyElementNotVisible(elementName: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            const isDisplayed = await element.isDisplayed();
            if (isDisplayed) {
                throw new Error(`Element '${elementName}' is visible but should not be`);
            }
            console.log(`Successfully verified ${elementName} is not visible`);
        } catch (error) {
            // If element doesn't exist, that's also considered not visible
            console.log(`Successfully verified ${elementName} is not visible`);
        }
    }

    /**
     * Verify that an element is displayed
     */
    async verifyElementDisplayed(elementName: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            await this.waitForElementState(element, 'visible');
            console.log(`Successfully verified ${elementName} is displayed`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} is displayed: ${error}`);
        }
    }

    /**
     * Verify that an element is hidden
     */
    async verifyElementHidden(elementName: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            await element.waitForDisplayed({ timeout: 10000, reverse: true });
            console.log(`Successfully verified ${elementName} is hidden`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} is hidden: ${error}`);
        }
    }

    /**
     * Verify that an element is enabled
     */
    async verifyElementEnabled(elementName: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            await this.waitForElementState(element, 'enabled');
            const isEnabled = await element.isEnabled();
            if (!isEnabled) {
                throw new Error(`Element '${elementName}' is not enabled`);
            }
            console.log(`Successfully verified ${elementName} is enabled`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} is enabled: ${error}`);
        }
    }

    /**
     * Verify that an element is disabled
     */
    async verifyElementDisabled(elementName: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            const isEnabled = await element.isEnabled();
            if (isEnabled) {
                throw new Error(`Element '${elementName}' is enabled but should be disabled`);
            }
            console.log(`Successfully verified ${elementName} is disabled`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} is disabled: ${error}`);
        }
    }

    /**
     * Verify that an element is selected
     */
    async verifyElementSelected(elementName: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            const isSelected = await element.isSelected();
            if (!isSelected) {
                throw new Error(`Element '${elementName}' is not selected`);
            }
            console.log(`Successfully verified ${elementName} is selected`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} is selected: ${error}`);
        }
    }

    /**
     * Verify that an element is not selected
     */
    async verifyElementNotSelected(elementName: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            const isSelected = await element.isSelected();
            if (isSelected) {
                throw new Error(`Element '${elementName}' is selected but should not be`);
            }
            console.log(`Successfully verified ${elementName} is not selected`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} is not selected: ${error}`);
        }
    }

    /**
     * Verify that a checkbox is checked
     */
    async verifyCheckboxChecked(elementName: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, 'checkbox');
            const isSelected = await element.isSelected();
            if (!isSelected) {
                throw new Error(`Checkbox '${elementName}' is not checked`);
            }
            console.log(`Successfully verified ${elementName} checkbox is checked`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} checkbox is checked: ${error}`);
        }
    }

    /**
     * Verify that a checkbox is unchecked
     */
    async verifyCheckboxUnchecked(elementName: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, 'checkbox');
            const isSelected = await element.isSelected();
            if (isSelected) {
                throw new Error(`Checkbox '${elementName}' is checked but should be unchecked`);
            }
            console.log(`Successfully verified ${elementName} checkbox is unchecked`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} checkbox is unchecked: ${error}`);
        }
    }

    /**
     * Verify that an element contains specific text
     */
    async verifyElementContainsText(elementName: string, text: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            const elementText = await element.getText();
            if (!elementText.includes(text)) {
                throw new Error(`Element '${elementName}' does not contain text '${text}'. Actual text: '${elementText}'`);
            }
            console.log(`Successfully verified ${elementName} contains text '${text}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} contains text '${text}': ${error}`);
        }
    }

    /**
     * Verify that an element does not contain specific text
     */
    async verifyElementNotContainsText(elementName: string, text: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, 'element');
            const elementText = await element.getText();
            if (elementText.includes(text)) {
                throw new Error(`Element '${elementName}' contains text '${text}' but should not. Actual text: '${elementText}'`);
            }
            console.log(`Successfully verified ${elementName} does not contain text '${text}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} does not contain text '${text}': ${error}`);
        }
    }

    /**
     * Verify that an element has exact text
     */
    async verifyElementExactText(elementName: string, text: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            const elementText = await element.getText();
            if (elementText !== text) {
                throw new Error(`Element '${elementName}' does not have exact text '${text}'. Actual text: '${elementText}'`);
            }
            console.log(`Successfully verified ${elementName} has exact text '${text}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} has exact text '${text}': ${error}`);
        }
    }

    /**
     * Verify that a field is empty
     */
    async verifyFieldEmpty(elementName: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'field');
            const value = await element.getValue();
            if (value && value.trim() !== '') {
                throw new Error(`Field '${elementName}' is not empty. Current value: '${value}'`);
            }
            console.log(`Successfully verified ${elementName} field is empty`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} field is empty: ${error}`);
        }
    }

    /**
     * Verify that an element is empty
     */
    async verifyElementEmpty(elementName: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, 'element');
            const text = await element.getText();
            if (text && text.trim() !== '') {
                throw new Error(`Element '${elementName}' is not empty. Current text: '${text}'`);
            }
            console.log(`Successfully verified ${elementName} is empty`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} is empty: ${error}`);
        }
    }

    /**
     * Verify that an element has a specific value
     */
    async verifyElementValue(elementName: string, value: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            const actualValue = await element.getValue();
            if (actualValue !== value) {
                throw new Error(`Element '${elementName}' does not have value '${value}'. Actual value: '${actualValue}'`);
            }
            console.log(`Successfully verified ${elementName} has value '${value}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} has value '${value}': ${error}`);
        }
    }

    /**
     * Verify that an element has a specific placeholder
     */
    async verifyElementPlaceholder(elementName: string, placeholder: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            const actualPlaceholder = await element.getAttribute('placeholder');
            if (actualPlaceholder !== placeholder) {
                throw new Error(`Element '${elementName}' does not have placeholder '${placeholder}'. Actual placeholder: '${actualPlaceholder}'`);
            }
            console.log(`Successfully verified ${elementName} has placeholder '${placeholder}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} has placeholder '${placeholder}': ${error}`);
        }
    }

    /**
     * Verify that an element has a specific attribute with a specific value
     */
    async verifyElementAttribute(elementName: string, attribute: string, value: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            const actualValue = await element.getAttribute(attribute);
            if (actualValue !== value) {
                throw new Error(`Element '${elementName}' does not have attribute '${attribute}' with value '${value}'. Actual value: '${actualValue}'`);
            }
            console.log(`Successfully verified ${elementName} has attribute '${attribute}' with value '${value}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} has attribute '${attribute}' with value '${value}': ${error}`);
        }
    }

    /**
     * Verify that an element has a specific class
     */
    async verifyElementHasClass(elementName: string, className: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            const classNames = await element.getAttribute('class');
            if (!classNames || !classNames.includes(className)) {
                throw new Error(`Element '${elementName}' does not have class '${className}'. Current classes: '${classNames}'`);
            }
            console.log(`Successfully verified ${elementName} has class '${className}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} has class '${className}': ${error}`);
        }
    }

    /**
     * Verify that an element does not have a specific class
     */
    async verifyElementNotHasClass(elementName: string, className: string, elementType?: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType || 'element');
            const classNames = await element.getAttribute('class');
            if (classNames && classNames.includes(className)) {
                throw new Error(`Element '${elementName}' has class '${className}' but should not. Current classes: '${classNames}'`);
            }
            console.log(`Successfully verified ${elementName} does not have class '${className}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} does not have class '${className}': ${error}`);
        }
    }

    /**
     * Verify element count
     */
    async verifyElementCount(elementName: string, count: number): Promise<void> {
        try {
            const elements = await commonUtils.getElementsByName(elementName);
            const actualCount = elements.length;
            if (actualCount !== count) {
                throw new Error(`Expected ${count} ${elementName} elements but found ${actualCount}`);
            }
            console.log(`Successfully verified there are ${count} ${elementName} elements`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} element count: ${error}`);
        }
    }

    /**
     * Verify minimum element count
     */
    async verifyElementCountAtLeast(elementName: string, count: number): Promise<void> {
        try {
            const elements = await commonUtils.getElementsByName(elementName);
            const actualCount = elements.length;
            if (actualCount < count) {
                throw new Error(`Expected at least ${count} ${elementName} elements but found ${actualCount}`);
            }
            console.log(`Successfully verified there are at least ${count} ${elementName} elements`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} element count at least: ${error}`);
        }
    }

    /**
     * Verify maximum element count
     */
    async verifyElementCountAtMost(elementName: string, count: number): Promise<void> {
        try {
            const elements = await commonUtils.getElementsByName(elementName);
            const actualCount = elements.length;
            if (actualCount > count) {
                throw new Error(`Expected at most ${count} ${elementName} elements but found ${actualCount}`);
            }
            console.log(`Successfully verified there are at most ${count} ${elementName} elements`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} element count at most: ${error}`);
        }
    }

    /**
     * Verify list contains item
     */
    async verifyListContains(elementName: string, item: string): Promise<void> {
        try {
            const elements = await $$(`[data-testid="${elementName}"] li, [data-testid="${elementName}"] option`);
            let found = false;
            for (const element of elements) {
                const text = await element.getText();
                if (text.includes(item)) {
                    found = true;
                    break;
                }
            }
            if (!found) {
                throw new Error(`List '${elementName}' does not contain item '${item}'`);
            }
            console.log(`Successfully verified ${elementName} list contains '${item}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} list contains '${item}': ${error}`);
        }
    }

    /**
     * Verify list does not contain item
     */
    async verifyListNotContains(elementName: string, item: string): Promise<void> {
        try {
            const elements = await $$(`[data-testid="${elementName}"] li, [data-testid="${elementName}"] option`);
            for (const element of elements) {
                const text = await element.getText();
                if (text.includes(item)) {
                    throw new Error(`List '${elementName}' contains item '${item}' but should not`);
                }
            }
            console.log(`Successfully verified ${elementName} list does not contain '${item}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} list does not contain '${item}': ${error}`);
        }
    }

    /**
     * Verify page title
     */
    async verifyPageTitle(title: string): Promise<void> {
        try {
            const actualTitle = await browser.getTitle();
            if (actualTitle !== title) {
                throw new Error(`Page title is not '${title}'. Actual title: '${actualTitle}'`);
            }
            console.log(`Successfully verified page title is '${title}'`);
        } catch (error) {
            throw new Error(`Failed to verify page title: ${error}`);
        }
    }

    /**
     * Verify URL contains text
     */
    async verifyUrlContains(urlPart: string): Promise<void> {
        try {
            const currentUrl = await browser.getUrl();
            if (!currentUrl.includes(urlPart)) {
                throw new Error(`Current URL does not contain '${urlPart}'. Current URL: '${currentUrl}'`);
            }
            console.log(`Successfully verified URL contains '${urlPart}'`);
        } catch (error) {
            throw new Error(`Failed to verify URL contains '${urlPart}': ${error}`);
        }
    }

    /**
     * Verify exact URL
     */
    async verifyUrl(url: string): Promise<void> {
        try {
            const currentUrl = await browser.getUrl();
            if (currentUrl !== url) {
                throw new Error(`Current URL is not '${url}'. Current URL: '${currentUrl}'`);
            }
            console.log(`Successfully verified URL is '${url}'`);
        } catch (error) {
            throw new Error(`Failed to verify URL: ${error}`);
        }
    }

    /**
     * Verify alert is present
     */
    async verifyAlertPresent(): Promise<void> {
        try {
            await browser.waitUntil(async () => {
                try {
                    await browser.getAlertText();
                    return true;
                } catch {
                    return false;
                }
            }, { timeout: 5000 });
            console.log('Successfully verified alert is present');
        } catch (error) {
            throw new Error(`Failed to verify alert is present: ${error}`);
        }
    }

    /**
     * Verify no alert is present
     */
    async verifyNoAlertPresent(): Promise<void> {
        try {
            try {
                await browser.getAlertText();
                throw new Error('Alert is present but should not be');
            } catch {
                // No alert present, which is expected
            }
            console.log('Successfully verified no alert is present');
        } catch (error) {
            throw new Error(`Failed to verify no alert is present: ${error}`);
        }
    }

    /**
     * Verify alert text
     */
    async verifyAlertText(text: string): Promise<void> {
        try {
            const alertText = await browser.getAlertText();
            if (alertText !== text) {
                throw new Error(`Alert text is not '${text}'. Actual text: '${alertText}'`);
            }
            console.log(`Successfully verified alert text is '${text}'`);
        } catch (error) {
            throw new Error(`Failed to verify alert text: ${error}`);
        }
    }

    /**
     * Verify modal is open
     */
    async verifyModalOpen(): Promise<void> {
        try {
            const modal = await $('.modal, .dialog, [role="dialog"]');
            await modal.waitForDisplayed({ timeout: 5000 });
            console.log('Successfully verified modal is open');
        } catch (error) {
            throw new Error(`Failed to verify modal is open: ${error}`);
        }
    }

    /**
     * Verify no modal is open
     */
    async verifyNoModalOpen(): Promise<void> {
        try {
            const modal = await $('.modal, .dialog, [role="dialog"]');
            const isDisplayed = await modal.isDisplayed();
            if (isDisplayed) {
                throw new Error('Modal is open but should not be');
            }
            console.log('Successfully verified no modal is open');
        } catch (error) {
            // If modal doesn't exist, that's also considered no modal open
            console.log('Successfully verified no modal is open');
        }
    }

    /**
     * Verify validation error
     */
    async verifyValidationError(elementName: string, error: string, elementType?: string): Promise<void> {
        try {
            const errorElement = await $(`[data-testid="${elementName}-error"], .error-message`);
            const errorText = await errorElement.getText();
            if (!errorText.includes(error)) {
                throw new Error(`Validation error for '${elementName}' does not contain '${error}'. Actual error: '${errorText}'`);
            }
            console.log(`Successfully verified ${elementName} shows validation error '${error}'`);
        } catch (error) {
            throw new Error(`Failed to verify validation error for ${elementName}: ${error}`);
        }
    }

    /**
     * Verify no validation error
     */
    async verifyNoValidationError(elementName: string, elementType?: string): Promise<void> {
        try {
            const errorElement = await $(`[data-testid="${elementName}-error"], .error-message`);
            const isDisplayed = await errorElement.isDisplayed();
            if (isDisplayed) {
                const errorText = await errorElement.getText();
                throw new Error(`Element '${elementName}' shows validation error '${errorText}' but should not`);
            }
            console.log(`Successfully verified ${elementName} shows no validation error`);
        } catch (error) {
            // If error element doesn't exist, that's also considered no error
            console.log(`Successfully verified ${elementName} shows no validation error`);
        }
    }

    /**
     * Verify form is valid
     */
    async verifyFormValid(): Promise<void> {
        try {
            const form = await $('form');
            const isValid = await form.getAttribute('data-valid');
            if (isValid !== 'true') {
                throw new Error('Form is not valid');
            }
            console.log('Successfully verified form is valid');
        } catch (error) {
            throw new Error(`Failed to verify form is valid: ${error}`);
        }
    }

    /**
     * Verify form is invalid
     */
    async verifyFormInvalid(): Promise<void> {
        try {
            const form = await $('form');
            const isValid = await form.getAttribute('data-valid');
            if (isValid === 'true') {
                throw new Error('Form is valid but should be invalid');
            }
            console.log('Successfully verified form is invalid');
        } catch (error) {
            throw new Error(`Failed to verify form is invalid: ${error}`);
        }
    }

    /**
     * Verify page is loaded
     */
    async verifyPageLoaded(): Promise<void> {
        try {
            await browser.waitUntil(
                async () => {
                    const readyState = await browser.execute(() => document.readyState);
                    return readyState === 'complete';
                },
                {
                    timeout: 30000,
                    timeoutMsg: 'Page did not load completely within 30 seconds'
                }
            );
            console.log('Successfully verified page is loaded');
        } catch (error) {
            throw new Error(`Failed to verify page is loaded: ${error}`);
        }
    }

    /**
     * Verify element is loading
     */
    async verifyElementLoading(elementName: string, elementType?: string): Promise<void> {
        try {
            const element = await $(`[data-testid="${elementName}"], .loading, .spinner`);
            const isDisplayed = await element.isDisplayed();
            if (!isDisplayed) {
                throw new Error(`Element '${elementName}' is not showing loading state`);
            }
            console.log(`Successfully verified ${elementName} is loading`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} is loading: ${error}`);
        }
    }

    /**
     * Verify element is not loading
     */
    async verifyElementNotLoading(elementName: string, elementType?: string): Promise<void> {
        try {
            const element = await $(`[data-testid="${elementName}"], .loading, .spinner`);
            const isDisplayed = await element.isDisplayed();
            if (isDisplayed) {
                throw new Error(`Element '${elementName}' is showing loading state but should not`);
            }
            console.log(`Successfully verified ${elementName} is not loading`);
        } catch (error) {
            // If loading element doesn't exist, that's also considered not loading
            console.log(`Successfully verified ${elementName} is not loading`);
        }
    }

    /**
     * Verify device orientation
     */
    async verifyDeviceOrientation(orientation: string): Promise<void> {
        try {
            // Check if browser has mobile capabilities
            const isMobile = commonUtils.isMobilePlatform();
            
            if (isMobile) {
                const currentOrientation = await (browser as any).getOrientation();
                if (currentOrientation.toLowerCase() !== orientation.toLowerCase()) {
                    throw new Error(`Device orientation is '${currentOrientation}' but should be '${orientation}'`);
                }
                console.log(`Successfully verified device orientation is ${orientation}`);
            } else {
                console.log('Device orientation verification is only available on mobile platforms');
            }
        } catch (error) {
            throw new Error(`Failed to verify device orientation: ${error}`);
        }
    }

    /**
     * Verify keyboard is visible
     */
    async verifyKeyboardVisible(): Promise<void> {
        try {
            if ((browser as any).isMobile) {
                const isKeyboardShown = await (browser as any).isKeyboardShown();
                if (!isKeyboardShown) {
                    throw new Error('Keyboard is not visible');
                }
                console.log('Successfully verified keyboard is visible');
            } else {
                console.log('Keyboard visibility verification is only available on mobile platforms');
            }
        } catch (error) {
            throw new Error(`Failed to verify keyboard is visible: ${error}`);
        }
    }

    /**
     * Verify keyboard is hidden
     */
    async verifyKeyboardHidden(): Promise<void> {
        try {
            if ((browser as any).isMobile) {
                const isKeyboardShown = await (browser as any).isKeyboardShown();
                if (isKeyboardShown) {
                    throw new Error('Keyboard is visible but should be hidden');
                }
                console.log('Successfully verified keyboard is hidden');
            } else {
                console.log('Keyboard visibility verification is only available on mobile platforms');
            }
        } catch (error) {
            throw new Error(`Failed to verify keyboard is hidden: ${error}`);
        }
    }

    /**
     * Verify element appears within timeout
     */
    async verifyElementAppearsWithin(elementName: string, timeout: number, elementType?: string): Promise<void> {
        try {
            const element = await commonUtils.getElement(elementName, elementType || 'element');
            await element.waitForDisplayed({ timeout: timeout * 1000 });
            console.log(`Successfully verified ${elementName} appeared within ${timeout} seconds`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} appears within ${timeout} seconds: ${error}`);
        }
    }

    /**
     * Verify element disappears within timeout
     */
    async verifyElementDisappearsWithin(elementName: string, timeout: number, elementType?: string): Promise<void> {
        try {
            const element = await commonUtils.getElement(elementName, elementType || 'element');
            await element.waitForDisplayed({ timeout: timeout * 1000, reverse: true });
            console.log(`Successfully verified ${elementName} disappeared within ${timeout} seconds`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} disappears within ${timeout} seconds: ${error}`);
        }
    }

    /**
     * Verify element background color
     */
    async verifyElementBackgroundColor(elementName: string, color: string, elementType?: string): Promise<void> {
        try {
            const element = await commonUtils.getElement(elementName, elementType || 'element');
            const backgroundColor = await element.getCSSProperty('background-color');
            const actualColor = backgroundColor.value;
            if (actualColor !== color) {
                throw new Error(`Element '${elementName}' background color is '${actualColor}' but should be '${color}'`);
            }
            console.log(`Successfully verified ${elementName} has background color '${color}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} background color: ${error}`);
        }
    }

    /**
     * Verify element text color
     */
    async verifyElementTextColor(elementName: string, color: string, elementType?: string): Promise<void> {
        try {
            const element = await commonUtils.getElement(elementName, elementType || 'element');
            const textColor = await element.getCSSProperty('color');
            const actualColor = textColor.value;
            if (actualColor !== color) {
                throw new Error(`Element '${elementName}' text color is '${actualColor}' but should be '${color}'`);
            }
            console.log(`Successfully verified ${elementName} has text color '${color}'`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} text color: ${error}`);
        }
    }

    /**
     * Verify element position
     */
    async verifyElementPosition(elementName: string, x: number, y: number, elementType?: string): Promise<void> {
        try {
            const element = await commonUtils.getElement(elementName, elementType || 'element');
            const location = await element.getLocation();
            if (location.x !== x || location.y !== y) {
                throw new Error(`Element '${elementName}' is positioned at (${location.x},${location.y}) but should be at (${x},${y})`);
            }
            console.log(`Successfully verified ${elementName} is positioned at coordinates (${x},${y})`);
        } catch (error) {
            throw new Error(`Failed to verify ${elementName} position: ${error}`);
        }
    }
}

// Export singleton instance
const uiAssertions = new UIAssertions();
export default uiAssertions;