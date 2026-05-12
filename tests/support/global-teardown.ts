import { FullConfig } from '@playwright/test';

/**
 * Global teardown for Playwright tests
 * Runs once after all tests
 */
async function globalTeardown(config: FullConfig) {
  console.log('🧹 Starting global teardown...');
  
  // Generate final test report
  try {
    const reportGenerator = require('./generate-cucumber-report');
    if (typeof reportGenerator.generateReport === 'function') {
      await reportGenerator.generateReport();
      console.log('📊 Test report generated successfully');
    }
  } catch (error) {
    console.log('⚠️  Could not generate final report:', error);
  }
  
  // Clean up temporary files if needed
  const fs = require('fs');
  const path = require('path');
  
  // Optional: Clean up old screenshots (keep only recent ones)
  if (process.env.CLEANUP_OLD_SCREENSHOTS === 'true') {
    try {
      const screenshotsDir = './screenshots';
      if (fs.existsSync(screenshotsDir)) {
        const files = fs.readdirSync(screenshotsDir);
        const now = Date.now();
        const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
        
        files.forEach((file: string) => {
          const filePath = path.join(screenshotsDir, file);
          const stats = fs.statSync(filePath);
          if (now - stats.mtime.getTime() > maxAge) {
            fs.unlinkSync(filePath);
            console.log(`🗑️  Cleaned up old screenshot: ${file}`);
          }
        });
      }
    } catch (error) {
      console.log('⚠️  Could not clean up old screenshots:', error);
    }
  }
  
  console.log('✅ Global teardown completed');
}

export default globalTeardown;