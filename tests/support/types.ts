import { Page, Locator } from '@playwright/test';

/**
 * Common types for Playwright BDD framework
 */

export interface ElementIdentifier {
  name: string;
  type?: string;
  selector?: string;
}

export interface LocatorInfo {
  selector: string;
  category: string;
  description?: string;
}

export interface WaitOptions {
  timeout?: number;
  state?: 'visible' | 'hidden' | 'attached' | 'detached';
}

export interface ActionOptions {
  timeout?: number;
  force?: boolean;
  noWaitAfter?: boolean;
}

export interface NavigationOptions {
  timeout?: number;
  waitUntil?: 'load' | 'domcontentloaded' | 'networkidle';
}

export interface AssertionOptions {
  timeout?: number;
  message?: string;
}

export interface ScreenshotOptions {
  path?: string;
  fullPage?: boolean;
  clip?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface FormData {
  [key: string]: string | number | boolean;
}

export interface TestData {
  [key: string]: any;
}

export interface BrowserCapabilities {
  browserName: string;
  browserVersion?: string;
  platformName?: string;
  headless?: boolean;
}

export interface TestContext {
  page: Page;
  baseUrl: string;
  testData?: TestData;
  capabilities?: BrowserCapabilities;
}

export interface StepDefinitionContext {
  page: Page;
  locator: (selector: string) => Locator;
  navigate: (url: string) => Promise<void>;
  waitFor: (selector: string, options?: WaitOptions) => Promise<void>;
  click: (selector: string, options?: ActionOptions) => Promise<void>;
  type: (selector: string, text: string, options?: ActionOptions) => Promise<void>;
  screenshot: (options?: ScreenshotOptions) => Promise<Buffer>;
}

export interface LocatorStrategy {
  id: (value: string) => string;
  className: (value: string) => string;
  text: (value: string) => string;
  placeholder: (value: string) => string;
  dataTestId: (value: string) => string;
  xpath: (value: string) => string;
  css: (value: string) => string;
}

export interface ElementState {
  visible: boolean;
  enabled: boolean;
  selected?: boolean;
  text?: string;
  value?: string;
}

export interface ApplicationType {
  type: 'web' | 'mobile' | 'desktop';
  platform?: 'android' | 'ios' | 'windows' | 'macos' | 'linux';
  browser?: 'chromium' | 'firefox' | 'webkit';
}

export interface TestConfiguration {
  application: ApplicationType;
  environment: string;
  baseUrl: string;
  timeout: {
    action: number;
    navigation: number;
    assertion: number;
  };
  retry: {
    count: number;
    delay: number;
  };
  screenshot: {
    onFailure: boolean;
    onSuccess: boolean;
    path: string;
  };
  video: {
    enabled: boolean;
    path: string;
  };
  trace: {
    enabled: boolean;
    path: string;
  };
}