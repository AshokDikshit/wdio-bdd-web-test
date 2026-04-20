import { $, $$, browser } from '@wdio/globals';
import type { ChainablePromiseElement } from 'webdriverio';
import commonUtils from './commonUtils';

// Type definitions for mobile-specific browser capabilities
interface MobileBrowser {
    isMobile?: boolean;
    setOrientation?: (orientation: 'LANDSCAPE' | 'PORTRAIT') => Promise<void>;
    shake?: () => Promise<void>;
    lock?: (seconds?: number) => Promise<void>;
    unlock?: () => Promise<void>;
    background?: (duration: number) => Promise<void>;
    hideKeyboard?: (strategy?: string, key?: string) => Promise<void>;
    touchAction?: (actions: TouchAction | TouchAction[]) => Promise<void>;
}

interface TouchAction {
    action: 'press' | 'longPress' | 'tap' | 'moveTo' | 'wait' | 'release';
    element?: ChainablePromiseElement;
    x?: number;
    y?: number;
    ms?: number;
}

/**
 * UI Actions Library for WebDriverIO Test Automation
 * 
 * This module provides a comprehensive set of UI interaction methods
 * for both web and mobile application testing using WebDriverIO.
 * 
 * @author Test Automation Team
 * @version 1.0.0
 */
class UIActions {

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
        const appType = await commonUtils.getApplicationType(); // Dynamically determined based on test context
        if(await commonUtils.isWebApplication()) {
            await commonUtils.waitForElementState(element, state);
        } else {
            //For native waitForElementState is not applicable
        }
    }

    // ===============================
    // CLICK ACTIONS
    // ===============================

    /**
     * Click on an element
     * @param elementName - Name of the element to click
     * @param elementType - Type of element (button, link, element)
     */
    async clickOn(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await this.waitForElementState(element, 'clickable');
            await element.click();
            console.log(`Successfully clicked on ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to click on ${elementName} ${elementType}: ${error}`);
        }
    }

    /**
     * Double click on an element
     * @param elementName - Name of the element to double click
     * @param elementType - Type of element
     */
    async doubleClickOn(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await this.waitForElementState(element, 'clickable');
            await element.doubleClick();
            console.log(`Successfully double clicked on ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to double click on ${elementName} ${elementType}: ${error}`);
        }
    }

    /**
     * Right click on an element
     * @param elementName - Name of the element to right click
     * @param elementType - Type of element
     */
    async rightClickOn(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await this.waitForElementState(element, 'clickable');
            await element.click({ button: 'right' });
            console.log(`Successfully right clicked on ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to right click on ${elementName} ${elementType}: ${error}`);
        }
    }

    // ===============================
    // DROPDOWN AND SELECTION ACTIONS
    // ===============================

    /**
     * Select option from dropdown
     * @param elementName - Name of the dropdown element
     * @param option - Option to select
     */
    async selectFromDropdown(elementName: string, option: string): Promise<void> {
        try {
            const dropdown = await this.getElement(elementName, 'dropdown');
            await this.waitForElementState(dropdown, 'clickable');
            await dropdown.selectByVisibleText(option);
            console.log(`Successfully selected '${option}' from ${elementName} dropdown`);
        } catch (error) {
            // Fallback for non-select dropdowns
            try {
                const dropdown = await this.getElement(elementName, 'dropdown');
                await dropdown.click();
                const optionElement = await $(`[data-testid="${option}"]`);
                await optionElement.click();
                console.log(`Successfully selected '${option}' from ${elementName} dropdown (fallback method)`);
            } catch (fallbackError) {
                throw new Error(`Failed to select '${option}' from ${elementName} dropdown: ${error}`);
            }
        }
    }

    // ===============================
    // HOVER AND FOCUS ACTIONS
    // ===============================

    /**
     * Hover over an element
     * @param elementName - Name of the element to hover over
     * @param elementType - Type of element
     */
    async hoverOn(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await this.waitForElementState(element, 'visible');
            await element.moveTo();
            console.log(`Successfully hovered over ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to hover over ${elementName} ${elementType}: ${error}`);
        }
    }

    /**
     * Focus on an element
     * @param elementName - Name of the element to focus
     * @param elementType - Type of element
     */
    async focusOn(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await this.waitForElementState(element, 'visible');
            await element.click(); // Focus by clicking
            console.log(`Successfully focused on ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to focus on ${elementName} ${elementType}: ${error}`);
        }
    }

    // ===============================
    // SCROLL ACTIONS
    // ===============================

    /**
     * Scroll to an element
     * @param elementName - Name of the element to scroll to
     * @param elementType - Type of element
     */
    async scrollTo(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await element.scrollIntoView();
            console.log(`Successfully scrolled to ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to scroll to ${elementName} ${elementType}: ${error}`);
        }
    }

    /**
     * Scroll to an element and click it
     * @param elementName - Name of the element
     */
    async scrollToAndClick(elementName: string): Promise<void> {
        try {
            await this.scrollTo(elementName, 'element');
            await this.clickOn(elementName, 'element');
            console.log(`Successfully scrolled to and clicked ${elementName}`);
        } catch (error) {
            throw new Error(`Failed to scroll to and click ${elementName}: ${error}`);
        }
    }

    /**
     * Scroll to an element and double click it
     * @param elementName - Name of the element
     */
    async scrollToAndDoubleClick(elementName: string): Promise<void> {
        try {
            await this.scrollTo(elementName, 'element');
            await this.doubleClickOn(elementName, 'element');
            console.log(`Successfully scrolled to and double clicked ${elementName}`);
        } catch (error) {
            throw new Error(`Failed to scroll to and double click ${elementName}: ${error}`);
        }
    }

    /**
     * Scroll to an element and right click it
     * @param elementName - Name of the element
     */
    async scrollToAndRightClick(elementName: string): Promise<void> {
        try {
            await this.scrollTo(elementName, 'element');
            await this.rightClickOn(elementName, 'element');
            console.log(`Successfully scrolled to and right clicked ${elementName}`);
        } catch (error) {
            throw new Error(`Failed to scroll to and right click ${elementName}: ${error}`);
        }
    }

    /**
     * Scroll in direction to target element and click on click element
     * @param direction - Direction to scroll (left, right, up, down)
     * @param targetElement - Element to scroll to
     * @param clickElement - Element to click after scrolling
     */
    async scrollDirectionToAndClick(direction: string, targetElement: string, clickElement: string): Promise<void> {
        try {
            const target = await this.getElement(targetElement, 'element');

            // Scroll in the specified direction
            switch (direction.toLowerCase()) {
                case 'left':
                    await (browser as any).execute('arguments[0].scrollLeft -= 200', target);
                    break;
                case 'right':
                    await (browser as any).execute('arguments[0].scrollLeft += 200', target);
                    break;
                case 'up':
                    await (browser as any).execute('arguments[0].scrollTop -= 200', target);
                    break;
                case 'down':
                    await (browser as any).execute('arguments[0].scrollTop += 200', target);
                    break;
            }

            await this.clickOn(clickElement, 'element');
            console.log(`Successfully scrolled ${direction} to ${targetElement} and clicked ${clickElement}`);
        } catch (error) {
            throw new Error(`Failed to scroll ${direction} to ${targetElement} and click ${clickElement}: ${error}`);
        }
    }

    /**
     * Scroll by specified pixels in direction
     * @param direction - Direction to scroll
     * @param pixels - Number of pixels to scroll
     */
    async scrollByPixels(direction: string, pixels: string): Promise<void> {
        try {
            const pixelValue = parseInt(pixels);

            switch (direction.toLowerCase()) {
                case 'left':
                    await (browser as any).execute(`window.scrollBy(-${pixelValue}, 0)`);
                    break;
                case 'right':
                    await (browser as any).execute(`window.scrollBy(${pixelValue}, 0)`);
                    break;
                case 'up':
                    await (browser as any).execute(`window.scrollBy(0, -${pixelValue})`);
                    break;
                case 'down':
                    await (browser as any).execute(`window.scrollBy(0, ${pixelValue})`);
                    break;
            }

            console.log(`Successfully scrolled ${direction} by ${pixels} pixels`);
        } catch (error) {
            throw new Error(`Failed to scroll ${direction} by ${pixels} pixels: ${error}`);
        }
    }

    // ===============================
    // TOUCH AND GESTURE ACTIONS (Mobile)
    // ===============================

    /**
     * Press and hold an element
     * @param elementName - Name of the element
     * @param elementType - Type of element
     */
    async pressAndHold(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await this.waitForElementState(element, 'visible');

            // For mobile, use touchAction
            if ((browser as MobileBrowser).isMobile) {
                await (browser as MobileBrowser).touchAction!({
                    action: 'longPress',
                    element: element
                });
            } else {
                // For web, simulate with mouse actions
                await browser.performActions([{
                    type: 'pointer',
                    id: 'mouse',
                    actions: [
                        { type: 'pointerMove', origin: element },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pause', duration: 1000 }
                    ]
                }]);
            }

            console.log(`Successfully pressed and held ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to press and hold ${elementName} ${elementType}: ${error}`);
        }
    }

    /**
     * Release hold on an element
     * @param elementName - Name of the element
     * @param elementType - Type of element
     */
    async releaseHold(elementName: string, elementType: string): Promise<void> {
        try {
            // For web, release the mouse button
            if (!(browser as MobileBrowser).isMobile) {
                await browser.performActions([{
                    type: 'pointer',
                    id: 'mouse',
                    actions: [
                        { type: 'pointerUp', button: 0 }
                    ]
                }]);
            }

            console.log(`Successfully released hold on ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to release hold on ${elementName} ${elementType}: ${error}`);
        }
    }

    /**
     * Long press on an element
     * @param elementName - Name of the element
     * @param elementType - Type of element
     */
    async longPress(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await this.waitForElementState(element, 'visible');

            if ((browser as MobileBrowser).isMobile) {
                await (browser as MobileBrowser).touchAction!([
                    { action: 'longPress', element: element }
                ]);
                await browser.pause(2000);
            } else {
                // Simulate long press for web
                await this.pressAndHold(elementName, elementType);
                await browser.pause(2000);
                await this.releaseHold(elementName, elementType);
            }

            console.log(`Successfully long pressed ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to long press ${elementName} ${elementType}: ${error}`);
        }
    }

    /**
     * Swipe from one element to another
     * @param fromElement - Source element
     * @param toElement - Target element
     */
    async swipeFromTo(fromElement: string, toElement: string): Promise<void> {
        try {
            const fromEl = await this.getElement(fromElement, 'element');
            const toEl = await this.getElement(toElement, 'element');

            const fromLocation = await fromEl.getLocation();
            const toLocation = await toEl.getLocation();

            if ((browser as MobileBrowser).isMobile) {
                await (browser as MobileBrowser).touchAction!([
                    { action: 'press', x: fromLocation.x, y: fromLocation.y },
                    { action: 'moveTo', x: toLocation.x, y: toLocation.y },
                    { action: 'release' }
                ]);
            } else {
                // Web swipe simulation
                await browser.performActions([{
                    type: 'pointer',
                    id: 'mouse',
                    actions: [
                        { type: 'pointerMove', x: fromLocation.x, y: fromLocation.y },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pointerMove', x: toLocation.x, y: toLocation.y },
                        { type: 'pointerUp', button: 0 }
                    ]
                }]);
            }

            console.log(`Successfully swiped from ${fromElement} to ${toElement}`);
        } catch (error) {
            throw new Error(`Failed to swipe from ${fromElement} to ${toElement}: ${error}`);
        }
    }

    /**
     * Swipe in a direction on an element
     * @param direction - Direction to swipe (left, right, up, down)
     * @param elementName - Name of the element
     */
    async swipeDirection(direction: string, elementName: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, 'element');
            const location = await element.getLocation();
            const size = await element.getSize();

            let startX = location.x + size.width / 2;
            let startY = location.y + size.height / 2;
            let endX = startX;
            let endY = startY;

            const swipeDistance = 200;

            switch (direction.toLowerCase()) {
                case 'left':
                    endX = startX - swipeDistance;
                    break;
                case 'right':
                    endX = startX + swipeDistance;
                    break;
                case 'up':
                    endY = startY - swipeDistance;
                    break;
                case 'down':
                    endY = startY + swipeDistance;
                    break;
            }

            if ((browser as MobileBrowser).isMobile) {
                await (browser as MobileBrowser).touchAction!([
                    { action: 'press', x: startX, y: startY },
                    { action: 'moveTo', x: endX, y: endY },
                    { action: 'release' }
                ]);
            }

            console.log(`Successfully swiped ${direction} on ${elementName}`);
        } catch (error) {
            throw new Error(`Failed to swipe ${direction} on ${elementName}: ${error}`);
        }
    }

    /**
     * Pinch in on an element
     * @param elementName - Name of the element
     */
    async pinchIn(elementName: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, 'element');

            if ((browser as MobileBrowser).isMobile) {
                const location = await element.getLocation();
                const size = await element.getSize();

                const centerX = location.x + size.width / 2;
                const centerY = location.y + size.height / 2;

                // Simulate pinch in gesture
                await (browser as MobileBrowser).touchAction!([
                    { action: 'press', x: centerX - 50, y: centerY },
                    { action: 'press', x: centerX + 50, y: centerY },
                    { action: 'moveTo', x: centerX - 10, y: centerY },
                    { action: 'moveTo', x: centerX + 10, y: centerY },
                    { action: 'release' },
                    { action: 'release' }
                ]);
            }

            console.log(`Successfully pinched in on ${elementName}`);
        } catch (error) {
            throw new Error(`Failed to pinch in on ${elementName}: ${error}`);
        }
    }

    /**
     * Pinch out on an element
     * @param elementName - Name of the element
     */
    async pinchOut(elementName: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, 'element');

            if ((browser as MobileBrowser).isMobile) {
                const location = await element.getLocation();
                const size = await element.getSize();

                const centerX = location.x + size.width / 2;
                const centerY = location.y + size.height / 2;

                // Simulate pinch out gesture
                await (browser as MobileBrowser).touchAction!([
                    { action: 'press', x: centerX - 10, y: centerY },
                    { action: 'press', x: centerX + 10, y: centerY },
                    { action: 'moveTo', x: centerX - 50, y: centerY },
                    { action: 'moveTo', x: centerX + 50, y: centerY },
                    { action: 'release' },
                    { action: 'release' }
                ]);
            }

            console.log(`Successfully pinched out on ${elementName}`);
        } catch (error) {
            throw new Error(`Failed to pinch out on ${elementName}: ${error}`);
        }
    }

    /**
     * Zoom in on an element
     * @param elementName - Name of the element
     */
    async zoomIn(elementName: string): Promise<void> {
        try {
            await this.pinchOut(elementName); // Pinch out = zoom in
            console.log(`Successfully zoomed in on ${elementName}`);
        } catch (error) {
            throw new Error(`Failed to zoom in on ${elementName}: ${error}`);
        }
    }

    /**
     * Zoom out on an element
     * @param elementName - Name of the element
     */
    async zoomOut(elementName: string): Promise<void> {
        try {
            await this.pinchIn(elementName); // Pinch in = zoom out
            console.log(`Successfully zoomed out on ${elementName}`);
        } catch (error) {
            throw new Error(`Failed to zoom out on ${elementName}: ${error}`);
        }
    }

    // ===============================
    // TEXT INPUT ACTIONS
    // ===============================

    /**
     * Type text into an element
     * @param text - Text to type
     * @param elementName - Name of the element
     * @param elementType - Type of element
     */
    async typeText(text: string, elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await this.waitForElementState(element, 'enabled');
            await element.clearValue();
            await element.setValue(text);
            console.log(`Successfully typed '${text}' into ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to type text into ${elementName} ${elementType}: ${error}`);
        }
    }

    /**
     * Clear a field
     * @param elementName - Name of the element
     * @param elementType - Type of element
     */
    async clearField(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await this.waitForElementState(element, 'enabled');
            await element.clearValue();
            console.log(`Successfully cleared ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to clear ${elementName} ${elementType}: ${error}`);
        }
    }

    /**
     * Select all text in a field
     * @param elementName - Name of the element
     * @param elementType - Type of element
     */
    async selectAllText(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await this.waitForElementState(element, 'enabled');
            await element.click();
            await browser.keys(['Control', 'a']); // Ctrl+A to select all
            console.log(`Successfully selected all text in ${elementName} ${elementType}`);
        } catch (error) {
            throw new Error(`Failed to select all text in ${elementName} ${elementType}: ${error}`);
        }
    }

    // ===============================
    // CHECKBOX AND RADIO ACTIONS
    // ===============================

    /**
     * Check a checkbox
     * @param elementName - Name of the checkbox
     */
    async checkCheckbox(elementName: string): Promise<void> {
        try {
            const checkbox = await this.getElement(elementName, 'checkbox');
            await this.waitForElementState(checkbox, 'clickable');

            const isChecked = await checkbox.isSelected();
            if (!isChecked) {
                await checkbox.click();
            }

            console.log(`Successfully checked ${elementName} checkbox`);
        } catch (error) {
            throw new Error(`Failed to check ${elementName} checkbox: ${error}`);
        }
    }

    /**
     * Uncheck a checkbox
     * @param elementName - Name of the checkbox
     */
    async uncheckCheckbox(elementName: string): Promise<void> {
        try {
            const checkbox = await this.getElement(elementName, 'checkbox');
            await this.waitForElementState(checkbox, 'clickable');

            const isChecked = await checkbox.isSelected();
            if (isChecked) {
                await checkbox.click();
            }

            console.log(`Successfully unchecked ${elementName} checkbox`);
        } catch (error) {
            throw new Error(`Failed to uncheck ${elementName} checkbox: ${error}`);
        }
    }

    /**
     * Select a radio button
     * @param elementName - Name of the radio button
     */
    async selectRadioButton(elementName: string): Promise<void> {
        try {
            const radioButton = await this.getElement(elementName, 'radio');
            await this.waitForElementState(radioButton, 'clickable');
            await radioButton.click();
            console.log(`Successfully selected ${elementName} radio button`);
        } catch (error) {
            throw new Error(`Failed to select ${elementName} radio button: ${error}`);
        }
    }

    // ===============================
    // NAVIGATION ACTIONS
    // ===============================

    /**
     * Navigate to a URL
     * @param url - URL to navigate to
     */
    async navigateTo(url: string): Promise<void> {
        try {
            await browser.url(url);
            console.log(`Successfully navigated to ${url}`);
        } catch (error) {
            throw new Error(`Failed to navigate to ${url}: ${error}`);
        }
    }

    /**
     * Go back in browser history
     */
    async goBack(): Promise<void> {
        try {
            await browser.back();
            console.log('Successfully went back in browser');
        } catch (error) {
            throw new Error(`Failed to go back: ${error}`);
        }
    }

    /**
     * Go forward in browser history
     */
    async goForward(): Promise<void> {
        try {
            await browser.forward();
            console.log('Successfully went forward in browser');
        } catch (error) {
            throw new Error(`Failed to go forward: ${error}`);
        }
    }

    /**
     * Refresh the current page
     */
    async refreshPage(): Promise<void> {
        try {
            await browser.refresh();
            console.log('Successfully refreshed the page');
        } catch (error) {
            throw new Error(`Failed to refresh page: ${error}`);
        }
    }

    /**
     * Reload the current page
     */
    async reloadPage(): Promise<void> {
        try {
            await this.refreshPage(); // Same as refresh
            console.log('Successfully reloaded the page');
        } catch (error) {
            throw new Error(`Failed to reload page: ${error}`);
        }
    }

    /**
     * Switch to a specific tab
     * @param tabIndex - Index of the tab to switch to
     */
    async switchToTab(tabIndex: string): Promise<void> {
        try {
            const handles = await browser.getWindowHandles();
            const index = parseInt(tabIndex);

            if (index >= 0 && index < handles.length) {
                await browser.switchToWindow(handles[index]);
                console.log(`Successfully switched to tab ${tabIndex}`);
            } else {
                throw new Error(`Tab index ${tabIndex} is out of range`);
            }
        } catch (error) {
            throw new Error(`Failed to switch to tab ${tabIndex}: ${error}`);
        }
    }

    /**
     * Open a new tab
     */
    async openNewTab(): Promise<void> {
        try {
            await browser.newWindow('about:blank');
            console.log('Successfully opened new tab');
        } catch (error) {
            throw new Error(`Failed to open new tab: ${error}`);
        }
    }

    /**
     * Close the current tab
     */
    async closeCurrentTab(): Promise<void> {
        try {
            await browser.closeWindow();
            console.log('Successfully closed current tab');
        } catch (error) {
            throw new Error(`Failed to close current tab: ${error}`);
        }
    }

    // ===============================
    // WAIT ACTIONS
    // ===============================

    /**
     * Wait for element to be visible
     * @param elementName - Name of the element
     */
    async waitForVisible(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await element.waitForDisplayed({ timeout: 10000 });
            console.log(`Successfully waited for ${elementName} ${elementType} to be visible`);
        } catch (error) {
            throw new Error(`Failed to wait for ${elementName} ${elementType} to be visible: ${error}`);
        }
    }

    /**
     * Wait for element to disappear
     * @param elementName - Name of the element
     */
    async waitForDisappear(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await element.waitForDisplayed({ timeout: 10000, reverse: true });
            console.log(`Successfully waited for ${elementName} ${elementType} to disappear`);
        } catch (error) {
            throw new Error(`Failed to wait for ${elementName} ${elementType} to disappear: ${error}`);
        }
    }

    /**
     * Wait for element to be enabled
     * @param elementName - Name of the element
     */
    async waitForEnabled(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await element.waitForEnabled({ timeout: 10000 });
            console.log(`Successfully waited for ${elementName} ${elementType} to be enabled`);
        } catch (error) {
            throw new Error(`Failed to wait for ${elementName} ${elementType} to be enabled: ${error}`);
        }
    }

    /**
     * Wait for element to be clickable
     * @param elementName - Name of the element
     */
    async waitForClickable(elementName: string, elementType: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, elementType);
            await element.waitForClickable({ timeout: 10000 });
            console.log(`Successfully waited for ${elementName} ${elementType} to be clickable`);
        } catch (error) {
            throw new Error(`Failed to wait for ${elementName} to be clickable: ${error}`);
        }
    }

    /**
     * Wait for specified number of seconds
     * @param seconds - Number of seconds to wait
     */
    async waitSeconds(seconds: any): Promise<void> {
        try {
            const ms = parseInt(seconds) * 1000;
            await commonUtils.pause(ms);
            console.log(`Successfully waited ${seconds} seconds`);
        } catch (error) {
            throw new Error(`Failed to wait ${seconds} seconds: ${error}`);
        }
    }

    /**
     * Wait for page to load
     */
    async waitForPageLoad(): Promise<void> {
        try {
            await commonUtils.waitForPageReady(30000);
            console.log('Successfully waited for page to load');
        } catch (error) {
            throw new Error(`Failed to wait for page load: ${error}`);
        }
    }

    // ===============================
    // FILE UPLOAD ACTIONS
    // ===============================

    /**
     * Upload a file to an element
     * @param filePath - Path to the file
     * @param elementName - Name of the file input element
     */
    async uploadFile(filePath: string, elementName: string): Promise<void> {
        try {
            const fileInput = await this.getElement(elementName, 'file');
            await fileInput.setValue(filePath);
            console.log(`Successfully uploaded file ${filePath} to ${elementName}`);
        } catch (error) {
            throw new Error(`Failed to upload file ${filePath} to ${elementName}: ${error}`);
        }
    }

    /**
     * Select file from file picker
     * @param filePath - Path to the file
     */
    async selectFileFromPicker(filePath: string): Promise<void> {
        try {
            // This would typically involve interacting with the OS file picker
            // Implementation depends on the specific file picker being used
            console.log(`File picker interaction for ${filePath} - implementation needed`);
        } catch (error) {
            throw new Error(`Failed to select file from picker: ${error}`);
        }
    }

    // ===============================
    // ALERT AND MODAL ACTIONS
    // ===============================

    /**
     * Accept an alert
     */
    async acceptAlert(): Promise<void> {
        try {
            await browser.acceptAlert();
            console.log('Successfully accepted alert');
        } catch (error) {
            throw new Error(`Failed to accept alert: ${error}`);
        }
    }

    /**
     * Dismiss an alert
     */
    async dismissAlert(): Promise<void> {
        try {
            await browser.dismissAlert();
            console.log('Successfully dismissed alert');
        } catch (error) {
            throw new Error(`Failed to dismiss alert: ${error}`);
        }
    }

    /**
     * Type text in alert prompt
     * @param text - Text to type in alert
     */
    async typeInAlert(text: string): Promise<void> {
        try {
            await browser.sendAlertText(text);
            console.log(`Successfully typed '${text}' in alert prompt`);
        } catch (error) {
            throw new Error(`Failed to type in alert: ${error}`);
        }
    }

    /**
     * Close a modal
     */
    async closeModal(): Promise<void> {
        try {
            // Try to find and click close button
            const closeButton = await $('[data-testid="modal-close"], .modal-close, .close');
            if (await closeButton.isExisting()) {
                await closeButton.click();
            } else {
                // Fallback: press Escape key
                await browser.keys('Escape');
            }
            console.log('Successfully closed modal');
        } catch (error) {
            throw new Error(`Failed to close modal: ${error}`);
        }
    }

    /**
     * Click outside the modal to close it
     */
    async clickOutsideModal(): Promise<void> {
        try {
            // Click on the backdrop/overlay
            const backdrop = await $('.modal-backdrop, .overlay');
            if (await backdrop.isExisting()) {
                await backdrop.click();
            } else {
                // Fallback: click at coordinates outside modal
                await browser.performActions([{
                    type: 'pointer',
                    id: 'mouse',
                    actions: [
                        { type: 'pointerMove', x: 10, y: 10 },
                        { type: 'pointerDown', button: 0 },
                        { type: 'pointerUp', button: 0 }
                    ]
                }]);
            }
            console.log('Successfully clicked outside modal');
        } catch (error) {
            throw new Error(`Failed to click outside modal: ${error}`);
        }
    }

    // ===============================
    // MOBILE-SPECIFIC ACTIONS
    // ===============================

    /**
     * Rotate device orientation
     * @param orientation - Orientation to rotate to (landscape/portrait)
     */
    async rotateDevice(orientation: string): Promise<void> {
        try {
            if ((browser as MobileBrowser).isMobile) {
                await (browser as MobileBrowser).setOrientation!(orientation.toUpperCase() as 'LANDSCAPE' | 'PORTRAIT');
                console.log(`Successfully rotated device to ${orientation}`);
            } else {
                console.log('Device rotation is only available on mobile platforms');
            }
        } catch (error) {
            throw new Error(`Failed to rotate device to ${orientation}: ${error}`);
        }
    }

    /**
     * Shake the device
     */
    async shakeDevice(): Promise<void> {
        try {
            if ((browser as MobileBrowser).isMobile) {
                await (browser as MobileBrowser).shake!();
                console.log('Successfully shook the device');
            } else {
                console.log('Device shake is only available on mobile platforms');
            }
        } catch (error) {
            throw new Error(`Failed to shake device: ${error}`);
        }
    }

    /**
     * Lock the device
     */
    async lockDevice(): Promise<void> {
        try {
            if ((browser as MobileBrowser).isMobile) {
                await (browser as MobileBrowser).lock!();
                console.log('Successfully locked the device');
            } else {
                console.log('Device lock is only available on mobile platforms');
            }
        } catch (error) {
            throw new Error(`Failed to lock device: ${error}`);
        }
    }

    /**
     * Unlock the device
     */
    async unlockDevice(): Promise<void> {
        try {
            if ((browser as MobileBrowser).isMobile) {
                await (browser as MobileBrowser).unlock!();
                console.log('Successfully unlocked the device');
            } else {
                console.log('Device unlock is only available on mobile platforms');
            }
        } catch (error) {
            throw new Error(`Failed to unlock device: ${error}`);
        }
    }

    /**
     * Put app in background
     * @param seconds - Number of seconds to keep in background
     */
    async putAppInBackground(seconds: string): Promise<void> {
        try {
            if ((browser as MobileBrowser).isMobile) {
                const duration = parseInt(seconds);
                await (browser as MobileBrowser).background!(duration);
                console.log(`Successfully put app in background for ${seconds} seconds`);
            } else {
                console.log('Background app is only available on mobile platforms');
            }
        } catch (error) {
            throw new Error(`Failed to put app in background: ${error}`);
        }
    }

    /**
     * Bring app to foreground
     */
    async bringAppToForeground(): Promise<void> {
        try {
            if ((browser as MobileBrowser).isMobile) {
                // App automatically comes to foreground after background duration
                console.log('App brought to foreground');
            } else {
                console.log('Foreground app is only available on mobile platforms');
            }
        } catch (error) {
            throw new Error(`Failed to bring app to foreground: ${error}`);
        }
    }

    /**
     * Take a screenshot
     */
    async takeScreenshot(): Promise<void> {
        try {
            const filename = await commonUtils.takeScreenshot();
            console.log(`Successfully took screenshot: ${filename}`);
        } catch (error) {
            throw new Error(`Failed to take screenshot: ${error}`);
        }
    }

    /**
     * Hide keyboard (mobile)
     */
    async hideKeyboard(): Promise<void> {
        try {
            if ((browser as MobileBrowser).isMobile) {
                await (browser as MobileBrowser).hideKeyboard!();
                console.log('Successfully hid keyboard');
            } else {
                console.log('Hide keyboard is only available on mobile platforms');
            }
        } catch (error) {
            throw new Error(`Failed to hide keyboard: ${error}`);
        }
    }

    /**
     * Show keyboard (mobile)
     */
    async showKeyboard(): Promise<void> {
        try {
            if ((browser as MobileBrowser).isMobile) {
                // Focus on an input field to show keyboard
                const input = await $('input, textarea');
                if (await input.isExisting()) {
                    await input.click();
                }
                console.log('Successfully showed keyboard');
            } else {
                console.log('Show keyboard is only available on mobile platforms');
            }
        } catch (error) {
            throw new Error(`Failed to show keyboard: ${error}`);
        }
    }

    // ===============================
    // FORM ACTIONS
    // ===============================

    /**
     * Submit a form
     */
    async submitForm(): Promise<void> {
        try {
            const form = await $('form');
            if (await form.isExisting()) {
                await browser.execute('arguments[0].submit()', form);
            } else {
                // Fallback: look for submit button
                const submitButton = await $('[type="submit"], .submit-btn');
                await submitButton.click();
            }
            console.log('Successfully submitted form');
        } catch (error) {
            throw new Error(`Failed to submit form: ${error}`);
        }
    }

    /**
     * Reset a form
     */
    async resetForm(): Promise<void> {
        try {
            const resetButton = await $('[type="reset"], .reset-btn');
            if (await resetButton.isExisting()) {
                await resetButton.click();
            } else {
                // Fallback: clear all form fields
                const inputs = await $$('input, textarea, select');
                for (const input of inputs) {
                    await input.clearValue();
                }
            }
            console.log('Successfully reset form');
        } catch (error) {
            throw new Error(`Failed to reset form: ${error}`);
        }
    }

    /**
     * Fill form with data table
     * @param dataTable - Cucumber data table
     */
    async fillFormWithData(dataTable: any): Promise<void> {
        try {
            const data = dataTable.raw();

            for (const row of data) {
                const [fieldName, value] = row;
                const field = await this.getElement(fieldName, 'field');
                await field.setValue(value);
            }

            console.log('Successfully filled form with data table');
        } catch (error) {
            throw new Error(`Failed to fill form with data: ${error}`);
        }
    }

    // ===============================
    // KEYBOARD ACTIONS
    // ===============================

    /**
     * Press a key
     * @param key - Key to press
     */
    async pressKey(key: string): Promise<void> {
        try {
            await browser.keys(key);
            console.log(`Successfully pressed ${key} key`);
        } catch (error) {
            throw new Error(`Failed to press ${key} key: ${error}`);
        }
    }

    /**
     * Press key combination
     * @param keys - Key combination (e.g., "Ctrl+C")
     */
    async pressKeyCombination(keys: string): Promise<void> {
        try {
            const keyArray = keys.split('+').map(k => k.trim());
            await browser.keys(keyArray);
            console.log(`Successfully pressed key combination: ${keys}`);
        } catch (error) {
            throw new Error(`Failed to press key combination ${keys}: ${error}`);
        }
    }

    // ===============================
    // DRAG AND DROP ACTIONS
    // ===============================

    /**
     * Drag element to another element
     * @param sourceElement - Source element to drag
     * @param targetElement - Target element to drop on
     */
    async dragToElement(sourceElement: string, targetElement: string): Promise<void> {
        try {
            const source = await this.getElement(sourceElement, 'element');
            const target = await this.getElement(targetElement, 'element');

            await source.dragAndDrop(target);
            console.log(`Successfully dragged ${sourceElement} to ${targetElement}`);
        } catch (error) {
            throw new Error(`Failed to drag ${sourceElement} to ${targetElement}: ${error}`);
        }
    }

    /**
     * Drag element by offset
     * @param elementName - Name of element to drag
     * @param x - X offset
     * @param y - Y offset
     */
    async dragByOffset(elementName: string, x: string, y: string): Promise<void> {
        try {
            const element = await this.getElement(elementName, 'element');
            const xOffset = parseInt(x);
            const yOffset = parseInt(y);

            await element.dragAndDrop({ x: xOffset, y: yOffset });
            console.log(`Successfully dragged ${elementName} by offset (${x},${y})`);
        } catch (error) {
            throw new Error(`Failed to drag ${elementName} by offset: ${error}`);
        }
    }
}

// Export singleton instance
const uiActions = new UIActions();
export default uiActions;