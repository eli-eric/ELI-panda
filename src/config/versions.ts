export interface Change {
  category: string
  items: string[]
}

export interface Release {
  version: string
  date: string
  title: string
  description: string
  type: 'major' | 'minor' | 'patch'
  changes: Change[]
}

export interface VersionData {
  currentVersion: string
  releases: Release[]
}

export const versionsData: VersionData = {
  currentVersion: '2.0.0',
  releases: [
    {
      version: '2.0.0',
      date: '2025-10-07',
      title: 'Major Release - Complete System Redesign & Validation Migration',
      description:
        'Comprehensive redesign of system management, order handling, and complete migration from Yup to Zod validation with enhanced internationalization',
      type: 'major',
      changes: [
        {
          category: 'System Management Redesign',
          items: [
            'Complete redesign of system detail page with improved layout and navigation',
            'Implemented inline edit fields for quick system property updates',
            'Added system colorization by hierarchy level in grids and tables',
            'Enhanced system hierarchy display with collapsible Disclosure component',
            'Implemented system type selection modal for better workflow',
            'Added PhysicalItemSheetSection for comprehensive physical item management',
            'Integrated InlineEditInputWithActions with generate and clear functionality',
            'Added system create/edit functionality in Sheet modals',
            'Implemented validation for system levels and hierarchy',
            'Enhanced SystemNameCell with improved badge rendering for subsystems'
          ]
        },
        {
          category: 'Form Validation - Yup to Zod Migration',
          items: [
            'Migrated all form validation from Yup to Zod schemas',
            'Implemented roomCardSchema with comprehensive Zod validation',
            'Created systemCreateSchema and systemUpdateSchema with Zod',
            'Migrated publication forms to Zod validation',
            'Implemented physicalItemSchema with Zod validation',
            'Added categorySchema with optional code field validation',
            'Refactored all form modals to use Zod with react-hook-form',
            'Updated @hookform/resolvers and react-hook-form dependencies',
            'Implemented ContactHallModal, EmployeeModal, TeamModal with Zod validation',
            'Created OrderIsDeliveryModal with Zod validation'
          ]
        },
        {
          category: 'Modal System Improvements',
          items: [
            'Implemented modal dirty protection with unsaved changes warning',
            'Created useFormDirtyProtection hook for form change detection',
            'Added WarningModal for user confirmation on unsaved changes',
            'Refactored modal hooks to use useCallback for performance',
            'Removed legacy useFormModal hook in favor of global modal store',
            'Implemented SheetFormButtons component for consistent modal actions',
            'Added saveLabel and loadingText props to form components',
            'Enhanced modal content handling and state management',
            'Simplified modal button handling across all modals',
            'Added onClose prop handling for better modal lifecycle management'
          ]
        },
        {
          category: 'Order & Service Management',
          items: [
            'Redesigned order tables UX with improved layout',
            'Implemented order status colorization in grids',
            'Enhanced order item layout with better information hierarchy',
            'Added OrdersFilterSheet with footer for advanced filtering',
            'Refactored order detail page for better clarity',
            'Fixed adding order lines workflow',
            'Improved order line form with internationalized labels',
            'Enhanced service line edit workflow with validation',
            'Added validation for selected systems in service line steps',
            'Improved delivery status handling with dedicated modal'
          ]
        },
        {
          category: 'Internationalization (i18n)',
          items: [
            'Implemented comprehensive react-intl integration across all components',
            'Added internationalization for system item components',
            'Internationalized order and service line components',
            'Added locale support for catalogue and room card components',
            'Internationalized table components with pagination and filters',
            'Added i18n support for modal headers, buttons, and messages',
            'Implemented formatted messages for error handling',
            'Added currency labels with proper formatting',
            'Enhanced message formatters with unique keys',
            'Internationalized user profile and authentication components'
          ]
        },
        {
          category: 'Icon Migration & UI Consistency',
          items: [
            'Replaced all Heroicons with Lucide React icons application-wide',
            'Updated drag-and-drop icon to GripVertical for consistency',
            'Replaced Image component with Avatar for better UX',
            'Updated sidebar logo rendering for improved responsiveness',
            'Enhanced icon sizes and classes for UI consistency',
            'Removed @heroicons/react dependency from project'
          ]
        },
        {
          category: 'Filter System Enhancement',
          items: [
            'Implemented CatalogueFilterSheet with footer component',
            'Created OrdersFilterSheet for enhanced filtering',
            'Added SystemsFilterSheet with side positioning support',
            'Improved FilterDropdown with internationalization',
            'Enhanced Listbox customOptions handling',
            'Added Sheet side prop for flexible positioning'
          ]
        },
        {
          category: 'Publications Module',
          items: [
            'Created publications skeleton structure',
            'Implemented publication form with Zod validation',
            'Added publication free-form component',
            'Created TitleCell component for publication actions',
            'Implemented publication modal edit and create workflows',
            'Added SheetFormButtons for modal header actions',
            'Enhanced publication form with save and exit functionality',
            'Improved publication form styling in modals'
          ]
        },
        {
          category: 'Component Enhancements',
          items: [
            'Added EnvironmentWarning component for environment notifications',
            'Implemented onWheel handler in Input component to blur number inputs',
            'Added disableHoverableContent prop to Tooltip component',
            'Enhanced Combobox with improved label handling',
            'Added ComboboxTree with custom labels and titles support',
            'Implemented useCodebookTreeModal hook',
            'Enhanced RecordNotFound with optional returnUrl and onClick',
            'Added SidebarTrigger context safety check',
            'Fixed HydrationBoundary state handling'
          ]
        },
        {
          category: 'API & Data Handling',
          items: [
            'Implemented fetchRequest utility for improved API calls',
            'Migrated from axios to fetchRequest for consistency',
            'Enhanced query fetching with validation and error handling',
            'Improved endpoint URL construction',
            'Added safe wrappers for S3 operations with error handling',
            'Optimized details object calculation',
            'Enhanced form state sync on item changes',
            'Improved data formatting utilities'
          ]
        },
        {
          category: 'Apollo Server & GraphQL',
          items: [
            'Enhanced Apollo Server configuration',
            'Changed landing page to local plugin',
            'Removed unused landing page plugins',
            'Added graphql-request dependency',
            'Fixed generated GraphQL types',
            'Improved endpoint resolution'
          ]
        },
        {
          category: 'Dependencies & Build',
          items: [
            'Updated Next.js to version 14.2.33',
            'Added sharp dependencies for Alpine in Dockerfiles',
            'Added tailwind-merge for enhanced Tailwind CSS management',
            'Updated graphql-request to version 6.1.0',
            'Reorganized dependencies structure in package.json',
            'Fixed build process and TypeScript errors',
            'Updated form resolver dependencies'
          ]
        },
        {
          category: 'Bug Fixes',
          items: [
            'Fixed infinite loop on system detail page',
            'Fixed category badge message formatting',
            'Fixed tooltip issues across components',
            'Fixed build typing errors',
            'Fixed merge conflicts',
            'Fixed port and strict mode configuration',
            'Fixed select system modal functionality',
            'Fixed user admin form',
            'Fixed layout issues in order items',
            'Fixed Zod resolver configuration'
          ]
        },
        {
          category: 'Code Quality & Refactoring',
          items: [
            'Cleaned up code formatting across modal components',
            'Removed unused modal components for contact, employee, and team',
            'Refactored form modal components structure',
            'Cleaned up unused props across components',
            'Improved code readability in multiple modules',
            'Removed console logs and unnecessary comments',
            'Enhanced error handling patterns',
            'Streamlined component rendering logic',
            'Added deprecated folder with migration guide'
          ]
        }
      ]
    },
    {
      version: '1.9.5',
      date: '2025-07-30',
      title: 'Modal System Improvements',
      description: 'Enhanced modal components and fixed various UI issues',
      type: 'minor',
      changes: [
        {
          category: 'Bug Fixes',
          items: [
            'Fixed service lines modal layout issues',
            'Resolved form component design inconsistencies',
            'Fixed catalogue breadcrumb navigation'
          ]
        },
        {
          category: 'Features',
          items: [
            'Redesigned catalogue actions interface',
            'Improved search bar functionality',
            'Enhanced filter button tooltips'
          ]
        }
      ]
    },
    {
      version: '1.9.0',
      date: '2025-07-28',
      title: 'Location Management Update',
      description: 'Improvements to location modals and room card management',
      type: 'minor',
      changes: [
        {
          category: 'Features',
          items: [
            'Enhanced location modal with better UX',
            'Improved room card location combo selection',
            'Updated order line edit functionality'
          ]
        },
        {
          category: 'Bug Fixes',
          items: [
            'Fixed location modal layout issues',
            'Resolved modal system conflicts',
            'Fixed order line form hook conflicts'
          ]
        }
      ]
    },
    {
      version: '1.8.5',
      date: '2025-07-24',
      title: 'Modal System Refactor',
      description:
        'Major refactoring of modal components and global modal provider',
      type: 'minor',
      changes: [
        {
          category: 'Architecture',
          items: [
            'Implemented global modal provider for nested modals',
            'Refactored modal components architecture',
            'Enhanced modal hook system'
          ]
        },
        {
          category: 'Bug Fixes',
          items: [
            'Fixed build issues with modal components',
            'Resolved file modal functionality',
            'Fixed category edit modal design'
          ]
        }
      ]
    }
  ]
}
