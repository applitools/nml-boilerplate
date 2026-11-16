"""
Boilerplate iOS test — Applitools NML + Local Appium server

This is a starter template: it does not ship with any application. Set APP_ID
to point at your own app, then adapt the eyes.check() calls to your app's own
screens.

ENV VARS:
  APPLITOOLS_API_KEY             — Applitools API key
  APPLITOOLS_SERVER_URL          — optional; defaults to Applitools public cloud if unset
  APP_ID                         — absolute path to your .app (Simulator) or .ipa (device)
  DEVICE_NAME / PLATFORM_VERSION — target device
"""
import os

from appium import webdriver
from appium.options.common import AppiumOptions
from applitools.selenium import BatchInfo, Configuration, Eyes, Target

print("Test Started — Boilerplate iOS")

# ── Credentials ─────────────────────────────────────────────────────────────
api_key = os.getenv("APPLITOOLS_API_KEY")
server_url = os.getenv("APPLITOOLS_SERVER_URL")

# ── Capabilities ────────────────────────────────────────────────────────────
capabilities = {
    "platformName": "iOS",
    "appium:automationName": "XCUITest",
    "appium:deviceName": os.getenv("DEVICE_NAME"),
    "appium:platformVersion": os.getenv("PLATFORM_VERSION"),
    "appium:newCommandTimeout": 300,
    "appium:noReset": False,
    "appium:app": os.getenv("APP_ID"),
}
print("Capabilities set")

# ── NML ─────────────────────────────────────────────────────────────────────
# No vendor options object for a local Appium server.
Eyes.set_mobile_capabilities(capabilities, api_key, server_url)

# ── Driver ──────────────────────────────────────────────────────────────────
driver = webdriver.Remote("http://127.0.0.1:4723",
                          options=AppiumOptions().load_capabilities(capabilities))
driver.implicitly_wait(10)
print("Driver ready")

# ── Eyes ────────────────────────────────────────────────────────────────────
eyes = Eyes()

config = Configuration()
config.set_api_key(api_key)
if server_url:
    config.set_server_url(server_url)
config.set_batch(BatchInfo("Python Local | NML | iOS Boilerplate"))
eyes.set_configuration(config)

try:
    # TODO: swap in your own app name/description here.
    eyes.open(driver, "Local iOS App", "iOS App Validation")
    print("Eyes open")

    # TODO: replace with checks that make sense for your own app.
    eyes.check("Main Screen", Target.window())
    print("Checked: Main Screen")

    eyes.check("Main Screen | Fully", Target.window().fully())

    results = eyes.close(False)
    print("Eyes closed:", results.status, results.url)
finally:
    eyes.abort()
    driver.quit()
    print("Driver quit")
