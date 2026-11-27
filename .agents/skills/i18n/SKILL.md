---
name: i18n
description: Internationalization patterns using react-intl. Use when working with translations, adding new messages to locale files, using useIntl or FormattedMessage, or when user asks about translation patterns in this codebase.
user-invocable: false
---

# Internationalization (i18n) Guide

The application uses `react-intl` for internationalization with a custom message system.

## Message Files

- **Message definitions**: `/src/i18n/src/locale/en.ts` - Contains all translation strings
- **Message paths**: `/src/i18n/src/messages.ts` - Exports `message` object with type-safe paths

## Usage Patterns

There are two ways to use translations in components:

### Pattern 1: useIntl Hook (Preferred for Dynamic Content)

```typescript
import { useIntl } from 'react-intl'
import { message } from '@/i18n/src/messages'

const MyComponent = () => {
  const { formatMessage: fm } = useIntl()

  // Correct - use message object for type-safe paths
  return <h1>{fm({ id: message.common.ui.appName })}</h1>

  // Incorrect - hardcoded strings are not type-safe
  return <h1>{fm({ id: 'common.ui.appName' })}</h1>
}
```

**When to use:**

- Dynamic content that changes based on user interaction
- Text that needs to be computed or concatenated
- Accessible labels for form elements
- Toast notifications and error messages

### Pattern 2: FormattedMessage Component (Preferred for Static Content)

```typescript
import { FormattedMessage } from 'react-intl'
import { message } from '@/i18n/src/messages'

const MyComponent = () => {
  // Correct - declarative and type-safe
  return (
    <h1>
      <FormattedMessage id={message.common.ui.appName} />
    </h1>
  )

  // With values interpolation
  return (
    <p>
      <FormattedMessage
        id={message.common.greeting}
        values={{ name: 'User' }}
      />
    </p>
  )
}
```

**When to use:**

- Static text in headings, labels, and descriptions
- Content that doesn't need to be stored in variables
- JSX content that benefits from declarative syntax

## Adding New Translations

### Step 1: Add to locale file

Add your translation string to `/src/i18n/src/locale/en.ts`:

```typescript
// In /src/i18n/src/locale/en.ts
export const messages = {
    common: {
        globalSearch: {
            title: 'Global Search',
            placeholder: 'Type to search...',
            noResults: 'No results found',
        },
    },
    orders: {
        create: {
            title: 'Create New Order',
            description: 'Fill in the form below to create a new order',
            success: 'Order created successfully',
        },
    },
}
```

### Step 2: Use via message object

The `message` object automatically mirrors the structure of the locale file:

```typescript
// In your component
import { useIntl } from 'react-intl'
import { message } from '@/i18n/src/messages'

const { formatMessage: fm } = useIntl()

// Access nested message paths
const title = fm({ id: message.common.globalSearch.title })
const orderTitle = fm({ id: message.orders.create.title })
```

## Interpolation and Values

Pass dynamic values to translations:

```typescript
// In locale file
export const messages = {
  user: {
    greeting: 'Hello, {name}!',
    itemCount: 'You have {count, plural, one {# item} other {# items}}',
    lastLogin: 'Last login: {date, date, short}'
  }
}

// In component
import { FormattedMessage } from 'react-intl'
import { message } from '@/i18n/src/messages'

<FormattedMessage
  id={message.user.greeting}
  values={{ name: userName }}
/>

<FormattedMessage
  id={message.user.itemCount}
  values={{ count: items.length }}
/>

<FormattedMessage
  id={message.user.lastLogin}
  values={{ date: new Date(lastLoginDate) }}
/>
```

## Best Practices

### Do

- Always use the `message` object for type-safe paths
- Use `useIntl` for dynamic content
- Use `FormattedMessage` for static content
- Organize messages by feature/domain in the locale file
- Use descriptive keys that indicate the content purpose

### Don't

- Hardcode message IDs as strings: `fm({ id: 'common.ui.appName' })`
- Create duplicate messages across different sections
- Use interpolation for complex HTML structures (use rich text formatting instead)

## Common Patterns

### Form Labels

```typescript
const { formatMessage: fm } = useIntl()

<Input
  label={fm({ id: message.forms.user.emailLabel })}
  placeholder={fm({ id: message.forms.user.emailPlaceholder })}
  error={fm({ id: message.forms.user.emailError })}
/>
```

### Button Text

```typescript
<Button>
  <FormattedMessage id={message.common.actions.save} />
</Button>
```

### Toast Notifications

```typescript
const { formatMessage: fm } = useIntl()

toast.success(fm({ id: message.orders.create.success }))
toast.error(fm({ id: message.orders.create.error }))
```

### Conditional Messages

```typescript
const { formatMessage: fm } = useIntl()

const statusMessage = isActive
    ? fm({ id: message.system.status.active })
    : fm({ id: message.system.status.inactive })
```

## File Organization

Organize messages by feature in the locale file:

```typescript
export const messages = {
    // Common/shared messages
    common: {
        ui: {
            /* ... */
        },
        actions: {
            /* ... */
        },
        validation: {
            /* ... */
        },
    },

    // Feature-specific messages
    orders: {
        list: {
            /* ... */
        },
        create: {
            /* ... */
        },
        edit: {
            /* ... */
        },
    },

    systems: {
        list: {
            /* ... */
        },
        details: {
            /* ... */
        },
        filters: {
            /* ... */
        },
    },

    // Forms
    forms: {
        user: {
            /* ... */
        },
        order: {
            /* ... */
        },
    },
}
```

## TypeScript Integration

The `message` object provides full TypeScript autocomplete and type checking:

```typescript
// TypeScript knows all available message paths
fm({ id: message.common.ui.appName }) // Valid
fm({ id: message.invalid.path }) // TypeScript error
```

This ensures you can't reference non-existent message keys at compile time.
