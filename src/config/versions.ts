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
  currentVersion: "2.0.0",
  releases: [
    {
      version: "2.0.0",
      date: "2025-07-31",
      title: "Major UI Migration - shadcn/ui",
      description: "Complete migration from HeadlessUI to shadcn/ui components with improved design system",
      type: "major",
      changes: [
        {
          category: "UI Components",
          items: [
            "Migrated all modal components to shadcn/ui Dialog and Sheet",
            "Redesigned dashboard with modern card-based navigation tiles",
            "Updated form components to use shadcn/ui inputs and selects",
            "Implemented new sidebar with shadcn/ui components",
            "Replaced legacy buttons with shadcn/ui Button variants"
          ]
        },
        {
          category: "User Experience",
          items: [
            "Improved mobile responsiveness across all components",
            "Enhanced hover effects and transitions",
            "Better visual hierarchy with consistent spacing",
            "Optimized touch targets for mobile devices"
          ]
        },
        {
          category: "Architecture",
          items: [
            "Implemented global modal system for nested modals",
            "Refactored modal hooks for better state management",
            "Improved component organization and reusability"
          ]
        }
      ]
    },
    {
      version: "1.9.5",
      date: "2025-07-30",
      title: "Modal System Improvements",
      description: "Enhanced modal components and fixed various UI issues",
      type: "minor",
      changes: [
        {
          category: "Bug Fixes",
          items: [
            "Fixed service lines modal layout issues",
            "Resolved form component design inconsistencies",
            "Fixed catalogue breadcrumb navigation"
          ]
        },
        {
          category: "Features",
          items: [
            "Redesigned catalogue actions interface",
            "Improved search bar functionality",
            "Enhanced filter button tooltips"
          ]
        }
      ]
    },
    {
      version: "1.9.0",
      date: "2025-07-28",
      title: "Location Management Update",
      description: "Improvements to location modals and room card management",
      type: "minor",
      changes: [
        {
          category: "Features",
          items: [
            "Enhanced location modal with better UX",
            "Improved room card location combo selection",
            "Updated order line edit functionality"
          ]
        },
        {
          category: "Bug Fixes",
          items: [
            "Fixed location modal layout issues",
            "Resolved modal system conflicts",
            "Fixed order line form hook conflicts"
          ]
        }
      ]
    },
    {
      version: "1.8.5",
      date: "2025-07-24",
      title: "Modal System Refactor",
      description: "Major refactoring of modal components and global modal provider",
      type: "minor",
      changes: [
        {
          category: "Architecture",
          items: [
            "Implemented global modal provider for nested modals",
            "Refactored modal components architecture",
            "Enhanced modal hook system"
          ]
        },
        {
          category: "Bug Fixes",
          items: [
            "Fixed build issues with modal components",
            "Resolved file modal functionality",
            "Fixed category edit modal design"
          ]
        }
      ]
    }
  ]
}