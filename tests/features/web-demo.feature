# Playwright BDD Web Demo Feature
# Migrated from WebDriverIO BDD feature file

@web @regression
Feature: Web Application Testing with Playwright BDD
  As a user of the web application
  I want to perform various actions and validations
  So that I can ensure the application works correctly

  Background:
    Given I navigate to "https://www.saucedemo.com/"

  @smoke @positive
  Scenario: Successful login with valid credentials
    When I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    Then "Products" element should be visible
    And page title should contain "Swag Labs"
    And URL should contain "/inventory.html"

  @negative
  Scenario: Login failure with invalid credentials
    When I type "invalid_user" into "Username" field
    And I type "wrong_password" into "Password" field
    And I click on "Login" button
    Then "Epic sadface: Username and password do not match any user in this service" element should be visible
    And "Username" field should be visible
    And "Password" field should be visible

  @positive @e2e
  Scenario: Complete purchase flow
    When I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    Then "Products" element should be visible
    When I click on "Add to cart" button
    And I click on "shoppingCartLink" element
    And I click on "Checkout" button
    Then "checkoutInfo" element should be visible
    When I type "John" into "First Name" field
    And I type "Doe" into "Last Name" field
    And I type "12345" into "Postal Code" field
    And I click on "Continue" button
    Then "checkoutSummary" element should be visible
    When I click on "Finish" button
    Then "checkoutComplete" element should be visible
    And "Thank you for your order!" element should be visible

  @positive
  Scenario: Add multiple items to cart
    Given I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    And "Products" element should be visible
    When I click on "Add to cart" button
    And I wait for "shoppingCartBadge" element to be visible
    Then "shoppingCartBadge" element should contain text "1"
    When I scroll to "Sauce Labs Bolt T-Shirt" element
    And I click on "Add to cart" button
    Then "shoppingCartBadge" element should contain text "2"

  @positive
  Scenario: Product filtering and sorting
    Given I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    And "Products" element should be visible
    When I select "Price (low to high)" from "Product Sort" dropdown
    And I wait 2 seconds
    Then "Products" element should be visible
    When I select "Name (Z to A)" from "Product Sort" dropdown
    And I wait 2 seconds
    Then "Products" element should be visible

  @positive
  Scenario: Navigation and page verification
    Given I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    And "Products" element should be visible
    When I click on "Sauce Labs Backpack" link
    Then URL should contain "/inventory-item.html"
    And "Back to products" button should be visible
    When I click on "Back to products" button
    Then URL should contain "/inventory.html"
    And "Products" element should be visible

  @positive
  Scenario: Shopping cart management
    Given I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    And "Products" element should be visible
    When I click on "Add to cart" button
    And I click on "shoppingCartLink" element
    Then "Your Cart" element should be visible
    And there should be 1 "cart item" elements
    When I click on "Remove" button
    Then there should be 0 "cart item" elements
    When I click on "Continue Shopping" button
    Then "Products" element should be visible

  @accessibility
  Scenario: Keyboard navigation and accessibility
    Given I type "standard_user" into "Username" field
    When I press Tab key
    Then "Password" field should be focused
    When I type "secret_sauce" into "Password" field
    And I press Enter key
    Then "Products" element should be visible

  @responsive
  Scenario: Responsive design verification
    Given I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    And "Products" element should be visible
    When I take a screenshot
    Then "Menu" button should be visible
    And "Products" element should be in viewport

  @error-handling
  Scenario: Error message handling
    When I click on "Login" button
    Then "Epic sadface: Username is required" element should be visible
    When I type "standard_user" into "Username" field
    And I click on "Login" button
    Then "Epic sadface: Password is required" element should be visible

  @form-validation
  Scenario: Form field validation
    Given I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    And "Products" element should be visible
    When I click on "Add to cart" button
    And I click on "shoppingCartLink" element
    And I click on "Checkout" button
    And I click on "Continue" button
    Then "Error: First Name is required" element should be visible
    When I type "John" into "First Name" field
    And I click on "Continue" button
    Then "Error: Last Name is required" element should be visible
    When I type "Doe" into "Last Name" field
    And I click on "Continue" button
    Then "Error: Postal Code is required" element should be visible

  @performance
  Scenario: Page load performance verification
    When I wait for page to load
    Then "Username" field should be visible
    And "Password" field should be visible
    And "Login" button should be clickable
    When I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    And I wait for page to load
    Then "Products" element should be visible
    And there should be more than 0 "inventory item" elements