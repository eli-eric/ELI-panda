/**
 * Feature flags configuration
 *
 * Enable or disable features across the application.
 * These flags are useful for development, debugging, and gradual feature rollouts.
 */

import { isProductionEnvironment } from '@/lib/environment/utils'

interface FeatureFlags {
  /**
   * Enable detailed HTTP request/response logging in fetchClient
   * Logs URL, method, status, content-type, and response body
   */
  enableHttpLogging: boolean

  /**
   * Enable detailed mutation logging in hooks
   * Logs mutation lifecycle: start, success, error with payloads
   */
  enableMutationLogging: boolean

  /**
   * Enable spare parts assignment functionality
   * Allows users to assign spare parts to systems
   */
  enableSparePartsAssignment: boolean

  /**
   * Enable ELI Authors selection via researcher picker modal
   * When disabled, uses legacy TextArea input for eliAuthors
   */
  enableEliAuthorsResearcherPicker: boolean
}

export const featureFlags: FeatureFlags = {
  enableHttpLogging: false,
  enableMutationLogging: false,
  enableSparePartsAssignment: !isProductionEnvironment(),
  enableEliAuthorsResearcherPicker: false
}

/**
 * Helper function to check if a feature flag is enabled
 */
export const isFeatureEnabled = (flag: keyof FeatureFlags): boolean => {
  return featureFlags[flag]
}
