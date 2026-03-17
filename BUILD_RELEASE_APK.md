# Build Release APK for React Native

## Prerequisites
- Android Studio installed
- Java Development Kit (JDK) installed
- Android SDK configured

## Step 1: Generate Signing Key

First, you need to generate a private signing key. Run this command in your terminal:

```bash
cd android/app
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

**You'll be asked for:**
- Keystore password (remember this!)
- Key password (remember this!)
- Your name
- Organizational unit
- Organization name
- City/Locality
- State/Province
- Country code

**IMPORTANT:** Save these passwords securely! You'll need them to sign future updates.

## Step 2: Setup Gradle Variables

Create or edit `android/gradle.properties` and add:

```properties
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=your_keystore_password
MYAPP_RELEASE_KEY_PASSWORD=your_key_password
```

**IMPORTANT:** Add `gradle.properties` to `.gitignore` to keep passwords secure!

## Step 3: Configure Gradle Signing

Edit `android/app/build.gradle` and add the signing configuration:

```gradle
android {
    ...
    defaultConfig { ... }
    
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_RELEASE_STORE_FILE')) {
                storeFile file(MYAPP_RELEASE_STORE_FILE)
                storePassword MYAPP_RELEASE_STORE_PASSWORD
                keyAlias MYAPP_RELEASE_KEY_ALIAS
                keyPassword MYAPP_RELEASE_KEY_PASSWORD
            }
        }
    }
    
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled enableProguardInReleaseBuilds
            proguardFiles getDefaultProguardFile("proguard-android.txt"), "proguard-rules.pro"
        }
    }
}
```

## Step 4: Build the Release APK

### Option A: Using Gradle Command (Recommended)

```bash
cd android
./gradlew assembleRelease
```

### Option B: Using React Native CLI

```bash
npx react-native build-android --mode=release
```

## Step 5: Find Your APK

The release APK will be located at:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Step 6: Test the Release APK

Install on a device:
```bash
adb install android/app/build/outputs/apk/release/app-release.apk
```

## Alternative: Build AAB (Android App Bundle) for Play Store

For Google Play Store, you should build an AAB instead:

```bash
cd android
./gradlew bundleRelease
```

The AAB will be at:
```
android/app/build/outputs/bundle/release/app-release.aab
```

## Troubleshooting

### Error: "Execution failed for task ':app:packageRelease'"
- Make sure signing config is correct
- Check that keystore file exists
- Verify passwords are correct

### Error: "SDK location not found"
Create `android/local.properties`:
```properties
sdk.dir=/Users/YOUR_USERNAME/Library/Android/sdk
```

### Error: "Could not find or load main class org.gradle.wrapper.GradleWrapperMain"
```bash
cd android
gradle wrapper
```

### APK Size Too Large
Enable ProGuard and reduce APK size:
```gradle
def enableProguardInReleaseBuilds = true
def enableSeparateBuildPerCPUArchitecture = true
```

## Quick Commands Reference

```bash
# Generate keystore
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Build release APK
cd android && ./gradlew assembleRelease

# Build release AAB (for Play Store)
cd android && ./gradlew bundleRelease

# Install APK on device
adb install android/app/build/outputs/apk/release/app-release.apk

# Clean build
cd android && ./gradlew clean

# Build with specific variant
./gradlew assembleDevRelease  # if you have dev/prod variants
```

## Security Best Practices

1. **Never commit keystore files to Git**
   - Add to `.gitignore`:
     ```
     *.keystore
     gradle.properties
     ```

2. **Backup your keystore**
   - Store in a secure location
   - You cannot recover it if lost!

3. **Use environment variables for CI/CD**
   ```bash
   export MYAPP_RELEASE_STORE_PASSWORD=xxx
   export MYAPP_RELEASE_KEY_PASSWORD=xxx
   ```

## Version Management

Update version in `android/app/build.gradle`:

```gradle
android {
    defaultConfig {
        versionCode 1      // Increment for each release
        versionName "1.0.0" // Semantic versioning
    }
}
```

## Next Steps After Building

1. **Test thoroughly** on multiple devices
2. **Check APK size** - Should be reasonable
3. **Verify signing** - APK should be signed
4. **Test installation** - Install on clean device
5. **Upload to Play Store** (if using AAB)
