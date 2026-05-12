import { Page, Locator } from '@playwright/test';
import { CommonUIUtils } from './commonUtils';
import { TIMEOUTS, KEYS } from './constants';

/**
 * UI Actions for Playwright
 * Migrated from WebDriverIO UI Actions
 */
export class UIActions {
  private page: Page;
  private commonUtils: CommonUIUtils;

  constructor(page: Page, commonUtils: CommonUIUtils) {
    this.page = page;
    this.commonUtils = commonUtils;
  }

  // ===============================
  // NAVIGATION ACTIONS
  // ===============================

  async navigateTo(url: string): Promise<void> {
    try {
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
      console.log(`Navigated to: ${url}`);
    } catch (error) {
      throw new Error(`Failed to navigate to ${url}: ${error}`);
    }
  }

  async goBack(): Promise<void> {
    try {
      await this.page.goBack();
      console.log('Navigated back');
    } catch (error) {
      throw new Error(`Failed to go back: ${error}`);
    }
  }

  async goForward(): Promise<void> {
    try {
      await this.page.goForward();
      console.log('Navigated forward');
    } catch (error) {
      throw new Error(`Failed to go forward: ${error}`);
    }
  }

  async refreshPage(): Promise<void> {
    try {
      await this.page.reload();
      console.log('Page refreshed');
    } catch (error) {
      throw new Error(`Failed to refresh page: ${error}`);
    }
  }

  async reloadPage(): Promise<void> {
    await this.refreshPage();
  }

  async switchToTab(tabIndex: string): Promise<void> {
    try {
      const context = this.page.context();
      const pages = context.pages();
      const index = parseInt(tabIndex) - 1;
      
      if (index >= 0 && index < pages.length) {
        await pages[index].bringToFront();
        console.log(`Switched to tab ${tabIndex}`);
      } else {
        throw new Error(`Tab index ${tabIndex} is out of range`);
      }
    } catch (error) {
      throw new Error(`Failed to switch to tab ${tabIndex}: ${error}`);
    }
  }

  async openNewTab(): Promise<void> {
    try {
      const context = this.page.context();
      await context.newPage();
      console.log('Opened new tab');
    } catch (error) {
      throw new Error(`Failed to open new tab: ${error}`);
    }
  }

  async closeCurrentTab(): Promise<void> {
    try {
      await this.page.close();
      console.log('Closed current tab');
    } catch (error) {
      throw new Error(`Failed to close current tab: ${error}`);
    }
  }

  // ===============================
  // CLICK ACTIONS
  // ===============================

  async clickOn(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.click();
      console.log(`Clicked on ${elementName} ${elementType}`);
    } catch (error) {
      throw new Error(`Failed to click on ${elementName}: ${error}`);
    }
  }

  async doubleClickOn(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.dblclick();
      console.log(`Double clicked on ${elementName} ${elementType}`);
    } catch (error) {
      throw new Error(`Failed to double click on ${elementName}: ${error}`);
    }
  }

  async rightClickOn(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.click({ button: 'right' });
      console.log(`Right clicked on ${elementName} ${elementType}`);
    } catch (error) {
      throw new Error(`Failed to right click on ${elementName}: ${error}`);
    }
  }

  // ===============================
  // TEXT INPUT ACTIONS
  // ===============================

  async typeText(text: string, elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.clear();
      await element.fill(text);
      console.log(`Typed "${text}" into ${elementName} ${elementType}`);
    } catch (error) {
      throw new Error(`Failed to type text into ${elementName}: ${error}`);
    }
  }

  async clearField(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.clear();
      console.log(`Cleared ${elementName} ${elementType}`);
    } catch (error) {
      throw new Error(`Failed to clear ${elementName}: ${error}`);
    }
  }

  async selectAllText(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.selectText();
      console.log(`Selected all text in ${elementName} ${elementType}`);
    } catch (error) {
      throw new Error(`Failed to select all text in ${elementName}: ${error}`);
    }
  }

  // ===============================
  // DROPDOWN AND SELECTION ACTIONS
  // ===============================

  async selectFromDropdown(elementName: string, option: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, 'dropdown');
      await element.selectOption({ label: option });
      console.log(`Selected "${option}" from ${elementName} dropdown`);
    } catch (error) {
      // Try selecting by value if label fails
      try {
        const element = await this.commonUtils.getElement(elementName, 'dropdown');
        await element.selectOption({ value: option });
        console.log(`Selected "${option}" from ${elementName} dropdown by value`);
      } catch (secondError) {
        throw new Error(`Failed to select "${option}" from ${elementName}: ${error}`);
      }
    }
  }

  // ===============================
  // CHECKBOX AND RADIO ACTIONS
  // ===============================

  async checkCheckbox(elementName: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, 'checkbox');
      await element.check();
      console.log(`Checked ${elementName} checkbox`);
    } catch (error) {
      throw new Error(`Failed to check ${elementName} checkbox: ${error}`);
    }
  }

  async uncheckCheckbox(elementName: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, 'checkbox');
      await element.uncheck();
      console.log(`Unchecked ${elementName} checkbox`);
    } catch (error) {
      throw new Error(`Failed to uncheck ${elementName} checkbox: ${error}`);
    }
  }

  async selectRadioButton(elementName: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, 'radio');
      await element.check();
      console.log(`Selected ${elementName} radio button`);
    } catch (error) {
      throw new Error(`Failed to select ${elementName} radio button: ${error}`);
    }
  }

  // ===============================
  // HOVER AND FOCUS ACTIONS
  // ===============================

  async hoverOn(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.hover();
      console.log(`Hovered over ${elementName} ${elementType}`);
    } catch (error) {
      throw new Error(`Failed to hover over ${elementName}: ${error}`);
    }
  }

  async focusOn(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.focus();
      console.log(`Focused on ${elementName} ${elementType}`);
    } catch (error) {
      throw new Error(`Failed to focus on ${elementName}: ${error}`);
    }
  }

  // ===============================
  // SCROLL ACTIONS
  // ===============================

  async scrollTo(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.scrollIntoViewIfNeeded();
      console.log(`Scrolled to ${elementName} ${elementType}`);
    } catch (error) {
      throw new Error(`Failed to scroll to ${elementName}: ${error}`);
    }
  }

  async scrollToAndClick(elementName: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName);
      await element.scrollIntoViewIfNeeded();
      await element.click();
      console.log(`Scrolled to and clicked ${elementName}`);
    } catch (error) {
      throw new Error(`Failed to scroll to and click ${elementName}: ${error}`);
    }
  }

  async scrollToAndDoubleClick(elementName: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName);
      await element.scrollIntoViewIfNeeded();
      await element.dblclick();
      console.log(`Scrolled to and double clicked ${elementName}`);
    } catch (error) {
      throw new Error(`Failed to scroll to and double click ${elementName}: ${error}`);
    }
  }

  async scrollToAndRightClick(elementName: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName);
      await element.scrollIntoViewIfNeeded();
      await element.click({ button: 'right' });
      console.log(`Scrolled to and right clicked ${elementName}`);
    } catch (error) {
      throw new Error(`Failed to scroll to and right click ${elementName}: ${error}`);
    }
  }

  async scrollDirectionToAndClick(direction: string, targetElement: string, clickElement: string): Promise<void> {
    try {
      // First scroll to target element
      await this.scrollTo(targetElement, 'element');
      
      // Then click on the click element
      await this.clickOn(clickElement, 'element');
      
      console.log(`Scrolled ${direction} to ${targetElement} and clicked on ${clickElement}`);
    } catch (error) {
      throw new Error(`Failed to scroll ${direction} to ${targetElement} and click ${clickElement}: ${error}`);
    }
  }

  async scrollByPixels(direction: string, pixels: string): Promise<void> {
    try {
      const pixelValue = parseInt(pixels);
      
      switch (direction.toLowerCase()) {
        case 'up':
          await this.page.mouse.wheel(0, -pixelValue);
          break;
        case 'down':
          await this.page.mouse.wheel(0, pixelValue);
          break;
        case 'left':
          await this.page.mouse.wheel(-pixelValue, 0);
          break;
        case 'right':
          await this.page.mouse.wheel(pixelValue, 0);
          break;
        default:
          throw new Error(`Invalid scroll direction: ${direction}`);
      }
      
      console.log(`Scrolled ${direction} by ${pixels} pixels`);
    } catch (error) {
      throw new Error(`Failed to scroll ${direction} by ${pixels} pixels: ${error}`);
    }
  }

  // ===============================
  // WAIT ACTIONS
  // ===============================

  async waitForVisible(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`${elementName} ${elementType} is now visible`);
    } catch (error) {
      throw new Error(`Failed to wait for ${elementName} to be visible: ${error}`);
    }
  }

  async waitForDisappear(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.waitFor({ state: 'hidden', timeout: TIMEOUTS.ELEMENT_WAIT });
      console.log(`${elementName} ${elementType} has disappeared`);
    } catch (error) {
      throw new Error(`Failed to wait for ${elementName} to disappear: ${error}`);
    }
  }

  async waitForEnabled(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.waitFor({ state: 'attached', timeout: TIMEOUTS.ELEMENT_WAIT });
      
      // Check if element is enabled
      const isEnabled = await element.isEnabled();
      if (!isEnabled) {
        throw new Error(`Element ${elementName} is not enabled`);
      }
      
      console.log(`${elementName} ${elementType} is now enabled`);
    } catch (error) {
      throw new Error(`Failed to wait for ${elementName} to be enabled: ${error}`);
    }
  }

  async waitForClickable(elementName: string, elementType: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, elementType);
      await element.waitFor({ state: 'visible', timeout: TIMEOUTS.ELEMENT_WAIT });
      
      // Check if element is clickable (visible and enabled)
      const isEnabled = await element.isEnabled();
      const isVisible = await element.isVisible();
      
      if (!isVisible || !isEnabled) {
        throw new Error(`Element ${elementName} is not clickable`);
      }
      
      console.log(`${elementName} ${elementType} is now clickable`);
    } catch (error) {
      throw new Error(`Failed to wait for ${elementName} to be clickable: ${error}`);
    }
  }

  async waitSeconds(seconds: string | number): Promise<void> {
    try {
      const milliseconds = typeof seconds === 'string' ? parseInt(seconds) * 1000 : seconds * 1000;
      await this.page.waitForTimeout(milliseconds);
      console.log(`Waited ${seconds} seconds`);
    } catch (error) {
      throw new Error(`Failed to wait ${seconds} seconds: ${error}`);
    }
  }

  async waitForPageLoad(): Promise<void> {
    try {
      await this.page.waitForLoadState('domcontentloaded');
      await this.page.waitForLoadState('networkidle');
      console.log('Page loaded completely');
    } catch (error) {
      throw new Error(`Failed to wait for page load: ${error}`);
    }
  }

  // ===============================
  // FILE UPLOAD ACTIONS
  // ===============================

  async uploadFile(filePath: string, elementName: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName, 'input');
      await element.setInputFiles(filePath);
      console.log(`Uploaded file "${filePath}" to ${elementName}`);
    } catch (error) {
      throw new Error(`Failed to upload file to ${elementName}: ${error}`);
    }
  }

  async selectFileFromPicker(filePath: string): Promise<void> {
    try {
      // Handle file picker dialog
      const [fileChooser] = await Promise.all([
        this.page.waitForEvent('filechooser'),
        // Trigger file picker (this should be called before the action that opens file picker)
      ]);
      
      await fileChooser.setFiles(filePath);
      console.log(`Selected file "${filePath}" from file picker`);
    } catch (error) {
      throw new Error(`Failed to select file from picker: ${error}`);
    }
  }

  // ===============================
  // ALERT AND MODAL ACTIONS
  // ===============================

  async acceptAlert(): Promise<void> {
    try {
      this.page.on('dialog', async dialog => {
        await dialog.accept();
      });
      console.log('Alert accepted');
    } catch (error) {
      throw new Error(`Failed to accept alert: ${error}`);
    }
  }

  async dismissAlert(): Promise<void> {
    try {
      this.page.on('dialog', async dialog => {
        await dialog.dismiss();
      });
      console.log('Alert dismissed');
    } catch (error) {
      throw new Error(`Failed to dismiss alert: ${error}`);
    }
  }

  async typeInAlert(text: string): Promise<void> {
    try {
      this.page.on('dialog', async dialog => {
        await dialog.accept(text);
      });
      console.log(`Typed "${text}" in alert prompt`);
    } catch (error) {
      throw new Error(`Failed to type in alert: ${error}`);
    }
  }

  async closeModal(): Promise<void> {
    try {
      // Try common modal close selectors
      const closeSelectors = [
        '[data-testid="close-modal"]',
        '.modal-close',
        '.close',
        '[aria-label="Close"]',
        'button[aria-label="Close"]'
      ];
      
      for (const selector of closeSelectors) {
        try {
          await this.page.locator(selector).click({ timeout: 2000 });
          console.log('Modal closed');
          return;
        } catch {
          // Continue to next selector
        }
      }
      
      throw new Error('No close button found');
    } catch (error) {
      throw new Error(`Failed to close modal: ${error}`);
    }
  }

  async clickOutsideModal(): Promise<void> {
    try {
      // Click on the backdrop/overlay
      await this.page.locator('.modal-backdrop, .overlay, .modal-overlay').first().click();
      console.log('Clicked outside modal');
    } catch (error) {
      throw new Error(`Failed to click outside modal: ${error}`);
    }
  }

  // ===============================
  // KEYBOARD ACTIONS
  // ===============================

  async pressKey(key: string): Promise<void> {
    try {
      await this.page.keyboard.press(key);
      console.log(`Pressed ${key} key`);
    } catch (error) {
      throw new Error(`Failed to press ${key} key: ${error}`);
    }
  }

  async pressKeyCombination(keys: string): Promise<void> {
    try {
      // Handle key combinations like "Ctrl+A", "Cmd+C", etc.
      const keyArray = keys.split('+').map(k => k.trim());
      
      if (keyArray.length > 1) {
        // Press modifier keys first
        for (let i = 0; i < keyArray.length - 1; i++) {
          await this.page.keyboard.down(keyArray[i]);
        }
        
        // Press the main key
        await this.page.keyboard.press(keyArray[keyArray.length - 1]);
        
        // Release modifier keys
        for (let i = keyArray.length - 2; i >= 0; i--) {
          await this.page.keyboard.up(keyArray[i]);
        }
      } else {
        await this.page.keyboard.press(keys);
      }
      
      console.log(`Pressed key combination "${keys}"`);
    } catch (error) {
      throw new Error(`Failed to press key combination "${keys}": ${error}`);
    }
  }

  // ===============================
  // DRAG AND DROP ACTIONS
  // ===============================

  async dragToElement(sourceElement: string, targetElement: string): Promise<void> {
    try {
      const source = await this.commonUtils.getElement(sourceElement);
      const target = await this.commonUtils.getElement(targetElement);
      
      await source.dragTo(target);
      console.log(`Dragged ${sourceElement} to ${targetElement}`);
    } catch (error) {
      throw new Error(`Failed to drag ${sourceElement} to ${targetElement}: ${error}`);
    }
  }

  async dragByOffset(elementName: string, x: string, y: string): Promise<void> {
    try {
      const element = await this.commonUtils.getElement(elementName);
      const box = await element.boundingBox();
      
      if (box) {
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(box.x + parseInt(x), box.y + parseInt(y));
        await this.page.mouse.up();
      }
      
      console.log(`Dragged ${elementName} by offset (${x},${y})`);
    } catch (error) {
      throw new Error(`Failed to drag ${elementName} by offset: ${error}`);
    }
  }

  // ===============================
  // FORM ACTIONS
  // ===============================

  async submitForm(): Promise<void> {
    try {
      await this.page.keyboard.press('Enter');
      console.log('Form submitted');
    } catch (error) {
      throw new Error(`Failed to submit form: ${error}`);
    }
  }

  async resetForm(): Promise<void> {
    try {
      const resetButton = this.page.locator('input[type="reset"], button[type="reset"]');
      if (await resetButton.count() > 0) {
        await resetButton.first().click();
      } else {
        // If no reset button, try to clear all form fields
        const inputs = this.page.locator('input, textarea, select');
        const count = await inputs.count();
        
        for (let i = 0; i < count; i++) {
          const input = inputs.nth(i);
          const tagName = await input.evaluate(el => el.tagName.toLowerCase());
          const type = await input.getAttribute('type');
          
          if (tagName === 'input' && ['text', 'email', 'password', 'tel', 'url'].includes(type || '')) {
            await input.clear();
          } else if (tagName === 'textarea') {
            await input.clear();
          } else if (tagName === 'select') {
            await input.selectOption('');
          } else if (type === 'checkbox' || type === 'radio') {
            await input.uncheck();
          }
        }
      }
      
      console.log('Form reset');
    } catch (error) {
      throw new Error(`Failed to reset form: ${error}`);
    }
  }

  async fillFormWithData(dataTable: any): Promise<void> {
    try {
      const data = dataTable.raw();
      
      for (const row of data) {
        const [fieldName, value] = row;
        await this.typeText(value, fieldName, 'field');
      }
      
      console.log('Form filled with data table');
    } catch (error) {
      throw new Error(`Failed to fill form with data: ${error}`);
    }
  }

  // ===============================
  // UTILITY ACTIONS
  // ===============================

  async takeScreenshot(): Promise<void> {
    try {
      await this.commonUtils.takeScreenshot();
      console.log('Screenshot taken');
    } catch (error) {
      throw new Error(`Failed to take screenshot: ${error}`);
    }
  }

  // Mobile-specific actions (not applicable for web but included for compatibility)
  async rotateDevice(orientation: string): Promise<void> {
    console.log(`Device rotation not applicable for web testing: ${orientation}`);
  }

  async shakeDevice(): Promise<void> {
    console.log('Device shake not applicable for web testing');
  }

  async lockDevice(): Promise<void> {
    console.log('Device lock not applicable for web testing');
  }

  async unlockDevice(): Promise<void> {
    console.log('Device unlock not applicable for web testing');
  }

  async putAppInBackground(seconds: string): Promise<void> {
    console.log(`App background not applicable for web testing: ${seconds} seconds`);
  }

  async bringAppToForeground(): Promise<void> {
    console.log('App foreground not applicable for web testing');
  }

  async hideKeyboard(): Promise<void> {
    console.log('Hide keyboard not applicable for web testing');
  }

  async showKeyboard(): Promise<void> {
    console.log('Show keyboard not applicable for web testing');
  }

  // Touch and gesture actions (not applicable for web but included for compatibility)
  async pressAndHold(elementName: string, elementType: string): Promise<void> {
    console.log(`Press and hold not applicable for web testing: ${elementName} ${elementType}`);
  }

  async releaseHold(elementName: string, elementType: string): Promise<void> {
    console.log(`Release hold not applicable for web testing: ${elementName} ${elementType}`);
  }

  async longPress(elementName: string, elementType: string): Promise<void> {
    console.log(`Long press not applicable for web testing: ${elementName} ${elementType}`);
  }

  async swipeFromTo(fromElement: string, toElement: string): Promise<void> {
    console.log(`Swipe not applicable for web testing: ${fromElement} to ${toElement}`);
  }

  async swipeDirection(direction: string, elementName: string): Promise<void> {
    console.log(`Swipe direction not applicable for web testing: ${direction} on ${elementName}`);
  }

  async pinchIn(elementName: string): Promise<void> {
    console.log(`Pinch in not applicable for web testing: ${elementName}`);
  }

  async pinchOut(elementName: string): Promise<void> {
    console.log(`Pinch out not applicable for web testing: ${elementName}`);
  }

  async zoomIn(elementName: string): Promise<void> {
    console.log(`Zoom in not applicable for web testing: ${elementName}`);
  }

  async zoomOut(elementName: string): Promise<void> {
    console.log(`Zoom out not applicable for web testing: ${elementName}`);
  }
}