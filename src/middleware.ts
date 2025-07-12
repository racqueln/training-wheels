import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Security Middleware
 * 
 * This middleware adds essential security headers to all responses.
 * These headers protect against common web vulnerabilities:
 * 
 * - X-Frame-Options: Prevents clickjacking attacks
 * - X-Content-Type-Options: Prevents MIME type sniffing
 * - Referrer-Policy: Controls how much referrer information is sent
 * - Permissions-Policy: Restricts browser features like camera/microphone
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Essential security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  
  return response
}

// Apply middleware to all routes except static files and API routes
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
} 