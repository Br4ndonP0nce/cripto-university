# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

**Note**: The user handles running npm commands themselves. Do not execute npm commands unless explicitly requested.

```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Firebase Functions (in functions/ directory)
cd functions
npm run build        # Build Firebase Functions
npm run serve        # Serve functions locally
npm run deploy       # Deploy functions
```

## Code Architecture

This is a Next.js 15 application with Firebase integration featuring a role-based access control (RBAC) system and CRM functionality.

### Key Architecture Patterns

**App Router Structure**: Uses Next.js 13+ app directory with nested layouts:
- `src/app/(marketing)/` - Public marketing pages
- `src/app/admin/` - Protected admin dashboard with nested routes
- `src/app/join/`, `src/app/login/` - Authentication flows

**Role-Based Access Control**: The application implements a comprehensive RBAC system with:
- Role definitions in `src/lib/firebase/rbac.ts` with permissions like `leads:read`, `sales:write`, etc.
- System roles: `super_admin`, `admin`, `crm_user`, `viewer`
- Route-level permission checks using `ProtectedRoute` component
- User profiles stored in Firebase with role assignments

**Firebase Integration**: Full Firebase stack including:
- Authentication (`src/lib/firebase/auth.ts`)
- Firestore database (`src/lib/firebase/db.ts`) 
- Firebase Functions (separate `functions/` directory)
- Storage with access rules (`storage.rules`)
- Admin SDK for server-side operations

**Component Organization**:
- UI components in `src/components/ui/` following shadcn/ui pattern
- Admin-specific components in `src/components/ui/admin/`
- Animated components in `src/components/animated/`
- Auth components (`ProtectedRoute`, `PermissionGate`) in `src/components/auth/`

**State Management**: Context-based auth state with custom hooks:
- `useAuth` for authentication state
- `usePermissions` for permission checking
- `useContent` for content management

### Key Files to Understand

- `src/lib/firebase/rbac.ts` - Complete RBAC system with role definitions and permission checking
- `src/components/auth/ProtectedRoute.tsx` - Route-level access control
- `src/app/admin/layout.tsx` - Admin dashboard layout with RBAC integration
- `src/lib/firebase/config.ts` - Firebase configuration and service initialization

### Data Models

The application handles:
- User profiles with role assignments (`UserProfile` interface)
- Lead management (CRM functionality)  
- Sales tracking and analytics
- Content management system
- Activity logging and permissions

### Technology Stack

- **Framework**: Next.js 15 with App Router and React 19
- **Styling**: Tailwind CSS v4 with shadcn/ui components
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Animations**: Framer Motion, GSAP
- **Forms**: Custom form components with validation
- **Charts**: Recharts for analytics
- **File Processing**: XLSX for Excel export functionality

### Environment Setup

Firebase configuration requires environment variables:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`  
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`