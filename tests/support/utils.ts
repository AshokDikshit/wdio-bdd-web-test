import { Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { TIMEOUTS, PATHS } from './constants';

/**
 * Utility functions for Playwright BDD framework
 */

/**
 * Wait for a specified amount of time
 * @param milliseconds Time to wait in milliseconds
 */
export async function wait(milliseconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

/**
 * Generate a random string
 * @param length Length of the string
 * @param includeNumbers Include numbers in the string
 * @returns Random string
 */
export function generateRandomString(length: number = 10, includeNumbers: boolean = true): string {
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const chars = includeNumbers ? letters + numbers : letters;
  
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate a random email address
 * @param domain Domain for the email (default: 'test.com')
 * @returns Random email address
 */
export function generateRandomEmail(domain: string = 'test.com'): string {
  const username = generateRandomString(8, true).toLowerCase();
  return `${username}@${domain}`;
}

/**
 * Generate a random phone number
 * @param countryCode Country code (default: '+1')
 * @returns Random phone number
 */
export function generateRandomPhoneNumber(countryCode: string = '+1'): string {
  const number = Math.floor(Math.random() * 9000000000) + 1000000000;
  return `${countryCode}${number}`;
}

/**
 * Get current timestamp in ISO format
 * @returns ISO timestamp string
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Get current timestamp for file naming
 * @returns Timestamp string safe for file names
 */
export function getFileTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, '-');
}

/**
 * Create directory if it doesn't exist
 * @param dirPath Directory path
 */
export function ensureDirectoryExists(dirPath: string): void {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Read JSON file
 * @param filePath Path to JSON file
 * @returns Parsed JSON object
 */
export function readJsonFile(filePath: string): any {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    throw new Error(`Failed to read JSON file ${filePath}: ${error}`);
  }
}

/**
 * Write JSON file
 * @param filePath Path to write the file
 * @param data Data to write
 */
export function writeJsonFile(filePath: string, data: any): void {
  try {
    const content = JSON.stringify(data, null, 2);
    ensureDirectoryExists(path.dirname(filePath));
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (error) {
    throw new Error(`Failed to write JSON file ${filePath}: ${error}`);
  }
}

/**
 * Convert string to kebab-case
 * @param str Input string
 * @returns Kebab-case string
 */
export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 * Convert string to camelCase
 * @param str Input string
 * @returns CamelCase string
 */
export function toCamelCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
    .replace(/^[A-Z]/, char => char.toLowerCase());
}

/**
 * Convert string to PascalCase
 * @param str Input string
 * @returns PascalCase string
 */
export function toPascalCase(str: string): string {
  const camelCase = toCamelCase(str);
  return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
}

/**
 * Sanitize string for file names
 * @param str Input string
 * @returns Sanitized string
 */
export function sanitizeFileName(str: string): string {
  return str.replace(/[^a-zA-Z0-9-_]/g, '-').replace(/-+/g, '-');
}

/**
 * Check if string is a valid URL
 * @param str String to check
 * @returns True if valid URL
 */
export function isValidUrl(str: string): boolean {
  try {
    new URL(str);
    return true;
  } catch {
    return false;
  }
}

/**
 * Check if string is a valid email
 * @param str String to check
 * @returns True if valid email
 */
export function isValidEmail(str: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(str);
}

/**
 * Retry a function with exponential backoff
 * @param fn Function to retry
 * @param maxRetries Maximum number of retries
 * @param delay Initial delay in milliseconds
 * @returns Result of the function
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (i === maxRetries) {
        throw lastError;
      }
      
      const backoffDelay = delay * Math.pow(2, i);
      await wait(backoffDelay);
    }
  }
  
  throw lastError!;
}

/**
 * Get environment variable with default value
 * @param name Environment variable name
 * @param defaultValue Default value if not set
 * @returns Environment variable value or default
 */
export function getEnvVar(name: string, defaultValue: string = ''): string {
  return process.env[name] || defaultValue;
}

/**
 * Get boolean environment variable
 * @param name Environment variable name
 * @param defaultValue Default value if not set
 * @returns Boolean value
 */
export function getBooleanEnvVar(name: string, defaultValue: boolean = false): boolean {
  const value = process.env[name];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true';
}

/**
 * Get numeric environment variable
 * @param name Environment variable name
 * @param defaultValue Default value if not set
 * @returns Numeric value
 */
export function getNumericEnvVar(name: string, defaultValue: number = 0): number {
  const value = process.env[name];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Log message with timestamp and level
 * @param message Message to log
 * @param level Log level
 */
export function log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
  const timestamp = getCurrentTimestamp();
  const logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  
  switch (level) {
    case 'warn':
      console.warn(logMessage);
      break;
    case 'error':
      console.error(logMessage);
      break;
    default:
      console.log(logMessage);
  }
}

/**
 * Take screenshot with Playwright page
 * @param page Playwright page instance
 * @param filename Optional filename
 * @returns Screenshot filename
 */
export async function takeScreenshot(page: Page, filename?: string): Promise<string> {
  const timestamp = getFileTimestamp();
  const screenshotName = filename || `screenshot-${timestamp}.png`;
  const screenshotPath = path.join(PATHS.SCREENSHOTS, screenshotName);
  
  ensureDirectoryExists(PATHS.SCREENSHOTS);
  
  await page.screenshot({
    path: screenshotPath,
    fullPage: true
  });
  
  return screenshotName;
}