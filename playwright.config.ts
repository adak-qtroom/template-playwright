import { defineConfig, devices } from '@playwright/test';
const RPconfig = {
  apiKey: '!@apikey',
  endpoint: "!@endpoint",
  project: '!@project',
  launch: '!@launch',

  attributes: [
    {
      key: 'Build',
      value: '6.2.172',
    },
    {
      key: 'Platform',
      value: 'WEB',
    },
    {
      value: 'login',
    },
  ],
  description: '!@description',
  includeTestSteps: true ,
  includePlaywrightProjectNameToCodeReference: true
};

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//  reporter: 'html',
reporter: [['@reportportal/agent-js-playwright', RPconfig]],

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure'  },

  /* Configure projects for major browsers */
  projects: [
     {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
   
	},
  ],

});
