# python-appium-nml-android-local

Boilerplate starter — no application is bundled. Point `APP_ID`, `APP_PACKAGE` and `APP_ACTIVITY` at your own app, then adapt the test's `eyes.check()` calls to your app's own screens.

## Environment variables

- `APPLITOOLS_API_KEY`
- `APP_ID` (absolute path)
- `APP_PACKAGE`
- `APP_ACTIVITY`
- `DEVICE_NAME`
- `PLATFORM_VERSION`

## Run

Start a local Appium server (`appium`) and a booted emulator, then:

```
pip install -r requirements.txt
python android_local_test.py
```
