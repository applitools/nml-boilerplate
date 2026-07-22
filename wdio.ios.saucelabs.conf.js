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


caps['sauce:options'] = {
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  build: 'Applitools-iOS-NML-Build',
  name: 'Applitools-iOS-NML-Test',
  appiumVersion: 'latest',
};

const region = process.env.SAUCE_REGION || 'us-west-1';

export const config = {

  specs: ['./test/specs/ios/app_nml_multidevice.ios.test.js'],

  maxInstances: 1,

  hostname: `ondemand.${region}.saucelabs.com`,
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
    await browser.execute(`sauce:job-result=${!error}`);
  },
};
