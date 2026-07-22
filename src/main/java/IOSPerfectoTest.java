import com.applitools.eyes.BatchInfo;
import com.applitools.eyes.appium.Eyes;
import com.applitools.eyes.appium.Target;
import com.applitools.eyes.config.Configuration;
import io.appium.java_client.ios.IOSDriver;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.net.URL;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

/**
 * Boilerplate iOS test — Applitools NML + Perfecto Real Device
 *
 * This is a starter template: it does not ship with any application. Set APP_ID
 * (and, for Android, APP_PACKAGE / APP_ACTIVITY) to point at your own app, plus
 * the vendor credentials below, then adapt the eyes.check() calls to your app's
 * own screens.
 *
 * ENV VARS:
 *   APPLITOOLS_API_KEY — Applitools API key
 *   APP_ID              — your app's identifier for Perfecto (path/URL/storage reference)
 *   DEVICE_NAME / PLATFORM_VERSION — target device
 */
public class IOSPerfectoTest {

    private static final String APP_ID = System.getenv("APP_ID");

    public static void main(String[] args) throws Exception {

        System.out.println("Test Started — Boilerplate iOS");

        // ── Credentials ─────────────────────────────────────────────────────
        String apiKey          = System.getenv("APPLITOOLS_API_KEY");
        String perfectoCloudName = System.getenv("PERFECTO_CLOUD_NAME");
        String perfectoToken     = System.getenv("PERFECTO_SECURITY_TOKEN");
        String deviceName      = System.getenv("DEVICE_NAME");
        String platformVersion = System.getenv("PLATFORM_VERSION");

        // ── Capabilities ────────────────────────────────────────────────────
        DesiredCapabilities capabilities = new DesiredCapabilities();
        
        capabilities.setCapability("platformName",            "iOS");
        capabilities.setCapability("appium:automationName",   "XCUITest");
        capabilities.setCapability("appium:deviceName",       deviceName);
        capabilities.setCapability("appium:platformVersion",  platformVersion);
        capabilities.setCapability("appium:newCommandTimeout", "300");
        capabilities.setCapability("appium:noReset",          false);
        capabilities.setCapability("appium:app",              APP_ID);

        System.out.println("Capabilities set");

        // ── NML ─────────────────────────────────────────────────────────────
        Eyes.setMobileCapabilities(capabilities, apiKey);

        // ── perfecto:options ────────────────────────────────────────────────
        Map<String, Object> perfectoOptions = new HashMap<>();
        perfectoOptions.put("securityToken", perfectoToken);

        capabilities.setCapability("perfecto:options", perfectoOptions);

        // ── Driver ──────────────────────────────────────────────────────────
        IOSDriver driver = new IOSDriver(
                new URL("https://" + perfectoCloudName + ".perfectomobile.com/nexperience/perfectomobile/wd/hub"),
                capabilities
        );

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        System.out.println("IOSDriver ready");

        // ── Eyes ────────────────────────────────────────────────────────────
        Eyes eyes = new Eyes();

        Configuration config = new Configuration();
        config.setApiKey(apiKey);
        config.setBatch(new BatchInfo("Java Perfecto | Static/Slicing Dynamic | NML | iOS Boilerplate"));
        config.setUseDom(true);
        config.setSendDom(true);
        eyes.setConfiguration(config);

        try {

            // TODO: swap in your own app name/description here.
            eyes.open(
                    driver,
                    "Perfecto iOS App",
                    "iOS App Validation"
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
