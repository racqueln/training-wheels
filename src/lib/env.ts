/**
 * Environment Variable Validation
 * 
 * This utility checks that all required environment variables are set.
 * It's important to validate environment variables early to prevent
 * runtime errors when the app tries to use missing API keys or URLs.
 */

// List of required environment variables
const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY'
] as const

// Optional environment variables for AI APIs
const OPTIONAL_ENV_VARS = [
  'OPENAI_API_KEY',
  'ANTHROPIC_API_KEY', 
  'PERPLEXITY_API_KEY',
  'FAL_API_KEY'
] as const

/**
 * Validates that all required environment variables are set
 * @throws Error if any required environment variable is missing
 */
export function validateEnv() {
  const missing: string[] = []
  
  for (const varName of REQUIRED_ENV_VARS) {
    if (!process.env[varName]) {
      missing.push(varName)
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    )
  }
  
  console.log('✅ All required environment variables are set')
}

/**
 * Gets an environment variable with a fallback value
 * @param name The environment variable name
 * @param fallback The fallback value if the variable is not set
 * @returns The environment variable value or fallback
 */
export function getEnvVar(name: string, fallback?: string): string {
  const value = process.env[name]
  if (!value && fallback === undefined) {
    throw new Error(`Environment variable ${name} is required but not set`)
  }
  return value || fallback!
}

/**
 * Checks if an environment variable is set
 * @param name The environment variable name
 * @returns True if the variable is set, false otherwise
 */
export function hasEnvVar(name: string): boolean {
  return !!process.env[name]
} 