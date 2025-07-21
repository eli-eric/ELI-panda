# ELI-PANDA Refactoring Guide

## Executive Summary

This guide identifies key areas for improvement in the ELI-PANDA codebase to enhance maintainability, reduce technical debt, and improve code quality. The analysis reveals several patterns of code duplication, inconsistent error handling, and opportunities for better abstraction.

## 🎯 Priority Issues

### 1. **Toast Notification Inconsistency** (High Priority)

**Problem**: Inconsistent error handling and notification patterns across the application.

**Current Issues**:

- Mixed use of `toast.error()` and `toast.success()` with inconsistent messaging
- Error handling scattered throughout components and hooks
- No centralized error handling strategy

**Examples Found**:

```typescript
// Inconsistent patterns:
toast.error('Failed to fetch data')
toast.error('something went wrong')
toast.error('Something went wrong: ' + error.message)
toast.error(`Error: ${e.response?.data}`)
```

**Recommended Solution**:

```typescript
// Create centralized error handler
export const useErrorHandler = () => {
  const handleError = useCallback(
    (error: Error | AxiosError, context?: string) => {
      const message = getErrorMessage(error, context)
      toast.error(message)
      // Optional: Send to error tracking service
      logError(error, context)
    },
    []
  )

  return { handleError }
}

// Standardized error messages
const getErrorMessage = (
  error: Error | AxiosError,
  context?: string
): string => {
  if (isAxiosError(error)) {
    if (error.response?.status === 409) {
      return 'Data was modified by another user. Please refresh and try again.'
    }
    return error.response?.data?.message || error.message
  }
  return context ? `${context}: ${error.message}` : error.message
}
```

### 2. **Duplicate Hook Patterns** (High Priority)

**Problem**: Similar data fetching hooks with repeated logic and inconsistent patterns.

**Current Issues**:

- Repeated error handling in data fetching hooks
- Inconsistent return object naming
- Similar mutation logic across multiple hooks

**Examples Found**:

```typescript
// Duplicate patterns in multiple hooks:
useEffect(() => {
  if (error) {
    toast.error('Failed to fetch data')
  }
}, [error])
```

**Recommended Solution**:

```typescript
// Create base hook with consistent patterns
export const useBaseQuery = <T>(
  queryFn: () => Promise<T>,
  options: {
    queryKey: string[]
    errorMessage?: string
    onError?: (error: Error) => void
  }
) => {
  const { handleError } = useErrorHandler()

  const query = useQuery({
    queryKey: options.queryKey,
    queryFn,
    onError: error => {
      handleError(error, options.errorMessage)
      options.onError?.(error)
    }
  })

  return {
    data: query.data,
    loading: query.isFetching,
    error: query.error,
    refetch: query.refetch
  }
}

// Usage example:
export const useUsers = () => {
  return useBaseQuery(() => fetchUsers(), {
    queryKey: ['users'],
    errorMessage: 'Failed to fetch users'
  })
}
```

### 3. **Complex Hook Dependencies** (Medium Priority)

**Problem**: Hooks with multiple responsibilities and complex internal state management.

**Current Issues**:

- Hooks managing both data fetching and business logic
- Complex useEffect dependencies
- Difficult to test and reuse

**Example Found**:

```typescript
// Complex hook in useSystemCreate.ts
export const useSystemCreate = () => {
  // 200+ lines with multiple responsibilities:
  // - Form validation
  // - Data transformation
  // - API calls
  // - Navigation logic
  // - Error handling
}
```

**Recommended Solution**:

```typescript
// Split into focused hooks
export const useSystemValidation = (systemForm: SystemDetailFormType) => {
  const validateSystem = useCallback(() => {
    if (!systemForm.name) {
      throw new Error('System name is required')
    }
    // Other validations
  }, [systemForm])

  return { validateSystem }
}

export const useSystemMutation = () => {
  return useMutation({
    mutationFn: createSystem,
    onSuccess: data => {
      toast.success('System created successfully')
    },
    onError: error => {
      toast.error(`Failed to create system: ${error.message}`)
    }
  })
}

export const useSystemCreate = () => {
  const { validateSystem } = useSystemValidation()
  const { mutate, isPending } = useSystemMutation()

  const createSystem = useCallback(
    (systemForm, saveAndExit) => {
      validateSystem()
      // Simplified logic
      mutate({ systemForm, saveAndExit })
    },
    [validateSystem, mutate]
  )

  return { createSystem, loading: isPending }
}
```

### 4. **Inconsistent Loading States** (Medium Priority)

**Problem**: Different patterns for handling loading states across components.

**Current Issues**:

- Some components use `loading`, others use `isPending`
- Inconsistent loading UI patterns
- No centralized loading state management

**Examples Found**:

```typescript
// Inconsistent naming:
const { loading } = useSystemMutation()
const { isPending } = useMutation()
const { isFetching } = useQuery()
```

**Recommended Solution**:

```typescript
// Standardize loading state interface
interface LoadingState {
  loading: boolean
  error?: Error | null
}

// Create consistent loading hook
export const useLoadingState = (states: boolean[]): LoadingState => {
  return {
    loading: states.some(Boolean),
    error: null // Can be extended
  }
}

// Usage:
const { loading } = useLoadingState([
  systemMutation.isPending,
  fileMutation.isPending
])
```

### 5. **GraphQL Fragment Duplication** (Medium Priority)

**Problem**: Repeated GraphQL fragments and queries across different modules.

**Current Issues**:

- Similar system detail fragments in multiple files
- Duplicate query patterns
- No fragment composition strategy

**Recommended Solution**:

```typescript
// Create shared fragments
export const SystemDetailFragment = gql`
  fragment SystemDetail on System {
    uid
    name
    description
    systemCode
    systemLevel
    location {
      uid
      name
      code
    }
    # ... other common fields
  }
`

// Compose queries using fragments
export const SystemQuery = gql`
  query SystemQuery($where: SystemWhere) {
    systems(where: $where) {
      ...SystemDetail
      parentPath {
        uid
        name
      }
    }
  }
  ${SystemDetailFragment}
`
```

### 6. **Form Validation Migration to Zod** (Medium Priority)

**Problem**: Using Yup for form validation when Zod provides better TypeScript integration and performance.

**Current Issues**:

- Yup schemas don't infer TypeScript types automatically
- Runtime validation overhead
- Separate type definitions needed for forms

**Recommended Solution**:

```typescript
// Replace Yup schemas with Zod
// ❌ Old Yup pattern:
const yupSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email().required('Email is required')
})

// ✅ New Zod pattern:
const zodSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email format')
})

// Type inference automatically available
type FormData = z.infer<typeof zodSchema>

// React Hook Form integration
const methods = useForm<FormData>({
  resolver: zodResolver(zodSchema),
  defaultValues: {}
})
```

### 7. **Pages Directory to App Directory Migration** (High Priority)

**Problem**: Using legacy Pages Directory when App Directory provides better performance, developer experience, and modern patterns.

**Current Issues**:

- Limited layout composition
- No streaming and Suspense support
- Complex routing patterns
- No route groups for organization

**Migration Strategy**:

```typescript
// 1. File Structure Migration
// ❌ Old Pages Directory:
pages/
├── _app.tsx
├── _document.tsx
├── index.tsx
├── systems/
│   ├── index.tsx
│   └── [uid].tsx
└── api/

// ✅ New App Directory:
app/
├── layout.tsx          # Root layout
├── page.tsx           # Home page
├── globals.css        # Global styles
├── (dashboard)/       # Route group
│   ├── layout.tsx     # Dashboard layout
│   ├── systems/
│   │   ├── page.tsx   # Systems list
│   │   └── [uid]/
│   │       └── page.tsx # System detail
├── (auth)/           # Auth route group
│   ├── layout.tsx
│   └── login/
│       └── page.tsx
└── api/              # API routes remain the same
```

**Benefits**:

- **Streaming**: Improved loading performance with React 18 features
- **Layouts**: Nested layouts with automatic composition
- **Route Groups**: Better organization with `(groupName)` syntax
- **Loading/Error States**: Built-in `loading.tsx` and `error.tsx` files
- **Server Components**: Better performance and SEO

## 📋 Detailed Migration Guides

### 🔄 App Directory Migration Guide

#### Step 1: Create App Directory Structure

```bash
# Create the new app directory structure
mkdir -p src/app/(dashboard)/(auth)
mkdir -p src/app/(dashboard)/systems
mkdir -p src/app/(dashboard)/orders
mkdir -p src/app/(dashboard)/catalogue
mkdir -p src/app/(auth)/login
mkdir -p src/app/api
```

#### Step 2: Root Layout Migration

```typescript
// src/app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ELI-PANDA',
  description: 'Operations and maintenance database for ELI facilities',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

#### Step 3: Dashboard Layout with Sidebar

```typescript
// src/app/(dashboard)/layout.tsx
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

#### Step 4: Page Migration Examples

```typescript
// src/app/(dashboard)/systems/page.tsx
import { SystemsContainer } from '@/modules/systems/SystemsContainer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Systems | ELI-PANDA',
  description: 'Manage system hierarchy and components',
}

export default function SystemsPage() {
  return <SystemsContainer />
}

// src/app/(dashboard)/systems/[uid]/page.tsx
import { SystemDetailContainer } from '@/modules/systemItem/SystemDetailContainer'

interface SystemDetailPageProps {
  params: {
    uid: string
  }
}

export default function SystemDetailPage({ params }: SystemDetailPageProps) {
  return <SystemDetailContainer uid={params.uid} />
}
```

#### Step 5: Loading and Error States

```typescript
// src/app/(dashboard)/systems/loading.tsx
import { SystemsTableSkeleton } from '@/components/skeletons/systems-table-skeleton'

export default function Loading() {
  return <SystemsTableSkeleton />
}

// src/app/(dashboard)/systems/error.tsx
'use client'

import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <AlertCircle className="h-10 w-10 text-destructive mb-4" />
      <h2 className="text-lg font-semibold mb-2">Something went wrong!</h2>
      <p className="text-muted-foreground mb-4">{error.message}</p>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  )
}
```

### 🎨 shadcn/ui Migration Guide

#### Step 1: Install and Configure shadcn/ui

```bash
# Install shadcn/ui CLI
npx shadcn-ui@latest init

# Install core components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add select
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
npx shadcn-ui@latest add table
npx shadcn-ui@latest add form
```

#### Step 2: Component Migration Map

##### Button Migration

```typescript
// ❌ Before: Custom Button
interface CustomButtonProps {
  ?: boolean
  secondary?: boolean
  loading?: boolean
  buttonSize?: 'small' | 'medium' | 'large'
  className?: string
  onClick?: () => void
  children: React.ReactNode
}

const CustomButton = ({ , secondary, loading, buttonSize, ...props }) => {
  const classes = cn(
    'px-4 py-2 rounded',
   && 'bg-blue-500 text-white',
    secondary && 'bg-gray-200 text-gray-900',
    buttonSize === 'large' && 'px-6 py-3 text-lg'
  )

  return <button className={classes} {...props} />
}

// ✅ After: shadcn/ui Button
import { Button } from '@/components/ui/button'

const MyButton = () => (
  <Button
    variant="default" // or "secondary", "destructive", "outline", "ghost"
    size="lg" // or "sm", "default", "icon"
    disabled={loading}
  >
    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
    Click me
  </Button>
)
```

##### Dialog/Modal Migration

```typescript
// ❌ Before: HeadlessUI Dialog
import { Dialog, Transition } from '@headlessui/react'

const Modal = ({ open, onClose, title, children }) => (
  <Transition show={open}>
    <Dialog onClose={onClose}>
      <Transition.Child
        enter="ease-out duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </Transition.Child>

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6">
              <Dialog.Title className="text-lg font-medium">{title}</Dialog.Title>
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>
    </Dialog>
  </Transition>
)

// ✅ After: shadcn/ui Dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const Modal = ({ open, onOpenChange, title, children, trigger }) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
)
```

##### Form Components Migration

```typescript
// ❌ Before: Custom Form Components
const FormField = ({ label, name, error, children }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    {children}
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
)

const CustomInput = ({ className, ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md ${className}`}
    {...props}
  />
)

// ✅ After: shadcn/ui Form Components
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const SystemForm = () => {
  const form = useForm<SystemFormData>({
    resolver: zodResolver(systemSchema),
    defaultValues: {}
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>System Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter system name" {...field} />
              </FormControl>
              <FormDescription>
                This is the display name for the system.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
```

#### Step 3: Table Migration

```typescript
// ❌ Before: Custom Table with TanStack Table
const CustomTable = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden border border-gray-200 rounded-lg">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ✅ After: shadcn/ui Table
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const SystemsTable = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                {row.getVisibleCells().map(cell => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
```

#### Step 4: Toast Notifications Migration

```typescript
// ❌ Before: react-hot-toast
import toast from 'react-hot-toast'

const showSuccess = (message: string) => {
  toast.success(message)
}

// ✅ After: shadcn/ui toast
import { useToast } from '@/components/ui/use-toast'

const MyComponent = () => {
  const { toast } = useToast()

  const showSuccess = (message: string) => {
    toast({
      title: "Success",
      description: message,
    })
  }

  const showError = (message: string) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
    })
  }
}

// Add Toaster to root layout
// src/app/layout.tsx
import { Toaster } from '@/components/ui/toaster'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
```

### 🔄 Migration Workflow

#### Week-by-Week Breakdown

**Week 1: Foundation Setup**

- Set up App Directory structure
- Install and configure shadcn/ui
- Create basic layouts and routing
- Migrate core pages (dashboard, login)

**Week 2: Component Migration**

- Replace Button, Card, Input components
- Migrate Dialog/Modal components
- Update Form components
- Test component functionality

**Week 3: Complex Components**

- Migrate Table components
- Replace Dropdown/Select components
- Update Toast notifications
- Migrate Tab components

**Week 4: Integration & Testing**

- Update all page components
- Test routing and layouts
- Fix styling issues
- Performance testing

#### Migration Checklist per Component

For each component migration:

- [ ] Identify current usage patterns
- [ ] Map to shadcn/ui equivalent
- [ ] Create migration script/utility
- [ ] Update imports across codebase
- [ ] Test functionality and styling
- [ ] Update documentation

### 📱 Mobile-First Considerations

When migrating to shadcn/ui, ensure responsive design:

```typescript
// Use Tailwind responsive classes
<Card className="w-full max-w-sm md:max-w-md lg:max-w-lg">
  <CardHeader>
    <CardTitle className="text-lg md:text-xl">System Details</CardTitle>
  </CardHeader>
  <CardContent className="space-y-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input id="name" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="code">Code</Label>
        <Input id="code" />
      </div>
    </div>
  </CardContent>
</Card>
```

## 🚀 Phased Migration Strategy

### Overview

This migration strategy follows a two-phase approach to minimize risk and ensure continuous functionality:

1. **Phase 1**: Migrate all UI components to shadcn/ui while keeping Pages Directory
2. **Phase 2**: Gradually migrate to App Directory with coexistence support

This approach allows teams to validate UI changes before tackling routing architecture, reducing complexity and debugging challenges.

---

## 📋 Phase 1: shadcn/ui Migration (Weeks 1-4)

### Week 1: Foundation & Setup

#### Day 1-2: shadcn/ui Installation & Configuration

```bash
# Install shadcn/ui
npx shadcn-ui@latest init

# Choose configuration:
# - TypeScript: Yes
# - Tailwind CSS: Yes
# - src/ directory: Yes
# - App Router: No (we'll add this in Phase 2)
# - Import alias: @/components and @/lib

# Install core components
npx shadcn-ui@latest add button
npx shadcn-ui@latest add card
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add form
npx shadcn-ui@latest add table
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add toast
```

**Expected File Structure After Setup:**

```
src/
├── components/
│   └── ui/           # shadcn/ui components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── dialog.tsx
│       └── ...
├── lib/
│   └── utils.ts      # cn() utility function
└── ...
```

#### Day 3-5: Create Component Migration Map

Create a comprehensive mapping document:

```typescript
// migration-map.ts
export const COMPONENT_MIGRATION_MAP = {
  // Buttons
  'src/components/Buttons.tsx': '@/components/ui/button',
  'src/components/button-loader.comp.tsx':
    '@/components/ui/button + @/components/ui/spinner',

  // Form Components
  'HeadlessUI Listbox': '@/components/ui/select',
  'HeadlessUI Combobox': '@/components/ui/combobox',
  'Custom Input': '@/components/ui/input',
  'Custom Textarea': '@/components/ui/textarea',

  // Layout Components
  'HeadlessUI Dialog': '@/components/ui/dialog',
  'HeadlessUI Disclosure': '@/components/ui/collapsible',
  'Custom Card': '@/components/ui/card',
  'Custom Modal': '@/components/ui/dialog',

  // Navigation
  'HeadlessUI Menu': '@/components/ui/dropdown-menu',
  'HeadlessUI Tab': '@/components/ui/tabs',

  // Data Display
  'Custom Table': '@/components/ui/table',
  'Custom Badge': '@/components/ui/badge',
  'Custom Avatar': '@/components/ui/avatar',

  // Feedback
  'react-hot-toast': '@/components/ui/toast + @/components/ui/use-toast',
  'Custom Alert': '@/components/ui/alert',
  'Custom Progress': '@/components/ui/progress'
} as const
```

### Week 2: Core Component Migration

#### Priority Order:

1. **Button Components** (Day 1-2)
2. **Form Components** (Day 3-4)
3. **Card/Layout Components** (Day 5)

#### Day 1-2: Button Migration

**Before (src/components/Buttons.tsx):**

```typescript
// Current custom button implementation
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  disabled?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export const CustomButton = ({
  variant = 'primary',
  loading,
  ...props
}: ButtonProps) => {
  // Custom implementation
}
```

**After (using shadcn/ui):**

```typescript
// src/components/ui/button.tsx (auto-generated by shadcn/ui)
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**Migration Script:**

```typescript
// scripts/migrate-buttons.ts
import { replaceInFiles } from './utils'

const buttonMigrations = [
  {
    from: `import { CustomButton } from '@/components/Buttons'`,
    to: `import { Button } from '@/components/ui/button'`
  },
  {
    from: `<CustomButton variant="primary"`,
    to: `<Button variant="default"`
  },
  {
    from: `<CustomButton variant="danger"`,
    to: `<Button variant="destructive"`
  }
]

buttonMigrations.forEach(migration => {
  replaceInFiles(['src/**/*.tsx', 'src/**/*.ts'], migration.from, migration.to)
})
```

#### Day 3-4: Form Component Migration

**Form Component Before:**

```typescript
// HeadlessUI Listbox usage
import { Listbox } from '@headlessui/react'

<Listbox value={selected} onChange={setSelected}>
  <Listbox.Button className="...">
    {selected?.name}
  </Listbox.Button>
  <Listbox.Options className="...">
    {options.map((option) => (
      <Listbox.Option key={option.id} value={option}>
        {option.name}
      </Listbox.Option>
    ))}
  </Listbox.Options>
</Listbox>
```

**Form Component After:**

```typescript
// shadcn/ui Select usage
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

<Select value={selected?.id} onValueChange={handleChange}>
  <SelectTrigger>
    <SelectValue placeholder="Select an option" />
  </SelectTrigger>
  <SelectContent>
    {options.map((option) => (
      <SelectItem key={option.id} value={option.id}>
        {option.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>
```

### Week 3: Complex Component Migration

#### Day 1-2: Dialog/Modal Migration

**Modal Before (HeadlessUI):**

```typescript
import { Dialog } from '@headlessui/react'

export const CustomModal = ({ open, onClose, children, title }) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white">
          <Dialog.Title>{title}</Dialog.Title>
          {children}
        </Dialog.Panel>
      </div>
    </Dialog>
  )
}
```

**Modal After (shadcn/ui):**

```typescript
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export const CustomModal = ({ open, onOpenChange, children, title, description }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
```

#### Day 3-4: Table Migration

**Table Before:**

```typescript
// Custom table implementation
export const DataTable = ({ data, columns }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {/* Custom header implementation */}
        </thead>
        <tbody>
          {/* Custom row implementation */}
        </tbody>
      </table>
    </div>
  )
}
```

**Table After:**

```typescript
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export const DataTable = ({ data, columns }) => {
  return (
    <Table>
      <TableCaption>List of items</TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.key}>{column.title}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            {columns.map((column) => (
              <TableCell key={column.key}>
                {row[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

### Week 4: Layout & Navigation Migration

#### Day 1-3: Layout Component Updates

**Update src/components/layout/Layout.tsx:**

```typescript
// Before: Custom layout with HeadlessUI
import { Disclosure } from '@headlessui/react'

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Disclosure as="nav" className="bg-white shadow">
        {/* Custom navigation */}
      </Disclosure>
      <main className="py-10">
        {children}
      </main>
    </div>
  )
}
```

```typescript
// After: Layout with shadcn/ui components
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Systems</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* Navigation content */}
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </header>
      <main className="container py-6">
        {children}
      </main>
    </div>
  )
}
```

#### Day 4-5: Toast Migration

**Before (react-hot-toast):**

```typescript
import toast from 'react-hot-toast'

// In _app.tsx
<Toaster
  position="top-center"
  reverseOrder={false}
  toastOptions={{ duration: 1000 }}
>
  {t => <Notification t={t} />}
</Toaster>

// Usage
toast.error('Something went wrong')
toast.success('Operation completed')
```

**After (shadcn/ui toast):**

```typescript
// src/components/ui/use-toast.ts (generated by shadcn/ui)
import { toast } from "@/components/ui/use-toast"

// In app/layout.tsx or _app.tsx
import { Toaster } from "@/components/ui/toaster"

<Toaster />

// Usage
import { useToast } from "@/components/ui/use-toast"

const { toast } = useToast()

toast({
  title: "Error",
  description: "Something went wrong",
  variant: "destructive",
})

toast({
  title: "Success",
  description: "Operation completed",
})
```

---

## 📋 Phase 2: App Directory Migration (Weeks 5-8)

### Week 5: Foundation & Coexistence Setup

#### Day 1-2: Create App Directory Structure

```bash
# Create app directory structure
mkdir -p src/app
mkdir -p src/app/(dashboard)
mkdir -p src/app/(auth)

# Create initial files
touch src/app/layout.tsx
touch src/app/page.tsx
touch src/app/globals.css
touch src/app/(dashboard)/layout.tsx
touch src/app/(auth)/layout.tsx
```

**Expected Directory Structure:**

```
src/
├── app/                    # New App Directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── (dashboard)/       # Route group
│   │   ├── layout.tsx     # Dashboard layout
│   │   └── systems/       # Systems pages
│   │       ├── page.tsx   # Systems list
│   │       └── [id]/      # Dynamic routes
│   │           └── page.tsx
│   └── (auth)/            # Auth route group
│       ├── layout.tsx     # Auth layout
│       └── login/
│           └── page.tsx
└── pages/                 # Existing Pages Directory
    ├── _app.tsx          # Keep during transition
    ├── _document.tsx     # Keep during transition
    └── ...               # Existing pages
```

#### Day 3-4: Provider Coexistence Strategy

Create a shared provider composition that works with both routing systems:

**src/components/providers/providers.tsx** (New file):

```typescript
'use client'

import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { lazy, Suspense, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { IntlProvider } from 'react-intl'
import { messages } from 'src/i18n/src'

import { GenereralModal } from '@/components/overlays/modal/modal.comp'
import { WarningModal } from '@/components/WarningModal'
import { Toaster } from '@/components/ui/toaster'
import { useDarkModeStore } from '@/store/useDarkModeStore'
import { getQueryClient } from '@/utils/queryClient'

const ReactQueryDevtoolsProduction = lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    d => ({
      default: d.ReactQueryDevtools
    })
  )
)

interface ProvidersProps {
  children: React.ReactNode
  session?: any
  dehydratedState?: any
}

export function Providers({ children, session, dehydratedState }: ProvidersProps) {
  const [queryClient] = useState(() => getQueryClient())
  const setStoredTheme = useDarkModeStore(state => state.setStoredTheme)

  useEffect(() => {
    setStoredTheme()
  }, [setStoredTheme])

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <SessionProvider session={session} refetchOnWindowFocus={false}>
          <IntlProvider locale={'en'} messages={messages.en}>
            <DndProvider backend={HTML5Backend}>
              {children}
              <GenereralModal />
              <WarningModal />
              <Toaster />
            </DndProvider>
          </IntlProvider>
        </SessionProvider>
      </HydrationBoundary>
      {process.env.NODE_ENV === 'development' && (
        <Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </Suspense>
      )}
    </QueryClientProvider>
  )
}
```

#### Day 5: Update \_app.tsx to Use Shared Providers

**Updated src/pages/\_app.tsx:**

```typescript
import '../styles/globals.css'

import type { AppProps } from 'next/app'

import { Layout } from '@/components/layout/Layout'
import { Providers } from '@/components/providers/providers'

const App = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <Providers session={session} dehydratedState={pageProps.dehydratedState}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Providers>
  )
}

export default App
```

### Week 6: App Directory Layouts

#### Day 1-2: Root Layout Setup

**src/app/layout.tsx:**

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { Providers } from '@/components/providers/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ELI-PANDA',
  description: 'Library Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

**src/app/globals.css:**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

#### Day 3-4: Dashboard Layout

**src/app/(dashboard)/layout.tsx:**

```typescript
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
```

#### Day 5: Auth Layout

**src/app/(auth)/layout.tsx:**

```typescript
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        {children}
      </div>
    </div>
  )
}
```

### Week 7: Page Migration

#### Day 1-2: Dashboard Home Page

**src/app/(dashboard)/page.tsx:**

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to the ELI-PANDA library management system.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +10.1% from last month
            </p>
          </CardContent>
        </Card>
        {/* More cards... */}
      </div>
    </div>
  )
}
```

#### Day 3-4: Systems Page Migration

**src/app/(dashboard)/systems/page.tsx:**

```typescript
import { Suspense } from 'react'
import { SystemsList } from '@/components/systems/SystemsList'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export default function SystemsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Systems</h1>
          <p className="text-muted-foreground">
            Manage your library systems and configurations.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add System
        </Button>
      </div>

      <Suspense fallback={<div>Loading systems...</div>}>
        <SystemsList />
      </Suspense>
    </div>
  )
}
```

**src/app/(dashboard)/systems/loading.tsx:**

```typescript
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
```

#### Day 5: Error Boundaries

**src/app/(dashboard)/systems/error.tsx:**

```typescript
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Something went wrong!</CardTitle>
          <CardDescription>
            There was an error loading the systems page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={reset} className="w-full">
            Try again
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Week 8: Coexistence & Testing

#### Day 1-2: Update Next.js Configuration

**next.config.js:**

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true // Enable App Directory
  },
  // Ensure both routing systems can coexist
  rewrites: async () => {
    return {
      beforeFiles: [
        // Redirect old pages to new app routes if needed
        {
          source: '/systems',
          destination: '/systems'
        }
      ]
    }
  }
}

module.exports = nextConfig
```

#### Day 3-4: Progressive Migration Script

Create a script to help with incremental migration:

**scripts/migrate-page.ts:**

```typescript
import fs from 'fs'
import path from 'path'

interface MigrationOptions {
  pagePath: string
  appPath: string
  layoutType: 'dashboard' | 'auth' | 'public'
}

export function migratePage({
  pagePath,
  appPath,
  layoutType
}: MigrationOptions) {
  const pageContent = fs.readFileSync(pagePath, 'utf-8')

  // Extract component logic
  const componentMatch = pageContent.match(
    /export default function\s+(\w+)\s*\([^)]*\)\s*{([\s\S]*?)^}/m
  )

  if (!componentMatch) {
    throw new Error('Could not find default export function')
  }

  const [, componentName, componentBody] = componentMatch

  // Create new App Directory page
  const newPageContent = `
export default function ${componentName}() {
  ${componentBody}
}
  `.trim()

  // Ensure directory exists
  const dir = path.dirname(appPath)
  fs.mkdirSync(dir, { recursive: true })

  // Write new page
  fs.writeFileSync(appPath, newPageContent)

  console.log(`✅ Migrated ${pagePath} → ${appPath}`)
}

// Usage example
migratePage({
  pagePath: 'src/pages/systems/index.tsx',
  appPath: 'src/app/(dashboard)/systems/page.tsx',
  layoutType: 'dashboard'
})
```

#### Day 5: Testing & Validation

**Create test script for both routing systems:**

```bash
#!/bin/bash
# test-coexistence.sh

echo "🧪 Testing Pages Directory routes..."
curl -s http://localhost:3000/api/health > /dev/null && echo "✅ API routes working"

echo "🧪 Testing App Directory routes..."
curl -s http://localhost:3000/systems > /dev/null && echo "✅ App Directory routes working"

echo "🧪 Testing provider coexistence..."
npm run build && echo "✅ Build successful with both routing systems"

echo "🧪 Running integration tests..."
npm run test:e2e
```

---

## 🔄 Migration Checklist

### Phase 1: shadcn/ui Migration ✅

- [ ] **Week 1**: Foundation & Setup

  - [ ] Install and configure shadcn/ui
  - [ ] Create component migration map
  - [ ] Set up development workflow

- [ ] **Week 2**: Core Component Migration

  - [ ] Migrate Button components
  - [ ] Migrate Form components (Input, Select, etc.)
  - [ ] Migrate Card/Layout components

- [ ] **Week 3**: Complex Component Migration

  - [ ] Migrate Dialog/Modal components
  - [ ] Migrate Table components
  - [ ] Update data display components

- [ ] **Week 4**: Layout & Navigation
  - [ ] Update Layout component
  - [ ] Migrate Toast notifications
  - [ ] Test all UI components

### Phase 2: App Directory Migration ✅

- [ ] **Week 5**: Foundation & Coexistence Setup

  - [ ] Create App Directory structure
  - [ ] Set up shared provider composition
  - [ ] Update \_app.tsx to use shared providers
  - [ ] Test coexistence setup

- [ ] **Week 6**: App Directory Layouts

  - [ ] Create root layout (app/layout.tsx)
  - [ ] Create dashboard layout
  - [ ] Create auth layout
  - [ ] Set up global styles

- [ ] **Week 7**: Page Migration

  - [ ] Migrate dashboard home page
  - [ ] Migrate systems pages
  - [ ] Add loading states
  - [ ] Add error boundaries

- [ ] **Week 8**: Coexistence & Testing
  - [ ] Configure Next.js for both systems
  - [ ] Create migration scripts
  - [ ] Test both routing systems
  - [ ] Performance testing
  - [ ] Gradual rollout planning

---

## 🚨 Critical Coexistence Notes

### Provider Strategy During Migration

**The key to successful coexistence is shared provider composition:**

1. **Create shared providers** that work with both routing systems
2. **Keep \_app.tsx minimal** during transition
3. **Gradually move pages** from pages/ to app/
4. **Test thoroughly** at each step
5. **Monitor performance** of both systems

### URL Routing Considerations

```typescript
// Both systems can handle the same URLs:
// pages/systems/index.tsx → http://localhost:3000/systems
// app/(dashboard)/systems/page.tsx → http://localhost:3000/systems

// Next.js will prefer App Directory routes when both exist
// Use this for gradual migration without breaking existing URLs
```

### Data Fetching Compatibility

```typescript
// Pages Directory (keep during migration)
export async function getServerSideProps() {
  // existing SSR logic
}

// App Directory (new pages)
export default async function Page() {
  // Server Components with async data fetching
  const data = await fetchData()
  return <div>{/* render data */}</div>
}
```

This phased approach ensures:

- ✅ **Continuous functionality** throughout migration
- ✅ **Reduced risk** by separating UI and routing concerns
- ✅ **Team productivity** with clear weekly milestones
- ✅ **Easy rollback** if issues arise
- ✅ **Gradual learning** curve for the development team
