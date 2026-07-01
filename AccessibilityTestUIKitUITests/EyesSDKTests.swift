import XCTest
import EyesXCUI

// Eyes XCUITest SDK – pixel screenshot capture (no NML).
final class EyesSDKTests: XCTestCase {

    private var app: XCUIApplication!
    private var eyes: Eyes!

    override func setUpWithError() throws {
        continueAfterFailure = false
        app = XCUIApplication()
        app.launch()

        let batch: BatchInfo = BatchInfo(name: "Accessibility | XCUITest | Eyes SDK")
        batch.batchId = TestBatch.id

        let config = Configuration()
        config.batch = batch
        config.apiKey = ProcessInfo.processInfo.environment["APPLITOOLS_API_KEY"] ?? ""

        eyes = Eyes()
        eyes.configuration = config
        eyes.open(withApplicationName: "AccessibilityTestUIKit", testName: "Eyes SDK")
    }

    override func tearDownWithError() throws {
        try eyes.close()
    }

    // Captures the initial screen exactly as the app launches.
    func testDefaultState() throws {
        eyes.checkWindow(withTag:"Initial screen")

        // Query across all element types since XCUITest inconsistently
        // classifies this row as either "Other" or "StaticText".
        let screenReaderRow = app.descendants(matching: .any)
            .matching(NSPredicate(format: "label BEGINSWITH 'Screen reader.'"))
            .firstMatch
        XCTAssertTrue(screenReaderRow.waitForExistence(timeout: 5))
        screenReaderRow.tap()
        eyes.checkWindow(withTag:"Screen reader row toggled on")

        app.buttons["Standard priority"].tap()
        eyes.checkWindow(withTag:"Standard priority selected")

        let field = app.textFields["Tester name"]
        field.tap()
        field.typeText("Shreya")
        eyes.checkWindow(withTag:"Tester name entered")

        // Dismiss the keyboard so it doesn't cover "Start accessibility test"
        // further down the screen.
        app.keyboards.buttons["Done"].tap()

        app.buttons["Start accessibility test"].tap()

        // "Start accessibility test" triggers a brief 0.1s UIView.animate
        // pulse; tapping immediately afterward can hit-test mid-animation.
        Thread.sleep(forTimeInterval: 0.3)

        app.buttons["Reset accessibility test form"].tap()
        eyes.checkWindow(withTag:"After reset")
    }

}
