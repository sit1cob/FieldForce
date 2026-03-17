# FieldForce RN - Quick Start Guide

## ✅ Setup Complete!

Your React Native app is ready with the Login Screen implementation matching the Android app.

## 📥 Download Builds

### iOS (TestFlight)

https://testflight.apple.com/join/zNq65UEF

### Android

https://i.diawi.com/nXEG8F

## 🚀 Run the App Now

Metro bundler is already running. Open a **new terminal** and run:

### For iOS (requires Xcode):
```bash
cd /Users/sjena/Documents/DeepDive/TechHub/FieldForce/FieldForceRN
npm run ios
```

### For Android (requires Android Studio):
```bash
cd /Users/sjena/Documents/DeepDive/TechHub/FieldForce/FieldForceRN
npm run android
```

## 📱 What You'll See

1. **Login Screen** with:
   - FieldForce logo (blue icon)
   - Username input field
   - Password input field with show/hide toggle
   - LOGIN button
   - Version 1.0.0 at bottom

2. **After Login** (mock):
   - Dashboard screen with logout button

## ⚙️ Before Testing with Real API

Update the API URL in `src/utils/config.ts`:
```typescript
export const API_CONFIG = {
  BASE_URL: 'https://your-actual-api-url.com',
  TIMEOUT: 30000,
};
```

## 📂 Project Structure

```
FieldForceRN/
├── src/
│   ├── api/
│   │   └── apiService.ts          # API calls with Axios
│   ├── screens/
│   │   ├── LoginScreen.tsx        # Login UI ✅
│   │   └── DashboardScreen.tsx    # Dashboard placeholder
│   ├── types/
│   │   └── auth.types.ts          # TypeScript types
│   └── utils/
│       └── config.ts              # Configuration
├── App.tsx                        # Navigation setup
└── package.json
```

## 🎨 UI Matches Android App

| Feature | Status |
|---------|--------|
| Logo (120dp) | ✅ |
| Title "FieldForce" | ✅ |
| Username input | ✅ |
| Password input with toggle | ✅ |
| Login button | ✅ |
| Version text | ✅ |
| Input validation | ✅ |
| Loading state | ✅ |
| Error handling | ✅ |

## 🔌 API Integration

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "username": "your_username",
  "password": "your_password",
  "role": "registered_user",
  "fcmToken": ""
}
```

## 🎯 Test the UI

1. Run the app (see commands above)
2. Try entering username and password
3. Click LOGIN button
4. See validation errors if fields are empty
5. See loading spinner during API call

## 📝 Next Steps

1. ✅ Login Screen - **DONE**
2. ⏳ Dashboard Screen - Implement pie chart and metrics
3. ⏳ Service Orders List - Implement from docs
4. ⏳ Assignment Details - Implement from docs
5. ⏳ Parts Management - Implement from docs

## 💡 Tips

- Press `r` in Metro terminal to reload
- Press `d` to open Dev Menu
- Use React Native Debugger for debugging
- Check console for API errors

## 🆘 Troubleshooting

**Metro not starting?**
```bash
npm start -- --reset-cache
```

**Build errors?**
```bash
cd ios && pod install && cd ..  # For iOS
```

**Module not found?**
```bash
npm install
```

## 📚 Documentation

- Full Android specs: See `01_LOGIN_SCREEN.md` in parent folder
- All screens documented: `02_DASHBOARD_SCREEN.md`, etc.
- Setup details: `LOGIN_SETUP.md`
