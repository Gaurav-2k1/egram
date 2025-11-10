# e-GramSeva - Digital Platform for Gram Panchayats

A modern, professional web application built with Vite, React, and TypeScript for managing Gram Panchayat (village council) digital presence.

## Features

- 🏛️ **Panchayat Management**: Complete dashboard for Panchayat Sachivs to manage content
- 📱 **Responsive Design**: Mobile-first design following UX4G standards
- 🌐 **Multi-language Support**: English, Hindi, and Regional language support
- 📊 **Analytics Dashboard**: Track visitor engagement and scheme reach
- 📝 **Content Management**: Create posts, announcements, and manage schemes
- 🖼️ **Media Gallery**: Upload and manage photos and videos
- 📋 **Registration Flow**: Multi-step registration process for new Panchayats
- ✅ **Type Safety**: Full TypeScript implementation with strict type checking

## Tech Stack

- **Framework**: React 19.2.0
- **Build Tool**: Vite 7.2.2
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS 4.1.17
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Notifications**: Sonner
- **Forms**: React Hook Form

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── figma/          # Figma-specific components
│   └── ...             # Feature components
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── constants/          # Application constants
├── styles/             # Global styles
└── main.tsx            # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Configuration

- **Vite Config**: `vite.config.ts`
- **TypeScript Config**: `tsconfig.json`
- **Tailwind Config**: `tailwind.config.js`
- **PostCSS Config**: `postcss.config.js`

## Key Features Implementation

### Error Handling
- Error boundaries for graceful error handling
- Comprehensive error messages and recovery options

### Type Safety
- Full TypeScript implementation
- Shared type definitions in `src/types/`
- Strict type checking enabled

### Code Organization
- Modular component structure
- Reusable utility functions
- Centralized constants
- Custom hooks for common patterns

### Best Practices
- React StrictMode enabled
- Proper error boundaries
- Accessible UI components
- Responsive design patterns
- Performance optimizations

## Development Guidelines

1. **TypeScript**: Always use proper types, avoid `any`
2. **Components**: Keep components small and focused
3. **Styling**: Use Tailwind CSS utility classes
4. **State Management**: Use React hooks for local state
5. **Error Handling**: Wrap components in ErrorBoundary
6. **Accessibility**: Follow WCAG guidelines

## License

This project is part of the e-GramSeva initiative for digital governance.

