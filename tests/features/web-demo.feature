Feature: Web Application Demo Tests
  As a user of web applications
  I want to perform basic operations
  So that I can verify the core functionality works correctly

  @smoke @positive @web
  Scenario: Successful login and logout on SauceDemo
    Given I navigate to "https://www.saucedemo.com/"
    When I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    Then "Products" element should be visible
    And "inventoryContainer" element should be visible
    When I click on "menuButton" element
    And I click on "Logout" link
    Then "Login" button should be visible

  @smoke @positive @web
  Scenario: Add product to cart and verify
    Given I navigate to "https://www.saucedemo.com/"
    When I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    Then "Products" element should be visible
    When I click on "Add to cart" button
    Then "Remove" element should be visible
    Then "shoppingCartBadge" element should be visible
    And "shoppingCartBadge" element should contain text "1"
    When I click on "shoppingCartLink" element
    Then "cartContents" element should be visible
    And "Sauce Labs Backpack" element should be visible

  @regression @positive @web
  Scenario: Complete purchase flow
    Given I navigate to "https://www.saucedemo.com/"
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

  @negative @web
  Scenario: Login with invalid credentials
    Given I navigate to "https://www.saucedemo.com/"
    When I type "invalid_user" into "Username" field
    And I type "wrong_password" into "Password" field
    And I click on "Login" button
    Then "Username and password do not match" element should be visible