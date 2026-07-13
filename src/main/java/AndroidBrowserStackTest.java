import com.applitools.eyes.BatchInfo;
import com.applitools.eyes.appium.Eyes;
import com.applitools.eyes.appium.Target;
import com.applitools.eyes.config.Configuration;
import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.net.URL;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

/**
 * Boilerplate Android test — Applitools NML + BrowserStack Real Device
 *
 * This is a starter template: it does not ship with any application. Set APP_ID
 * (and, for Android, APP_PACKAGE / APP_ACTIVITY) to point at your own app, plus
 * the vendor credentials below, then adapt the eyes.check() calls to your app's
 * own screens.
 *
 * ENV VARS:
 *   APPLITOOLS_API_KEY — Applitools API key
 *   APP_ID              — your app's identifier for BrowserStack (path/URL/storage reference)
 *   APP_PACKAGE / APP_ACTIVITY — your Android app's package/activity
 *   DEVICE_NAME / PLATFORM_VERSION — target device
 */
public class AndroidBrowserStackTest {

    private static final String APP_ID = System.getenv("APP_ID");
    private static final String APP_PACKAGE  = System.getenv("APP_PACKAGE");
    private static final String APP_ACTIVITY = System.getenv("APP_ACTIVITY");

    public static void main(String[] args) throws Exception {

        System.out.println("Test Started — Boilerplate Android");

        // ── Credentials ─────────────────────────────────────────────────────
        String apiKey          = System.getenv("APPLITOOLS_API_KEY");
        String browserStackUsername = System.getenv("BROWSERSTACK_USERNAME");
        String browserStackAccessKey = System.getenv("BROWSERSTACK_ACCESS_KEY");
        String deviceName      = System.getenv("DEVICE_NAME");
        String platformVersion = System.getenv("PLATFORM_VERSION");

        // ── Capabilities ────────────────────────────────────────────────────
        DesiredCapabilities capabilities = new DesiredCapabilities();
        
        capabilities.setCapability("platformName",              "Android");
        capabilities.setCapability("appium:deviceName",         deviceName);
        capabilities.setCapability("appium:platformVersion",    platformVersion);
        capabilities.setCapability("appium:automationName",     "UiAutomator2");
        capabilities.setCapability("appium:newCommandTimeout",  "300");
        capabilities.setCapability("appium:noReset",            false);
        capabilities.setCapability("appium:app",                APP_ID);
        capabilities.setCapability("appium:appPackage",         APP_PACKAGE);
        capabilities.setCapability("appium:appActivity",        APP_ACTIVITY);

        System.out.println("Capabilities set");

        // ── NML ─────────────────────────────────────────────────────────────
        Eyes.setMobileCapabilities(capabilities, apiKey);
        capabilities.setCapability("appium:processArguments", (Object) null);

        // ── bstack:options ──────────────────────────────────────────────────
        Map<String, Object> bstackOptions = new HashMap<>();
        bstackOptions.put("userName",     browserStackUsername);
        bstackOptions.put("accessKey",    browserStackAccessKey);
        bstackOptions.put("projectName",  "Applitools-Android-NML");
        bstackOptions.put("buildName",    "Applitools-Android-NML-Build");
        bstackOptions.put("sessionName",  "Applitools-Android-NML-Test");

        capabilities.setCapability("bstack:options", bstackOptions);

        // ── Driver ──────────────────────────────────────────────────────────
        AndroidDriver driver = new AndroidDriver(
                new URL("https://hub-cloud.browserstack.com/wd/hub"),
                capabilities
        );

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        System.out.println("AndroidDriver ready");

        // ── Eyes ────────────────────────────────────────────────────────────
        Eyes eyes = new Eyes();

        Configuration config = new Configuration();
        config.setApiKey(apiKey);
        config.setBatch(new BatchInfo("Java BrowserStack | NML | Android Boilerplate"));
        config.setUseDom(true);
        config.setSendDom(true);
        eyes.setConfiguration(config);

        try {

            // TODO: swap in your own app name/description here.
            eyes.open(
                    driver,
                    "BrowserStack Android App",
                    "Android App Validation"
            );
            System.out.println("Eyes open");

            // TODO: replace with checks that make sense for your own app.
            eyes.check("Main Screen", Target.window());
            System.out.println("Checked: Main Screen");

            eyes.check("Main Screen | Fully", Target.window().fully());

            eyes.close();
            System.out.println("Eyes closed");

        } catch (Exception e) {

            eyes.abort();
            System.out.println("Exception — eyes aborted: " + e.getMessage());
            throw e;

        } finally {

            driver.quit();
            System.out.println("Driver quit");
        }
    }
}
