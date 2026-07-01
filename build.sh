#!/usr/bin/env bash
# build.sh — builds AccessibilityTestUIKit for both simulator and real device
#
# Output (always produced):
#   output/AccessibilityTestUIKit.app          — iOS Simulator (.app)
#   output/AccessibilityTestUIKit-unsigned.ipa — iOS Real Device, unsigned (no developer account needed)
#
# Output (only when a signing identity is found in Keychain):
#   output/AccessibilityTestUIKit-signed.ipa   — iOS Real Device, signed (requires Apple Developer account)
#
# ── Requirements ─────────────────────────────────────────────────────────────
#   - Xcode + command-line tools  (xcode-select --install)
#   - iOS 16 minimum deployment target (already set in project)
#   - Apple Developer account is OPTIONAL:
#       • Without it: use the unsigned IPA with Appium / direct simctl install
#       • With it:    a signed IPA is also produced and can be installed on real devices
#
# Usage:
#   chmod +x build.sh && ./build.sh

set -euo pipefail

PROJECT="AccessibilityTestUIKit.xcodeproj"
SCHEME="AccessibilityTestUIKit"
OUTPUT="$(pwd)/output"

# ── Detect signing ────────────────────────────────────────────────────────────
# Looks for any "Apple Development" or "iPhone Developer" identity in the login keychain.
# If found, we build a signed IPA in addition to the unsigned one.
SIGN_IDENTITY=$(security find-identity -v -p codesigning 2>/dev/null \
  | grep -o '"Apple Development[^"]*"\|"iPhone Developer[^"]*"\|"iPhone Distribution[^"]*"' \
  | head -1 | tr -d '"' || true)

if [ -n "$SIGN_IDENTITY" ]; then
  echo "==> Signing identity found: $SIGN_IDENTITY"
  echo "    A signed IPA will also be produced."
  SIGNING_AVAILABLE=true
else
  echo "==> No signing identity found — producing unsigned IPA only."
  echo "    (Install an Apple Developer certificate to also produce a signed IPA.)"
  SIGNING_AVAILABLE=false
fi

# ── Clean previous output ─────────────────────────────────────────────────────
echo ""
echo "==> Cleaning previous output..."
rm -rf "$OUTPUT/AccessibilityTestUIKit.app"
rm -f  "$OUTPUT/AccessibilityTestUIKit-unsigned.ipa"
rm -f  "$OUTPUT/AccessibilityTestUIKit-signed.ipa"
mkdir -p "$OUTPUT"

# ── 1. Simulator .app ─────────────────────────────────────────────────────────
echo ""
echo "==> Building for iOS Simulator (no signing required)..."
xcodebuild \
  -project "$PROJECT" \
  -scheme "$SCHEME" \
  -configuration Debug \
  -sdk iphonesimulator \
  -destination "generic/platform=iOS Simulator" \
  IPHONEOS_DEPLOYMENT_TARGET=16.0 \
  CONFIGURATION_BUILD_DIR="$OUTPUT" \
  ONLY_ACTIVE_ARCH=NO \
  build \
  2>&1 | grep -E "error:|Build succeeded|Build FAILED" || true

if [ -d "$OUTPUT/AccessibilityTestUIKit.app" ]; then
  echo "✓ Simulator app: output/AccessibilityTestUIKit.app"
else
  echo "✗ Simulator build failed — re-run without grep for full output:"
  echo "  xcodebuild -project $PROJECT -scheme $SCHEME -sdk iphonesimulator build"
  exit 1
fi

# ── 2. Unsigned real-device IPA (works without a developer account) ───────────
echo ""
echo "==> Building unsigned IPA for real device..."

DEVICE_BUILD_DIR="$OUTPUT/iphoneos-build"
rm -rf "$DEVICE_BUILD_DIR"

xcodebuild \
  -project "$PROJECT" \
  -scheme "$SCHEME" \
  -configuration Debug \
  -sdk iphoneos \
  -destination "generic/platform=iOS" \
  IPHONEOS_DEPLOYMENT_TARGET=16.0 \
  CONFIGURATION_BUILD_DIR="$DEVICE_BUILD_DIR" \
  ONLY_ACTIVE_ARCH=NO \
  CODE_SIGN_IDENTITY="" \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGNING_ALLOWED=NO \
  build \
  2>&1 | grep -E "error:|Build succeeded|Build FAILED" || true

if [ ! -d "$DEVICE_BUILD_DIR/AccessibilityTestUIKit.app" ]; then
  echo "✗ Real-device build failed — re-run without grep for full output:"
  echo "  xcodebuild -project $PROJECT -scheme $SCHEME -sdk iphoneos build"
  exit 1
fi

echo "==> Packaging unsigned IPA..."
IPA_STAGE="$OUTPUT/ipa-staging"
rm -rf "$IPA_STAGE"
mkdir -p "$IPA_STAGE/Payload"
cp -R "$DEVICE_BUILD_DIR/AccessibilityTestUIKit.app" "$IPA_STAGE/Payload/"
(cd "$IPA_STAGE" && zip -qr "../AccessibilityTestUIKit-unsigned.ipa" Payload/)
rm -rf "$IPA_STAGE" "$DEVICE_BUILD_DIR"

echo "✓ Unsigned IPA: output/AccessibilityTestUIKit-unsigned.ipa"

# ── 3. Signed real-device IPA (only when a developer account is present) ──────
if [ "$SIGNING_AVAILABLE" = true ]; then
  echo ""
  echo "==> Building signed IPA for real device (using: $SIGN_IDENTITY)..."

  SIGNED_BUILD_DIR="$OUTPUT/iphoneos-signed-build"
  rm -rf "$SIGNED_BUILD_DIR"

  xcodebuild \
    -project "$PROJECT" \
    -scheme "$SCHEME" \
    -configuration Debug \
    -sdk iphoneos \
    -destination "generic/platform=iOS" \
    IPHONEOS_DEPLOYMENT_TARGET=16.0 \
    CONFIGURATION_BUILD_DIR="$SIGNED_BUILD_DIR" \
    ONLY_ACTIVE_ARCH=NO \
    CODE_SIGN_STYLE=Manual \
    CODE_SIGN_IDENTITY="$SIGN_IDENTITY" \
    build \
    2>&1 | grep -E "error:|Build succeeded|Build FAILED" || true

  if [ -d "$SIGNED_BUILD_DIR/AccessibilityTestUIKit.app" ]; then
    IPA_STAGE2="$OUTPUT/ipa-staging-signed"
    rm -rf "$IPA_STAGE2"
    mkdir -p "$IPA_STAGE2/Payload"
    cp -R "$SIGNED_BUILD_DIR/AccessibilityTestUIKit.app" "$IPA_STAGE2/Payload/"
    (cd "$IPA_STAGE2" && zip -qr "../AccessibilityTestUIKit-signed.ipa" Payload/)
    rm -rf "$IPA_STAGE2" "$SIGNED_BUILD_DIR"
    echo "✓ Signed IPA: output/AccessibilityTestUIKit-signed.ipa"
  else
    echo "⚠ Signed build failed — unsigned IPA is still available."
    rm -rf "$SIGNED_BUILD_DIR"
  fi
fi

# ── Summary ───────────────────────────────────────────────────────────────────
echo ""
echo "Done. Output folder:"
ls -lh "$OUTPUT"/*.app "$OUTPUT"/*.ipa 2>/dev/null || ls -lh "$OUTPUT"
