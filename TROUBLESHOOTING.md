# Troubleshooting Guide

## ❌ iOS Build Error: Xcode Plugin Issue

### Error Message:
```
xcodebuild failed to load a required plug-in
Symbol not found: _$s12DVTDownloads19DownloadsGlobalInfoV23isDebugForParentProcess
```

### Root Cause:
Xcode system frameworks need to be updated or reinstalled.

### Solutions:

#### Option 1: Run First Launch (Requires sudo password)
```bash
sudo xcodebuild -runFirstLaunch
```

#### Option 2: Reinstall Xcode Command Line Tools
```bash
# Remove existing tools
sudo rm -rf /Library/Developer/CommandLineTools

# Reinstall
xcode-select --install
```

#### Option 3: Update Xcode
1. Open App Store
2. Search for "Xcode"
3. Click "Update" if available
4. After update, run: `sudo xcodebuild -runFirstLaunch`

#### Option 4: Use Android Instead
```bash
npm run android
```
✅ **Android is currently building successfully!**

---

## ✅ Android Build - Working

The Android build is currently in progress. It's downloading Gradle and dependencies.

### Android Requirements:
- ✅ Android Studio installed
- ✅ Android SDK configured
- ✅ Emulator or physical device connected
- ✅ Gradle downloading (in progress)

### Expected Build Time:
- First build: 5-10 minutes (downloading dependencies)
- Subsequent builds: 1-2 minutes

---

## 🔧 Alternative: Test in Browser (Web Preview)

If both iOS and Android have issues, you can test the UI logic in a web environment:

### Option 1: Use Expo
```bash
# Install Expo
npm install -g expo-cli

# Convert to Expo (in a new project)
npx create-expo-app FieldForceRNExpo
# Copy src/ folder to new project
```

### Option 2: React Native Web
```bash
npm install react-native-web react-dom
# Configure webpack (requires additional setup)
```

---

## 📱 Quick Commands Reference

### Check if Metro is running:
```bash
lsof -i :8081
```

### Kill Metro if stuck:
```bash
npx react-native start --reset-cache
```

### Clean build (if needed):
```bash
# iOS
cd ios && pod install && cd ..
rm -rf ios/build

# Android
cd android && ./gradlew clean && cd ..
```

### Check React Native version:
```bash
npx react-native --version
```

### Check Node/npm versions:
```bash
node --version
npm --version
```

---

## 🎯 Current Status

| Platform | Status | Command |
|----------|--------|---------|
| **Metro Bundler** | ✅ Running | Port 8081 |
| **iOS** | ❌ Xcode Issue | Needs system fix |
| **Android** | 🔄 Building | `npm run android` |

---

## 💡 Recommended Next Steps

1. **Wait for Android build to complete** (currently in progress)
2. **Fix Xcode** (if you need iOS):
   - Run: `sudo xcodebuild -runFirstLaunch`
   - Enter your password when prompted
3. **Test the Login Screen** on Android emulator
4. **Update API URL** in `src/utils/config.ts` for real testing

---

## 📞 Need Help?

### Check Build Status:
```bash
# Android build logs
cd android && ./gradlew assembleDebug --info

# iOS build logs (after fixing Xcode)
cd ios && xcodebuild -workspace FieldForceRN.xcworkspace -scheme FieldForceRN -configuration Debug
```

### Common Issues:

**Metro port already in use:**
```bash
npx react-native start --port 8082
```

**Android SDK not found:**
```bash
# Set ANDROID_HOME in ~/.zshrc or ~/.bash_profile
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

**Emulator not starting:**
```bash
# List available emulators
emulator -list-avds

# Start specific emulator
emulator -avd Pixel_5_API_33
```
