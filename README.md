# FieldForce

React Native mobile app with bottom-tab navigation, job/parts workflows, and API-integrated technician experiences.

## Table of contents

- [Highlights](#highlights)
- [Tech stack](#tech-stack)
- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Scripts](#scripts)
- [Configuration](#configuration)
- [Repository structure](#repository-structure)
- [Build artifacts](#build-artifacts)
- [Troubleshooting](#troubleshooting)
- [Features/Release Notes](#featuresrelease-notes)

## Highlights

- **Bottom tabs**
  - Home
  - Chat
  - Jobs
  - Parts
  - Earnings
- **Dashboard**
  - Tiles and info cards
  - “Ask Sasha” entry point
- **Assignments**
  - My Assignments list
  - Assignment Details with core actions
- **Parts & orders**
  - Appliance Details
  - Select Model
  - Model Parts
  - Cart
  - Track Order
  - Track Order Detail
  - Track Parts
- **Workflow/UX**
  - Mark Arrived modal confirmation
  - Job Complete modal confirmation
  - Finish for Today success screen
  - Job Complete / Customer Not Home / Order Completed confirmations
- **API integration**
  - Assignments
  - Status updates
  - Parts and order operations (via `ApiService`)
- **Navigation/architecture**
  - Centralized navigation using Stack + Bottom Tabs
  - Screen analytics tracking
- **Maintenance**
  - Release Notes modal screen
  - Supporting screens: Performance, Reviews (Account-ready)

## Tech stack

- **React Native**
- **TypeScript**
- **Android (Gradle)**

## Prerequisites

- Node.js `>= 20`
- npm
- React Native environment setup
  - Android Studio + Android SDK
  - Xcode (for iOS development)

## Getting started

Install dependencies:

```bash
npm install
```

Start Metro:

```bash
npm start
```

Run Android:

```bash
npm run android
```

Run iOS:

```bash
npm run ios
```

## Scripts

Use `package.json` as the source of truth. Current scripts:

- `npm start`
- `npm run android`
- `npm run ios`
- `npm run lint`
- `npm test`

## Configuration

This repo includes Android configuration files (for example `android/app/google-services.json`). If your environment uses different Firebase or backend settings, replace these with your own configuration.

## Repository structure

This project currently uses root-level entry points:

- `index.js` registers the app and imports `App` from `./App`
- `App.tsx` is the main root component

The `src/` directory exists (tracked via `src/.gitkeep`) but may be empty. If you prefer a conventional `src/` layout, move app code under `src/` and update imports accordingly.

Key folders/files:

- `android/`
- `ios/`
- `App.tsx`
- `index.js`
- `package.json`

## Build artifacts

Build outputs (APKs, `.so` binaries, Gradle caches, etc.) must not be committed. This repo includes a `.gitignore` that excludes common React Native and Android build artifacts.

## Troubleshooting

- **Push rejected due to large files**
  - Ensure build artifacts (for example `android/**/build`, `android/.gradle`, `android/app/.cxx`, `*.apk`, `*.so`, `*.zip`) are not tracked.
- **Android build issues**
  - Clean and rebuild from Android Studio or via Gradle, and re-check that build outputs remain ignored.

## Features/Release Notes

- UI: Built bottom tab layout for Home, Chat, Jobs, Parts, and Earnings
- UI: Implemented Dashboard with tiles, info cards, and “Ask Sasha” entry point
- UI: Added My Assignments list + Assignment Details screens with core actions
- UI: Implemented parts flow screens (Appliance Details, Select Model, Model Parts, Cart)
- UI: Added parts tracking screens (Track Order, Track Order Detail, Track Parts)
- UX: Added modal flows for Mark Arrived and Job Complete confirmations
- Workflow: Added success/confirmation screens (Finish for Today, Job Complete, Customer Not Home, Order Completed)
- API Integration: Integrated services for assignments, status updates, and parts/order operations via ApiService
- Navigation/Arch: Centralized app navigation using Stack + Bottom Tabs and screen analytics tracking
- Maintenance: Included Release Notes modal screen and supporting screens (Performance, Reviews, Account-ready)