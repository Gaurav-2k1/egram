# e-GramSeva Website - Complete Documentation

## Table of Contents
1. [Application Overview](#application-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Pages & Routes](#pages--routes)
5. [Components](#components)
6. [UI Components Library](#ui-components-library)
7. [Color System & Design Tokens](#color-system--design-tokens)
8. [Styling & CSS](#styling--css)
9. [Typography](#typography)
10. [Layout & Responsive Design](#layout--responsive-design)
11. [Accessibility Features](#accessibility-features)

---

## Application Overview

**e-GramSeva** is a digital platform designed for Gram Panchayats in India. It enables Panchayat Sachivs to create and manage their village websites, showcase schemes, projects, announcements, and engage with citizens.

### Key Features
- Multi-tenant Panchayat websites with custom subdomains
- Content management system for posts, schemes, announcements
- Document management and photo galleries
- Analytics and engagement tracking
- Team management and user roles
- Multi-language support (English, Hindi, Regional)
- Mobile-responsive design
- UX4G compliance standards

---

## Technology Stack

- **Framework**: React 18+ with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS v4.1.3
- **UI Components**: Custom components built on Radix UI primitives
- **State Management**: React Context API
- **Notifications**: Sonner (Toast notifications)
- **Icons**: Lucide React
- **Build Tool**: Vite

---

## Project Structure

```
src/
├── components/          # Main application components
│   ├── ui/            # Reusable UI component library
│   └── figma/         # Figma-specific components
├── pages/             # Page-level components
├── routes/            # Route definitions
├── contexts/          # React Context providers
├── services/          # API services
├── types/             # TypeScript type definitions
├── utils/              # Utility functions
├── constants/          # Application constants
├── styles/             # Global styles
├── hooks/              # Custom React hooks
├── guidelines/         # Design guidelines
├── App.tsx            # Main app component
├── main.tsx           # Application entry point
└── index.css          # Global CSS with Tailwind
```

---

## Pages & Routes

### Public Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `LandingPage` | Homepage with features, stats, and registration CTA |
| `/registration` | `RegistrationFlow` | Multi-step Panchayat registration form |
| `/panchayat/:subdomain` | `PanchayatWebsite` | Individual Panchayat public website |
| `/panchayat-demo` | `PanchayatWebsite` | Demo Panchayat website |
| `/login` | `Login` | Sachiv/Admin login page |
| `/forgot-password` | `ForgotPassword` | Password recovery |
| `/reset-password` | `ResetPassword` | Password reset form |
| `/success` | `SuccessPage` | Registration success confirmation |

### Protected Routes

| Route | Component | Access Level | Description |
|-------|-----------|--------------|-------------|
| `/dashboard` | `SachivDashboard` | Panchayat Admin | Main dashboard for Panchayat Sachivs |
| `/admin` | `SuperAdminDashboard` | Super Admin | Platform-wide administration |

### Route Configuration
- Routes defined in `src/routes/index.tsx`
- Protected routes wrapped with `ProtectedRoute` component
- Authentication handled via `AuthContext`

---

## Components

### Main Application Components

#### 1. **LandingPage** (`src/components/LandingPage.tsx`)
**Purpose**: Platform homepage showcasing e-GramSeva features

**Sections**:
- Hero section with gradient background (Orange/Green theme)
- Statistics section (500+ Panchayats, 2.5M+ Citizens, etc.)
- Features grid (4 feature cards)
- Benefits section with green gradient background
- Active Panchayats directory
- Call-to-action section

**Key Features**:
- Responsive grid layouts
- Gradient backgrounds using brand colors
- Interactive feature cards with hover effects
- Dynamic Panchayat listing from API

**Colors Used**:
- Primary Orange: `#FF9933`
- Primary Green: `#138808`
- Background gradients: `from-[#FF9933]/10 via-white to-[#138808]/10`
- Stats text: `#FF9933`

---

#### 2. **PanchayatWebsite** (`src/components/PanchayatWebsite.tsx`)
**Purpose**: Public-facing website for individual Gram Panchayats

**Sections**:
1. **Government Branding Banner**: Official website indicator with links
2. **Hero Banner**: Large image with overlay, Panchayat name and location
3. **Quick Stats**: Population, Area, Wards, Established year
4. **Tabbed Content**:
   - Home: Posts feed, announcements
   - About: Panchayat information, members
   - Schemes: Government schemes with progress
   - Projects: Development projects
   - Gallery: Photo gallery
   - Contact: Contact form and information

**Key Features**:
- Responsive hero image (250px mobile → 320px desktop)
- Tab-based navigation
- Post feed with likes/comments
- Scheme cards with progress bars
- Project timeline display
- Contact form with validation
- Skip-to-content accessibility link

**Colors Used**:
- Hero overlay: `from-black/70 to-black/30`
- Stats icons: `bg-[#FF9933]/10` and `bg-[#138808]/10`
- Badges: `bg-[#138808] text-white`
- Links: `text-[#138808] hover:text-[#FF9933]`
- Contact icons: `text-[#FF9933]`

---

#### 3. **Login** (`src/components/Login.tsx`)
**Purpose**: Authentication page for Sachivs and Admins

**Features**:
- Centered card layout
- Email and password fields with icons
- Show/hide password toggle
- Remember me checkbox
- Forgot password link
- Demo credentials display
- Gradient background: `from-[#FF9933]/10 via-white to-[#138808]/10`

**Colors Used**:
- Logo gradient: `from-[#FF9933] via-white to-[#138808]`
- Title: `text-[#138808]`
- Icon: `text-[#FF9933]`
- Button: `bg-[#FF9933] hover:bg-[#FF9933]/90`
- Demo box: `border-[#FF9933]/20 bg-[#FF9933]/5`

---

#### 4. **RegistrationFlow** (`src/components/RegistrationFlow.tsx`)
**Purpose**: Multi-step Panchayat registration form

**Steps**:
1. **Personal Details**: Sachiv name, email, phone, designation
2. **Panchayat Details**: Name, district, state, block, population, area, wards, subdomain
3. **Document Upload**: ID proof, appointment letter, Panchayat certificate
4. **Review & Submit**: Summary and terms acceptance

**Features**:
- Progress bar indicator
- Step indicators with icons
- Form validation
- File upload with size limits
- Responsive grid layouts

**Colors Used**:
- Active step: `border-[#FF9933] bg-[#FF9933]/5`
- Completed step: `border-[#138808] bg-[#138808]/5`
- Step icons: `bg-[#FF9933]` (active), `bg-[#138808]` (completed)

---

#### 5. **SachivDashboard** (`src/components/SachivDashboard.tsx`)
**Purpose**: Main dashboard for Panchayat administrators

**Sections**:
- **Dashboard Overview**: Stats cards, recent activity
- **Posts Management**: Create, edit, delete posts
- **Announcements**: Manage announcements
- **Schemes**: Add/edit schemes with progress tracking
- **Gallery**: Photo album management
- **Albums**: Gallery album organization
- **Documents**: Document upload and management
- **Comments**: Comment moderation
- **Team**: Team member management
- **Analytics**: Engagement and visitor analytics
- **Settings**: Panchayat website settings

**Layout**:
- Sidebar navigation (collapsible on mobile)
- Main content area with tabs
- Stats cards with icons
- Data tables for listings
- Modal dialogs for forms

**Colors Used**:
- Sidebar active: `bg-[#FF9933] text-white`
- Stats icons: `#FF9933` and `#138808`
- Background: `bg-[#f8f9fa]`
- Brand name: `text-[#138808]`

---

#### 6. **SuperAdminDashboard** (`src/components/SuperAdminDashboard.tsx`)
**Purpose**: Platform-wide administration interface

**Sections**:
- **Dashboard**: System-wide analytics
- **Panchayats**: Manage all Panchayats (activate/deactivate/delete)
- **Users**: User management across platform
- **Analytics**: Platform analytics
- **Audit Logs**: System activity logs

**Features**:
- Search and filter functionality
- Status management (active/inactive/suspended)
- Bulk operations
- System statistics

**Colors Used**:
- Title: `text-[#FF9933]`
- Stats: `text-[#FF9933]` and `text-[#138808]`
- Active status: `bg-[#FF9933] text-white`

---

#### 7. **Header** (`src/components/Header.tsx`)
**Purpose**: Global navigation header

**Variants**:
- **Platform**: Main e-GramSeva header
- **Panchayat**: Panchayat-specific header

**Features**:
- Logo with gradient border
- Navigation menu (desktop/mobile)
- Language selector dropdown
- Login button (platform variant)
- Mobile hamburger menu with sheet

**Colors Used**:
- Logo gradient: `from-[#FF9933] via-white to-[#138808]`
- Brand name: `text-[#138808]`
- Hover links: `hover:text-[#FF9933]`
- Button: `bg-[#FF9933] hover:bg-[#FF9933]/90`

---

#### 8. **Footer** (`src/components/Footer.tsx`)
**Purpose**: Global footer with links and information

**Sections**:
- About section
- Quick links
- Important links (Government sites)
- Contact information
- Social media icons
- Tricolor bar (Indian flag colors)

**Colors Used**:
- Background: `bg-[#f8f9fa]`
- Headings: `text-[#138808]`
- Links: `hover:text-[#FF9933]`
- Icons: `text-[#FF9933]`
- Social buttons: `bg-[#138808] hover:bg-[#138808]/90`
- Tricolor: `from-[#FF9933] via-white to-[#138808]`

---

### Supporting Components

#### **PostCard** (`src/components/PostCard.tsx`)
- Displays posts with author, content, media, engagement metrics
- Like, comment, share functionality

#### **CreatePost** (`src/components/CreatePost.tsx`)
- Rich text post creation
- Image/video upload
- Media preview

#### **TeamManagement** (`src/components/TeamManagement.tsx`)
- Add/edit team members
- Role assignment
- Status management

#### **DocumentsManagement** (`src/components/DocumentsManagement.tsx`)
- Document upload/delete
- Category organization
- Public/private toggle

#### **CommentsManagement** (`src/components/CommentsManagement.tsx`)
- Comment moderation
- Approve/reject comments
- Status filtering

#### **GalleryAlbums** (`src/components/GalleryAlbums.tsx`)
- Album creation
- Image management
- Cover image selection

#### **SettingsManagement** (`src/components/SettingsManagement.tsx`)
- Panchayat website settings
- Hero section customization
- Contact information
- About section

#### **EnhancedAnalytics** (`src/components/EnhancedAnalytics.tsx`)
- Visitor statistics
- Engagement metrics
- Popular posts
- Chart visualizations

---

## UI Components Library

Located in `src/components/ui/`, built on Radix UI primitives with Tailwind CSS.

### Available Components

1. **accordion.tsx** - Collapsible content sections
2. **alert.tsx** - Alert messages
3. **alert-dialog.tsx** - Modal confirmation dialogs
4. **avatar.tsx** - User avatars with fallbacks
5. **badge.tsx** - Status badges and labels
6. **breadcrumb.tsx** - Navigation breadcrumbs
7. **button.tsx** - Button component with variants
8. **calendar.tsx** - Date picker calendar
9. **card.tsx** - Card container (CardHeader, CardTitle, CardDescription, CardContent)
10. **carousel.tsx** - Image/content carousel
11. **chart.tsx** - Chart components
12. **checkbox.tsx** - Checkbox input
13. **collapsible.tsx** - Collapsible sections
14. **command.tsx** - Command palette
15. **context-menu.tsx** - Right-click context menu
16. **dialog.tsx** - Modal dialogs
17. **drawer.tsx** - Mobile drawer/sheet
18. **dropdown-menu.tsx** - Dropdown menus
19. **form.tsx** - Form components with validation
20. **hover-card.tsx** - Hover tooltip cards
21. **input.tsx** - Text input fields
22. **input-otp.tsx** - OTP input
23. **label.tsx** - Form labels
24. **menubar.tsx** - Menu bar component
25. **navigation-menu.tsx** - Navigation menus
26. **pagination.tsx** - Pagination controls
27. **popover.tsx** - Popover tooltips
28. **progress.tsx** - Progress bars
29. **radio-group.tsx** - Radio button groups
30. **resizable.tsx** - Resizable panels
31. **scroll-area.tsx** - Custom scrollable areas
32. **select.tsx** - Select dropdowns
33. **separator.tsx** - Visual separators
34. **sheet.tsx** - Side sheets/drawers
35. **sidebar.tsx** - Sidebar navigation
36. **skeleton.tsx** - Loading skeletons
37. **slider.tsx** - Range sliders
38. **sonner.tsx** - Toast notifications
39. **switch.tsx** - Toggle switches
40. **table.tsx** - Data tables
41. **tabs.tsx** - Tab navigation
42. **textarea.tsx** - Multi-line text input
43. **toggle-group.tsx** - Toggle button groups
44. **toggle.tsx** - Toggle buttons
45. **tooltip.tsx** - Tooltips

### Component Usage Pattern

All UI components follow a consistent pattern:
- TypeScript interfaces for props
- Variant-based styling
- Accessibility attributes (ARIA)
- Responsive design
- Theme-aware (light/dark mode support)

**Example**:
```tsx
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    <Button variant="default">Click</Button>
  </CardContent>
</Card>
```

---

## Color System & Design Tokens

### Primary Brand Colors

The application uses India's tricolor theme:

#### Orange (Saffron)
- **Hex**: `#FF9933`
- **Usage**: Primary actions, highlights, accents
- **Variants**:
  - `bg-[#FF9933]` - Solid background
  - `bg-[#FF9933]/90` - 90% opacity (hover states)
  - `bg-[#FF9933]/10` - 10% opacity (subtle backgrounds)
  - `bg-[#FF9933]/5` - 5% opacity (very subtle)
  - `text-[#FF9933]` - Text color
  - `border-[#FF9933]` - Border color

#### Green
- **Hex**: `#138808`
- **Usage**: Secondary actions, success states, brand identity
- **Variants**:
  - `bg-[#138808]` - Solid background
  - `bg-[#138808]/90` - 90% opacity
  - `bg-[#138808]/10` - 10% opacity
  - `bg-[#138808]/5` - 5% opacity
  - `text-[#138808]` - Text color
  - `border-[#138808]` - Border color

#### White
- **Hex**: `#FFFFFF`
- **Usage**: Backgrounds, text on colored backgrounds
- **Variants**:
  - `bg-white` - Solid white
  - `bg-white/90` - 90% opacity

#### Dark Green (Gradient)
- **Hex**: `#0a5505`
- **Usage**: Gradient endpoints, darker green variants

### CSS Custom Properties (Design Tokens)

Defined in `src/index.css` and `src/styles/globals.css`:

```css
:root {
  /* Colors */
  --background: #fff;
  --foreground: oklch(0.145 0 0);
  --card: #fff;
  --card-foreground: oklch(0.145 0 0);
  --primary: #030213;
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.0058 264.53);
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --destructive: #d4183d;
  --border: rgba(0, 0, 0, 0.1);
  --input-background: #f3f3f5;
  
  /* Typography */
  --font-size: 16px;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  
  /* Spacing */
  --spacing: 0.25rem;
  
  /* Border Radius */
  --radius: 0.625rem;
  --radius-xs: 0.125rem;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  --shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}
```

### Color Usage Guidelines

#### Background Colors
- **Primary Background**: `bg-white` (main page backgrounds)
- **Secondary Background**: `bg-[#f8f9fa]` (section backgrounds)
- **Muted Background**: `bg-muted` (`#ececf0`)
- **Card Background**: `bg-card` (white)

#### Text Colors
- **Primary Text**: `text-foreground` (dark gray/black)
- **Muted Text**: `text-muted-foreground` (`#717182`)
- **Brand Text**: `text-[#138808]` (green) or `text-[#FF9933]` (orange)
- **White Text**: `text-white` (on colored backgrounds)

#### Border Colors
- **Default**: `border-border` (rgba(0, 0, 0, 0.1))
- **Brand**: `border-[#FF9933]` or `border-[#138808]`
- **Input**: `border-input`

#### Gradient Backgrounds

**Hero Sections**:
```css
bg-gradient-to-br from-[#FF9933]/10 via-white to-[#138808]/10
```

**Benefits Section**:
```css
bg-gradient-to-br from-[#138808] to-[#0a5505]
```

**Tricolor Bar**:
```css
bg-gradient-to-r from-[#FF9933] via-white to-[#138808]
```

**Logo Border**:
```css
bg-gradient-to-br from-[#FF9933] via-white to-[#138808]
```

### Dark Mode Support

The application includes dark mode CSS variables (though dark mode may not be fully implemented):

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  /* ... more dark mode tokens */
}
```

---

## Styling & CSS

### Tailwind CSS Configuration

The application uses **Tailwind CSS v4.1.3** with custom configuration:

#### Key Features
- Utility-first CSS framework
- Custom design tokens via CSS variables
- Responsive breakpoints
- Dark mode support (prepared)
- Custom color palette
- Custom spacing scale

#### Breakpoints
- `sm`: 40rem (640px)
- `md`: 48rem (768px)
- `lg`: 64rem (1024px)
- `xl`: 80rem (1280px)
- `2xl`: 96rem (1536px)

#### Container Sizes
- `container-sm`: 24rem
- `container-2xl`: 42rem
- `container-3xl`: 48rem
- Default container: Responsive max-widths

### Global Styles

#### Base Styles (`src/index.css`)
- Tailwind base layer with reset styles
- Typography defaults
- Form element styling
- Focus states
- Selection colors

#### Custom Styles (`src/styles/globals.css`)
- Additional base typography rules
- Scrollbar customization
- Custom utility classes

#### Scrollbar Styling
```css
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.overflow-x-auto::-webkit-scrollbar {
  height: 8px;
}

.overflow-x-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
}
```

### Common Utility Classes

#### Spacing
- `p-{n}` - Padding (n * 0.25rem)
- `m-{n}` - Margin
- `gap-{n}` - Gap in flex/grid
- `space-y-{n}` - Vertical spacing between children

#### Layout
- `flex` - Flexbox
- `grid` - CSS Grid
- `container` - Responsive container
- `mx-auto` - Center horizontally

#### Colors
- `bg-{color}` - Background color
- `text-{color}` - Text color
- `border-{color}` - Border color

#### Typography
- `text-{size}` - Font size (xs, sm, base, lg, xl, 2xl)
- `font-{weight}` - Font weight (normal, medium, semibold)
- `text-center` - Center align text

#### Effects
- `rounded-{size}` - Border radius
- `shadow-{size}` - Box shadow
- `hover:{class}` - Hover states
- `transition` - Transitions

---

## Typography

### Font Families
- **Sans-serif**: `ui-sans-serif, system-ui, sans-serif` (default)
- **Monospace**: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas` (code)

### Font Sizes

| Class | Size | Line Height | Usage |
|-------|------|-------------|-------|
| `text-xs` | 0.75rem (12px) | 1.33 | Small labels, captions |
| `text-sm` | 0.875rem (14px) | 1.25 | Secondary text |
| `text-base` | 1rem (16px) | 1.5 | Body text (default) |
| `text-lg` | 1.125rem (18px) | 1.5 | Subheadings |
| `text-xl` | 1.25rem (20px) | 1.5 | Section headings |
| `text-2xl` | 1.5rem (24px) | 1.5 | Page titles |

### Font Weights
- **Normal**: 400 (`font-normal`)
- **Medium**: 500 (`font-medium`) - Default for buttons, labels
- **Semibold**: 600 (`font-semibold`) - Headings

### Typography Hierarchy

#### Headings (Default Styles)
```css
h1 {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 500;
  line-height: 1.5;
}

h2 {
  font-size: 1.25rem; /* text-xl */
  font-weight: 500;
  line-height: 1.5;
}

h3 {
  font-size: 1.125rem; /* text-lg */
  font-weight: 500;
  line-height: 1.5;
}

h4 {
  font-size: 1rem; /* text-base */
  font-weight: 500;
  line-height: 1.5;
}
```

#### Body Text
- Default: `text-base` (16px, 400 weight, 1.5 line-height)
- Paragraphs: Inherit body styles
- Labels: `text-base`, `font-medium`
- Buttons: `text-base`, `font-medium`

### Custom Typography Examples

**Hero Title**:
```tsx
<h1 style={{ fontSize: "2.5rem", lineHeight: "1.2" }}>
  Empowering <span className="text-[#FF9933]">Gram Panchayats</span>
</h1>
```

**Section Headings**:
```tsx
<h2 style={{ fontSize: "2rem" }}>
  Why Choose <span className="text-[#138808]">e-GramSeva</span>?
</h2>
```

**Card Titles**:
```tsx
<CardTitle>Feature Title</CardTitle>
```

---

## Layout & Responsive Design

### Container System

The application uses a responsive container system:

```tsx
<div className="container mx-auto px-4 lg:px-8">
  {/* Content */}
</div>
```

**Breakpoints**:
- Mobile: Full width with `px-4` padding
- Desktop: Max-width container with `lg:px-8` padding

### Grid System

#### Two-Column Layout
```tsx
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
  {/* Cards */}
</div>
```

#### Responsive Grids
- Mobile: 1 column
- Tablet (`md`): 2 columns
- Desktop (`lg`): 3-4 columns

### Common Layout Patterns

#### Hero Section
```tsx
<section className="relative overflow-hidden bg-gradient-to-br from-[#FF9933]/10 via-white to-[#138808]/10">
  <div className="container mx-auto px-4 py-16 lg:px-8 lg:py-24">
    <div className="grid items-center gap-12 lg:grid-cols-2">
      {/* Content */}
    </div>
  </div>
</section>
```

#### Stats Section
```tsx
<section className="border-y bg-[#f8f9fa] py-12">
  <div className="container mx-auto px-4 lg:px-8">
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
      {/* Stat cards */}
    </div>
  </div>
</section>
```

#### Dashboard Layout
```tsx
<div className="flex min-h-screen bg-[#f8f9fa]">
  {/* Sidebar */}
  <aside className="w-64 border-r bg-white">
    {/* Navigation */}
  </aside>
  
  {/* Main Content */}
  <main className="flex-1 p-6">
    {/* Content */}
  </main>
</div>
```

### Mobile Responsiveness

#### Mobile-First Approach
- Base styles target mobile devices
- Progressive enhancement for larger screens
- Breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`

#### Mobile Menu
- Hamburger menu on mobile (`md:hidden`)
- Sheet/drawer component for mobile navigation
- Collapsible sidebar on dashboards

#### Responsive Images
- `object-cover` for hero images
- Aspect ratio preservation
- Responsive heights: `h-[250px] sm:h-[300px] md:h-[350px] lg:h-[320px]`

#### Touch-Friendly
- Minimum touch target: 44x44px
- Adequate spacing between interactive elements
- Swipe gestures for mobile navigation

---

## Accessibility Features

### ARIA Attributes
- `aria-label` for icon-only buttons
- `aria-hidden="true"` for decorative icons
- `aria-label` for skip links
- `role` attributes where appropriate

### Skip Links
```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-[#FF9933] focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg"
  aria-label="Skip to main content"
>
  Skip to main content
</a>
```

### Focus States
- Visible focus rings on interactive elements
- Custom focus colors matching brand
- Keyboard navigation support

### Color Contrast
- Text meets WCAG AA contrast ratios
- High contrast for important information
- Color not used as sole indicator

### Semantic HTML
- Proper heading hierarchy (h1 → h2 → h3)
- Semantic elements (`<nav>`, `<main>`, `<section>`, `<article>`)
- Form labels associated with inputs
- Button elements for actions, links for navigation

### Screen Reader Support
- `sr-only` class for visually hidden but accessible content
- Alt text for images
- Descriptive link text
- Form error messages associated with inputs

### Keyboard Navigation
- Tab order follows visual flow
- All interactive elements keyboard accessible
- Escape key closes modals/drawers
- Enter/Space activates buttons

---

## Component Patterns

### Card Pattern
```tsx
<Card className="border-t-4 border-t-[#FF9933] transition-shadow hover:shadow-lg">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### Button Variants
```tsx
<Button variant="default" className="bg-[#FF9933] hover:bg-[#FF9933]/90">
  Primary Action
</Button>

<Button variant="outline">Secondary Action</Button>

<Button variant="ghost">Tertiary Action</Button>
```

### Badge Usage
```tsx
<Badge className="bg-[#138808] text-white">Active</Badge>
<Badge variant="secondary">Inactive</Badge>
```

### Form Pattern
```tsx
<form onSubmit={handleSubmit} className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" required />
  </div>
  <Button type="submit">Submit</Button>
</form>
```

### Loading States
```tsx
{loading ? (
  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF9933] mx-auto"></div>
) : (
  <Content />
)}
```

---

## Constants & Configuration

### Application Constants (`src/constants/index.ts`)

```typescript
export const APP_NAME = "e-GramSeva";
export const APP_DESCRIPTION = "Digital Platform for Gram Panchayats";

export const COLORS = {
  PRIMARY: "#FF9933",
  SECONDARY: "#138808",
  WHITE: "#FFFFFF",
} as const;

export const REGISTRATION_STEPS = [
  { number: 1, title: "Personal Details" },
  { number: 2, title: "Panchayat Details" },
  { number: 3, title: "Document Upload" },
  { number: 4, title: "Review & Submit" },
] as const;

export const FILE_UPLOAD_LIMITS = {
  IMAGE_MAX_SIZE: 2 * 1024 * 1024, // 2MB
  PDF_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ACCEPTED_IMAGE_TYPES: [".pdf", ".jpg", ".jpeg", ".png"],
  ACCEPTED_PDF_TYPES: [".pdf"],
} as const;
```

---

## State Management

### Context API
- **AuthContext**: User authentication state
- Provides: `user`, `login()`, `logout()`, `isAuthenticated`

### Local Storage
- **useLocalStorage** hook for persistent state
- Language preference
- User preferences

---

## API Integration

### Service Structure (`src/services/api.ts`)
- Modular API functions organized by resource
- `panchayatAPI` - Panchayat operations
- `postsAPI` - Post management
- `schemesAPI` - Scheme management
- `announcementsAPI` - Announcements
- `analyticsAPI` - Analytics data
- `superAdminAPI` - Admin operations

---

## Error Handling

### Error Boundary
- `ErrorBoundary` component wraps application
- Catches React errors and displays fallback UI
- Prevents entire app crash

### Toast Notifications
- Success, error, warning, info messages
- Non-intrusive toast system
- Auto-dismiss with manual dismiss option

---

## Performance Optimizations

### Code Splitting
- Route-based code splitting
- Lazy loading for heavy components

### Image Optimization
- `ImageWithFallback` component
- Fallback images for broken URLs
- Lazy loading support

### Memoization
- React.memo for expensive components
- useMemo/useCallback where appropriate

---

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Development Guidelines

### Component Structure
1. Imports (React, third-party, local)
2. TypeScript interfaces/types
3. Component function
4. State and hooks
5. Event handlers
6. Render/return

### Naming Conventions
- Components: PascalCase (`LandingPage.tsx`)
- Files: Match component name
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE

### Code Organization
- One component per file
- Related components in same directory
- Shared utilities in `utils/`
- Types in `types/`

---

## Future Enhancements

### Planned Features
- Full dark mode implementation
- Additional language support
- Advanced analytics dashboard
- Real-time notifications
- Mobile app (PWA)
- Offline support
- Advanced search functionality

---

## Summary

The e-GramSeva platform is a comprehensive digital solution for Gram Panchayats, featuring:

- **Modern Tech Stack**: React + TypeScript + Tailwind CSS
- **Brand Identity**: Indian tricolor theme (Orange #FF9933, Green #138808, White)
- **Responsive Design**: Mobile-first, works on all devices
- **Accessibility**: WCAG compliant, keyboard navigation, screen reader support
- **Component Library**: 40+ reusable UI components
- **Multi-tenant**: Individual websites for each Panchayat
- **Content Management**: Posts, schemes, announcements, documents, galleries
- **Analytics**: Visitor tracking and engagement metrics
- **User Roles**: Super Admin, Panchayat Admin, Team Members

The design follows UX4G (User Experience for Government) standards, ensuring accessibility, usability, and compliance with government guidelines.

---

**Document Version**: 1.0  
**Last Updated**: 2025  
**Maintained By**: Development Team

