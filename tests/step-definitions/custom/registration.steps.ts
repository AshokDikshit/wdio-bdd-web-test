import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../support/world';

/**
 * Custom step definitions for registration functionality
 * Migrated from WebDriverIO to Playwright
 */

Given(/^I am on the registration page$/, async function (this: CustomWorld) {
    console.log('Navigating to registration page');
    await this.uiActions.navigateTo('https://retailwebsite.com/register');
    await this.uiAssertions.verifyElementVisible('Create Account', 'heading');
});

Then(/^I should be redirected to the registration page$/, async function (this: CustomWorld) {
    console.log('Verifying redirection to registration page');
    await this.uiAssertions.verifyUrlContains('/register');
    await this.uiAssertions.verifyElementVisible('Create Account', 'heading');
});

Then(/^I should be redirected to the email verification page$/, async function (this: CustomWorld) {
    console.log('Verifying redirection to email verification page');
    await this.uiAssertions.verifyUrlContains('/verify-email');
    await this.uiAssertions.verifyElementVisible('Email Verification', 'heading');
});

// Additional registration-specific step definitions
When(/^I fill in the registration form with valid details$/, async function (this: CustomWorld) {
    console.log('Filling registration form with valid details');
    await this.uiActions.typeText('John', 'First Name', 'field');
    await this.uiActions.typeText('Doe', 'Last Name', 'field');
    await this.uiActions.typeText('john.doe@example.com', 'Email', 'field');
    await this.uiActions.typeText('SecurePassword123!', 'Password', 'field');
    await this.uiActions.typeText('SecurePassword123!', 'Confirm Password', 'field');
});

When(/^I accept the terms and conditions$/, async function (this: CustomWorld) {
    console.log('Accepting terms and conditions');
    await this.uiActions.checkCheckbox('Terms and Conditions');
});

When(/^I submit the registration form$/, async function (this: CustomWorld) {
    console.log('Submitting registration form');
    await this.uiActions.clickOn('Register', 'button');
});

Then(/^I should see a registration success message$/, async function (this: CustomWorld) {
    console.log('Verifying registration success message');
    await this.uiAssertions.verifyElementVisible('Registration Successful', 'element');
    await this.uiAssertions.verifyElementContainsText('Success Message', 'Thank you for registering');
});

Then(/^I should see validation errors for required fields$/, async function (this: CustomWorld) {
    console.log('Verifying validation errors for required fields');
    await this.uiAssertions.verifyElementVisible('First Name Error', 'element');
    await this.uiAssertions.verifyElementVisible('Last Name Error', 'element');
    await this.uiAssertions.verifyElementVisible('Email Error', 'element');
    await this.uiAssertions.verifyElementVisible('Password Error', 'element');
});

When(/^I enter an invalid email format$/, async function (this: CustomWorld) {
    console.log('Entering invalid email format');
    await this.uiActions.typeText('invalid-email', 'Email', 'field');
});

Then(/^I should see an email format validation error$/, async function (this: CustomWorld) {
    console.log('Verifying email format validation error');
    await this.uiAssertions.verifyElementVisible('Email Format Error', 'element');
    await this.uiAssertions.verifyElementContainsText('Email Format Error', 'Please enter a valid email address');
});

When(/^I enter mismatched passwords$/, async function (this: CustomWorld) {
    console.log('Entering mismatched passwords');
    await this.uiActions.typeText('Password123!', 'Password', 'field');
    await this.uiActions.typeText('DifferentPassword456!', 'Confirm Password', 'field');
});

Then(/^I should see a password mismatch error$/, async function (this: CustomWorld) {
    console.log('Verifying password mismatch error');
    await this.uiAssertions.verifyElementVisible('Password Mismatch Error', 'element');
    await this.uiAssertions.verifyElementContainsText('Password Mismatch Error', 'Passwords do not match');
});