# WebDriverIO BDD Test Automation Framework

## 🚀 Overview

This is a comprehensive **WebDriverIO BDD (Behavior-Driven Development)** test automation framework built with **TypeScript** and **Cucumber**. The framework is designed for web application testing with a focus on maintainability, scalability, and ease of use.

## 🏗️ Framework Architecture

### Technology Stack
- **WebDriverIO v9.27.0** - Modern automation framework
- **Cucumber Framework** - BDD test execution
- **TypeScript** - Type-safe development
- **Node.js** - Runtime environment
- **YAML** - Locator management
- **Multiple Cucumber HTML Reporter** - Rich test reporting

### Project Structure
```
wdio-bdd-web-test/
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── wdio.conf.ts                   # Main WebDriverIO configuration
├── wdio.shared.conf.ts            # Shared configuration
├── wdio.web.conf.ts               # Web-specific configuration
├── wdio.web.headless.conf.ts      # Headless web configuration
├── scripts/                       # Utility scripts
├── tests/
│   ├── features/                  # Cucumber feature files
│   │   └── web-demo.feature       # Sample BDD scenarios
│   ├── locators/                  # Element locators
│   │   └── web-locators.yaml      # YAML-based locator definitions
│   ├── step-definitions/          # Cucumber step implementations
│   │   ├── built-in/              # Pre-built step definitions
│   │   │   ├── ui-actions.steps.ts    # Action steps (Given/When)
│   │   │   └── ui-assertions.steps.ts # Assertion steps (Then)
│   │   └── custom/                # Custom step definitions
│   │       └── registration.steps.ts  # Domain-specific steps
│   ├── support/                   # Support utilities
│   │   ├── commonUtils.ts         # Common utility functions
│   │   ├── generate-cucumber-report.js # Report generation
│   │   ├── locatorManager.ts      # Dynamic locator management
│   │   ├── uiActions.ts           # UI action implementations
│   │   └── uiAssertions.ts        # UI assertion implementations
│   └── test-data/                 # Test data files
```

## 🔧 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Chrome browser (for web testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wdio-bdd-web-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npx wdio --version
   ```

## 🎯 Running Tests

### Available Scripts

```bash
# Run tests in Chrome browser
npm run chrome

# Generate test reports
npm run reports

# Run tests and generate reports
npm run tests
```

### Command Line Options

```bash
# Run specific feature file
npx wdio run ./wdio.web.conf.ts --spec tests/features/web-demo.feature

# Run tests with specific tags
npx wdio run ./wdio.web.conf.ts --cucumberOpts.tagExpression='@smoke'

# Run tests in headless mode
npx wdio run ./wdio.web.headless.conf.ts
```

## 📝 Sample Test Cases

### Basic Login Test
```gherkin
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
```

### E-commerce Cart Test
```gherkin
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
```

### Complete Purchase Flow
```gherkin
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
```

### Negative Testing
```gherkin
@negative @web
Scenario: Login with invalid credentials
  Given I navigate to "https://www.saucedemo.com/"
  When I type "invalid_user" into "Username" field
  And I type "wrong_password" into "Password" field
  And I click on "Login" button
  Then "Username and password do not match" element should be visible
```

## 🎯 Locator Strategy

### YAML-Based Locator Management

The framework uses a centralized YAML-based approach for managing element locators, promoting maintainability and reusability.

#### Locator File Structure
```yaml
# tests/locators/web-locators.yaml
common:
  # Products Page Elements
  inventoryContainer: "//div[@id='inventory_container']"
  shoppingCartBadge: "//span[@class='shopping_cart_badge']"
  shoppingCartLink: "//a[@class='shopping_cart_link']"
  
  # Cart Page Elements
  cartContents: "//div[@id='cart_contents_container']"
  menuButton: "//button[@id='react-burger-menu-btn']"
  
  # Checkout Elements
  checkoutInfo: "//div[@id='checkout_info_container']"
  checkoutSummary: "//div[@id='checkout_summary_container']"
  checkoutComplete: "//div[@id='checkout_complete_container']"
```

### Dynamic Locator Strategy

The framework implements a sophisticated **Dynamic Locator Manager** that provides multiple fallback strategies:

#### 1. **Saved Locator Strategy**
- First attempts to find elements using predefined locators from YAML files
- Provides fast, reliable element identification
- Organized by categories for better maintainability

#### 2. **Text-Based Dynamic Locators**
- Automatically generates XPath expressions for elements containing specific text
- Supports multiple attributes: `text`, `placeholder`, `title`, `name`, `content-desc`, `value`, `label`, `data-test-id`
- Fallback mechanism when saved locators are not available

```typescript
// Dynamic text-based locator generation
`//*[contains(@text,'${text}')] | 
 //*[contains(text(),'${text}')] | 
 //*[contains(@placeholder,'${text}')] | 
 //*[contains(@title,'${text}')] | 
 //*[contains(@name,'${text}')] | 
 //*[contains(@data-testid,'${text}')]`
```

#### 3. **Intelligent Element Detection**
- Automatic retry mechanism with configurable attempts
- Wait strategies for different element states (visible, clickable, enabled)
- Cross-platform compatibility (web and mobile)

### Locator Best Practices

#### ✅ **Recommended Approaches**

1. **Use Stable Attributes**
   ```yaml
   loginButton: "//button[@data-testid='login-btn']"
   userNameField: "//input[@id='username']"
   ```

2. **Prefer ID and Data Attributes**
   ```yaml
   productContainer: "//div[@id='inventory_container']"
   addToCartBtn: "//button[@data-test='add-to-cart-sauce-labs-backpack']"
   ```

3. **Use Descriptive Locator Names**
   ```yaml
   shoppingCartBadge: "//span[@class='shopping_cart_badge']"
   checkoutCompleteContainer: "//div[@id='checkout_complete_container']"
   ```

#### ❌ **Avoid These Patterns**

1. **Fragile CSS Selectors**
   ```yaml
   # Avoid: brittle class-based selectors
   badExample: ".inventory_item:nth-child(1) .btn_primary"
   ```

2. **Absolute XPath**
   ```yaml
   # Avoid: absolute paths that break with DOM changes
   badExample: "/html/body/div[1]/div/div[2]/div[1]/button"
   ```

3. **Text-Only Locators for Dynamic Content**
   ```yaml
   # Avoid: text that may change with localization
   badExample: "//button[text()='Add to Cart']"
   ```

### Locator Manager Usage

#### Adding Custom Locators
```typescript
// Add a new locator programmatically
locatorManager.addCustomLocator('newElement', '//div[@id="new-element"]', 'common');
```

#### Retrieving Elements
```typescript
// Get element using saved locator or dynamic text-based approach
const selector = await locatorManager.getSelector('Login', 'button');
const element = await $(selector);
```

#### Managing Locator Categories
```typescript
// Get all locators in a category
const commonLocators = locatorManager.getLocatorsByCategory('common');

// Get available categories
const categories = locatorManager.getAvailableCategories();
```

## 🔍 Available Step Definitions

### Navigation Steps
```gherkin
Given I navigate to "<URL>"
When I go back
When I go forward
When I refresh the page
```

### Input Actions
```gherkin
When I type "<text>" into "<element>" field
When I clear "<element>" field
When I select "<option>" from "<dropdown>" dropdown
```

### Click Actions
```gherkin
When I click on "<element>" button
When I double click on "<element>" element
When I right click on "<element>" link
```

### Verification Steps
```gherkin
Then "<element>" element should be visible
Then "<element>" element should contain text "<text>"
Then "<element>" element should not be visible
```

### Wait Actions
```gherkin
When I wait for "<element>" element to be visible
When I wait for "<element>" element to be clickable
When I wait <number> seconds
```

## 📊 Test Reporting

The framework generates comprehensive HTML reports using **Multiple Cucumber HTML Reporter**.

### Report Generation
```bash
# Generate reports after test execution
npm run reports
```

### Report Features
- **Test execution summary** with pass/fail statistics
- **Scenario-level details** with step-by-step execution
- **Screenshot capture** on failures
- **Execution timeline** and duration metrics
- **Tag-based filtering** and organization

## 🏷️ Test Tags and Organization

### Available Tags
- `@smoke` - Critical functionality tests
- `@regression` - Full regression test suite
- `@positive` - Happy path scenarios
- `@negative` - Error handling and edge cases
- `@web` - Web-specific tests

### Running Tagged Tests
```bash
# Run only smoke tests
npx wdio run ./wdio.web.conf.ts --cucumberOpts.tagExpression='@smoke'

# Run positive tests excluding negative
npx wdio run ./wdio.web.conf.ts --cucumberOpts.tagExpression='@positive and not @negative'

# Run web tests
npx wdio run ./wdio.web.conf.ts --cucumberOpts.tagExpression='@web'
```

## 🔧 Configuration Management

### Main Configuration (wdio.conf.ts)
- **Framework**: Cucumber with TypeScript support
- **Runner**: Local execution with parallel capabilities
- **Capabilities**: Chrome browser configuration
- **Timeouts**: Configurable wait and connection timeouts
- **Reporters**: Spec reporter for console output

### Environment-Specific Configurations
- `wdio.web.conf.ts` - Standard web testing
- `wdio.web.headless.conf.ts` - Headless browser execution
- `wdio.shared.conf.ts` - Shared configuration settings

## 🚀 Advanced Features

### Parallel Execution
```typescript
// Configure parallel execution in wdio.conf.ts
maxInstances: 10, // Run up to 10 parallel instances
```

### Custom Hooks
- **beforeScenario**: Setup before each scenario
- **afterScenario**: Cleanup after each scenario
- **beforeFeature**: Feature-level setup
- **afterFeature**: Feature-level cleanup

### Error Handling
- **Automatic retry** mechanism for flaky tests
- **Screenshot capture** on test failures
- **Detailed error logging** with stack traces

## 📚 Best Practices

### Writing Maintainable Tests
1. **Use descriptive scenario names** that clearly explain the test purpose
2. **Keep scenarios focused** on single functionality
3. **Use meaningful element names** in locators
4. **Implement proper wait strategies** instead of hard waits
5. **Organize tests with appropriate tags** for easy filtering

### Locator Maintenance
1. **Centralize locators** in YAML files
2. **Use stable attributes** (id, data-testid) when possible
3. **Avoid brittle selectors** that depend on DOM structure
4. **Document locator strategies** for team understanding
5. **Regular locator audits** to remove unused selectors

### Code Organization
1. **Separate concerns** between actions and assertions
2. **Reuse common functionality** through utility functions
3. **Maintain consistent naming** conventions
4. **Document complex logic** with clear comments
5. **Regular refactoring** to improve maintainability

## 🤝 Contributing

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/new-feature`)
3. **Commit changes** (`git commit -am 'Add new feature'`)
4. **Push to branch** (`git push origin feature/new-feature`)
5. **Create Pull Request**

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Happy Automation! 🎉**

For questions or support, please refer to the [WebDriverIO Documentation](https://webdriver.io/docs/gettingstarted) or create an issue in this repository.
