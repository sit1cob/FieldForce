# API Logging - Quick Reference

## ✅ What's Been Added

Comprehensive logging for **ALL API calls** showing:
- ✅ Full URL
- ✅ HTTP Method (GET, POST, PUT, DELETE)
- ✅ Request Headers (including Authorization token)
- ✅ Request Body (JSON payload)
- ✅ Query Parameters
- ✅ Response Status (200, 401, 404, etc.)
- ✅ Response Headers
- ✅ Response Data (complete JSON)
- ✅ Error Details (if request fails)

## 📍 Where to See Logs

**Metro Bundler Terminal** - The terminal where you ran `npm start`

```bash
$ npm start

# Logs appear here when you make API calls:
🚀 ===== API REQUEST =====
📍 URL: https://your-api.com/api/auth/login
🔧 Method: POST
📦 Request Body: { "username": "test", ... }
========================

✅ ===== API RESPONSE =====
📊 Status: 200 OK
📦 Response Data: { "success": true, ... }
==========================
```

## 🧪 Test It Now

1. **Login Screen**: Enter credentials and click LOGIN
   - You'll see the login API request and response

2. **Dashboard Screen**: After login
   - You'll see the dashboard API request and response

## 📋 Example Log Output

### Login Request:
```
🚀 ===== API REQUEST =====
📍 URL: https://your-api.com/api/auth/login
🔧 Method: POST
📋 Headers: {
  "Content-Type": "application/json",
  "Accept": "application/json"
}
📦 Request Body: {
  "username": "vendor1",
  "password": "password123",
  "role": "registered_user",
  "fcmToken": ""
}
========================
```

### Login Response:
```
✅ ===== API RESPONSE =====
📍 URL: https://your-api.com/api/auth/login
📊 Status: 200 OK
📦 Response Data: {
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "user": {
      "id": "123",
      "username": "vendor1",
      "role": "registered_user"
    }
  }
}
==========================
```

### Dashboard Request:
```
🚀 ===== API REQUEST =====
📍 URL: https://your-api.com/api/vendors/me/dashboard
🔧 Method: GET
📋 Headers: {
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGc..."
}
========================
```

### Dashboard Response:
```
✅ ===== API RESPONSE =====
📍 URL: https://your-api.com/api/vendors/me/dashboard
📊 Status: 200 OK
📦 Response Data: {
  "success": true,
  "data": {
    "availableJobs": 15,
    "myJobs": 50,
    "completed": 10,
    "statistics": {
      "inProgressCount": 25
    }
  }
}
==========================
```

## ❌ Error Logs

If API fails, you'll see:
```
❌ ===== API ERROR =====
📍 URL: https://your-api.com/api/auth/login
🔧 Method: POST
📊 Status: 401 Unauthorized
📦 Error Data: {
  "success": false,
  "message": "Invalid credentials"
}
🔍 Full Error: Error: Request failed with status code 401
========================
```

## 🎯 Quick Tips

1. **Keep Metro terminal visible** while testing
2. **Scroll up** to see previous API calls
3. **Copy logs** for debugging (Cmd+C)
4. **Search logs** with Cmd+F in terminal

## 🔍 What Gets Logged

| API Call | What You'll See |
|----------|-----------------|
| **Login** | Username, password (visible), FCM token, response with tokens |
| **Dashboard** | Auth token, dashboard metrics response |
| **Any Future API** | Full request and response details |

## ⚠️ Important

- **Passwords are visible in logs** - This is for development only
- **Tokens are visible** - Don't share logs publicly
- **Disable in production** - Add environment checks later

## 🚀 Ready to Test!

1. Run the app: `npm run android` or `npm run ios`
2. Watch the Metro terminal
3. Login to see your first API logs
4. Navigate to Dashboard to see more logs

**All API calls are now fully logged!** 🎉
