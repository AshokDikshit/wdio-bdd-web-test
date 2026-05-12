/**
 * Playwright BDD Hooks
 * Note: Playwright BDD handles browser lifecycle through fixtures
 * These hooks are mainly for logging and cleanup
 */
import { Before, After } from '@cucumber/cucumber';

/**
 * Before each scenario - handled by Playwright fixtures
 */
Before(async function (scenario) {
  console.log(`🧪 Starting scenario: ${scenario.pickle.name}`);
});

/**
 * After each scenario - for logging and cleanup
 */
After(async function (scenario) {
  const scenarioName = scenario.pickle.name;
  const scenarioStatus = scenario.result?.status;
  
  if (scenarioStatus === 'FAILED') {
    console.log(`❌ Scenario failed: ${scenarioName}`);
    // Screenshot is automatically taken by Playwright on failure
    console.log('📷 Screenshot automatically saved by Playwright');
  } else {
    console.log(`✅ Scenario passed: ${scenarioName}`);
  }
});


