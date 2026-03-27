---
applyTo: '**'
---

# ELI-PANDA AI Instructions

## Project Overview

ELI-PANDA is a sophisticated full-stack web application for managing operations and maintenance database for ELI (Extreme Light Infrastructure) facilities. The application focuses on spare parts management, system maintenance, and equipment tracking.

### Core Technologies & Stack

- **Frontend**: Next.js 15 with React 19.1.0, TypeScript
- **Architecture**: Page Directory (Page Router), new modules architecture in App Directory for modern features
- **Styling**: TailwindCSS v4 with shadcn/ui component library
- **State Management**: Zustand for global state, React Hook Form for form state
- **Data Fetching**: TanStack React Query v5 for REST API caching and GraphQL requests with ApolloServer
- **Database**: Neo4j (Graph Database) accessed via GraphQL API
- **Authentication**: NextAuth.js with Azure AD integration
- **File Storage**: MinIO (S3-compatible object storage)
- **Testing**: Jest with React Testing Library, Playwright for end-to-end testing
- **Development**: TypeScript strict mode, ESLint, Prettier

## Architecture & Patterns

### Folder Structure

```
src/
├── pages/              # Application entry point (Page Router)
│   ├── api/          # API routes
│   ├── _app.tsx      # Custom App component
│   ├── _document.tsx  # Custom Document component
│   ├── index.tsx      # Login page
│   ├── dashboard/    # Dashboard pages
│   ├── systems/      # Systems management pages
│   ├── catalogue/    # Catalogue management pages
│   ├── orders/       # Order management pages
│   ├── roomCards/    # Room card management pages
│   ├── publications/ # Document management pages
│   ├── services/     # Service management pages
│   ├── administration/ # User and permission management pages
│   └── 404.tsx       # Custom 404 page
├── public/           # Static assets (images, fonts, etc.)
├── app/              # App Directory (App Router)
│   ├── (auth)/      # Route groups for auth pages
│   ├── (dashboard)/ # Route groups for dashboard
│   ├── globals.css  # Global styles even for Page Router
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Root page
├── components/       # Reusable UI components (shadcn/ui)
│   └── ui/          # shadcn/ui components
├── hooks/           # Custom React hooks
├── lib/             # Utility libraries and configurations
├── modules/         # Feature-based modules (domain-driven design)
│   ├── administration/
│   ├── auth/
│   ├── catalogue/
│   ├── catalogueItem/
│   ├── codebooks/
│   ├── layout/
│   ├── orderItem/
│   ├── orders/
│   ├── publication/
│   ├── publications/
│   ├── roomCard/
│   ├── roomCards/
│   ├── services/
│   ├── serviceTypeItem/
│   ├── shared/
│   ├── system-type-edit/
│   ├── systemItem/
│   ├── systems/
│   ├── systems-multi-move/
│   ├── systemsMoving/
│   ├── systemsSpareParts/
├── server/          # Server-side utilities
├── store/           # Zustand stores
├── types/           # TypeScript type definitions
└── utils/           # Utility functions
```

### Module-Based Architecture

Each feature is organized as a module containing:

- `components/` - UI components specific to the module
- `hooks/` - Custom hooks for data fetching and logic
- `types/` - TypeScript interfaces and types
- `utils/` - Module-specific utilities
- `store/` - Zustand stores if needed

### Key Modules

- **systems** - System management and hierarchy
- **catalogue** - Parts and items catalog
- **orders** - Order management
- **roomCards** - Room card management
- **publications** - Document management
- **services** - Service management
- **administration** - User and permission management

## Code Patterns & Conventions

### Data Fetching Patterns

#### REST API with TanStack Query and queryFetcher

```typescript
// Standard pattern using queryFetcher utility
export const useOrders = () => {
    const { query } = useQueryManager('orders')

    const queryKey: QueryFetcherKey = useMemo(() => ['orders', { query }], [query])

    const { data, isFetching, error, refetch } = useQuery({
        queryKey,
        queryFn: queryFetcher<OrderListResponse>('orders'),
        placeholderData: keepPreviousData,
    })

    return { orderList: data, loading: isFetching, error, mutate: refetch }
}
```

#### Key Utilities for REST API

- **`queryFetcher`** - Centralized query function factory that uses getEndpoints
- **`queryMutate`** - Centralized mutation function factory for POST/PUT/DELETE
- **`getEndpoints`** - Single source of truth for all API endpoints
- **`QueryFetcherKey`** - Type for consistent query keys: `[string, EndpointProps] | [string]`

#### GraphQL with Custom useGraphQL Hook

```typescript
// GraphQL query with fragments
const SYSTEM_DETAIL_QUERY = gql(`
  query SystemDetail($where: SystemWhere) {
    systems(where: $where) {
      ...SystemDetailFragment
    }
  }
`)

export const useSystemDetail = (uid?: string) => {
    const { data, loading, error } = useGraphQL(SYSTEM_DETAIL_QUERY, {
        variables: { where: { uid } },
        enabled: !!uid,
    })

    const systemDetail = useFragment(SystemDetailFragment, data?.systems[0])
    return { systemDetail, loading, error }
}
```

#### Mutations with queryMutate

```typescript
export const useSystemDelete = ({ system, queryKey }) => {
    const queryClient = useQueryClient()

    const { mutate, isPending } = useMutation({
        mutationFn: queryMutate('system', 'delete', { uid: system.uid }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey })
            toast.success('System deleted successfully')
        },
    })

    return { deleteSystem: mutate, isPending }
}
```

### Form Management

#### React Hook Form with Zod Validation

```typescript
const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: z.object({
    uid: z.string(),
    name: z.string()
  }).refine(val => val.uid, 'Category is required')
})

export const MyFormComponent = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: {}
  })

  return (
    <Form {...methods}>
      {/* Form fields */}
    </Form>
  )
}
```

### Component Patterns

#### Container/Component Pattern

```typescript
// Container (business logic)
export const SystemDetailContainer = () => {
  const { systemDetail, loading } = useSystemDetail()
  const { updateSystem } = useSystemUpdate()

  if (loading) return <LoaderComponent />

  return <SystemDetailComponent system={systemDetail} onUpdate={updateSystem} />
}

// Component (presentation)
export const SystemDetailComponent = ({ system, onUpdate }) => {
  return (
    <Card>
      {/* UI markup */}
    </Card>
  )
}
```

### Custom Hooks for Business Logic

```typescript
export const useSystemDelete = ({ system, queryKey }) => {
    const queryClient = useQueryClient()
    const withWarningModal = useWarningModal()

    const { mutate, isPending } = useMutation({
        mutationFn: queryMutate('system', 'delete', { uid: system.uid }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey })
            toast.success('System deleted successfully')
        },
        onError: error => {
            toast.error(`Failed to delete system: ${error.message}`)
        },
    })

    return {
        deleteSystem: withWarningModal(mutate),
        isPending,
    }
}
```

### Data Fetching Hook Return Pattern

```typescript
// Consistent return object naming
return {
    orderList: data, // Main data with descriptive name
    loading: isFetching, // Always "loading" for consistency
    error, // Raw error object
    mutate: refetch, // Use "mutate" for refetch functions
}
```

## Key Utilities & Helpers

### Data Fetching Utilities

- **`queryFetcher<T>(endpointKey)`** - Factory for TanStack Query fetch functions
- **`queryMutate(endpointKey, method, options?)`** - Factory for mutation functions (options: `{ uid, responseType, query, ... }`)
- **`getEndpoints(options)`** - Central endpoint configuration
- **`useGraphQL(document, options)`** - Custom GraphQL query hook
- **`useGraphQLMutation(document, options)`** - Custom GraphQL mutation hook

### Query Key Patterns

```typescript
// Simple query key
;['systems'][
    // Query key with parameters
    ('systems', { query: { page: 1, limit: 10 } })
]

// Typed query key
const queryKey: QueryFetcherKey = ['orders', { query }]
```

### Error Handling in Data Fetching

```typescript
// In custom hooks - handle errors with toast notifications
useEffect(() => {
    if (error) {
        toast.error('Failed to fetch data')
    }
}, [error])

// In mutations - handle both success and error
const { mutate } = useMutation({
    mutationFn: queryMutate('system', 'delete', { uid }),
    onSuccess: () => toast.success('System deleted'),
    onError: error => toast.error(`Failed: ${error.message}`),
})
```

## Development Guidelines

### File Naming Conventions

- Components: `PascalCase.comp.tsx` or `PascalCase.tsx`
- Hooks: `useCamelCase.ts`
- Utilities: `camelCase.ts`
- Types: `camelCase.types.ts`
- Containers: `PascalCase.cont.tsx`

### TypeScript Best Practices

- Use strict typing, avoid `any`
- Define interfaces for all API responses
- Use utility types: `Pick`, `Omit`, `Partial`
- Export types from module index files

### Import Organization

```typescript
// External libraries
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

// Internal imports (absolute paths)
import { Button } from '@/components/Buttons'
import { useSystemDetail } from '@/hooks/useSystemDetail'
import type { SystemDetail } from '@/types/responses/systems'

// Relative imports
import { SystemCard } from './SystemCard'
```

### Performance Optimization

- Use `useMemo` for expensive calculations
- Use `useCallback` for event handlers passed to child components
- Implement proper loading states and skeleton screens
- Use React Query's `staleTime` and `cacheTime` appropriately

### State Management

- Use Zustand for global state (user preferences, modals)
- Use React Hook Form for form state
- Use TanStack Query for server state
- Keep local component state minimal

### UI Components

- Use shadcn/ui for consistent, accessible components
- Implement responsive design with Tailwind
- Use consistent spacing and color schemes from design system
- Implement proper loading and error states with shadcn/ui components

### App Directory Patterns

```typescript
// app/layout.tsx - Root layout
import { Providers } from '@/components/providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

// app/(dashboard)/systems/page.tsx - Systems page
import { SystemsContainer } from '@/modules/systems/SystemsContainer'

export default function SystemsPage() {
  return <SystemsContainer />
}

// app/(dashboard)/layout.tsx - Dashboard layout
import { DashboardNav } from '@/components/dashboard-nav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex">
      <DashboardNav />
      <main className="flex-1">{children}</main>
    </div>
  )
}
```

### shadcn/ui Component Usage

```typescript
// Use shadcn/ui components consistently
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const SystemForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">System Name</Label>
          <Input id="name" placeholder="Enter system name" />
        </div>
        <Button type="submit">Save System</Button>
      </CardContent>
    </Card>
  )
}
```

### Testing Patterns

```typescript
// Component testing
import { render, screen } from '@testing-library/react'
import { FormWrapper } from '@/testutils'

test('renders system name', () => {
  render(
    <FormWrapper>
      <SystemCard system={mockSystem} />
    </FormWrapper>
  )

  expect(screen.getByText(mockSystem.name)).toBeInTheDocument()
})
```

## API Integration

### REST Endpoints Pattern

The codebase uses a centralized endpoint management system:

```typescript
// getEndpoints.ts - Single source of truth for all endpoints
export const getEndpoints = ({ uid, path, itemUid, query, codebook }: EndpointProps) => ({
    systems: `/systems${query}`,
    system: `/system${uid ? '/' + uid : ''}`,
    systemImage: `/system/${uid}/image`,
    orders: `/orders${query}`,
    catalogueItems: `/catalogue/items${query}`,
    // ... all other endpoints
})

// Usage in queryFetcher
const endpoint = getEndpoints(queryParams)[endpointType]
return axiosInstance.get(BASE_URL + endpoint).then(res => res.data)
```

### TanStack Query Integration

- Use `queryFetcher<ResponseType>('endpointKey')` for GET requests
- Use `queryMutate('endpointKey', 'post|put|delete|get', { uid, responseType, query })` for mutations
- Always use `QueryFetcherKey` type for query keys
- Use `placeholderData: keepPreviousData` for smooth UX transitions
- Use `useMemo` for query keys when they depend on computed values

### Query Manager Integration

```typescript
// Most data fetching hooks use useQueryManager for URL synchronization
const { query } = useQueryManager('tableId') // Gets filters, pagination, sorting from URL

const queryKey: QueryFetcherKey = useMemo(() => ['endpoint', { query }], [query])
```

### GraphQL Schema Integration

The application uses a comprehensive GraphQL schema with Neo4j integration:

#### Schema Structure

- **System Management**: Systems, subsystems, hierarchy with parent-child relationships
- **Catalogue**: Items, categories, properties with flexible property system
- **Orders & Service Items**: Order management with delivery tracking
- **Room Cards**: Facility management with contact persons and teams
- **Authentication**: Role-based access control with facility-specific permissions
- **Files & Links**: Document and image management integration

#### Key GraphQL Features

- **Fragments**: Reusable data shapes defined in `src/utils/graphql/fragments.ts`
- **Code Generation**: Types generated from schema using `@graphql-codegen/cli`
- **Relationships**: Complex graph relationships between entities
- **Authentication**: Built-in authentication directives and JWT support

#### Type Generation Process

```bash
# Generate TypeScript types from GraphQL schema
yarn generate

# Watch mode for development
yarn generate:watch
```

This runs `graphql-codegen --config codegen.ts` which:

1. Fetches schema from `http://localhost:5001/api/graphql`
2. Scans all TypeScript files for `gql` tagged queries
3. Generates type-safe TypeScript definitions in `src/types/gql/`
4. Creates hooks and utilities for queries and mutations

#### Fragment Usage Pattern

```typescript
// Define reusable fragments
export const SystemDetailFragment = gql(`
  fragment SystemDetail on System {
    uid
    name
    systemCode
    location {
      uid
      name
    }
    physicalItem {
      ...PhysicalItem
    }
  }
`)

// Use fragments in queries
const SYSTEM_QUERY = gql(`
  query SystemDetail($where: SystemWhere) {
    systems(where: $where) {
      ...SystemDetail
    }
  }
`)

// Extract typed data with useFragment
const systemDetail = useFragment(SystemDetailFragment, data?.systems[0])
```

#### Key Schema Types

- **System**: Core entity with hierarchy, location, physical items
- **CatalogueItem**: Product catalog with flexible properties
- **Item**: Physical instances of catalogue items
- **Order**: Purchase orders with delivery tracking
- **RoomCard**: Facility room management
- **Employee**: User management with roles and permissions

#### Important Schema Patterns

- **Relationships**: Use `@relationship` directives for Neo4j connections
- **Authentication**: `@authentication` directive for protected types
- **Authorization**: Role-based field-level permissions
- **Fragments**: Always use fragments for complex nested data
- **Properties**: Flexible property system for catalogue items and service items

## GraphQL Development Workflow

### Schema-First Development

1. **Schema Definition**: GraphQL schema is defined in `src/server/apollo/schema.graphql`
2. **Type Generation**: Run `yarn generate` to create TypeScript types
3. **Fragment Definition**: Create reusable fragments in `src/utils/graphql/fragments.ts`
4. **Query Implementation**: Use generated types with `useGraphQL` hook
5. **Testing**: Test queries and mutations with proper error handling

### Working with Generated Types

```typescript
// Generated types are available from @/types/gql
import type { SystemDetailQuery, SystemWhere } from '@/types/gql/graphql'
import { gql } from '@/types/gql'

// Use generated types for variables and responses
const SYSTEM_QUERY = gql(`
  query SystemDetail($where: SystemWhere) {
    systems(where: $where) {
      ...SystemDetail
    }
  }
`)

// Hook with full type safety
const { data, loading, error } = useGraphQL(SYSTEM_QUERY, {
    variables: { where: { uid: systemId } as SystemWhere },
})
```

### Fragment Composition

```typescript
// Compose fragments for complex data structures
export const SystemDetailFragment = gql(`
  fragment SystemDetail on System {
    ...SystemFields
    physicalItem {
      ...PhysicalItem
    }
    sparePartsConnection {
      edges {
        coverage
        node {
          ...SystemFields
        }
      }
    }
  }
`)
```

## Security & Authentication

### Role-Based Access Control

```typescript
const usePermission = (roles: ROLE[]) => {
    const { data: session } = useSession()
    return roles.some(role => session?.user?.roles?.includes(role))
}

// Usage in components
const canEdit = usePermission([ROLE.SYSTEM_EDIT])
```

### Protected Routes

Route protection is handled at the Next.js middleware level using `src/middleware.ts`:

```typescript
// middleware.ts - Centralized route protection
export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl
    const matchesProtectedPath = PROTECTED_PATHS.some(path => pathname.startsWith(path))
    const user = await getToken({ req: request })

    if (matchesProtectedPath) {
        // Redirect to login if not authenticated
        if (!user) {
            const url = new URL('/', request.url)
            url.searchParams.set('callbackUrl', encodeURI(APP_BASE_URL + pathname))
            return NextResponse.redirect(url)
        }

        // Check role-based access
        const currentPath = Object.keys(PATH_ROLES_CONFIG).find(key =>
            pathname.startsWith(key),
        ) as PATH
        const matchRolesToPath = PATH_ROLES_CONFIG[currentPath].some(role =>
            user.roles.includes(role),
        )

        // Redirect to 404 if user doesn't have required role
        if (!matchRolesToPath) {
            const url = new URL(`/404`, request.url)
            return NextResponse.redirect(url)
        }
    }

    // Redirect authenticated users from root to dashboard
    if (user && pathname === PATH.ROOT) {
        const url = new URL(PATH.DASHBOARD, request.url)
        return NextResponse.redirect(url)
    }

    return NextResponse.next()
}
```

### Role-Based Component Access

For component-level permission checks, use the `usePermission` hook:

```typescript
const canEdit = usePermission([ROLE.SYSTEM_EDIT])

if (!canEdit) {
  return <div>You don't have permission to edit</div>
}
```

## Common Patterns to Follow

### Data Fetching

- Always handle loading and error states using the established patterns
- Use `queryFetcher` for REST API queries with proper endpoint keys
- Use `queryMutate` for REST API mutations (POST/PUT/DELETE)
- Use `useGraphQL` and `useGraphQLMutation` for GraphQL operations
- Implement proper cache invalidation with `queryClient.invalidateQueries`
- Use `placeholderData: keepPreviousData` for smooth transitions
- Use `useMemo` for query keys when they depend on reactive values
- Follow the return pattern: `{ dataName: data, loading: isFetching, error, mutate: refetch }`
- Integrate with `useQueryManager` for URL-synchronized table state

### Form Handling

- Validate on submit, not on change (unless UX requires it)
- Show clear error messages
- Implement proper form reset after successful submission
- Use controlled components with React Hook Form

### Component Composition

- Keep components small and focused
- Use composition over inheritance
- Implement proper prop drilling or context when needed
- Use render props or custom hooks for complex logic sharing

### Code Quality

- Write descriptive commit messages
- Use meaningful variable and function names
- Comment complex business logic
- Keep functions pure when possible
- Follow DRY principle but don't over-abstract

## Common Anti-Patterns to Avoid

- Don't use `useEffect` for data fetching (use TanStack Query)
- Don't mutate props or state directly
- Don't use `any` type unless absolutely necessary
- Don't skip error handling in async operations
- Don't forget to clean up subscriptions and timeouts
- Don't use inline styles (use Tailwind classes)
- Don't forget to handle edge cases (empty states, errors)

## Environment Configuration

### Local Development

- Copy `env-example` to `.env`
- Run `yarn dev` for development server on port 5001
- Use mock server for API calls during development

### Key Environment Variables

- `PANDA_API_GW_URL` - API Gateway URL
- `NEXTAUTH_URL` - Application URL
- `NEO4J_URI` - Neo4j database connection
- `MINIO_ENDPOINT` - File storage endpoint
- `AZURE_AD_*` - Azure AD authentication

## Additional Notes

- The application uses Czech language in UI but code should be in English
- System hierarchy is important - systems can have parent-child relationships
- Physical items are linked to catalogue items
- User permissions are role-based and facility-specific
- File management supports images and documents
- The application supports dark/light theme switching
- GraphQL and REST APIs are used simultaneously for different purposes

When working with this codebase, always consider the business domain context of maintenance management and follow the established patterns for consistency and maintainability.
