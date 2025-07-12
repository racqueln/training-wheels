/**
 * Rate Limiting Utility
 * 
 * This utility helps prevent abuse of your AI APIs by limiting
 * how many requests a user can make in a given time period.
 * 
 * Rate limiting is important because:
 * - AI API calls can be expensive
 * - Prevents spam and abuse
 * - Protects your API keys from being overused
 */

interface RateLimitEntry {
  requests: number[]
  lastReset: number
}

const rateLimitMap = new Map<string, RateLimitEntry>()

/**
 * Checks if a request is allowed based on rate limiting rules
 * @param identifier Unique identifier for the user (IP, user ID, etc.)
 * @param maxRequests Maximum number of requests allowed in the time window
 * @param windowMs Time window in milliseconds (default: 1 minute)
 * @returns True if request is allowed, false if rate limited
 */
export function rateLimit(
  identifier: string, 
  maxRequests: number = 10, 
  windowMs: number = 60000
): boolean {
  const now = Date.now()
  
  // Get or create rate limit entry for this identifier
  if (!rateLimitMap.has(identifier)) {
    rateLimitMap.set(identifier, {
      requests: [],
      lastReset: now
    })
  }
  
  const entry = rateLimitMap.get(identifier)!
  
  // Clean up old requests outside the time window
  const windowStart = now - windowMs
  entry.requests = entry.requests.filter(timestamp => timestamp > windowStart)
  
  // Check if we're at the limit
  if (entry.requests.length >= maxRequests) {
    return false // Rate limited
  }
  
  // Add current request and allow it
  entry.requests.push(now)
  return true // Allowed
}

/**
 * Gets the remaining requests for an identifier
 * @param identifier Unique identifier for the user
 * @param maxRequests Maximum number of requests allowed
 * @param windowMs Time window in milliseconds
 * @returns Number of remaining requests
 */
export function getRemainingRequests(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): number {
  const now = Date.now()
  const windowStart = now - windowMs
  
  if (!rateLimitMap.has(identifier)) {
    return maxRequests
  }
  
  const entry = rateLimitMap.get(identifier)!
  const recentRequests = entry.requests.filter(timestamp => timestamp > windowStart)
  
  return Math.max(0, maxRequests - recentRequests.length)
}

/**
 * Clears rate limit data for an identifier
 * @param identifier Unique identifier for the user
 */
export function clearRateLimit(identifier: string): void {
  rateLimitMap.delete(identifier)
}

/**
 * Clears all rate limit data (useful for testing)
 */
export function clearAllRateLimits(): void {
  rateLimitMap.clear()
} 