/**
 * Support utilities index file
 * Exports all support utilities for easy importing
 */

// Core utilities
export { CommonUIUtils } from './commonUtils';
export { UIActions } from './uiActions';
export { UIAssertions } from './uiAssertions';
export { LocatorManager } from './locatorManager';

// Test fixtures and world
export { test, expect, TestFixtures } from './fixtures';
export { CustomWorld } from './world';

// Configuration and environment
export { getTestEnvironment, getEnvironmentConfig, TestEnvironment } from './env';
export * from './constants';
export * from './types';
export * as utils from './utils';

// Report generation
export { generateReport } from './generate-cucumber-report';

// Global setup and teardown
export { default as globalSetup } from './global-setup';
export { default as globalTeardown } from './global-teardown';

// Hooks
export * from './hooks';

/**
 * Re-export commonly used Playwright types
 */
export type {
  Page,
  BrowserContext,
  Browser,
  Locator,
  ElementHandle,
  Response,
  Request
} from '@playwright/test';

/**
 * Re-export Cucumber types
 */
export type {
  World,
  IWorldOptions,
  DataTable
} from '@cucumber/cucumber';