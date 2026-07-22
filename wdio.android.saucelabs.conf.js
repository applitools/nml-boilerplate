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


caps['sauce:options'] = {
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  build: 'Applitools-Android-NML-Build',
  name: 'Applitools-Android-NML-Test',
  appiumVersion: 'latest',
};

const region = process.env.SAUCE_REGION || 'us-west-1';

export const config = {

  specs: ['./test/specs/android/app_nml_multidevice.android.test.js'],

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
