import { defineBddConfig } from 'playwright-bdd';

/**
 * BDD Configuration for Playwright
 * Defines how Cucumber features are processed and executed
 */
export const bddConfig = defineBddConfig({
  // Import test fixtures and setup
  importTestFrom: 'tests/support/fixtures.ts',
  
  // Feature files location
  paths: ['tests/features'],
  
  // Step definitions location
  require: [
    'tests/step-definitions/**/*.ts'
  ],
  
  // Output directory for generated test files
  outputDir: '.features-gen',
  
  // Generate test files
  generateTests: true,
  
  // Verbose output
  verbose: false,
  
  // Quote character for step parameters
  quote: '"',
  
  // Enrichment options
  enrichReporterData: true,
  
  // Tags to include/exclude
  tags: process.env.CUCUMBER_TAGS,
  
  // Feature naming convention
  featureNaming: 'kebab-case',
  
  // Step naming convention
  stepNaming: 'camelCase'
});

export default bddConfig;