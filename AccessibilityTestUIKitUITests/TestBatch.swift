import Foundation

// Shared batch id so every UI test class (EyesSDKTests, NMLCaptureTests,
// NMLMultiDeviceCaptureTests) groups into a single batch in the Applitools
// dashboard, instead of each test/class starting its own. Matching the
// BatchInfo *name* alone isn't enough for grouping — the id is what the
// server actually keys on. Override APPLITOOLS_BATCH_ID in CI to get a
// fresh batch per pipeline run instead of one shared across every run.
enum TestBatch {
    static let name = "AccessibilityTestUIKit"
    static let id: String = ProcessInfo.processInfo.environment["APPLITOOLS_BATCH_ID"] ?? UUID().uuidString
}
