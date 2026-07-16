## Native Mobile Library — Boilerplate

Branches are named by test vendor/environment, then language, framework, and platform:

```
<vendor-or-local>/<language>-<framework>-<platform>[-multi-device]
```

### Boilerplate vs. Plug-and-Play

This repository holds the **boilerplate** variants — plain vendor name, e.g. `browserstack/javascript-wdio-appium-ios`. Each is a starter template with no application bundled: add your credentials and point `APP_ID` (and, for Android, `APP_PACKAGE`/`APP_ACTIVITY`) at your own app, then adapt the test to your own screens.

The **plug-and-play** variants (`-plug-and-play` suffix on the vendor, e.g. `browserstack-plug-and-play/javascript-wdio-appium-ios`) — where you just add credentials to `.env` and run against a sample app already wired in — live in a separate repo: **[applitools/nml-plug-and-play](https://github.com/applitools/nml-plug-and-play)**.

> **Note:** `lambdatest/java-appium-ios`, `lambdatest/java-appium-ios-multi-device`, `lambdatest/java-appium-android`, and `lambdatest/java-appium-android-multi-device` don't exist as boilerplate — only their `lambdatest-plug-and-play/...` counterparts do (in the nml-plug-and-play repo).

### Sample Applications

Sample applications (iOS Native and Android Native) are available in the **main** branch:

- `static_instrumented_sample_application/` — ready to use as-is. These apps are already statically instrumented with the Applitools SDK, so no extra setup is needed.
- `SampleApplication/Applitcation1-accessibility-app` and `SampleApplication/Application2-analyticsx-app` — Accessibility and AnalyticsX sample apps (iOS Native, Android Native) that must be dynamically instrumented before use. See the [iOS](https://applitools.com/docs/eyes/concepts/best-practices/native-mobile-library#ios_dynamic) and [Android](https://applitools.com/docs/eyes/concepts/best-practices/native-mobile-library#android_dynamic) dynamic instrumentation guides.

These are provided as a reference for wiring your own app into the boilerplate tests; unlike the plug-and-play repo, the boilerplate branches themselves don't point at these sample apps by default.

### Java Appium — iOS

  local/java-appium-ios

  local/java-appium-ios-multi-device

  perfecto/java-appium-ios

  perfecto/java-appium-ios-multi-device

  saucelabs/java-appium-ios

  saucelabs/java-appium-ios-multi-device

  browserstack/java-appium-ios

  browserstack/java-appium-ios-multi-device

### Java Appium — Android

  local/java-appium-android

  local/java-appium-android-multi-device

  perfecto/java-appium-android

  perfecto/java-appium-android-multi-device

  saucelabs/java-appium-android

  saucelabs/java-appium-android-multi-device

  browserstack/java-appium-android

  browserstack/java-appium-android-multi-device

### JavaScript WDIO Appium — iOS

  local/javascript-wdio-appium-ios

  local/javascript-wdio-appium-ios-multi-device

  lambdatest/javascript-wdio-appium-ios

  lambdatest/javascript-wdio-appium-ios-multi-device

  perfecto/javascript-wdio-appium-ios

  perfecto/javascript-wdio-appium-ios-multi-device

  saucelabs/javascript-wdio-appium-ios

  saucelabs/javascript-wdio-appium-ios-multi-device

  browserstack/javascript-wdio-appium-ios

  browserstack/javascript-wdio-appium-ios-multi-device

### JavaScript WDIO Appium — Android

  local/javascript-wdio-appium-android

  local/javascript-wdio-appium-android-multi-device

  lambdatest/javascript-wdio-appium-android

  lambdatest/javascript-wdio-appium-android-multi-device

  perfecto/javascript-wdio-appium-android

  perfecto/javascript-wdio-appium-android-multi-device

  saucelabs/javascript-wdio-appium-android

  saucelabs/javascript-wdio-appium-android-multi-device

  browserstack/javascript-wdio-appium-android

  browserstack/javascript-wdio-appium-android-multi-device

### TypeScript WDIO Appium — iOS

  local/typescript-wdio-appium-ios

  local/typescript-wdio-appium-ios-multi-device

  lambdatest/typescript-wdio-appium-ios

  lambdatest/typescript-wdio-appium-ios-multi-device

  perfecto/typescript-wdio-appium-ios

  perfecto/typescript-wdio-appium-ios-multi-device

  saucelabs/typescript-wdio-appium-ios

  saucelabs/typescript-wdio-appium-ios-multi-device

  browserstack/typescript-wdio-appium-ios

  browserstack/typescript-wdio-appium-ios-multi-device

### TypeScript WDIO Appium — Android

  local/typescript-wdio-appium-android

  local/typescript-wdio-appium-android-multi-device

  lambdatest/typescript-wdio-appium-android

  lambdatest/typescript-wdio-appium-android-multi-device

  perfecto/typescript-wdio-appium-android

  perfecto/typescript-wdio-appium-android-multi-device

  saucelabs/typescript-wdio-appium-android

  saucelabs/typescript-wdio-appium-android-multi-device

  browserstack/typescript-wdio-appium-android

  browserstack/typescript-wdio-appium-android-multi-device

### Maestro

  maestro-local/ios-nml-workaround

Maestro does not support direct Eyes SDK integration or Appium, so its NML support is a workaround built on the Maestro runner rather than a native integration like the suites above.

### Native (no Appium/NML)

  espresso-local/android-test-xmllayout — Android Espresso test against an XML-layout app.

  xcuitest-local/ios-uikit — iOS XCUITest against a UIKit app.

> These three branches (Maestro, Espresso, XCUITest) don't have a boilerplate/plug-and-play split — they're kept identically in both this repo and [applitools/nml-plug-and-play](https://github.com/applitools/nml-plug-and-play).
