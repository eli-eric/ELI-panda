/**
 * Feature flags configuration
 *
 * Enable or disable features across the application.
 * These flags are useful for development, debugging, and gradual feature rollouts.
 */

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
}

export const featureFlags: FeatureFlags = {
  enableHttpLogging: false,
  enableMutationLogging: false
}

/**
 * Helper function to check if a feature flag is enabled
 */
export const isFeatureEnabled = (flag: keyof FeatureFlags): boolean => {
  return featureFlags[flag]
}
