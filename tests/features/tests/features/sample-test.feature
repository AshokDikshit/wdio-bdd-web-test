Feature: Sample Test for Playwright Migration
  As a test automation engineer
  I want to verify that the migrated Playwright framework works correctly
  So that I can ensure all functionality has been preserved

  @smoke
  Scenario: Navigate to demo website and verify title
    Given I navigate to "https://www.saucedemo.com"
    Then I wait for page to load
    And I verify page title contains "Swag Labs"

  @regression
  Scenario: Test basic UI interactions
    Given I navigate to "https://www.saucedemo.com"
    When I wait for page to load
    And I type "standard_user" into "Username" field
    And I type "secret_sauce" into "Password" field
    And I click on "Login" button
    Then I wait for "Products" element to be visible
    And I verify element "Products" is visible

  @positive
  Scenario: Test form interactions and assertions
    Given I navigate to "https://www.saucedemo.com"
    When I wait for page to load
    And I type "standard_user" into "Username" field
    Then I verify input "Username" has value "standard_user"
    When I clear "Username" field
    Then I verify input "Username" is empty

  @negative
  Scenario: Test invalid login
    Given I navigate to "https://www.saucedemo.com"
    When I wait for page to load
    And I type "invalid_user" into "Username" field
    And I type "invalid_password" into "Password" field
    And I click on "Login" button
    Then I wait for "Error" element to be visible
    And I verify element "Error" contains text "Username and password do not match"