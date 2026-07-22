import 'dotenv/config';
import { Eyes } from '@applitools/eyes-webdriverio';

const caps = Eyes.setMobileCapabilities({
  platformName: 'Android',
  'appium:app': process.env.APP_ID,
  'appium:appPackage': process.env.APP_PACKAGE,
  'appium:appActivity': process.env.APP_ACTIVITY,
  'appium:deviceName': process.env.DEVICE_NAME || 'Samsung Galaxy S23',
  'appium:platformVersion': process.env.PLATFORM_VERSION || '13',
  'appium:automationName': 'UiAutomator2',
  'appium:noReset': false,
  'appium:newCommandTimeout': 300,
}, process.env.APPLITOOLS_API_KEY);

const ltOptions = {
  user: process.env.LT_USERNAME,
  accessKey: process.env.LT_ACCESS_KEY,
  build: 'Applitools-Android-NML-Build',
  name: 'Applitools-Android-NML-Test',
  'appium:deviceName': process.env.DEVICE_NAME,
  'appium:platformVersion': process.env.PLATFORM_VERSION,
  isRealMobile: true,
  devicelog: true,
  visual: true,
  network: true,
  w3c: true,
};

const optionalIntentArguments = caps['appium:optionalIntentArguments'];
if (optionalIntentArguments != null) {
  ltOptions.optionalIntentArguments = optionalIntentArguments;
  delete caps['appium:optionalIntentArguments'];
}

caps['lt:options'] = ltOptions;

export const config = {

  specs: ['./test/specs/android/app_nml_multidevice.android.test.js'],

  maxInstances: 1,

  hostname: 'mobile-hub.lambdatest.com',
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
    await browser.execute(`lambda-status=${status}`);
  },
};
