# python-appium-nml-ios-local

Boilerplate starter — no application is bundled. Point `APP_ID` at your own app, then adapt the test's `eyes.check()` calls to your app's own screens.

## Environment variables

- `APPLITOOLS_API_KEY`
- `APP_ID` (absolute path)
- `DEVICE_NAME`
- `PLATFORM_VERSION`

## Run

Start a local Appium server (`appium`) and a booted Simulator, then:

```
pip install -r requirements.txt
python ios_local_test.py
```
