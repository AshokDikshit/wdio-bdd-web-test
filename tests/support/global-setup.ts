import { chromium, FullConfig } from '@playwright/test';

/**
 * Global setup for Playwright tests
 * Runs once before all tests
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global setup for Playwright tests...');
  
  // Create necessary directories
  const fs = require('fs');
  const path = require('path');
  
  const dirs = [
    './reports',
    './screenshots', 
    './test-results',
    './test-results-headless',
    './logs'
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }
  });
  
  // Optional: Warm up browser for faster test execution
  if (process.env.WARM_UP_BROWSER === 'true') {
    console.log('🔥 Warming up browser...');
    const browser = await chromium.launch();
    await browser.close();
    console.log('✅ Browser warmed up');
  }
  
  console.log('✅ Global setup completed');
}

export default globalSetup;