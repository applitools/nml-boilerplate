import { Eyes, Target, BatchInfo, Configuration } from '@applitools/eyes-webdriverio';

describe('App NML - LambdaTest', () => {
  let eyes;

  before(async () => {
    eyes = new Eyes();
    const config = new Configuration();
    config.setUseDom(true);
    config.setSendDom(true);
    config.addMultiDeviceTarget("iPhone 11 Pro", "iPhone 13");
    eyes.setConfiguration(config);

    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);
    eyes.setBatch(new BatchInfo('TS LambdaTest | Static/Slicing Dynamic | NML | iOS Boilerplate | Multi Device'));

    // TODO: swap in your own app name/description here.
    await eyes.open(browser, 'LambdaTest iOS App', 'iOS App Validation');
    console.log('Eyes open');
  });

  after(async () => {
    await eyes.abortIfNotClosed();
  });

  it('validates the app main screen', async () => {
    // TODO: replace with checks that make sense for your own app.
    await eyes.check('Main Screen', Target.window());
    console.log('Checked: Main Screen');

    await eyes.check('Main Screen | Fully', Target.window().fully());

    await eyes.close(false);
    console.log('Eyes closed');
  });
});
