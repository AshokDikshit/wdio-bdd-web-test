import { Then } from '@cucumber/cucumber';
import { createBdd } from 'playwright-bdd';
import { test } from '../../support/fixtures';

const { Then: BddThen } = createBdd(test);

// ===============================
// ELEMENT VISIBILITY ASSERTIONS
// ===============================
Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|checkbox|radio button|section) should be visible$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is visible`);
    await this.uiAssertions.verifyElementVisible(elementName, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|checkbox|radio button|section) should not be visible$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is not visible`);
    await this.uiAssertions.verifyElementNotVisible(elementName, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|checkbox|radio button|section) should be hidden$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is hidden`);
    await this.uiAssertions.verifyElementHidden(elementName, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|checkbox|radio button|section) should exist$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} exists`);
    await this.uiAssertions.verifyElementExists(elementName, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|checkbox|radio button|section) should not exist$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} does not exist`);
    await this.uiAssertions.verifyElementNotExists(elementName, elementType);
});

// ===============================
// ELEMENT STATE ASSERTIONS
// ===============================
Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|checkbox|radio button) should be enabled$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is enabled`);
    await this.uiAssertions.verifyElementEnabled(elementName, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|checkbox|radio button) should be disabled$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is disabled`);
    await this.uiAssertions.verifyElementDisabled(elementName, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|checkbox|radio button) should be clickable$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is clickable`);
    await this.uiAssertions.verifyElementClickable(elementName, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|checkbox|radio button) should not be clickable$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is not clickable`);
    await this.uiAssertions.verifyElementNotClickable(elementName, elementType);
});

// ===============================
// TEXT CONTENT ASSERTIONS
// ===============================
Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|section) should contain text "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, expectedText: string) {
    console.log(`Verifying ${elementName} ${elementType} contains text: "${expectedText}"`);
    await this.uiAssertions.verifyElementContainsText(elementName, expectedText, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|section) should have text "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, expectedText: string) {
    console.log(`Verifying ${elementName} ${elementType} has exact text: "${expectedText}"`);
    await this.uiAssertions.verifyElementText(elementName, expectedText, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|section) should not contain text "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, unexpectedText: string) {
    console.log(`Verifying ${elementName} ${elementType} does not contain text: "${unexpectedText}"`);
    await this.uiAssertions.verifyElementNotContainsText(elementName, unexpectedText, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown|section) text should match "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, pattern: string) {
    console.log(`Verifying ${elementName} ${elementType} text matches pattern: "${pattern}"`);
    await this.uiAssertions.verifyElementTextMatches(elementName, pattern, elementType);
});

// ===============================
// INPUT VALUE ASSERTIONS
// ===============================
Then(/^"([^"]*)" (field|input|textbox) should have value "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, expectedValue: string) {
    console.log(`Verifying ${elementName} ${elementType} has value: "${expectedValue}"`);
    await this.uiAssertions.verifyInputValue(elementName, expectedValue, elementType);
});

Then(/^"([^"]*)" (field|input|textbox) should be empty$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is empty`);
    await this.uiAssertions.verifyInputEmpty(elementName, elementType);
});

Then(/^"([^"]*)" (field|input|textbox) should not be empty$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is not empty`);
    await this.uiAssertions.verifyInputNotEmpty(elementName, elementType);
});

// ===============================
// ATTRIBUTE ASSERTIONS
// ===============================
Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown) should have attribute "([^"]*)" with value "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, attributeName: string, expectedValue: string) {
    console.log(`Verifying ${elementName} ${elementType} has attribute ${attributeName} with value: "${expectedValue}"`);
    await this.uiAssertions.verifyElementAttribute(elementName, attributeName, expectedValue, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown) should have attribute "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, attributeName: string) {
    console.log(`Verifying ${elementName} ${elementType} has attribute: ${attributeName}`);
    await this.uiAssertions.verifyElementHasAttribute(elementName, attributeName, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown) should not have attribute "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, attributeName: string) {
    console.log(`Verifying ${elementName} ${elementType} does not have attribute: ${attributeName}`);
    await this.uiAssertions.verifyElementNotHasAttribute(elementName, attributeName, elementType);
});

// ===============================
// CSS ASSERTIONS
// ===============================
Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown) should have CSS property "([^"]*)" with value "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, cssProperty: string, expectedValue: string) {
    console.log(`Verifying ${elementName} ${elementType} has CSS ${cssProperty} with value: "${expectedValue}"`);
    await this.uiAssertions.verifyElementCSS(elementName, cssProperty, expectedValue, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown) should have class "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, className: string) {
    console.log(`Verifying ${elementName} ${elementType} has class: ${className}`);
    await this.uiAssertions.verifyElementClass(elementName, className, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown) should not have class "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, className: string) {
    console.log(`Verifying ${elementName} ${elementType} does not have class: ${className}`);
    await this.uiAssertions.verifyElementNotHasClass(elementName, className, elementType);
});

// ===============================
// CHECKBOX AND RADIO ASSERTIONS
// ===============================
Then(/^"([^"]*)" checkbox should be checked$/, async function (this: CustomWorld, elementName: string) {
    console.log(`Verifying ${elementName} checkbox is checked`);
    await this.uiAssertions.verifyCheckboxChecked(elementName);
});

Then(/^"([^"]*)" checkbox should be unchecked$/, async function (this: CustomWorld, elementName: string) {
    console.log(`Verifying ${elementName} checkbox is unchecked`);
    await this.uiAssertions.verifyCheckboxUnchecked(elementName);
});

Then(/^"([^"]*)" radio button should be selected$/, async function (this: CustomWorld, elementName: string) {
    console.log(`Verifying ${elementName} radio button is selected`);
    await this.uiAssertions.verifyRadioSelected(elementName);
});

Then(/^"([^"]*)" radio button should not be selected$/, async function (this: CustomWorld, elementName: string) {
    console.log(`Verifying ${elementName} radio button is not selected`);
    await this.uiAssertions.verifyRadioNotSelected(elementName);
});

// ===============================
// DROPDOWN ASSERTIONS
// ===============================
Then(/^"([^"]*)" dropdown should have value "([^"]*)"$/, async function (this: CustomWorld, elementName: string, expectedValue: string) {
    console.log(`Verifying ${elementName} dropdown has value: "${expectedValue}"`);
    await this.uiAssertions.verifyDropdownValue(elementName, expectedValue);
});

Then(/^"([^"]*)" dropdown should have selected text "([^"]*)"$/, async function (this: CustomWorld, elementName: string, expectedText: string) {
    console.log(`Verifying ${elementName} dropdown has selected text: "${expectedText}"`);
    await this.uiAssertions.verifyDropdownText(elementName, expectedText);
});

// ===============================
// PAGE ASSERTIONS
// ===============================
Then(/^page title should be "([^"]*)"$/, async function (this: CustomWorld, expectedTitle: string) {
    console.log(`Verifying page title: "${expectedTitle}"`);
    await this.uiAssertions.verifyPageTitle(expectedTitle);
});

Then(/^page title should contain "([^"]*)"$/, async function (this: CustomWorld, expectedText: string) {
    console.log(`Verifying page title contains: "${expectedText}"`);
    await this.uiAssertions.verifyPageTitleContains(expectedText);
});

Then(/^current URL should be "([^"]*)"$/, async function (this: CustomWorld, expectedUrl: string) {
    console.log(`Verifying current URL: "${expectedUrl}"`);
    await this.uiAssertions.verifyCurrentUrl(expectedUrl);
});

Then(/^URL should contain "([^"]*)"$/, async function (this: CustomWorld, expectedText: string) {
    console.log(`Verifying URL contains: "${expectedText}"`);
    await this.uiAssertions.verifyUrlContains(expectedText);
});

Then(/^URL should not contain "([^"]*)"$/, async function (this: CustomWorld, unexpectedText: string) {
    console.log(`Verifying URL does not contain: "${unexpectedText}"`);
    await this.uiAssertions.verifyUrlNotContains(unexpectedText);
});

// ===============================
// COUNT ASSERTIONS
// ===============================
Then(/^there should be (\d+) "([^"]*)" (elements|buttons|links|fields|inputs|textboxes|dropdowns)$/, async function (this: CustomWorld, expectedCount: string, elementName: string, elementType: string) {
    console.log(`Verifying there are ${expectedCount} ${elementName} ${elementType}`);
    await this.uiAssertions.verifyElementCount(elementName, parseInt(expectedCount), elementType);
});

Then(/^there should be more than (\d+) "([^"]*)" (elements|buttons|links|fields|inputs|textboxes|dropdowns)$/, async function (this: CustomWorld, minCount: string, elementName: string, elementType: string) {
    console.log(`Verifying there are more than ${minCount} ${elementName} ${elementType}`);
    await this.uiAssertions.verifyElementCountGreaterThan(elementName, parseInt(minCount), elementType);
});

Then(/^there should be less than (\d+) "([^"]*)" (elements|buttons|links|fields|inputs|textboxes|dropdowns)$/, async function (this: CustomWorld, maxCount: string, elementName: string, elementType: string) {
    console.log(`Verifying there are less than ${maxCount} ${elementName} ${elementType}`);
    await this.uiAssertions.verifyElementCountLessThan(elementName, parseInt(maxCount), elementType);
});

// ===============================
// ALERT ASSERTIONS
// ===============================
Then(/^alert should have text "([^"]*)"$/, async function (this: CustomWorld, expectedText: string) {
    console.log(`Verifying alert has text: "${expectedText}"`);
    await this.uiAssertions.verifyAlertText(expectedText);
});

Then(/^alert should be present$/, async function (this: CustomWorld) {
    console.log('Verifying alert is present');
    await this.uiAssertions.verifyAlertPresent();
});

// ===============================
// VIEWPORT AND FOCUS ASSERTIONS
// ===============================
Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown) should be in viewport$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is in viewport`);
    await this.uiAssertions.verifyElementInViewport(elementName, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown) should not be in viewport$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is not in viewport`);
    await this.uiAssertions.verifyElementNotInViewport(elementName, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown) should be focused$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is focused`);
    await this.uiAssertions.verifyElementFocused(elementName, elementType);
});

Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown) should not be focused$/, async function (this: CustomWorld, elementName: string, elementType: string) {
    console.log(`Verifying ${elementName} ${elementType} is not focused`);
    await this.uiAssertions.verifyElementNotFocused(elementName, elementType);
});

// ===============================
// WAIT ASSERTIONS
// ===============================
Then(/^I should wait for "([^"]*)" (element|button|link|field|input|textbox|dropdown) to have text "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, expectedText: string) {
    console.log(`Waiting for ${elementName} ${elementType} to have text: "${expectedText}"`);
    await this.uiAssertions.waitForElementText(elementName, expectedText, elementType);
});

Then(/^I should wait for "([^"]*)" (element|button|link|field|input|textbox|dropdown) to contain text "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, expectedText: string) {
    console.log(`Waiting for ${elementName} ${elementType} to contain text: "${expectedText}"`);
    await this.uiAssertions.waitForElementToContainText(elementName, expectedText, elementType);
});

// ===============================
// SOFT ASSERTIONS
// ===============================
Then(/^"([^"]*)" (element|button|link|field|input|textbox|dropdown) should softly have text "([^"]*)"$/, async function (this: CustomWorld, elementName: string, elementType: string, expectedText: string) {
    console.log(`Soft assertion: ${elementName} ${elementType} should have text: "${expectedText}"`);
    const result = await this.uiAssertions.softAssertElementText(elementName, expectedText, elementType);
    if (result) {
        console.log('✅ Soft assertion passed');
    } else {
        console.log('⚠️ Soft assertion failed but continuing execution');
    }
});