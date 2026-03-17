# API Logging System - Complete Documentation

## 🎯 Overview

All API calls in the FieldForce React Native app now include comprehensive logging that displays:
- Full URL
- HTTP Method
- Request Headers
- Request Body
- Query Parameters
- Response Status
- Response Headers
- Response Data
- Error Details

## 📋 Log Format

### ✅ Successful API Request & Response

```
🚀 ===== API REQUEST =====
📍 URL: https://your-api.com/api/auth/login
🔧 Method: POST
📋 Headers: {
  "Content-Type": "application/json",
  "Accept": "application/json"
}
📦 Request Body: {
  "username": "john.doe",
  "password": "********",
  "role": "registered_user",
  "fcmToken": ""
}
========================

✅ ===== API RESPONSE =====
📍 URL: https://your-api.com/api/auth/login
📊 Status: 200 OK
📋 Headers: {
  "content-type": "application/json",
  "content-length": "456"
}
📦 Response Data: {
  "success": true,
  "data": {
    "accessToken": "eyJhbGc...",
    "refreshToken": "eyJhbGc...",
    "user": {
      "id": "123",
      "username": "john.doe",
      "role": "registered_user"
    }
  }
}
⏱️  Duration: N/A
==========================
```

### ❌ Failed API Request (Error Response)

```
🚀 ===== API REQUEST =====
📍 URL: https://your-api.com/api/vendors/me/dashboard
🔧 Method: GET
📋 Headers: {
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGc..."
}
========================

❌ ===== API ERROR =====
📍 URL: https://your-api.com/api/vendors/me/dashboard
🔧 Method: GET
📊 Status: 401 Unauthorized
📋 Response Headers: {
  "content-type": "application/json"
}
📦 Error Data: {
  "success": false,
  "message": "Invalid or expired token"
}
🔍 Full Error: Error: Request failed with status code 401
========================
```

### ⚠️ Network Error (No Response)

```
🚀 ===== API REQUEST =====
📍 URL: https://your-api.com/api/auth/login
🔧 Method: POST
📋 Headers: {...}
📦 Request Body: {...}
========================

❌ ===== API ERROR =====
📍 URL: https://your-api.com/api/auth/login
🔧 Method: POST
⚠️  No Response Received
📡 Request: [XMLHttpRequest object]
🔍 Full Error: Error: Network Error
========================
```

## 🔍 Where to View Logs

### Option 1: Metro Bundler Terminal
The logs appear in the terminal where you ran `npm start`:

```bash
$ npm start

# Logs will appear here when API calls are made
🚀 ===== API REQUEST =====
...
```

### Option 2: React Native Debugger
1. Open React Native Debugger
2. Press `Cmd+D` (iOS) or `Cmd+M` (Android) in simulator
3. Select "Debug"
4. View logs in the Console tab

### Option 3: Browser DevTools (if using Expo)
1. Press `d` in Metro terminal
2. Open DevTools in browser
3. View Console tab

### Option 4: Device Logs
```bash
# iOS
npx react-native log-ios

# Android
npx react-native log-android
```

## 📊 Log Details Explained

### Request Logs

| Field | Description | Example |
|-------|-------------|---------|
| **📍 URL** | Full API endpoint | `https://api.com/api/auth/login` |
| **🔧 Method** | HTTP method | `POST`, `GET`, `PUT`, `DELETE` |
| **📋 Headers** | Request headers | `Authorization`, `Content-Type` |
| **📦 Request Body** | POST/PUT data | JSON payload |
| **🔍 Query Params** | URL parameters | `?page=1&limit=10` |

### Response Logs

| Field | Description | Example |
|-------|-------------|---------|
| **📍 URL** | Full API endpoint | Same as request |
| **📊 Status** | HTTP status code | `200 OK`, `404 Not Found` |
| **📋 Headers** | Response headers | `content-type`, `content-length` |
| **📦 Response Data** | API response body | JSON data |
| **⏱️  Duration** | Request duration | `245ms` |

### Error Logs

| Field | Description | When Shown |
|-------|-------------|------------|
| **📊 Status** | Error status code | Server error (4xx, 5xx) |
| **📦 Error Data** | Error response | Server returned error |
| **⚠️  No Response** | Network issue | Timeout, no connection |
| **💬 Message** | Error message | Setup/config error |
| **🔍 Full Error** | Complete error | Always shown |

## 🎨 Log Icons Legend

| Icon | Meaning |
|------|---------|
| 🚀 | API Request Started |
| ✅ | Successful Response |
| ❌ | Error Response |
| 📍 | URL/Endpoint |
| 🔧 | HTTP Method |
| 📋 | Headers |
| 📦 | Data/Body |
| 🔍 | Query Params |
| 📊 | Status Code |
| ⏱️  | Duration |
| ⚠️  | Warning/Issue |
| 📡 | Request Object |
| 💬 | Message |
| 🔐 | Authentication |

## 🔧 Implementation Details

### Axios Interceptors

The logging is implemented using Axios interceptors in `src/api/apiService.ts`:

```typescript
// Request Interceptor
this.api.interceptors.request.use(
  async (config) => {
    // Add auth token
    const token = await AsyncStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request details
    console.log('\n🚀 ===== API REQUEST =====');
    console.log('📍 URL:', `${config.baseURL}${config.url}`);
    console.log('🔧 Method:', config.method?.toUpperCase());
    console.log('📋 Headers:', JSON.stringify(config.headers, null, 2));
    if (config.data) {
      console.log('📦 Request Body:', JSON.stringify(config.data, null, 2));
    }
    console.log('========================\n');

    return config;
  }
);

// Response Interceptor
this.api.interceptors.response.use(
  (response) => {
    // Log successful response
    console.log('\n✅ ===== API RESPONSE =====');
    console.log('📍 URL:', `${response.config.baseURL}${response.config.url}`);
    console.log('📊 Status:', response.status, response.statusText);
    console.log('📦 Response Data:', JSON.stringify(response.data, null, 2));
    console.log('==========================\n');
    return response;
  },
  async (error) => {
    // Log error response
    console.log('\n❌ ===== API ERROR =====');
    console.log('📍 URL:', `${error.config?.baseURL}${error.config?.url}`);
    if (error.response) {
      console.log('📊 Status:', error.response.status);
      console.log('📦 Error Data:', JSON.stringify(error.response.data, null, 2));
    }
    console.log('========================\n');
    return Promise.reject(error);
  }
);
```

## 📝 Example API Calls with Logs

### 1. Login API

**Request:**
```
🚀 ===== API REQUEST =====
📍 URL: https://your-api.com/api/auth/login
🔧 Method: POST
📋 Headers: {
  "Content-Type": "application/json"
}
📦 Request Body: {
  "username": "vendor1",
  "password": "password123",
  "role": "registered_user",
  "fcmToken": ""
}
========================
```

**Response:**
```
✅ ===== API RESPONSE =====
📍 URL: https://your-api.com/api/auth/login
📊 Status: 200 OK
📦 Response Data: {
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "vendor-123",
      "username": "vendor1",
      "role": "registered_user",
      "vendorId": "V001"
    }
  }
}
==========================
```

### 2. Dashboard API

**Request:**
```
🚀 ===== API REQUEST =====
📍 URL: https://your-api.com/api/vendors/me/dashboard
🔧 Method: GET
📋 Headers: {
  "Content-Type": "application/json",
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
========================
```

**Response:**
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

## 🛠️ Customization

### Disable Logging in Production

Add environment check:

```typescript
const isDevelopment = __DEV__;

if (isDevelopment) {
  console.log('\n🚀 ===== API REQUEST =====');
  // ... logging code
}
```

### Add Request Timing

Track request duration:

```typescript
// In request interceptor
config.metadata = { startTime: Date.now() };

// In response interceptor
const duration = Date.now() - response.config.metadata.startTime;
console.log('⏱️  Duration:', `${duration}ms`);
```

### Filter Sensitive Data

Hide passwords in logs:

```typescript
const sanitizedData = { ...config.data };
if (sanitizedData.password) {
  sanitizedData.password = '********';
}
console.log('📦 Request Body:', JSON.stringify(sanitizedData, null, 2));
```

## 🎯 Benefits

1. **Debugging**: Easily identify API issues
2. **Development**: See exact request/response format
3. **Testing**: Verify API integration
4. **Troubleshooting**: Diagnose network problems
5. **Documentation**: Understand API behavior

## 📱 Testing the Logs

1. **Start Metro:**
   ```bash
   npm start
   ```

2. **Run the app:**
   ```bash
   npm run ios  # or npm run android
   ```

3. **Trigger API calls:**
   - Login with credentials
   - Navigate to Dashboard
   - Perform any action

4. **View logs in Metro terminal**

## 🚨 Important Notes

- Logs appear in **Metro bundler terminal** (where you ran `npm start`)
- Sensitive data (tokens, passwords) are logged - **disable in production**
- Logs are **synchronous** and may impact performance slightly
- Use **React Native Debugger** for better log viewing experience

## 💡 Pro Tips

1. **Search logs**: Use `Cmd+F` in terminal to search for specific URLs
2. **Copy logs**: Select and copy logs for bug reports
3. **Filter logs**: Use grep to filter specific endpoints:
   ```bash
   npm start | grep "API REQUEST"
   ```
4. **Save logs**: Redirect to file:
   ```bash
   npm start > api-logs.txt 2>&1
   ```

---

**All API calls now have complete logging! Check your Metro terminal to see detailed request/response information.** 🎉
