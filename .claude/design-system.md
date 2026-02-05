# Design System Guide

## Current State

The application has completed its migration to modern design patterns:

- **UI Components**: shadcn/ui components (Dialog, Sheet, Button, Card, etc.) - **Standard**
- **Legacy Components**: HeadlessUI components exist in older code - **Legacy only, do not use for new features**
- **Form Validation**: Zod validation - **Standard** (Yup is legacy)
- **Styling**: Tailwind CSS v4 with custom design system

## Guidelines

### Core Principles

1. **Always use shadcn/ui**: Use shadcn/ui components for all new features and components
2. **Always use Zod**: Use Zod for all form validation in new features
3. **Migrate when editing**: When modifying existing components, migrate HeadlessUI to shadcn/ui and Yup to Zod only if actively editing that code
4. **Modal system**: Use the dynamic modal system (`useDynamicModalStore`) with shadcn/ui Dialog and Sheet components
5. **Consistent patterns**: Follow established shadcn/ui patterns for accessibility and styling
6. **Don't proactively migrate**: Only migrate legacy code when you're actively working on that specific feature

## Component Usage

### shadcn/ui Components

The application uses shadcn/ui components located in `/src/components/ui/`:

**Available Components:**

- `Dialog` - Modal dialogs for confirmations, forms, alerts
- `Sheet` - Side panel modals for filters, forms, detailed views
- `Button` - All button variants (default, outline, ghost, destructive, etc.)
- `Card` - Container component with header, content, footer
- `Input` - Text input fields
- `Select` - Dropdown selection
- `Checkbox` - Checkbox inputs
- `RadioGroup` - Radio button groups
- `Switch` - Toggle switches
- `Textarea` - Multi-line text inputs
- `Label` - Form labels
- `Badge` - Status badges and tags
- `Alert` - Notification alerts
- `Table` - Table components

**Import Pattern:**

```typescript
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
```

### Button Variants

```typescript
// Default button
<Button>Click me</Button>

// Variants
<Button variant="default">Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
<Button variant="link">Link</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Dialog Usage

```typescript
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogDescription>
        Dialog description text
      </DialogDescription>
    </DialogHeader>
    {/* Dialog content */}
  </DialogContent>
</Dialog>
```

### Sheet Usage

```typescript
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'

<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent side="left"> {/* or "right", "top", "bottom" */}
    <SheetHeader>
      <SheetTitle>Sheet Title</SheetTitle>
      <SheetDescription>
        Sheet description text
      </SheetDescription>
    </SheetHeader>
    {/* Sheet content */}
  </SheetContent>
</Sheet>
```

### Card Usage

```typescript
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Card content */}
  </CardContent>
  <CardFooter>
    {/* Card footer actions */}
  </CardFooter>
</Card>
```

## Form Validation with Zod

### Basic Zod Schema

```typescript
import { z } from 'zod'

const userSchema = z.object({
    email: z.string().email('Invalid email address'),
    name: z.string().min(2, 'Name must be at least 2 characters'),
    age: z.number().min(18, 'Must be at least 18 years old').optional(),
    role: z.enum(['admin', 'user', 'guest']),
    acceptTerms: z.boolean().refine(val => val === true, {
        message: 'You must accept the terms and conditions',
    }),
})

type UserFormData = z.infer<typeof userSchema>
```

### Integration with React Hook Form

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

type FormData = z.infer<typeof formSchema>

const MyForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = (data: FormData) => {
    console.log(data)
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  )
}
```

### Common Zod Validations

```typescript
// String validations
z.string().min(3)
z.string().max(100)
z.string().email()
z.string().url()
z.string().uuid()
z.string().regex(/^[A-Z0-9]+$/)
z.string().trim()
z.string().toLowerCase()
z.string().toUpperCase()

// Number validations
z.number().min(0)
z.number().max(100)
z.number().int()
z.number().positive()
z.number().negative()

// Array validations
z.array(z.string())
z.array(z.string()).min(1)
z.array(z.string()).max(10)
z.array(z.string()).nonempty()

// Object validations
z.object({ name: z.string() })
z.object({ name: z.string() }).strict() // No extra keys
z.object({ name: z.string() }).partial() // All fields optional

// Optional and nullable
z.string().optional()
z.string().nullable()
z.string().nullish() // optional + nullable

// Custom refinements
z.string().refine(val => val.length > 5, {
    message: 'Must be longer than 5 characters',
})

// Transform
z.string().transform(val => val.trim())

// Union types
z.union([z.string(), z.number()])
z.string().or(z.number())

// Discriminated unions
z.discriminatedUnion('type', [
    z.object({ type: z.literal('email'), email: z.string().email() }),
    z.object({ type: z.literal('phone'), phone: z.string() }),
])
```

## Styling with Tailwind CSS

### Utility-First Approach

```typescript
// ✅ Good - utility classes
<div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
  <Button className="px-4 py-2 text-sm font-medium">Click me</Button>
</div>

// ❌ Bad - inline styles
<div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
  <button style={{ padding: '8px 16px' }}>Click me</button>
</div>
```

### Using cn() Helper

Use the `cn()` utility from `/src/lib/utils.ts` for conditional classes:

```typescript
import { cn } from '@/lib/utils'

<Button
  className={cn(
    'px-4 py-2',
    isActive && 'bg-blue-500',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Click me
</Button>
```

### Dark Mode Support

The application has dark mode support. Use Tailwind's dark mode classes:

```typescript
<div className="bg-white dark:bg-gray-800 text-black dark:text-white">
  Content
</div>
```

### Custom Design Tokens

The application uses custom design tokens defined in Tailwind config:

```typescript
// Colors (use semantic names)
bg - background
text - foreground
border - border
bg - card
text - card - foreground
bg - primary
text - primary - foreground
bg - secondary
text - secondary - foreground
bg - muted
text - muted - foreground
bg - accent
text - accent - foreground
bg - destructive
text - destructive - foreground

// Spacing
;(p - 4, m - 4, gap - 4, space - y - 4)

// Border radius
;(rounded - sm, rounded - md, rounded - lg, rounded - xl)
```

## Migration Guide

### Migrating from HeadlessUI to shadcn/ui

**HeadlessUI Dialog → shadcn/ui Dialog:**

```typescript
// ❌ Old - HeadlessUI
import { Dialog } from '@headlessui/react'

<Dialog open={open} onClose={() => setOpen(false)}>
  <Dialog.Panel>
    <Dialog.Title>Title</Dialog.Title>
    {/* content */}
  </Dialog.Panel>
</Dialog>

// ✅ New - shadcn/ui
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
    {/* content */}
  </DialogContent>
</Dialog>
```

### Migrating from Yup to Zod

```typescript
// ❌ Old - Yup
import * as yup from 'yup'

const schema = yup.object().shape({
    email: yup.string().email().required(),
    age: yup.number().min(18).required(),
})

// ✅ New - Zod
import { z } from 'zod'

const schema = z.object({
    email: z.string().email(),
    age: z.number().min(18),
})
```

## Accessibility

shadcn/ui components come with built-in accessibility features:

- ARIA labels and roles
- Keyboard navigation
- Focus management
- Screen reader support

**Best Practices:**

```typescript
// Always provide accessible labels
<Label htmlFor="email">Email</Label>
<Input id="email" name="email" />

// Use semantic HTML
<Button type="submit">Submit</Button>
<Button type="button">Cancel</Button>

// Provide descriptions for complex components
<DialogDescription>
  This action cannot be undone.
</DialogDescription>
```

## Component Composition

Build complex UIs by composing shadcn/ui components:

```typescript
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const UserCard = ({ user }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>{user.name}</CardTitle>
        <Badge>{user.role}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground">{user.email}</p>
      <div className="mt-4 flex gap-2">
        <Button variant="outline" size="sm">Edit</Button>
        <Button variant="destructive" size="sm">Delete</Button>
      </div>
    </CardContent>
  </Card>
)
```

## Testing

Use `data-testid` for test selectors:

```typescript
<Button data-testid="submit-button">Submit</Button>

// In tests
const button = screen.getByTestId('submit-button')
```

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Zod Documentation](https://zod.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
