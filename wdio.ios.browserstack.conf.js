import 'dotenv/config';
import { Eyes } from '@applitools/eyes-webdriverio';

const caps = Eyes.setMobileCapabilities({
  platformName: 'iOS',
  'appium:app': process.env.APP_ID,
  'appium:deviceName': process.env.DEVICE_NAME || 'iPhone 14',
  'appium:platformVersion': process.env.PLATFORM_VERSION || '17',
  'appium:automationName': 'XCUITest',
  'appium:noReset': false,
  'appium:newCommandTimeout': 300,
}, process.env.APPLITOOLS_API_KEY);

delete caps['appium:optionalIntentArguments'];

caps['bstack:options'] = {
  userName: process.env.BROWSERSTACK_USERNAME,
  accessKey: process.env.BROWSERSTACK_ACCESS_KEY,
  projectName: 'Applitools-NML',
  buildName: 'Applitools-iOS-NML-Build',
  sessionName: 'Applitools-iOS-NML-Test',
};

export const config = {

  specs: ['./test/specs/ios/app_nml_multidevice.ios.test.js'],

  maxInstances: 1,

  hostname: 'hub-cloud.browserstack.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',

  capabilities: [caps],

  logLevel: 'info',

  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  services: [],

  framework: 'mocha',

  mochaOpts: {
    timeout: 300000,
  },

  reporters: ['spec'],

  afterTest: async function (test, context, { error }) {
    const status = error ? 'failed' : 'passed';
    await browser.execute(
      `browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"${status}"}}`
    );
  },
};
