/**
 * Constants for Playwright BDD framework
 * Centralized configuration values and constants
 */

// Timeout constants (in milliseconds)
export const TIMEOUTS = {
  SHORT: 5000,
  MEDIUM: 10000,
  LONG: 30000,
  EXTRA_LONG: 60000,
  
  // Specific action timeouts
  CLICK: 5000,
  TYPE: 5000,
  NAVIGATION: 30000,
  ELEMENT_WAIT: 10000,
  PAGE_LOAD: 30000,
  API_RESPONSE: 15000
} as const;

// Retry constants
export const RETRY = {
  COUNT: 3,
  DELAY: 1000,
  BACKOFF_FACTOR: 2
} as const;

// Viewport sizes
export const VIEWPORTS = {
  MOBILE: { width: 375, height: 667 },
  TABLET: { width: 768, height: 1024 },
  DESKTOP: { width: 1920, height: 1080 },
  LARGE_DESKTOP: { width: 2560, height: 1440 }
} as const;

// Browser configurations
export const BROWSERS = {
  CHROMIUM: 'chromium',
  FIREFOX: 'firefox',
  WEBKIT: 'webkit'
} as const;

// Element states
export const ELEMENT_STATES = {
  VISIBLE: 'visible',
  HIDDEN: 'hidden',
  ATTACHED: 'attached',
  DETACHED: 'detached',
  ENABLED: 'enabled',
  DISABLED: 'disabled'
} as const;

// Wait conditions
export const WAIT_CONDITIONS = {
  LOAD: 'load',
  DOM_CONTENT_LOADED: 'domcontentloaded',
  NETWORK_IDLE: 'networkidle'
} as const;

// File paths
export const PATHS = {
  SCREENSHOTS: './screenshots',
  REPORTS: './reports',
  TEST_RESULTS: './test-results',
  FEATURES: './tests/features',
  STEP_DEFINITIONS: './tests/step-definitions',
  SUPPORT: './tests/support',
  LOCATORS: './tests/locators'
} as const;

// Test data
export const TEST_DATA = {
  DEFAULT_USER: {
    username: 'standard_user',
    password: 'secret_sauce'
  },
  INVALID_USER: {
    username: 'invalid_user',
    password: 'invalid_password'
  }
} as const;

// Error messages
export const ERROR_MESSAGES = {
  ELEMENT_NOT_FOUND: 'Element not found',
  ELEMENT_NOT_VISIBLE: 'Element is not visible',
  ELEMENT_NOT_CLICKABLE: 'Element is not clickable',
  TIMEOUT_EXCEEDED: 'Timeout exceeded',
  NAVIGATION_FAILED: 'Navigation failed',
  ASSERTION_FAILED: 'Assertion failed'
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  ELEMENT_FOUND: 'Element found successfully',
  ACTION_COMPLETED: 'Action completed successfully',
  NAVIGATION_SUCCESS: 'Navigation completed successfully',
  ASSERTION_PASSED: 'Assertion passed'
} as const;

// Regular expressions
export const REGEX_PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[\+]?[1-9][\d]{0,15}$/,
  URL: /^https?:\/\/.+/,
  NUMBER: /^\d+$/,
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/
} as const;

// Keyboard keys
export const KEYS = {
  ENTER: 'Enter',
  TAB: 'Tab',
  ESCAPE: 'Escape',
  SPACE: 'Space',
  BACKSPACE: 'Backspace',
  DELETE: 'Delete',
  ARROW_UP: 'ArrowUp',
  ARROW_DOWN: 'ArrowDown',
  ARROW_LEFT: 'ArrowLeft',
  ARROW_RIGHT: 'ArrowRight',
  HOME: 'Home',
  END: 'End',
  PAGE_UP: 'PageUp',
  PAGE_DOWN: 'PageDown'
} as const;

// HTTP status codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
} as const;

// Environment names
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  STAGING: 'staging',
  PRODUCTION: 'production',
  LOCAL: 'local'
} as const;

// Test tags
export const TAGS = {
  SMOKE: '@smoke',
  REGRESSION: '@regression',
  POSITIVE: '@positive',
  NEGATIVE: '@negative',
  WEB: '@web',
  MOBILE: '@mobile',
  API: '@api'
} as const;