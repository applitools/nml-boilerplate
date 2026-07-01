platform :ios, '16.0'

workspace 'AccessibilityTestUIKit'

# App target — NML rendering via the local Applitools_iOS.xcframework (already embedded).
target 'AccessibilityTestUIKit' do
  use_frameworks!
end

# UITest target — Eyes XCUI SDK for visual assertions.
target 'AccessibilityTestUIKitUITests' do
  use_frameworks!
  pod 'EyesXCUI', '10.0.1'
end
