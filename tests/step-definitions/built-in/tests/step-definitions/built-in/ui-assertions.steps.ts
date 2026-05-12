import { Then } from '@cucumber/cucumber';
import { createBdd } from 'playwright-bdd';
import { test } from '../../../../../support/fixtures';

const { Then: BddThen } = createBdd(test);

// ===============================
// ELEMENT VISIBILITY ASSERTIONS
// ===============================
BddThen(/^I verify "([^"]*)" (element|button|link|field|input) is visible$/, async ({ uiAssertions }, elementName: string, elementType: string) => {
    console.log(`Verifying ${elementName} ${elementType} is visible`);
    await uiAssertions.verifyElementVisible(elementName, elementType);
});

BddThen(/^I verify "([^"]*)" (element|button|link|field|input) is not visible$/, async ({ uiAssertions }, elementName: string, elementType: string) => {
    console.log(`Verifying ${elementName} ${elementType} is not visible`);
    await uiAssertions.verifyElementNotVisible(elementName, elementType);
});

BddThen(/^I verify "([^"]*)" (element|button|link|field|input) exists$/, async ({ uiAssertions }, elementName: string, elementType: string) => {
    console.log(`Verifying ${elementName} ${elementType} exists`);
    await uiAssertions.verifyElementExists(elementName, elementType);
});

BddThen(/^I verify "([^"]*)" (element|button|link|field|input) does not exist$/, async ({ uiAssertions }, elementName: string, elementType: string) => {
    console.log(`Verifying ${elementName} ${elementType} does not exist`);
    await uiAssertions.verifyElementNotExists(elementName, elementType);
});

// ===============================
// ELEMENT STATE ASSERTIONS
// ===============================
BddThen(/^I verify "([^"]*)" (element|button|link|field|input) is enabled$/, async ({ uiAssertions }, elementName: string, elementType: string) => {
    console.log(`Verifying ${elementName} ${elementType} is enabled`);
    await uiAssertions.verifyElementEnabled(elementName, elementType);
});

BddThen(/^I verify "([^"]*)" (element|button|link|field|input) is disabled$/, async ({ uiAssertions }, elementName: string, elementType: string) => {
    console.log(`Verifying ${elementName} ${elementType} is disabled`);
    await uiAssertions.verifyElementDisabled(elementName, elementType);
});

BddThen(/^I verify "([^"]*)" (element|button|link|field|input) is clickable$/, async ({ uiAssertions }, elementName: string, elementType: string) => {
    console.log(`Verifying ${elementName} ${elementType} is clickable`);
    await uiAssertions.verifyElementClickable(elementName, elementType);
});

// ===============================
// TEXT CONTENT ASSERTIONS
// ===============================
BddThen(/^I verify "([^"]*)" (element|button|link|field|input) has text "([^"]*)"$/, async ({ uiAssertions }, elementName: string, elementType: string, expectedText: string) => {
    console.log(`Verifying ${elementName} ${elementType} has text: "${expectedText}"`);
    await uiAssertions.verifyElementText(elementName, expectedText, elementType);
});

BddThen(/^I verify "([^"]*)" (element|button|link|field|input) contains text "([^"]*)"$/, async ({ uiAssertions }, elementName: string, elementType: string, expectedText: string) => {
    console.log(`Verifying ${elementName} ${elementType} contains text: "${expectedText}"`);
    await uiAssertions.verifyElementContainsText(elementName, expectedText, elementType);
});

BddThen(/^I verify "([^"]*)" (element|button|link|field|input) does not contain text "([^"]*)"$/, async ({ uiAssertions }, elementName: string, elementType: string, unexpectedText: string) => {
    console.log(`Verifying ${elementName} ${elementType} does not contain text: "${unexpectedText}"`);
    await uiAssertions.verifyElementNotContainsText(elementName, unexpectedText, elementType);
});

// ===============================
// INPUT VALUE ASSERTIONS
// ===============================
BddThen(/^I verify input "([^"]*)" has value "([^"]*)"$/, async ({ uiAssertions }, elementName: string, expectedValue: string) => {
    console.log(`Verifying input ${elementName} has value: "${expectedValue}"`);
    await uiAssertions.verifyInputValue(elementName, expectedValue);
});

BddThen(/^I verify input "([^"]*)" is empty$/, async ({ uiAssertions }, elementName: string) => {
    console.log(`Verifying input ${elementName} is empty`);
    await uiAssertions.verifyInputEmpty(elementName);
});

BddThen(/^I verify input "([^"]*)" is not empty$/, async ({ uiAssertions }, elementName: string) => {
    console.log(`Verifying input ${elementName} is not empty`);
    await uiAssertions.verifyInputNotEmpty(elementName);
});

// ===============================
// CHECKBOX AND RADIO ASSERTIONS
// ===============================
BddThen(/^I verify "([^"]*)" checkbox is checked$/, async ({ uiAssertions }, elementName: string) => {
    console.log(`Verifying ${elementName} checkbox is checked`);
    await uiAssertions.verifyCheckboxChecked(elementName);
});

BddThen(/^I verify "([^"]*)" checkbox is unchecked$/, async ({ uiAssertions }, elementName: string) => {
    console.log(`Verifying ${elementName} checkbox is unchecked`);
    await uiAssertions.verifyCheckboxUnchecked(elementName);
});

BddThen(/^I verify "([^"]*)" radio button is selected$/, async ({ uiAssertions }, elementName: string) => {
    console.log(`Verifying ${elementName} radio button is selected`);
    await uiAssertions.verifyRadioSelected(elementName);
});

BddThen(/^I verify "([^"]*)" radio button is not selected$/, async ({ uiAssertions }, elementName: string) => {
    console.log(`Verifying ${elementName} radio button is not selected`);
    await uiAssertions.verifyRadioNotSelected(elementName);
});

// ===============================
// PAGE ASSERTIONS
// ===============================
BddThen(/^I verify page title is "([^"]*)"$/, async ({ uiAssertions }, expectedTitle: string) => {
    console.log(`Verifying page title is: "${expectedTitle}"`);
    await uiAssertions.verifyPageTitle(expectedTitle);
});

BddThen(/^I verify page title contains "([^"]*)"$/, async ({ uiAssertions }, expectedText: string) => {
    console.log(`Verifying page title contains: "${expectedText}"`);
    await uiAssertions.verifyPageTitleContains(expectedText);
});

BddThen(/^I verify current URL is "([^"]*)"$/, async ({ uiAssertions }, expectedUrl: string) => {
    console.log(`Verifying current URL is: "${expectedUrl}"`);
    await uiAssertions.verifyCurrentUrl(expectedUrl);
});

BddThen(/^I verify URL contains "([^"]*)"$/, async ({ uiAssertions }, expectedText: string) => {
    console.log(`Verifying URL contains: "${expectedText}"`);
    await uiAssertions.verifyUrlContains(expectedText);
});

BddThen(/^I verify URL does not contain "([^"]*)"$/, async ({ uiAssertions }, unexpectedText: string) => {
    console.log(`Verifying URL does not contain: "${unexpectedText}"`);
    await uiAssertions.verifyUrlNotContains(unexpectedText);
});

// ===============================
// COUNT ASSERTIONS
// ===============================
BddThen(/^I verify "([^"]*)" (elements|buttons|links) count is (\d+)$/, async ({ uiAssertions }, elementName: string, elementType: string, expectedCount: string) => {
    const count = parseInt(expectedCount);
    console.log(`Verifying ${elementName} ${elementType} count is ${count}`);
    await uiAssertions.verifyElementCount(elementName, count, elementType);
});

BddThen(/^I verify "([^"]*)" (elements|buttons|links) count is greater than (\d+)$/, async ({ uiAssertions }, elementName: string, elementType: string, minCount: string) => {
    const count = parseInt(minCount);
    console.log(`Verifying ${elementName} ${elementType} count is greater than ${count}`);
    await uiAssertions.verifyElementCountGreaterThan(elementName, count, elementType);
});

BddThen(/^I verify "([^"]*)" (elements|buttons|links) count is less than (\d+)$/, async ({ uiAssertions }, elementName: string, elementType: string, maxCount: string) => {
    const count = parseInt(maxCount);
    console.log(`Verifying ${elementName} ${elementType} count is less than ${count}`);
    await uiAssertions.verifyElementCountLessThan(elementName, count, elementType);
});

// ===============================
// ATTRIBUTE ASSERTIONS
// ===============================
BddThen(/^I verify "([^"]*)" (element|button|link|field|input) has attribute "([^"]*)" with value "([^"]*)"$/, async ({ uiAssertions }, elementName: string, elementType: string, attributeName: string, expectedValue: string) => {
    console.log(`Verifying ${elementName} ${elementType} has attribute ${attributeName} with value: "${expectedValue}"`);
    await uiAssertions.verifyElementAttribute(elementName, attributeName, expectedValue, elementType);
});

BddThen(/^I verify "([^"]*)" (element|button|link|field|input) has attribute "([^"]*)"$/, async ({ uiAssertions }, elementName: string, elementType: string, attributeName: string) => {
    console.log(`Verifying ${elementName} ${elementType} has attribute: ${attributeName}`);
    await uiAssertions.verifyElementHasAttribute(elementName, attributeName, elementType);
});

BddThen(/^I verify "([^"]*)" (element|button|link|field|input) does not have attribute "([^"]*)"$/, async ({ uiAssertions }, elementName: string, elementType: string, attributeName: string) => {
    console.log(`Verifying ${elementName} ${elementType} does not have attribute: ${attributeName}`);
    await uiAssertions.verifyElementNotHasAttribute(elementName, attributeName, elementType);
});

// ===============================
// CSS ASSERTIONS
// ===============================
BddThen(/^I verify "([^"]*)" (element|button|link|field|input) has CSS property "([^"]*)" with value "([^"]*)"$/, async ({ uiAssertions }, elementName: string, elementType: string, cssProperty: string, expectedValue: string) => {
    console.log(`Verifying ${elementName} ${elementType} has CSS ${cssProperty} with value: "${expectedValue}"`);
    await uiAssertions.verifyElementCSS(elementName, cssProperty, expectedValue, elementType);
});

BddThen(/^I verify "([^"]*)" (element|button|link|field|input) has class "([^"]*)"$/, async ({ uiAssertions }, elementName: string, elementType: string, className: string) => {
    console.log(`Verifying ${elementName} ${elementType} has class: ${className}`);
    await uiAssertions.verifyElementClass(elementName, className, elementType);
});

BddThen(/^I verify "([^"]*)" (element|button|link|field|input) does not have class "([^"]*)"$/, async ({ uiAssertions }, elementName: string, elementType: string, className: string) => {
    console.log(`Verifying ${elementName} ${elementType} does not have class: ${className}`);
    await uiAssertions.verifyElementNotHasClass(elementName, className, elementType);
});