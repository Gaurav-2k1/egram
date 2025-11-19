# Multi-Language Support Guide (i18next)

## Overview

e-GramSeva now supports **4 languages**:
- **English** (en)
- **Marathi** (मराठी) (mr)
- **Hindi** (हिंदी) (hi)
- **Regional** (regional) - placeholder for other regional languages

## How It Works

We use **react-i18next**, the industry-standard internationalization framework for React applications.

### Key Features
✅ **Offline Translation** - No API calls needed, all translations are local  
✅ **Fast Performance** - Translations load instantly  
✅ **SEO Friendly** - Better for search engines  
✅ **Free & Open Source** - No costs involved  
✅ **Professional Quality** - Perfect for government applications  

## File Structure

```
src/
├── i18n.ts                    # i18next configuration
├── locales/
│   ├── en.json               # English translations
│   ├── mr.json               # Marathi translations
│   ├── hi.json               # Hindi translations
│   └── regional.json         # Regional language translations
└── components/
    └── main/
        ├── Header.tsx        # Uses translations
        └── LandingPage.tsx   # Uses translations
```

## How to Use Translations in Components

### 1. Import useTranslation Hook

```typescript
import { useTranslation } from 'react-i18next';
```

### 2. Use the Hook in Your Component

```typescript
export function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

### 3. Translation Key Format

Translation keys use dot notation to access nested objects:

```json
{
  "hero": {
    "title": "Welcome",
    "subtitle": "This is a subtitle"
  }
}
```

Access with: `t('hero.title')` → "Welcome"

## How to Change Language

The language selector is in the Header component (Globe icon). Users can click and select:
- English
- मराठी (Marathi)
- हिंदी (Hindi)
- Regional

The selected language is automatically saved to localStorage and persists across sessions.

## Adding New Translations

### Step 1: Add to Translation Files

Add your new key to all 4 language files:

**src/locales/en.json**
```json
{
  "mySection": {
    "newKey": "My English Text"
  }
}
```

**src/locales/mr.json**
```json
{
  "mySection": {
    "newKey": "माझा मराठी मजकूर"
  }
}
```

**src/locales/hi.json**
```json
{
  "mySection": {
    "newKey": "मेरा हिंदी पाठ"
  }
}
```

### Step 2: Use in Component

```typescript
const { t } = useTranslation();
return <p>{t('mySection.newKey')}</p>;
```

## Current Translated Sections

✅ **Navigation** - All menu items  
✅ **Hero Section** - Title, subtitle, buttons  
✅ **Stats Section** - All statistics labels  
✅ **Features Section** - Titles and descriptions  
✅ **Language Selector** - Dropdown labels  

## Adding More Components

To add translations to other components:

1. Import `useTranslation` hook
2. Add translation keys to all 4 JSON files
3. Replace hardcoded text with `t('key.path')`

Example:
```typescript
// Before
<h1>Welcome to e-GramSeva</h1>

// After
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();
<h1>{t('welcome.title')}</h1>
```

## Best Practices

1. **Always add to all 4 language files** - Keep translations in sync
2. **Use descriptive keys** - `hero.title` not `text1`
3. **Group related translations** - Use nested objects
4. **Get translations verified** - Especially for government content
5. **Test all languages** - Switch languages and verify UI

## Testing

1. Start the dev server: `npm run dev`
2. Open the application
3. Click the Globe icon in the header
4. Select different languages
5. Verify all text changes correctly

## Language Persistence

The selected language is saved in localStorage with key `language`. It will persist even after:
- Page refresh
- Browser restart
- Navigating between pages

## Future Enhancements

- Add more regional languages (Tamil, Telugu, Kannada, etc.)
- Add language-specific date/time formatting
- Add RTL support for languages that need it
- Add language-specific number formatting

## Troubleshooting

**Problem**: Text not changing when switching language  
**Solution**: Make sure the translation key exists in all language files

**Problem**: Seeing translation keys instead of text  
**Solution**: Check that the key path is correct and exists in the JSON file

**Problem**: Language not persisting  
**Solution**: Check browser localStorage is enabled

## Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)

