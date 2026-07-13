# java-appium-nml-android-multi-device-browserstack

Boilerplate starter — no application is bundled. Point `APP_ID` (and, for Android, `APP_PACKAGE`/`APP_ACTIVITY`) at your own app, then adapt the test's `eyes.check()` calls to your app's own screens.

## Environment variables

- `APPLITOOLS_API_KEY`
- `BROWSERSTACK_USERNAME`
- `BROWSERSTACK_ACCESS_KEY`
- `APP_ID`
- `APP_PACKAGE`
- `APP_ACTIVITY`
- `DEVICE_NAME`
- `PLATFORM_VERSION`

## Run

```
mvn compile exec:java
```

## Upload application to BrowserStack

```
curl -u "$BROWSERSTACK_USERNAME:$BROWSERSTACK_ACCESS_KEY" \
  -X POST "https://api-cloud.browserstack.com/app-automate/upload" \
  -F "file=@/path/to/YourApp.apk"
```

Response: `{"app_url":"bs://<app_id>"}`
