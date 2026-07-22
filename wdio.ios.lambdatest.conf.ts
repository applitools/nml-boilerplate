import 'dotenv/config';
import { ConfigurationPlain, Eyes } from '@applitools/eyes-webdriverio';

const caps = Eyes.setMobileCapabilities<Record<string, unknown>>({
  platformName: 'iOS',
  'appium:app': process.env.APP_ID,
  'appium:deviceName': process.env.DEVICE_NAME || 'iPhone 14',
  'appium:platformVersion': process.env.PLATFORM_VERSION || '17',
  'appium:automationName': 'XCUITest',
  'appium:noReset': false,
  'appium:newCommandTimeout': 300,
}, process.env.APPLITOOLS_API_KEY as ConfigurationPlain);

const ltOptions = {
  user: process.env.LT_USERNAME,
  accessKey: process.env.LT_ACCESS_KEY,
  build: 'Applitools-iOS-NML-Build',
  name: 'Applitools-iOS-NML-Test',
  'appium:deviceName': process.env.DEVICE_NAME,
  'appium:platformVersion': process.env.PLATFORM_VERSION,
  isRealMobile: true,
  devicelog: true,
  visual: true,
  network: true,
  w3c: true,
};

const processArguments = caps['appium:processArguments'];
if (processArguments != null) {
  ltOptions.processArguments = processArguments;
  delete caps['appium:processArguments'];
}

caps['lt:options'] = ltOptions;

export const config: WebdriverIO.Config = {

  specs: ['./test/specs/ios/app_nml_multidevice.ios.test.ts'],

  maxInstances: 1,

  hostname: 'mobile-hub.lambdatest.com',
  port: 443,
  protocol: 'https',
  path: '/wd/hub',

  capabilities: [caps as WebdriverIO.Capabilities],

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

  afterTest: async function (_test, _context, { error }: { error?: Error }) {
    const status = error ? 'failed' : 'passed';
    await browser.execute(`lambda-status=${status}`);
  },
};
