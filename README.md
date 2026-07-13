# typescript-wdio-appium-nml-ios-saucelabs

Boilerplate starter — no application is bundled. Point `APP_ID` (and, for Android, `APP_PACKAGE`/`APP_ACTIVITY`) at your own app, then adapt the test's `eyes.check()` calls to your app's own screens.

## Environment variables

- `APPLITOOLS_API_KEY`
- `SAUCE_USERNAME`
- `SAUCE_ACCESS_KEY`
- `SAUCE_REGION`
- `APP_ID`
- `DEVICE_NAME`
- `PLATFORM_VERSION`

## Run

```
npx wdio run ./wdio.ios.saucelabs.conf.ts
```
