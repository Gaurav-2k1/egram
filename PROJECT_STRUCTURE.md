# Project Structure Documentation

## Overview
This document describes the complete structure and organization of the e-GramSeva Vite.js web project.

## Directory Structure

```
gram/
├── public/                 # Static assets
│   └── vite.svg
├── src/                    # Source code
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components (Radix UI based)
│   │   ├── figma/        # Figma-specific components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── LandingPage.tsx
│   │   ├── RegistrationFlow.tsx
│   │   ├── PanchayatWebsite.tsx
│   │   ├── SachivDashboard.tsx
│   │   ├── CreatePost.tsx
│   │   ├── PostCard.tsx
│   │   └── ErrorBoundary.tsx
│   ├── types/            # TypeScript type definitions
│   │   └── index.ts
│   ├── hooks/            # Custom React hooks
│   │   ├── useLocalStorage.ts
│   │   └── use-mobile.ts (from ui)
│   ├── utils/            # Utility functions
│   │   ├── validation.ts
│   │   └── format.ts
│   ├── constants/         # Application constants
│   │   └── index.ts
│   ├── styles/           # Global styles
│   │   └── globals.css
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Main CSS file
├── index.html            # HTML entry point
├── package.json          # Dependencies and scripts
├── package-lock.json     # Lock file
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json    # TypeScript config for Node
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── .eslintrc.cjs         # ESLint configuration
├── .gitignore            # Git ignore rules
├── .gitattributes        # Git attributes
├── .editorconfig        # Editor configuration
├── README.md             # Project documentation
└── PROJECT_STRUCTURE.md  # This file
```

## Key Files

### Configuration Files

1. **vite.config.ts**: Vite build configuration with path aliases and optimization
2. **tsconfig.json**: TypeScript compiler configuration with strict mode
3. **tailwind.config.js**: Tailwind CSS theme and customization
4. **postcss.config.js**: PostCSS plugins configuration
5. **.eslintrc.cjs**: ESLint rules and plugins

### Source Files

1. **src/main.tsx**: Application entry point with error boundary and StrictMode
2. **src/App.tsx**: Main application component with routing logic
3. **src/types/index.ts**: Shared TypeScript types and interfaces
4. **src/constants/index.ts**: Application-wide constants
5. **src/utils/**: Utility functions for validation and formatting
6. **src/hooks/**: Custom React hooks

### Components

1. **Header.tsx**: Navigation header component
2. **Footer.tsx**: Footer component
3. **LandingPage.tsx**: Landing page with features and CTA
4. **RegistrationFlow.tsx**: Multi-step registration form
5. **PanchayatWebsite.tsx**: Public-facing panchayat website
6. **SachivDashboard.tsx**: Admin dashboard for Panchayat Sachiv
7. **CreatePost.tsx**: Post creation component
8. **PostCard.tsx**: Post display component
9. **ErrorBoundary.tsx**: Error handling component

## Type System

All types are centralized in `src/types/index.ts`:
- `PageType`: Application page types
- `Language`: Supported languages
- `Post`: Post data structure
- `Scheme`: Government scheme data
- `RegistrationFormData`: Registration form data structure
- And more...

## Constants

Application constants are in `src/constants/index.ts`:
- `APP_NAME`, `APP_DESCRIPTION`
- `COLORS`: Brand colors
- `ROUTES`: Route identifiers
- `FILE_UPLOAD_LIMITS`: File upload constraints
- And more...

## Utilities

### Validation (`src/utils/validation.ts`)
- Email validation
- Phone number validation
- File size/type validation
- Subdomain validation

### Formatting (`src/utils/format.ts`)
- Date formatting
- Currency formatting
- Number formatting
- Time ago formatting

## Best Practices Implemented

1. **Type Safety**: Full TypeScript with strict mode
2. **Error Handling**: Error boundaries at multiple levels
3. **Code Organization**: Modular structure with clear separation
4. **Reusability**: Shared types, utilities, and hooks
5. **Performance**: Code splitting and lazy loading ready
6. **Accessibility**: WCAG-compliant UI components
7. **Responsive Design**: Mobile-first approach
8. **State Management**: React hooks with localStorage persistence

## Development Workflow

1. **Development**: `npm run dev`
2. **Build**: `npm run build`
3. **Preview**: `npm run preview`
4. **Type Check**: `npm run type-check`
5. **Lint**: `npm run lint`

## Code Standards

- **TypeScript**: Strict mode enabled
- **ESLint**: Recommended rules with React hooks plugin
- **EditorConfig**: Consistent formatting
- **Git**: Proper line endings and attributes

## Future Enhancements

- Add unit tests with Vitest
- Add E2E tests with Playwright
- Implement i18n for multi-language support
- Add state management (Zustand/Redux) if needed
- Implement API integration layer
- Add service workers for PWA support

