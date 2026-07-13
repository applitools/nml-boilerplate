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

export const config = {

  specs: ['./test/specs/ios/app.ios.test.js'],

  maxInstances: 1,

  hostname: '127.0.0.1',
  port: 4723,
  path: '/',

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

};
