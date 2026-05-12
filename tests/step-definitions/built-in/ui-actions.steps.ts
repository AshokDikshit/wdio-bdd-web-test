import { Given, When, Then } from '@cucumber/cucumber';
import { createBdd } from 'playwright-bdd';
import { test } from '../../support/fixtures';

const { Given: BddGiven, When: BddWhen, Then: BddThen } = createBdd(test);

// ===============================
// NAVIGATION ACTIONS
// ===============================
BddGiven(/^I navigate to "([^"]*)"$/, async ({ uiActions }, url: string) => {
    console.log(`Navigating to "${url}"`);
    await uiActions.navigateTo(url);
});

BddWhen(/^I go back$/, async ({ uiActions }) => {
    console.log('Going back in browser');
    await uiActions.goBack();
});

BddWhen(/^I go forward$/, async ({ uiActions }) => {
    console.log('Going forward in browser');
    await uiActions.goForward();
});

BddWhen(/^I refresh the page$/, async ({ uiActions }) => {
    console.log('Refreshing the page');
    await uiActions.refreshPage();
});

BddWhen(/^I reload the page$/, async ({ uiActions }) => {
    console.log('Reloading the page');
    await uiActions.reloadPage();
});

BddWhen(/^I switch to tab (\d+)$/, async ({ uiActions }, tabIndex: string) => {
    console.log(`Switching to tab ${tabIndex}`);
    await uiActions.switchToTab(tabIndex);
});

BddWhen(/^I open new tab$/, async ({ uiActions }) => {
    console.log('Opening new tab');
    await uiActions.openNewTab();
});

BddWhen(/^I close current tab$/, async ({ uiActions }) => {
    console.log('Closing current tab');
    await uiActions.closeCurrentTab();
});

// ===============================
// CLICK ACTIONS
// ===============================
BddWhen(/^I click on "([^"]*)" (button|link|element|radio button)$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Clicking on ${elementName} ${elementType}`);
    await uiActions.clickOn(elementName, elementType);
});

BddWhen(/^I double click on "([^"]*)" (button|link|element|radio button)$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Double clicking on ${elementName} ${elementType}`);
    await uiActions.doubleClickOn(elementName, elementType);
});

BddWhen(/^I right click on "([^"]*)" (button|link|element|radio button)$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Right clicking on ${elementName} ${elementType}`);
    await uiActions.rightClickOn(elementName, elementType);
});

// ===============================
// TEXT INPUT ACTIONS
// ===============================
BddWhen(/^I (type|enter) "([^"]*)" into "([^"]*)" (field|input|textbox)$/, async ({ uiActions }, action: string, text: string, elementName: string, elementType: string) => {
    console.log(`Typing/Entering "${text}" into ${elementName} ${elementType}`);
    await uiActions.typeText(text, elementName, elementType);
});

BddWhen(/^I clear "([^"]*)" (field|input|textbox)$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Clearing ${elementName} ${elementType}`);
    await uiActions.clearField(elementName, elementType);
});

BddWhen(/^I select all text in "([^"]*)" (field|input|textbox)$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Selecting all text in ${elementName} ${elementType}`);
    await uiActions.selectAllText(elementName, elementType);
});

// ===============================
// DROPDOWN AND SELECTION ACTIONS
// ===============================
BddWhen(/^I select "([^"]*)" from "([^"]*)" dropdown$/, async ({ uiActions }, option: string, elementName: string) => {
    console.log(`Selecting "${option}" from ${elementName} dropdown`);
    await uiActions.selectFromDropdown(elementName, option);
});

BddWhen(/^I select "([^"]*)" option from "([^"]*)" dropdown$/, async ({ uiActions }, option: string, elementName: string) => {
    console.log(`Selecting ${option} option from ${elementName} dropdown`);
    await uiActions.selectFromDropdown(elementName, option);
});

// ===============================
// CHECKBOX AND RADIO ACTIONS
// ===============================
BddWhen(/^I check "([^"]*)" checkbox$/, async ({ uiActions }, elementName: string) => {
    console.log(`Checking ${elementName} checkbox`);
    await uiActions.checkCheckbox(elementName);
});

BddWhen(/^I uncheck "([^"]*)" checkbox$/, async ({ uiActions }, elementName: string) => {
    console.log(`Unchecking ${elementName} checkbox`);
    await uiActions.uncheckCheckbox(elementName);
});

BddWhen(/^I select "([^"]*)" radio button$/, async ({ uiActions }, elementName: string) => {
    console.log(`Selecting ${elementName} radio button`);
    await uiActions.selectRadioButton(elementName);
});

// ===============================
// HOVER AND FOCUS ACTIONS
// ===============================
BddWhen(/^I hover over "([^"]*)" (button|link|element|radio button)$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Hovering over ${elementName} ${elementType}`);
    await uiActions.hoverOn(elementName, elementType);
});

BddWhen(/^I focus on "([^"]*)" (field|input|element)$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Focusing on ${elementName} ${elementType}`);
    await uiActions.focusOn(elementName, elementType);
});

// ===============================
// SCROLL ACTIONS
// ===============================
BddWhen(/^I scroll to "([^"]*)" (element|section)$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Scrolling to ${elementName} ${elementType}`);
    await uiActions.scrollTo(elementName, elementType);
});

BddWhen(/^I scroll to "([^"]*)" and click$/, async ({ uiActions }, elementName: string) => {
    console.log(`Scrolling to ${elementName} and clicking`);
    await uiActions.scrollToAndClick(elementName);
});

BddWhen(/^I scroll to "([^"]*)" and double click$/, async ({ uiActions }, elementName: string) => {
    console.log(`Scrolling to ${elementName} and double clicking`);
    await uiActions.scrollToAndDoubleClick(elementName);
});

BddWhen(/^I scroll to "([^"]*)" and right click$/, async ({ uiActions }, elementName: string) => {
    console.log(`Scrolling to ${elementName} and right clicking`);
    await uiActions.scrollToAndRightClick(elementName);
});

BddWhen(/^I scroll (left|right|up|down) to "([^"]*)" and click on "([^"]*)"$/, async ({ uiActions }, direction: string, targetElement: string, clickElement: string) => {
    console.log(`Scrolling ${direction} to ${targetElement} and clicking on ${clickElement}`);
    await uiActions.scrollDirectionToAndClick(direction, targetElement, clickElement);
});

BddWhen(/^I scroll (left|right|up|down) by (\d+) pixels$/, async ({ uiActions }, direction: string, pixels: string) => {
    console.log(`Scrolling ${direction} by ${pixels} pixels`);
    await uiActions.scrollByPixels(direction, pixels);
});

// ===============================
// WAIT ACTIONS
// ===============================
BddWhen(/^I wait for "([^"]*)" (button|link|element|radio button) to be visible$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Waiting for ${elementName} ${elementType} to be visible`);
    await uiActions.waitSeconds(5); // Short wait to ensure any animations have started
    await uiActions.waitForVisible(elementName, elementType);
});

BddWhen(/^I wait for "([^"]*)" (button|link|element|radio button) to disappear$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Waiting for ${elementName} ${elementType} to disappear`);
    await uiActions.waitForDisappear(elementName, elementType);
});

BddWhen(/^I wait for "([^"]*)" (button|link|element|radio button) to be enabled$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Waiting for ${elementName} ${elementType} to be enabled`);
    await uiActions.waitForEnabled(elementName, elementType);
});

BddWhen(/^I wait for "([^"]*)" (button|link|element|radio button) to be clickable$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Waiting for ${elementName} ${elementType} to be clickable`);
    await uiActions.waitForClickable(elementName, elementType);
});

BddWhen(/^I wait (\d+) seconds$/, async ({ uiActions }, seconds: string) => {
    console.log(`Waiting ${seconds} seconds`);
    await uiActions.waitSeconds(seconds);
});

BddWhen('I wait for page to load', async ({ uiActions }) => {
    console.log('Waiting for page to load');
    await uiActions.waitForPageLoad();
});

// ===============================
// FILE UPLOAD ACTIONS
// ===============================
BddWhen(/^I upload file "([^"]*)" to "([^"]*)"$/, async ({ uiActions }, filePath: string, elementName: string) => {
    console.log(`Uploading file "${filePath}" to ${elementName}`);
    await uiActions.uploadFile(filePath, elementName);
});

BddWhen(/^I select file "([^"]*)" from file picker$/, async ({ uiActions }, filePath: string) => {
    console.log(`Selecting file "${filePath}" from file picker`);
    await uiActions.selectFileFromPicker(filePath);
});

// ===============================
// ALERT AND MODAL ACTIONS
// ===============================
BddWhen(/^I accept the alert$/, async ({ uiActions }) => {
    console.log('Accepting the alert');
    await uiActions.acceptAlert();
});

BddWhen(/^I dismiss the alert$/, async ({ uiActions }) => {
    console.log('Dismissing the alert');
    await uiActions.dismissAlert();
});

BddWhen(/^I type "([^"]*)" in alert prompt$/, async ({ uiActions }, text: string) => {
    console.log(`Typing "${text}" in alert prompt`);
    await uiActions.typeInAlert(text);
});

BddWhen(/^I close the modal$/, async ({ uiActions }) => {
    console.log('Closing the modal');
    await uiActions.closeModal();
});

BddWhen(/^I click outside the modal$/, async ({ uiActions }) => {
    console.log('Clicking outside the modal');
    await uiActions.clickOutsideModal();
});

// ===============================
// KEYBOARD ACTIONS
// ===============================
BddWhen(/^I press (Enter|Tab|Escape|Space|Backspace|Delete) key$/, async ({ uiActions }, key: string) => {
    console.log(`Pressing ${key} key`);
    await uiActions.pressKey(key);
});

BddWhen(/^I press key combination "([^"]*)"$/, async ({ uiActions }, keys: string) => {
    console.log(`Pressing key combination "${keys}"`);
    await uiActions.pressKeyCombination(keys);
});

// ===============================
// DRAG AND DROP ACTIONS
// ===============================
BddWhen(/^I drag "([^"]*)" to "([^"]*)"$/, async ({ uiActions }, sourceElement: string, targetElement: string) => {
    console.log(`Dragging ${sourceElement} to ${targetElement}`);
    await uiActions.dragToElement(sourceElement, targetElement);
});

BddWhen(/^I drag "([^"]*)" by offset \((\d+),(\d+)\)$/, async ({ uiActions }, elementName: string, x: string, y: string) => {
    console.log(`Dragging ${elementName} by offset (${x},${y})`);
    await uiActions.dragByOffset(elementName, x, y);
});

// ===============================
// FORM ACTIONS
// ===============================
BddWhen(/^I submit the form$/, async ({ uiActions }) => {
    console.log('Submitting the form');
    await uiActions.submitForm();
});

BddWhen(/^I reset the form$/, async ({ uiActions }) => {
    console.log('Resetting the form');
    await uiActions.resetForm();
});

BddWhen(/^I fill form with:$/, async ({ uiActions }, dataTable: any) => {
    console.log('Filling form with data table:', dataTable.raw());
    await uiActions.fillFormWithData(dataTable);
});

// ===============================
// UTILITY ACTIONS
// ===============================
BddWhen(/^I take a screenshot$/, async ({ uiActions }) => {
    console.log('Taking a screenshot');
    await uiActions.takeScreenshot();
});

// ===============================
// MOBILE-SPECIFIC ACTIONS (Compatibility)
// ===============================
BddWhen(/^I rotate device to (landscape|portrait)$/, async ({ uiActions }, orientation: string) => {
    console.log(`Rotating device to ${orientation}`);
    await uiActions.rotateDevice(orientation);
});

BddWhen(/^I shake the device$/, async ({ uiActions }) => {
    console.log('Shaking the device');
    await uiActions.shakeDevice();
});

BddWhen(/^I lock the device$/, async ({ uiActions }) => {
    console.log('Locking the device');
    await uiActions.lockDevice();
});

BddWhen(/^I unlock the device$/, async ({ uiActions }) => {
    console.log('Unlocking the device');
    await uiActions.unlockDevice();
});

BddWhen(/^I put app in background for (\d+) seconds$/, async ({ uiActions }, seconds: string) => {
    console.log(`Putting app in background for ${seconds} seconds`);
    await uiActions.putAppInBackground(seconds);
});

BddWhen(/^I bring app to foreground$/, async ({ uiActions }) => {
    console.log('Bringing app to foreground');
    await uiActions.bringAppToForeground();
});

BddWhen(/^I hide keyboard$/, async ({ uiActions }) => {
    console.log('Hiding keyboard');
    await uiActions.hideKeyboard();
});

BddWhen(/^I show keyboard$/, async ({ uiActions }) => {
    console.log('Showing keyboard');
    await uiActions.showKeyboard();
});

// ===============================
// TOUCH AND GESTURE ACTIONS (Compatibility)
// ===============================
BddWhen(/^I press and hold "([^"]*)" (element|button)$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Pressing and holding ${elementName} ${elementType}`);
    await uiActions.pressAndHold(elementName, elementType);
});

BddWhen(/^I release the hold on "([^"]*)" (element|button)$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Releasing hold on ${elementName} ${elementType}`);
    await uiActions.releaseHold(elementName, elementType);
});

BddWhen(/^I long press on "([^"]*)" (element|button)$/, async ({ uiActions }, elementName: string, elementType: string) => {
    console.log(`Long pressing on ${elementName} ${elementType}`);
    await uiActions.longPress(elementName, elementType);
});

BddWhen(/^I swipe from "([^"]*)" to "([^"]*)"$/, async ({ uiActions }, fromElement: string, toElement: string) => {
    console.log(`Swiping from ${fromElement} to ${toElement}`);
    await uiActions.swipeFromTo(fromElement, toElement);
});

BddWhen(/^I swipe (left|right|up|down) on "([^"]*)"$/, async ({ uiActions }, direction: string, elementName: string) => {
    console.log(`Swiping ${direction} on ${elementName}`);
    await uiActions.swipeDirection(direction, elementName);
});

BddWhen(/^I pinch in on "([^"]*)"$/, async ({ uiActions }, elementName: string) => {
    console.log(`Pinching in on ${elementName}`);
    await uiActions.pinchIn(elementName);
});

BddWhen(/^I pinch out on "([^"]*)"$/, async ({ uiActions }, elementName: string) => {
    console.log(`Pinching out on ${elementName}`);
    await uiActions.pinchOut(elementName);
});

BddWhen(/^I zoom in on "([^"]*)"$/, async ({ uiActions }, elementName: string) => {
    console.log(`Zooming in on ${elementName}`);
    await uiActions.zoomIn(elementName);
});

BddWhen(/^I zoom out on "([^"]*)"$/, async ({ uiActions }, elementName: string) => {
    console.log(`Zooming out on ${elementName}`);
    await uiActions.zoomOut(elementName);
});